import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json({ limit: '10mb' }));

app.post('/api/parse-syllabus', async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;
    if (!imageBase64) return res.status(400).json({ error: 'Missing imageBase64' });

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const imagePart = {
      inlineData: {
        mimeType: mimeType || 'image/png',
        data: imageBase64,
      },
    };

    const promptText = "Eres un experto leyendo sílabos universitarios. Observa esta imagen y extrae la lista de evaluaciones. Para cada evaluación incluye su 'nombre', su 'peso' como número entero entre 0 y 100 (ej. 25 para 25%), y la 'semana' (opcional, como string, ej. 'Semana 4').";

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
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

    const output = JSON.parse(response.text.trim());
    res.json(output);
  } catch (error) {
    console.error('Error in /api/parse-syllabus:', error);
    res.status(500).json({ error: 'Error analyzing the syllabus.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
