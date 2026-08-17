import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

let genAIClient = null;
function getGeminiClient() {
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
  }
  return genAIClient;
}

const CANDIDATE_MODELS = [
  'gemini-flash-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.7-flash'
];

async function generateWithFallback(ai, params) {
  let lastError = null;
  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        ...params,
        model: model
      });
      return response;
    } catch (err) {
      console.warn(`Model ${model} failed, trying next fallback:`, err.message || err);
      lastError = err;
    }
  }
  throw lastError || new Error('No se pudo conectar con los modelos de IA.');
}

function cleanJsonText(rawText) {
  if (!rawText) return '[]';
  let text = rawText.trim();
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/i, '').replace(/\s*```$/, '');
  }
  return text.trim();
}

function sanitizeImageMime(mimeType) {
  if (!mimeType) return 'image/jpeg';
  const lower = mimeType.toLowerCase();
  if (lower.includes('png')) return 'image/png';
  if (lower.includes('webp')) return 'image/webp';
  if (lower.includes('gif')) return 'image/gif';
  return 'image/jpeg';
}

const SUGGESTIONS_FILE = path.join(__dirname, 'suggestions.json');

// Helper to read suggestions
function getSuggestions() {
  try {
    if (fs.existsSync(SUGGESTIONS_FILE)) {
      return JSON.parse(fs.readFileSync(SUGGESTIONS_FILE, 'utf8'));
    }
  } catch(e) {
    console.error('Error reading suggestions file:', e);
  }
  return [];
}

// Endpoint to receive suggestions from users
app.post('/api/suggestions', (req, res) => {
  try {
    const suggestion = req.body;
    if (!suggestion || !suggestion.message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }
    const current = getSuggestions();
    const item = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
      createdAt: new Date().toISOString(),
      ...suggestion
    };
    current.unshift(item);
    fs.writeFileSync(SUGGESTIONS_FILE, JSON.stringify(current, null, 2), 'utf8');
    console.log('Nueva sugerencia recibida:', item.category, item.message.substring(0, 50));
    res.json({ success: true, id: item.id });
  } catch(err) {
    console.error('Error saving suggestion:', err);
    res.status(500).json({ error: 'Error al guardar sugerencia' });
  }
});

// Endpoint to view all suggestions (JSON)
app.get('/api/suggestions', (req, res) => {
  try {
    const list = getSuggestions();
    res.json(list);
  } catch(err) {
    res.status(500).json({ error: 'Error al leer sugerencias' });
  }
});

// Endpoint to delete a suggestion
app.delete('/api/suggestions/:id', (req, res) => {
  try {
    const id = req.params.id;
    let list = getSuggestions();
    list = list.filter(item => item.id !== id);
    fs.writeFileSync(SUGGESTIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
    res.json({ success: true });
  } catch(err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// Visual dashboard to view suggestions directly in the browser
app.get('/sugerencias', (req, res) => {
  const suggestions = getSuggestions();
  
  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const itemsHtml = suggestions.length === 0 ? `
    <div class="empty-state">
      <div class="empty-icon">📫</div>
      <div class="empty-title">Aún no hay sugerencias</div>
      <div class="empty-sub">Los comentarios que envíen los usuarios desde la app aparecerán aquí en tiempo real.</div>
    </div>
  ` : `
    <div class="grid">
      ${suggestions.map(s => {
        let catClass = 'cat-otro';
        let catLabel = '💬 Comentario';
        if (s.category === 'idea') { catClass = 'cat-idea'; catLabel = '✨ Idea / Función'; }
        else if (s.category === 'cachimbo') { catClass = 'cat-cachimbo'; catLabel = '🎮 Cachimbo'; }
        else if (s.category === 'bug') { catClass = 'cat-bug'; catLabel = '🐛 Bug'; }
        else if (s.category === 'malla') { catClass = 'cat-malla'; catLabel = '📚 Malla / Curso'; }

        const dateStr = s.createdAt ? new Date(s.createdAt).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) : 'Reciente';
        const userInfo = s.userEmail ? (s.userName || 'Usuario') + ' (' + s.userEmail + ')' : (s.userName || 'Invitado');
        const careerInfo = s.career && s.career !== 'none' ? '<span style="opacity:0.6;">· Carrera: ' + escapeHtml(s.career) + '</span>' : '';
        const cycleInfo = s.currentCycle && s.currentCycle !== 'none' ? '<span style="opacity:0.6;">· Ciclo: ' + escapeHtml(s.currentCycle) + '</span>' : '';

        return `
          <div class="card" id="card-${escapeHtml(s.id)}">
            <div class="card-top">
              <span class="category-pill ${catClass}">${catLabel}</span>
              <span class="time">${dateStr}</span>
            </div>
            <div class="message">${escapeHtml(s.message)}</div>
            <div class="card-meta">
              <div class="meta-user">
                <span>👤 ${escapeHtml(userInfo)}</span>
                ${careerInfo}
                ${cycleInfo}
              </div>
              <button class="btn" style="padding:4px 8px; font-size:11px; color:var(--red);" onclick="deleteSugg('${escapeHtml(s.id)}')">🗑️ Eliminar</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  const html = `<!DOCTYPE html>
<html lang="es" data-theme="legacy">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Buzón de Sugerencias — Promedia</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #151822;
      --s1: #1f2232;
      --s2: #282c40;
      --s3: #323852;
      --border: rgba(255,255,255,0.08);
      --border2: rgba(255,255,255,0.14);
      --text: #f0f3fa;
      --sub: #949db2;
      --muted: #5e667a;
      --accent: #F56A24;
      --accent-text: #ffffff;
      --green: #3dd68c;
      --red: #f55c5c;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 24px 16px;
      min-height: 100vh;
    }
    .container { max-width: 900px; margin: 0 auto; }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 24px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
    }
    .title-row { display: flex; align-items: center; gap: 12px; }
    .logo { height: 38px; }
    h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
    .badge {
      background: var(--accent);
      color: var(--accent-text);
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 20px;
    }
    .actions { display: flex; gap: 8px; }
    .btn {
      background: var(--s2);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 8px 14px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      font-family: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s;
    }
    .btn:hover { background: var(--s3); }
    .btn-accent { background: var(--accent); color: var(--accent-text); border: none; }
    .btn-accent:hover { opacity: 0.9; }
    .grid { display: flex; flex-direction: column; gap: 12px; }
    .card {
      background: var(--s1);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 18px 20px;
      transition: transform 0.15s, border-color 0.15s;
    }
    .card:hover { border-color: var(--border2); }
    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 10px;
      flex-wrap: wrap;
    }
    .category-pill {
      font-size: 11.5px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .cat-idea { background: rgba(245,106,36,0.15); color: var(--accent); }
    .cat-cachimbo { background: rgba(167,139,245,0.15); color: #a78bf5; }
    .cat-bug { background: rgba(245,92,92,0.15); color: var(--red); }
    .cat-malla { background: rgba(92,212,245,0.15); color: #5cd4f5; }
    .cat-otro { background: rgba(255,255,255,0.08); color: var(--sub); }
    .time { font-size: 12px; color: var(--muted); font-weight: 500; }
    .message {
      font-size: 14.5px;
      line-height: 1.55;
      color: var(--text);
      white-space: pre-wrap;
      word-break: break-word;
      margin-bottom: 14px;
      background: var(--s2);
      padding: 12px 14px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.04);
    }
    .card-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      font-size: 12px;
      color: var(--sub);
      border-top: 1px solid var(--border);
      padding-top: 10px;
    }
    .meta-user { display: flex; align-items: center; gap: 6px; font-weight: 600; }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      background: var(--s1);
      border-radius: 20px;
      border: 1px dashed var(--border);
    }
    .empty-icon { font-size: 40px; margin-bottom: 12px; }
    .empty-title { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
    .empty-sub { font-size: 13px; color: var(--muted); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="title-row">
        <img src="logo.png" alt="Promedia" class="logo">
        <div>
          <h1>Buzón de Sugerencias</h1>
          <div style="font-size: 12px; color: var(--sub); margin-top: 2px;">Comentarios y propuestas enviadas por los usuarios</div>
        </div>
      </div>
      <div class="actions">
        <span class="badge">${suggestions.length} ${suggestions.length === 1 ? 'sugerencia' : 'sugerencias'}</span>
        <button class="btn" onclick="location.reload()">🔄 Actualizar</button>
        <a href="/" class="btn btn-accent">Ir a la App</a>
      </div>
    </div>

    ${itemsHtml}
  </div>

  <script>
    async function deleteSugg(id) {
      if (!confirm('¿Seguro que deseas eliminar esta sugerencia?')) return;
      try {
        const res = await fetch('/api/suggestions/' + encodeURIComponent(id), { method: 'DELETE' });
        if (res.ok) {
          const el = document.getElementById('card-' + id);
          if (el) el.remove();
          location.reload();
        }
      } catch(e) {
        alert('Error al eliminar');
      }
    }
  </script>
</body>
</html>`;

  res.send(html);
});

app.post('/api/parse-syllabus', async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'Falta la imagen' });

    const ai = getGeminiClient();
    const cleanMime = sanitizeImageMime(mimeType);

    const imagePart = {
      inlineData: {
        mimeType: cleanMime,
        data: imageBase64,
      },
    };

    const promptText = "Eres un experto leyendo sílabos universitarios. Observa esta imagen y extrae la lista de evaluaciones. Para cada evaluación incluye su 'nombre', su 'peso' como número entero entre 0 y 100 (ej. 25 para 25%), y la 'semana' (opcional, como string, ej. 'Semana 4').";

    const response = await generateWithFallback(ai, {
      contents: { parts: [imagePart, { text: promptText }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              nombre: { type: Type.STRING, description: "Nombre de la evaluación (ej. Examen escrito 1)" },
              peso: { type: Type.NUMBER, description: "Peso porcentual de la evaluación (ej. 25 para 25%)" },
              semana: { type: Type.STRING, description: "Semana en la que ocurre, si se indica (ej. 'Semana 4')" }
            },
            required: ["nombre", "peso"]
          }
        }
      }
    });

    const rawText = response.text || '[]';
    const output = JSON.parse(cleanJsonText(rawText));
    res.json(output);
  } catch (error) {
    console.error('Error in /api/parse-syllabus:', error);
    res.status(500).json({ error: error.message || 'Error analizando el sílabo con IA.' });
  }
});

// Endpoint to parse schedule (horario semanal) from image
app.post('/api/parse-schedule', async (req, res) => {
  try {
    const { imageBase64, mimeType, currentCourses } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'Falta la imagen del horario' });

    const ai = getGeminiClient();
    const cleanMime = sanitizeImageMime(mimeType);

    const imagePart = {
      inlineData: {
        mimeType: cleanMime,
        data: imageBase64,
      },
    };

    let courseListContext = '';
    if (currentCourses && Array.isArray(currentCourses) && currentCourses.length > 0) {
      courseListContext = `Cursos del ciclo del estudiante para referencia y vinculación: ${currentCourses.map(c => `"${c.name}"`).join(', ')}.`;
    }

    const promptText = `Eres un asistente experto analizando y extrayendo horarios universitarios (tablas de matrícula y cronogramas semanales como los de la Universidad de Lima / Ulima, UPC, PUCP, etc.).
Analiza detalladamente esta imagen de horario semanal de clases.
Identifica todos los cursos y todas sus sesiones semanales (días, horas de inicio y fin, aulas).
${courseListContext}

Reglas cruciales de extracción:
1. 'courseName': Nombre limpio, completo y estándar del curso (ej. "Cálculo I", "Álgebra Lineal", "Lenguaje y Comunicación", "Introducción a la Computación", "Filosofía"). 
   - Quita códigos numéricos de sección o prefijos como "6503", "6384", "5100 11", "10".
   - Expande abreviaturas comunes (ej. "LENG.COMUN" -> "Lenguaje y Comunicación", "ÁLGEB.LINE" -> "Álgebra Lineal", "INTROD. CO" -> "Introducción a la Computación").
2. 'section': Código o número de sección si aparece en la celda (ej. "6503", "6511", "5100", "6384") o "" si no tiene.
3. 'sessions': Lista consolidada de bloques horarios para este curso:
   - IMPORTANTE: Si una clase abarca horas consecutivas el mismo día (por ejemplo fila '7-8' y fila '8-9' en Lun para Cálculo I en el aula I1-402), DEBES unirlas en una única sesión con start "07:00" y end "09:00".
   - 'day': String numérico con el día: "1" = Lunes, "2" = Martes, "3" = Miércoles, "4" = Jueves, "5" = Viernes, "6" = Sábado, "7" = Domingo.
   - 'start': Hora de inicio en formato 24h "HH:MM" con dos dígitos (ej. "07:00", "09:00", "11:00", "14:00").
   - 'end': Hora de fin en formato 24h "HH:MM" con dos dígitos (ej. "09:00", "11:00", "13:00", "16:00").
   - 'room': Salón, aula o modalidad si se especifica (ej. "I1-402", "N-206", "VIRTUAL 52", "A1-307", "N-313", "A1-309", "N-211", etc.).

Devuelve el listado estructurado de cursos detectados.`;

    const response = await generateWithFallback(ai, {
      contents: { parts: [imagePart, { text: promptText }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              courseName: { type: Type.STRING, description: "Nombre limpio y legible del curso" },
              section: { type: Type.STRING, description: "Código o número de sección (ej. 6503)" },
              sessions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING, description: "1: Lun, 2: Mar, 3: Mié, 4: Jue, 5: Vie, 6: Sáb, 7: Dom" },
                    start: { type: Type.STRING, description: "Hora de inicio en formato HH:MM (ej. 07:00)" },
                    end: { type: Type.STRING, description: "Hora de fin en formato HH:MM (ej. 09:00)" },
                    room: { type: Type.STRING, description: "Salón o aula (ej. I1-402, VIRTUAL 52)" }
                  },
                  required: ["day", "start", "end"]
                }
              }
            },
            required: ["courseName", "sessions"]
          }
        }
      }
    });

    const rawText = response.text || '[]';
    const output = JSON.parse(cleanJsonText(rawText));
    res.json(output);
  } catch (error) {
    console.error('Error in /api/parse-schedule:', error);
    res.status(500).json({ error: error.message || 'Error analizando el horario con IA.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
