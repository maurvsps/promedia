// ══════════════════════════════════════════════════════════════
//  PROMEDIA - MINIJUEGOS DE CACHIMBO
//  Módulo desacoplado para todos los minijuegos de vida universitaria
// ══════════════════════════════════════════════════════════════

let mgInterval = null;
let mgTimeout = null;

function clearAllMgTimers() {
    if (mgInterval) { clearInterval(mgInterval); mgInterval = null; }
    if (mgTimeout) { clearTimeout(mgTimeout); mgTimeout = null; }
    const ctn = document.getElementById('mgContainer');
    if (ctn && ctn.dataset.moveTimer) {
        clearInterval(parseInt(ctn.dataset.moveTimer));
        delete ctn.dataset.moveTimer;
    }
}

/**
 * Inicia el minijuego correspondiente asegurando que el contexto
 * y la narrativa coincidan al 100% con el evento previo.
 */
function startMinigame(mgType, choiceData) {
    window.currentMgChoice = choiceData;
    
    // Ocultar vista de carta y mostrar contenedor de minijuegos
    const cardView = document.getElementById('gameCardView');
    if (cardView) cardView.style.display = 'none';
    
    const mgView = document.getElementById('gameMinigameView');
    if (mgView) mgView.style.display = 'flex';
    
    const ctn = document.getElementById('mgContainer');
    if (!ctn) return;
    ctn.innerHTML = '';
    clearAllMgTimers();

    const mgEmojiEl = document.getElementById('mgEmoji');
    const mgTitleEl = document.getElementById('mgTitle');
    const mgDescEl = document.getElementById('mgDesc');

    // Contexto del evento previo
    const prevEvent = (typeof currentSimEvent !== 'undefined' && currentSimEvent) ? currentSimEvent : {};
    
    // Título, Emoji y Descripción contextuales sincronizados
    const defaultEmoji = choiceData.mgEmoji || prevEvent.emoji || '🎮';
    const defaultTitle = choiceData.mgTitle || prevEvent.title || 'Desafío Cachimbo';
    const defaultDesc = choiceData.mgDesc || (choiceData.text ? `Opción elegida: "${choiceData.text}". Resuelve el reto antes de que se acabe el tiempo.` : 'Completa el minijuego para obtener el mejor resultado.');

    if (mgEmojiEl) mgEmojiEl.textContent = defaultEmoji;
    if (mgTitleEl) mgTitleEl.textContent = typeof parseGenderText === 'function' ? parseGenderText(defaultTitle) : defaultTitle;
    if (mgDescEl) mgDescEl.textContent = typeof parseGenderText === 'function' ? parseGenderText(defaultDesc) : defaultDesc;

    // ──────────────────────────────────────────
    // 1. SPAM: Tap Frenético (Lucha contra el sueño / Distracción / etc.)
    // ──────────────────────────────────────────
    if (mgType === 'spam') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `¡Reacciona!: ${prevEvent.title}` : '¡Tap Frenético!';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Toca el botón repetidamente 15 veces antes de que se agote el tiempo.';
        
        let taps = 0;
        const targetTaps = 15;
        let timeLeft = 5.0;
        
        ctn.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:320px; margin-bottom:12px;">
                <span id="mgSpamMood" style="font-size:13px; font-weight:800; color:var(--sub);">⚡ ¡Comienza a tocar!</span>
                <span id="mgTimer" style="font-size:22px; font-weight:900; font-variant-numeric: tabular-nums; color:var(--accent);">5.0s</span>
            </div>
            
            <div style="width:100%; max-width:320px; height:12px; background:var(--s2); border:1px solid var(--border); border-radius:10px; margin-bottom:24px; overflow:hidden; padding:2px;">
                <div id="mgBar" style="width:0%; height:100%; border-radius:6px; background:linear-gradient(90deg, var(--accent), #22c55e); transition:width 0.08s ease-out;"></div>
            </div>

            <div style="position:relative; margin-bottom:12px;">
                <button id="mgSpamBtn" class="mg-btn-tactile" style="width:130px; height:130px; border-radius:50%; background:var(--accent); color:var(--accent-text); font-size:32px; font-weight:900; border:4px solid rgba(255,255,255,0.3); box-shadow:0 8px 24px rgba(0,0,0,0.25); display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer;">
                    <span>⚡</span>
                    <span style="font-size:16px; margin-top:-2px; letter-spacing:1px;">¡TAP!</span>
                </button>
            </div>
            
            <div style="font-size:15px; font-weight:800; color:var(--text); margin-top:8px;" id="mgTapCount">0 / ${targetTaps} Toques</div>
        `;
        
        const spamBtn = document.getElementById('mgSpamBtn');
        const barEl = document.getElementById('mgBar');
        const moodEl = document.getElementById('mgSpamMood');
        const tapCountEl = document.getElementById('mgTapCount');
        const timerEl = document.getElementById('mgTimer');
        
        spamBtn.onclick = () => {
            taps++;
            const pct = Math.min(100, (taps / targetTaps) * 100);
            if (barEl) barEl.style.width = pct + '%';
            if (tapCountEl) tapCountEl.textContent = `${taps} / ${targetTaps} Toques`;
            
            if (moodEl) {
                if (taps < 5) {
                    moodEl.textContent = "🔥 ¡Tomando impulso!";
                } else if (taps < 10) {
                    moodEl.textContent = "⚡ ¡Casi a mitad de camino!";
                } else if (taps < 14) {
                    moodEl.textContent = "🚀 ¡Unos toques más!";
                } else {
                    moodEl.textContent = "👑 ¡100% COMPLETADO!";
                }
            }
            
            if (taps >= targetTaps) {
                clearAllMgTimers();
                spamBtn.disabled = true;
                const winMsg = choiceData.winMsg || `¡Excelente! Superaste el desafío de "${prevEvent.title || 'Tap'}" con éxito.`;
                finishMinigame('win', choiceData, winMsg);
            }
        };
        
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 2.0) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                if (spamBtn) spamBtn.disabled = true;
                const loseMsg = choiceData.loseMsg || `Se agotó el tiempo durante "${prevEvent.title || 'el evento'}".`;
                finishMinigame('lose', choiceData, loseMsg);
            }
        }, 100);

    // ──────────────────────────────────────────
    // 2. TIMING: Concentración y Precisión Láser
    // ──────────────────────────────────────────
    } else if (mgType === 'timing') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Precisión: ${prevEvent.title}` : 'Concentración Milimétrica';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Detén el medidor en la Zona Verde (Perfecto) o Zona Amarilla (Aprobado).';
        
        ctn.innerHTML = `
            <div style="width:100%; max-width:340px; margin-bottom:20px;">
                <div style="position:relative; height:42px; background:var(--s2); border-radius:21px; overflow:hidden; border:2px solid var(--border); box-shadow:inset 0 2px 8px rgba(0,0,0,0.2);">
                    <!-- Zones -->
                    <div style="position:absolute; left:0; width:100%; height:100%; background:#ef4444; opacity:0.75;"></div>
                    <div style="position:absolute; left:25%; width:50%; height:100%; background:#eab308; opacity:0.9;"></div>
                    <div style="position:absolute; left:44%; width:12%; height:100%; background:#22c55e; z-index:1; box-shadow:0 0 12px #22c55e;"></div>
                    
                    <!-- Center mark -->
                    <div style="position:absolute; left:50%; top:0; bottom:0; width:2px; background:#fff; z-index:2; opacity:0.8;"></div>
                    
                    <!-- Laser cursor -->
                    <div id="mgLaserCursor" style="position:absolute; left:0%; top:0; width:8px; height:100%; background:#ffffff; box-shadow:0 0 10px #ffffff, 0 0 20px var(--accent); z-index:3; border-radius:4px;"></div>
                </div>
                
                <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:800; margin-top:8px; text-transform:uppercase;">
                    <span style="color:#ef4444;">Fallo</span>
                    <span style="color:#eab308;">Aprobado</span>
                    <span style="color:#22c55e;">¡Perfecto!</span>
                    <span style="color:#eab308;">Aprobado</span>
                    <span style="color:#ef4444;">Fallo</span>
                </div>
            </div>
            
            <button id="mgTimingStopBtn" class="mg-btn-tactile btn btn-accent" style="padding:16px 48px; font-size:20px; font-weight:900; border-radius:50px; letter-spacing:1px; box-shadow:0 8px 24px rgba(0,0,0,0.25);">
                🛑 ¡DETENER AHORA!
            </button>
        `;
        
        let pos = 0;
        let dir = 1;
        let speed = 2.4;
        const cursor = document.getElementById('mgLaserCursor');
        const stopBtn = document.getElementById('mgTimingStopBtn');
        
        mgInterval = setInterval(() => {
            pos += dir * speed;
            if (pos >= 97) { pos = 97; dir = -1; }
            if (pos <= 0) { pos = 0; dir = 1; }
            if (cursor) cursor.style.left = pos + '%';
        }, 16);
        
        stopBtn.onclick = () => {
            clearAllMgTimers();
            stopBtn.disabled = true;
            const p = pos;
            
            if (p >= 44 && p <= 56) {
                if (cursor) {
                    cursor.style.background = '#22c55e';
                    cursor.style.boxShadow = '0 0 24px #22c55e';
                }
                finishMinigame('win', choiceData, `🎯 ¡CLAVADO EN EL CENTRO! Ejecución perfecta en "${prevEvent.title || 'la prueba'}".`);
            } else if (p >= 25 && p <= 75) {
                if (cursor) cursor.style.background = '#eab308';
                finishMinigame('partial', choiceData, '🟡 ¡Salvaste con las justas! Raspando pero suficiente.');
            } else {
                if (cursor) cursor.style.background = '#ef4444';
                finishMinigame('lose', choiceData, '❌ ¡Fuera de rango! Te faltó precisión en el momento clave.');
            }
        };

    // ──────────────────────────────────────────
    // 3. MATH: Cálculo Mental Rápido
    // ──────────────────────────────────────────
    } else if (mgType === 'math') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Cálculo: ${prevEvent.title}` : 'Cálculo Mental Rápido';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Resuelve la operación matemática antes de que se acabe el tiempo.';
        
        const mathType = Math.floor(Math.random() * 4);
        let equationStr = '';
        let correctAns = 0;
        
        if (mathType === 0) {
            const a = Math.floor(Math.random() * 30) + 12;
            const b = Math.floor(Math.random() * 30) + 14;
            correctAns = a + b;
            equationStr = `${a} + ${b} = ?`;
        } else if (mathType === 1) {
            const a = Math.floor(Math.random() * 50) + 30;
            const b = Math.floor(Math.random() * 25) + 11;
            correctAns = a - b;
            equationStr = `${a} - ${b} = ?`;
        } else if (mathType === 2) {
            const a = [6, 7, 8, 9, 12, 15][Math.floor(Math.random() * 6)];
            const b = [4, 6, 7, 8, 9][Math.floor(Math.random() * 5)];
            correctAns = a * b;
            equationStr = `${a} × ${b} = ?`;
        } else {
            const p = [10, 20, 25, 50][Math.floor(Math.random() * 4)];
            const total = [40, 60, 80, 120, 200][Math.floor(Math.random() * 5)];
            correctAns = Math.round((p / 100) * total);
            equationStr = `${p}% de ${total} = ?`;
        }
        
        const offsets = [-3, -2, -1, 1, 2, 3, 4].sort(() => 0.5 - Math.random());
        const optionsSet = new Set([correctAns]);
        for (let off of offsets) {
            if (optionsSet.size < 4 && correctAns + off > 0) {
                optionsSet.add(correctAns + off);
            }
        }
        const options = Array.from(optionsSet).sort(() => 0.5 - Math.random());
        let timeLeft = 6.0;
        
        ctn.innerHTML = `
            <div style="font-size:20px; font-weight:900; margin-bottom:8px; font-variant-numeric: tabular-nums; color:var(--accent);" id="mgTimer">6.0s</div>
            
            <div style="background:var(--s2); border:2px solid var(--border); border-radius:16px; padding:18px 24px; margin-bottom:20px; width:100%; max-width:320px; box-shadow:0 4px 14px rgba(0,0,0,0.1);">
                <div style="font-size:32px; font-weight:900; color:var(--text); letter-spacing:1px;">${equationStr}</div>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; width:100%; max-width:320px;">
                ${options.map(opt => `
                    <button class="mg-btn-tactile mgMathBtn btn" data-val="${opt}" style="padding:16px; font-size:22px; font-weight:900; background:var(--s1); border:2px solid var(--border2); border-radius:14px; color:var(--text); cursor:pointer;">
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;
        
        const timerEl = document.getElementById('mgTimer');
        document.querySelectorAll('.mgMathBtn').forEach(btn => {
            btn.onclick = () => {
                clearAllMgTimers();
                document.querySelectorAll('.mgMathBtn').forEach(b => b.disabled = true);
                const chosen = parseInt(btn.getAttribute('data-val'), 10);
                
                if (chosen === correctAns) {
                    btn.style.background = '#22c55e';
                    btn.style.color = '#fff';
                    btn.style.borderColor = '#22c55e';
                    finishMinigame('win', choiceData, `¡Cálculo perfecto! Resolviste la duda de "${prevEvent.title || 'matemáticas'}".`);
                } else {
                    btn.style.background = '#ef4444';
                    btn.style.color = '#fff';
                    finishMinigame('lose', choiceData, `Respuesta incorrecta (era ${correctAns}). Se te escapó la cuenta.`);
                }
            };
        });
        
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 2.0) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                document.querySelectorAll('.mgMathBtn').forEach(b => b.disabled = true);
                finishMinigame('lose', choiceData, '¡Se acabó el tiempo para resolver la operación!');
            }
        }, 100);

    // ──────────────────────────────────────────
    // 4. MATH2: Ajuste de Presupuesto / Suma Faltante
    // ──────────────────────────────────────────
    } else if (mgType === 'math2') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Cálculo: ${prevEvent.title}` : 'Ajuste de Presupuesto';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Encuentra el monto o cifra que falta para llegar exactamente al objetivo.';
        
        const target = Math.floor(Math.random() * 40) + 50; 
        const current = Math.floor(Math.random() * 30) + 10;
        const diff = target - current;
        
        let answers = [diff, diff + Math.floor(Math.random()*5)+1, diff - Math.floor(Math.random()*5)-1];
        answers.sort(() => Math.random() - 0.5);
        
        let timeLeft = 7.0;
        
        ctn.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:320px; margin-bottom:12px;">
                <span style="font-size:13px; font-weight:800; color:var(--sub);">Objetivo: ${target}</span>
                <span id="mgTimer" style="font-size:22px; font-weight:900; font-variant-numeric: tabular-nums; color:var(--accent);">7.0s</span>
            </div>
            <div style="font-size:28px; font-weight:900; color:var(--text); margin-bottom:20px;">
                ${current} + <span style="color:var(--accent);">?</span> = ${target}
            </div>
            <div style="display:flex; gap:12px; width:100%; justify-content:center;">
                ${answers.map(ans => `
                    <button class="btn btn-secondary mg-btn-tactile" style="flex:1; padding:16px 0; font-size:24px; font-weight:900;" onclick="
                        clearAllMgTimers();
                        if(${ans} === ${diff}) {
                            this.style.background = 'var(--green)';
                            this.style.color = '#fff';
                            finishMinigame('win', window.currentMgChoice, '✅ ¡Cálculo perfecto!');
                        } else {
                            this.style.background = 'var(--red)';
                            this.style.color = '#fff';
                            finishMinigame('lose', window.currentMgChoice, '❌ ¡Cálculo erróneo!');
                        }
                    ">${ans}</button>
                `).join('')}
            </div>
        `;
        
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let timerEl = document.getElementById('mgTimer');
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 3.0) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                finishMinigame('lose', choiceData, '⏱️ Se te acabó el tiempo.');
            }
        }, 100);

    // ──────────────────────────────────────────
    // 5. MEMORY: Secuencia de Memoria Fotográfica
    // ──────────────────────────────────────────
    } else if (mgType === 'memory') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Memoria: ${prevEvent.title}` : 'Memoria Fotográfica';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Memoriza la secuencia de 4 elementos y repítela sin equivocarte.';
        
        const pads = [
            { id: 0, label: 'Aula Virtual', icon: '📘', color: '#2563eb' },
            { id: 1, label: 'Laboratorio', icon: '🟢', color: '#10b981' },
            { id: 2, label: 'Cafetería', icon: '🟠', color: '#f59e0b' },
            { id: 3, label: 'Biblioteca', icon: '🟣', color: '#8b5cf6' }
        ];
        
        const sequence = [];
        for (let i = 0; i < 4; i++) {
            sequence.push(Math.floor(Math.random() * 4));
        }
        
        let playerStep = 0;
        
        ctn.innerHTML = `
            <div id="mgMemStatus" style="font-size:16px; font-weight:800; color:var(--accent); margin-bottom:14px; text-transform:uppercase; letter-spacing:0.5px;">
                👀 Observa la secuencia...
            </div>
            
            <div id="mgMemDots" style="display:flex; gap:8px; justify-content:center; margin-bottom:18px;">
                <span class="mgMemDot" style="width:12px; height:12px; border-radius:6px; background:var(--border2);"></span>
                <span class="mgMemDot" style="width:12px; height:12px; border-radius:6px; background:var(--border2);"></span>
                <span class="mgMemDot" style="width:12px; height:12px; border-radius:6px; background:var(--border2);"></span>
                <span class="mgMemDot" style="width:12px; height:12px; border-radius:6px; background:var(--border2);"></span>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; width:100%; max-width:300px;">
                ${pads.map(p => `
                    <button class="mg-btn-tactile mgPadBtn" id="mgPad_${p.id}" data-id="${p.id}" style="height:90px; border-radius:16px; background:${p.color}; border:3px solid rgba(255,255,255,0.2); box-shadow:0 6px 16px rgba(0,0,0,0.2); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; cursor:not-allowed; opacity:0.8;" disabled>
                        <span style="font-size:28px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));">${p.icon}</span>
                        <span style="font-size:12px; font-weight:800; margin-top:2px;">${p.label}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        let demoIndex = 0;
        const playDemoStep = () => {
            if (demoIndex < sequence.length) {
                const targetPadId = sequence[demoIndex];
                const btn = document.getElementById(`mgPad_${targetPadId}`);
                if (btn) {
                    btn.classList.add('mg-pad-active');
                    setTimeout(() => {
                        btn.classList.remove('mg-pad-active');
                        demoIndex++;
                        mgTimeout = setTimeout(playDemoStep, 350);
                    }, 450);
                }
            } else {
                const statusEl = document.getElementById('mgMemStatus');
                if (statusEl) {
                    statusEl.textContent = '✨ ¡Tu turno! Repite la secuencia';
                    statusEl.style.color = 'var(--green)';
                }
                document.querySelectorAll('.mgPadBtn').forEach(b => {
                    b.disabled = false;
                    b.style.cursor = 'pointer';
                    b.style.opacity = '1';
                });
            }
        };
        
        mgTimeout = setTimeout(playDemoStep, 800);
        
        document.querySelectorAll('.mgPadBtn').forEach(btn => {
            btn.onclick = () => {
                const id = parseInt(btn.getAttribute('data-id'), 10);
                btn.classList.add('mg-pad-active');
                setTimeout(() => btn.classList.remove('mg-pad-active'), 200);
                
                if (id === sequence[playerStep]) {
                    const dots = document.querySelectorAll('.mgMemDot');
                    if (dots[playerStep]) {
                        dots[playerStep].style.background = 'var(--green)';
                        dots[playerStep].style.boxShadow = '0 0 8px var(--green)';
                    }
                    playerStep++;
                    
                    if (playerStep >= sequence.length) {
                        document.querySelectorAll('.mgPadBtn').forEach(b => b.disabled = true);
                        clearAllMgTimers();
                        finishMinigame('win', choiceData, `🧠 ¡Memoria prodigiosa! Recordaste todo para "${prevEvent.title || 'la sesión'}".`);
                    }
                } else {
                    document.querySelectorAll('.mgPadBtn').forEach(b => b.disabled = true);
                    clearAllMgTimers();
                    finishMinigame('lose', choiceData, 'Te confundiste de paso... mente en blanco.');
                }
            };
        });

    // ──────────────────────────────────────────
    // 6. REFLEX: ¡Pasa la Copia / Reflejos Ninja!
    // ──────────────────────────────────────────
    } else if (mgType === 'reflex') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Reflejos: ${prevEvent.title}` : '¡Reflejos de Cachimbo!';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Espera a que el momento sea seguro. ¡NO toques la pantalla antes de tiempo!';
        
        let state = 'waiting';
        let startTime = 0;
        
        ctn.innerHTML = `
            <div id="mgReflexAlert" style="background:rgba(239, 68, 68, 0.15); border:2px solid #ef4444; border-radius:16px; padding:20px; text-align:center; width:100%; max-width:320px; margin-bottom:20px; transition:all 0.2s;">
                <div style="font-size:40px; margin-bottom:8px;" id="mgReflexIcon">👀</div>
                <div style="font-size:16px; font-weight:900; color:#ef4444; text-transform:uppercase;" id="mgReflexStatus">¡EL PROFE ESTÁ MIRANDO!</div>
                <div style="font-size:12px; color:var(--sub); margin-top:4px;" id="mgReflexSub">No toques la pantalla todavía...</div>
            </div>
            
            <button id="mgReflexBtn" class="mg-btn-tactile btn" style="width:100%; max-width:320px; padding:20px; font-size:20px; font-weight:900; border-radius:16px; background:var(--s2); border:2px dashed var(--border); color:var(--muted); cursor:pointer;">
                ⏳ Esperando momento seguro...
            </button>
        `;
        
        const alertBox = document.getElementById('mgReflexAlert');
        const iconEl = document.getElementById('mgReflexIcon');
        const statusEl = document.getElementById('mgReflexStatus');
        const subEl = document.getElementById('mgReflexSub');
        const actionBtn = document.getElementById('mgReflexBtn');
        
        actionBtn.onclick = () => {
            if (state === 'waiting') {
                state = 'finished';
                clearAllMgTimers();
                actionBtn.disabled = true;
                if (alertBox) alertBox.style.background = 'rgba(239, 68, 68, 0.3)';
                if (statusEl) statusEl.textContent = '¡TE PILLARON EN EL ACTO!';
                finishMinigame('lose', choiceData, '¡Te moviste antes de tiempo! Se dieron cuenta de tu acción.');
            } else if (state === 'ready') {
                state = 'finished';
                const reactionMs = Date.now() - startTime;
                clearAllMgTimers();
                actionBtn.disabled = true;
                
                if (reactionMs <= 550) {
                    finishMinigame('win', choiceData, `⚡ ¡Reflejos ninja! Reaccionaste en ${reactionMs}ms.`);
                } else {
                    finishMinigame('lose', choiceData, `Muy lento (${reactionMs}ms). No te dio tiempo suficiente.`);
                }
            }
        };
        
        const randomDelay = Math.floor(Math.random() * 1700) + 1500;
        mgTimeout = setTimeout(() => {
            if (state === 'waiting') {
                state = 'ready';
                startTime = Date.now();
                
                if (alertBox) {
                    alertBox.style.background = 'rgba(34, 197, 94, 0.2)';
                    alertBox.style.borderColor = '#22c55e';
                }
                if (iconEl) iconEl.textContent = '🚀';
                if (statusEl) {
                    statusEl.textContent = '¡¡MOMENTO PERFECTO!!';
                    statusEl.style.color = '#22c55e';
                }
                if (subEl) subEl.textContent = '¡¡TOCA EL BOTÓN AHORA YA!!';
                if (actionBtn) {
                    actionBtn.style.background = '#22c55e';
                    actionBtn.style.borderColor = '#22c55e';
                    actionBtn.style.color = '#ffffff';
                    actionBtn.textContent = '⚡ ¡¡ACTUAR AHORA!! ⚡';
                    actionBtn.style.animation = 'mgPulse 0.5s infinite';
                }
                
                mgTimeout = setTimeout(() => {
                    if (state === 'ready') {
                        state = 'finished';
                        if (actionBtn) actionBtn.disabled = true;
                        finishMinigame('lose', choiceData, 'Demasiado tarde... se te escapó la oportunidad.');
                    }
                }, 650);
            }
        }, randomDelay);

    // ──────────────────────────────────────────
    // 7. TRIVIA: Trivia Ulima & Vida Universitaria
    // ──────────────────────────────────────────
    } else if (mgType === 'trivia') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Trivia: ${prevEvent.title}` : 'Trivia Ulima Relámpago';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Demuestra cuánto conoces de la universidad y sus reglas.';
        
        const triviaQuestions = [
            {
                q: "¿Cuál es la nota mínima aprobatoria final en la Ulima?",
                opts: ["10.5 redondeado a 11", "10.0 exacto", "12.0 obligatorio", "11.5"],
                ans: 0,
                fact: "En la Ulima, el 10.5 sube a 11."
            },
            {
                q: "¿Qué edificio es conocido por su emblemática cafetería y vista central?",
                opts: ["Edificio W / O", "Edificio F", "Edificio B", "Edificio Z"],
                ans: 0,
                fact: "El Edificio W es el corazón social y gastronómico."
            },
            {
                q: "¿Qué significa tener 'BICA' en la universidad?",
                opts: ["Llevar un curso por segunda vez", "Tener dos becas simultáneas", "Aprobar dos veces con 20", "Llevar dos carreras"],
                ans: 0,
                fact: "Bica es matricularte por segunda vez tras desaprobar."
            },
            {
                q: "¿Cuántos créditos comprende un ciclo regular estándar promedio?",
                opts: ["Entre 20 y 22 créditos", "10 créditos", "35 créditos", "15 créditos"],
                ans: 0,
                fact: "Un ciclo regular suele rondar los 20-22 créditos."
            },
            {
                q: "¿Qué sucede si no te presentas a un examen y no justificas?",
                opts: ["Te colocan nota 00", "Se anula el curso", "Te dan otra fecha gratis", "No afecta tu ponderado"],
                ans: 0,
                fact: "La inasistencia injustificada resulta en nota 00."
            },
            {
                q: "¿Cómo se llama el promedio que multiplica tus notas por los créditos de cada curso?",
                opts: ["Ponderado Acumulado", "Promedio Simple", "Mediana Universitaria", "Desviación Estándar"],
                ans: 0,
                fact: "El ponderado pondera el peso de cada crédito."
            },
            {
                q: "¿Qué documento contiene todos los cursos organizados por ciclos de tu carrera?",
                opts: ["Malla Curricular", "Horario Semanal", "Boleta de Pago", "Carnet Universitario"],
                ans: 0,
                fact: "La malla curricular define tu plan de estudios."
            }
        ];
        
        const qData = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
        const correctText = qData.opts[qData.ans];
        const shuffledOpts = qData.opts.map((opt, i) => ({ text: opt, isCorrect: i === qData.ans })).sort(() => 0.5 - Math.random());
        let timeLeft = 7.0;
        
        ctn.innerHTML = `
            <div style="font-size:20px; font-weight:900; margin-bottom:10px; font-variant-numeric: tabular-nums; color:var(--accent);" id="mgTimer">7.0s</div>
            
            <div style="background:var(--s2); border:2px solid var(--border); border-radius:16px; padding:18px 20px; margin-bottom:16px; width:100%; max-width:340px; text-align:left;">
                <div style="font-size:15px; font-weight:800; color:var(--text); line-height:1.4;">${qData.q}</div>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:340px;">
                ${shuffledOpts.map((opt, idx) => `
                    <button class="mg-btn-tactile mgTriviaBtn btn" data-correct="${opt.isCorrect}" style="padding:12px 16px; font-size:14px; font-weight:700; background:var(--s1); border:1.5px solid var(--border2); border-radius:12px; color:var(--text); text-align:left; display:flex; align-items:center; gap:10px; cursor:pointer;">
                        <span style="width:24px; height:24px; border-radius:50%; background:var(--s3); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:900; flex-shrink:0;">${['A','B','C','D'][idx]}</span>
                        <span style="flex:1;">${opt.text}</span>
                    </button>
                `).join('')}
            </div>
        `;
        
        const timerEl = document.getElementById('mgTimer');
        document.querySelectorAll('.mgTriviaBtn').forEach(btn => {
            btn.onclick = () => {
                clearAllMgTimers();
                document.querySelectorAll('.mgTriviaBtn').forEach(b => b.disabled = true);
                const isCorrect = btn.getAttribute('data-correct') === 'true';
                
                if (isCorrect) {
                    btn.style.background = '#22c55e';
                    btn.style.borderColor = '#22c55e';
                    btn.style.color = '#fff';
                    finishMinigame('win', choiceData, `¡Respuesta correcta! ${qData.fact}`);
                } else {
                    btn.style.background = '#ef4444';
                    btn.style.borderColor = '#ef4444';
                    btn.style.color = '#fff';
                    document.querySelectorAll('.mgTriviaBtn').forEach(b => {
                        if (b.getAttribute('data-correct') === 'true') {
                            b.style.borderColor = '#22c55e';
                            b.style.background = 'rgba(34, 197, 94, 0.2)';
                        }
                    });
                    finishMinigame('lose', choiceData, `Incorrecto. Correcta: ${correctText}. ${qData.fact}`);
                }
            };
        });
        
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 2.5) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                document.querySelectorAll('.mgTriviaBtn').forEach(b => b.disabled = true);
                finishMinigame('lose', choiceData, `¡Se acabó el tiempo! La respuesta era: ${correctText}.`);
            }
        }, 100);

    // ──────────────────────────────────────────
    // 8. BALANCE: Equilibrio de Maqueta
    // ──────────────────────────────────────────
    } else if (mgType === 'balance') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Equilibrio: ${prevEvent.title}` : 'Equilibrio de Maqueta';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Mantén el nivel en la zona verde usando los botones laterales durante 5 segundos.';
        
        let tilt = 0;
        let velocity = (Math.random() > 0.5 ? 1 : -1) * 0.8;
        let timeLeft = 5.0;
        
        ctn.innerHTML = `
            <div style="display:flex; justify-content:space-between; width:100%; max-width:320px; margin-bottom:12px;">
                <span id="mgBalanceAngle" style="font-size:13px; font-weight:800; color:var(--text);">Inclinación: 0°</span>
                <span id="mgTimer" style="font-size:20px; font-weight:900; font-variant-numeric: tabular-nums; color:var(--accent);">5.0s</span>
            </div>
            
            <div style="position:relative; width:100%; max-width:320px; height:60px; background:var(--s2); border:2px solid var(--border); border-radius:16px; margin-bottom:20px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                <!-- Safe zone background -->
                <div style="position:absolute; width:40%; height:100%; background:rgba(34, 197, 94, 0.2); border-left:1.5px dashed var(--green); border-right:1.5px dashed var(--green);"></div>
                
                <!-- Tilting platform -->
                <div id="mgBalanceBar" style="width:70%; height:8px; background:var(--text); border-radius:4px; transform:rotate(0deg); transition:transform 0.05s ease-out; position:relative;">
                    <div id="mgBalanceBubble" style="position:absolute; top:-20px; left:calc(50% - 14px); font-size:24px; transition:left 0.05s ease-out;">📦</div>
                </div>
            </div>
            
            <div style="display:flex; gap:16px; width:100%; max-width:320px;">
                <button id="mgBalLeft" class="mg-btn-tactile btn" style="flex:1; padding:16px; font-size:18px; font-weight:900; border-radius:14px; background:var(--s1); border:2px solid var(--border2);">
                    ◀ Ladeo Izq.
                </button>
                <button id="mgBalRight" class="mg-btn-tactile btn" style="flex:1; padding:16px; font-size:18px; font-weight:900; border-radius:14px; background:var(--s1); border:2px solid var(--border2);">
                    Ladeo Der. ▶
                </button>
            </div>
        `;
        
        const barEl = document.getElementById('mgBalanceBar');
        const bubbleEl = document.getElementById('mgBalanceBubble');
        const angleEl = document.getElementById('mgBalanceAngle');
        const timerEl = document.getElementById('mgTimer');
        const leftBtn = document.getElementById('mgBalLeft');
        const rightBtn = document.getElementById('mgBalRight');
        
        leftBtn.onclick = () => { tilt -= 7; velocity -= 0.5; };
        rightBtn.onclick = () => { tilt += 7; velocity += 0.5; };
        
        mgInterval = setInterval(() => {
            if (Math.random() < 0.25) {
                velocity += (Math.random() - 0.5) * 1.6;
            }
            tilt += velocity;
            
            if (barEl) barEl.style.transform = `rotate(${tilt}deg)`;
            if (bubbleEl) {
                const bubbleOffset = Math.max(0, Math.min(100, 50 + (tilt * 1.5)));
                bubbleEl.style.left = `calc(${bubbleOffset}% - 14px)`;
            }
            if (angleEl) {
                angleEl.textContent = `Inclinación: ${Math.round(tilt)}°`;
                angleEl.style.color = Math.abs(tilt) > 15 ? 'var(--red)' : 'var(--green)';
            }
            
            if (Math.abs(tilt) > 28) {
                clearAllMgTimers();
                leftBtn.disabled = true;
                rightBtn.disabled = true;
                finishMinigame('lose', choiceData, '¡Se cayó la maqueta al suelo y se rompió!');
                return;
            }
            
            timeLeft -= 0.05;
            if (timerEl) timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
            
            if (timeLeft <= 0) {
                clearAllMgTimers();
                leftBtn.disabled = true;
                rightBtn.disabled = true;
                finishMinigame('win', choiceData, '¡Mantuviste el equilibrio perfecto!');
            }
        }, 50);

    // ──────────────────────────────────────────
    // 9. WORD: Descifrar el Concepto / Anagrama
    // ──────────────────────────────────────────
    } else if (mgType === 'word') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Palabra Clave: ${prevEvent.title}` : 'Descifra la Palabra Clave';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Ordena las letras para formar el concepto antes de que acabe el tiempo.';
        
        let wordsPool = [
            { word: "TESIS", clue: "Lo que necesitas para graduarte" },
            { word: "MALLA", clue: "El mapa de todos los cursos de tu carrera" },
            { word: "CICLO", clue: "Dura aproximadamente 16 semanas" },
            { word: "NOTAS", clue: "Lo que revisas con nervios al final del ciclo" },
            { word: "PROFE", clue: "El que dicta la cátedra" },
            { word: "BECA", clue: "Premio por tener un ponderado sobresaliente" },
            { word: "CURSO", clue: "Asignatura que matriculas cada semestre" },
            { word: "PARCIAL", clue: "El examen a mitad del semestre" },
            { word: "FINAL", clue: "El examen al terminar el semestre" },
            { word: "REPASO", clue: "Lo que haces un día antes del examen" },
            { word: "CREDITO", clue: "El peso que tiene un curso" },
            { word: "ELECTIVO", clue: "Curso que puedes elegir llevar" },
            { word: "HORARIO", clue: "El dolor de cabeza en cada matrícula" },
            { word: "PABELLON", clue: "Edificio donde tomas clases" },
            { word: "CAMPUS", clue: "El espacio físico de la universidad" },
            { word: "TALLER", clue: "Clase práctica" },
            { word: "ASESORIA", clue: "Ayuda extra con un profesor" },
            { word: "DECANO", clue: "La máxima autoridad de la facultad" },
            { word: "KARDEX", clue: "Tu registro de notas histórico" },
            { word: "SEMINARIO", clue: "Clase magistral especializada" },
            { word: "PRACTICA", clue: "Examen corto durante el ciclo" },
            { word: "SUSTITUTORIO", clue: "La última oportunidad para salvar el curso" },
            { word: "RECTOR", clue: "La máxima autoridad de la universidad" },
            { word: "MATRICULA", clue: "El proceso de inscripción a cursos" },
            { word: "SILABO", clue: "El documento con los temas del curso" },
            { word: "BIBLIOTECA", clue: "Donde vas a estudiar en silencio" },
            { word: "CAFETIN", clue: "Donde vas a comer entre clases" },
            { word: "GRADUACION", clue: "Ceremonia de fin de la carrera" },
            { word: "BACHILLER", clue: "El primer grado académico que obtienes" },
            { word: "LICENCIA", clue: "Permiso para faltar o suspender estudios" },
            { word: "PLAGIO", clue: "Lo que nunca debes hacer en un examen" },
            { word: "PROYECTO", clue: "Trabajo grande del ciclo" }
        ];

        // Contextual word pools for corporate or english events
        if (prevEvent.title && (prevEvent.title.includes('Inglés') || prevEvent.title.includes('Prácticas') || prevEvent.title.includes('Corporación'))) {
            wordsPool = [
                { word: "LEADER", clue: "Líder de equipo o proyecto" },
                { word: "GROWTH", clue: "Crecimiento de la empresa o métricas" },
                { word: "BUDGET", clue: "Presupuesto financiero asignado" },
                { word: "TARGET", clue: "Meta u objetivo fijado" }
            ];
        }
        
        const item = wordsPool[Math.floor(Math.random() * wordsPool.length)];
        const targetWord = item.word;
        const letters = targetWord.split('').sort(() => 0.5 - Math.random());
        let formedWord = [];
        let timeLeft = 15.0;
        
        ctn.innerHTML = `
            <div style="font-size:13px; font-weight:800; color:var(--sub); margin-bottom:6px;">Pista: "${item.clue}"</div>
            <div style="font-size:20px; font-weight:900; margin-bottom:14px; font-variant-numeric: tabular-nums; color:var(--accent);" id="mgTimer">15.0s</div>
            
            <div id="mgWordSlots" style="display:flex; gap:8px; justify-content:center; margin-bottom:20px; min-height:48px;">
                ${targetWord.split('').map(() => `
                    <div class="mgWordSlot" style="width:40px; height:48px; border-bottom:3px solid var(--accent); background:var(--s2); border-radius:8px 8px 0 0; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:900; color:var(--text);"></div>
                `).join('')}
            </div>
            
            <div id="mgLetterBank" style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-bottom:16px; max-width:320px;">
                ${letters.map((char, i) => `
                    <button class="mg-btn-tactile mg-tile-btn" id="mgTile_${i}" data-letter="${char}">${char}</button>
                `).join('')}
            </div>
            
            <button id="mgWordUndo" class="btn" style="padding:8px 18px; font-size:12px; font-weight:800; background:var(--s3); border-radius:20px;">⌫ Borrar última letra</button>
        `;
        
        const timerEl = document.getElementById('mgTimer');
        const updateSlots = () => {
            const slots = document.querySelectorAll('.mgWordSlot');
            slots.forEach((s, idx) => {
                s.textContent = formedWord[idx] ? formedWord[idx].letter : '';
            });
        };
        
        document.querySelectorAll('.mg-tile-btn').forEach(btn => {
            btn.onclick = () => {
                if (formedWord.length < targetWord.length) {
                    const l = btn.getAttribute('data-letter');
                    btn.disabled = true;
                    btn.style.opacity = '0.3';
                    formedWord.push({ letter: l, btnId: btn.id });
                    updateSlots();
                    
                    if (formedWord.length === targetWord.length) {
                        const assembled = formedWord.map(x => x.letter).join('');
                        if (assembled === targetWord) {
                            clearAllMgTimers();
                            finishMinigame('win', choiceData, `¡Descifrado! La palabra era ${targetWord}.`);
                        } else {
                            const slotsCtn = document.getElementById('mgWordSlots');
                            if(slotsCtn) {
                                slotsCtn.style.animation = 'none';
                                void slotsCtn.offsetWidth;
                                slotsCtn.style.animation = 'mgShake 0.3s ease-in-out';
                                const oldColor = slotsCtn.style.color;
                                slotsCtn.style.color = '#ef4444';
                                setTimeout(() => {
                                    if(document.getElementById('mgWordSlots')) {
                                        slotsCtn.style.color = oldColor;
                                        while (formedWord.length > 0) {
                                            const popped = formedWord.pop();
                                            const b = document.getElementById(popped.btnId);
                                            if (b) {
                                                b.disabled = false;
                                                b.style.opacity = '1';
                                            }
                                        }
                                        updateSlots();
                                    }
                                }, 450);
                            }
                        }
                    }
                }
            };
        });
        
        const undoBtn = document.getElementById('mgWordUndo');
        if (undoBtn) {
            undoBtn.onclick = () => {
                if (formedWord.length > 0) {
                    const popped = formedWord.pop();
                    const b = document.getElementById(popped.btnId);
                    if (b) {
                        b.disabled = false;
                        b.style.opacity = '1';
                    }
                    updateSlots();
                }
            };
        }
        
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 3.0) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                finishMinigame('lose', choiceData, `¡Tiempo agotado! La palabra correcta era ${targetWord}.`);
            }
        }, 100);

    // ──────────────────────────────────────────
    // 10. SEQUENCE: Orden Numérico / Poses para la Foto
    // ──────────────────────────────────────────
    } else if (mgType === 'sequence') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Secuencia: ${prevEvent.title}` : 'Orden Numérico';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Toca los números del 1 al 6 en orden ascendente antes de que acabe el tiempo.';
        
        let timeLeft = 6.0;
        let nums = [1,2,3,4,5,6];
        nums.sort(() => Math.random() - 0.5);
        window.mgSeqTarget = 1;
        
        ctn.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:320px; margin-bottom:12px;">
                <span style="font-size:13px; font-weight:800; color:var(--sub);">Siguiente: <span id="mgSeqTarget" style="color:var(--accent); font-weight:900;">1</span></span>
                <span id="mgTimer" style="font-size:22px; font-weight:900; font-variant-numeric: tabular-nums; color:var(--accent);">6.0s</span>
            </div>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; width:100%; max-width:280px; margin:0 auto;">
                ${nums.map(n => `
                    <button class="mg-btn-tactile mgSeqTile" id="mgSeqBtn_${n}" data-num="${n}" style="padding:20px 0; font-size:28px; font-weight:900; border-radius:12px; background:var(--s2); border:1px solid var(--border2); color:var(--text); box-shadow:0 4px 12px rgba(0,0,0,0.1); cursor:pointer;">${n}</button>
                `).join('')}
            </div>
        `;
        
        document.querySelectorAll('.mgSeqTile').forEach(btn => {
            btn.onclick = () => {
                const n = parseInt(btn.getAttribute('data-num'), 10);
                if (n === window.mgSeqTarget) {
                    btn.style.background = 'var(--green)';
                    btn.style.color = '#fff';
                    btn.style.transform = 'scale(0.9)';
                    btn.disabled = true;
                    window.mgSeqTarget++;
                    if (window.mgSeqTarget > 6) {
                        const targetEl = document.getElementById('mgSeqTarget');
                        if (targetEl) targetEl.textContent = 'WIN';
                        clearAllMgTimers();
                        finishMinigame('win', window.currentMgChoice, `✅ ¡Secuencia completada con éxito en "${prevEvent.title || 'el evento'}"!`);
                    } else {
                        const targetEl = document.getElementById('mgSeqTarget');
                        if (targetEl) targetEl.textContent = window.mgSeqTarget;
                    }
                } else {
                    btn.style.background = 'var(--red)';
                    btn.style.color = '#fff';
                    clearAllMgTimers();
                    finishMinigame('lose', window.currentMgChoice, '❌ Te equivocaste de orden.');
                }
            };
        });
        
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let timerEl = document.getElementById('mgTimer');
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 3.0) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                finishMinigame('lose', choiceData, '⏱️ Se te acabó el tiempo.');
            }
        }, 100);

    // ──────────────────────────────────────────
    // 11. TYPING: Mecanografía Rápida
    // ──────────────────────────────────────────
    } else if (mgType === 'typing') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Redactar: ${prevEvent.title}` : 'Mecanografía Rápida';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Escribe la palabra exacta antes de que acabe el tiempo.';
        
        let words = [
            'VELOZ', 'RAPIDO', 'CARRERA', 'TIEMPO', 'RELOJ', 'TECLADO', 'PANTALLA', 
            'MONITOR', 'ESPEJO', 'CRISTAL', 'BOTELLA', 'CAMINO', 'PUERTA', 
            'VENTANA', 'CIUDAD', 'EDIFICIO', 'MAQUINA', 'ENERGIA', 'SISTEMA', 
            'SONIDO', 'MUSICA', 'CUADERNO', 'LIBRERIA', 'MUNDO', 'PLANETA', 
            'ESTRELLA', 'GALAXIA', 'ESPACIO', 'TREN', 'AVION', 'BARCO', 
            'OCEANO', 'DESIERTO', 'BOSQUE', 'MONTANA', 'RIO', 'LAGO', 'NIEVE'
        ];
        if (prevEvent.title && (prevEvent.title.includes('Discurso') || prevEvent.title.includes('Asamblea'))) {
            words = ['DISCURSO', 'PROPUESTA', 'GREMIO', 'DEBATE'];
        } else if (prevEvent.title && (prevEvent.title.includes('Expediente') || prevEvent.title.includes('Foliar'))) {
            words = ['EXPEDIENTE', 'FOLIO', 'SELLO', 'TRAMITE'];
        }
        
        const targetWord = words[Math.floor(Math.random() * words.length)];
        let timeLeft = 6.0;
        
        ctn.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:320px; margin-bottom:12px;">
                <span style="font-size:13px; font-weight:800; color:var(--sub);">Escribe rápido:</span>
                <span id="mgTimer" style="font-size:22px; font-weight:900; font-variant-numeric: tabular-nums; color:var(--accent);">6.0s</span>
            </div>
            <div style="font-size:32px; font-weight:900; color:var(--text); letter-spacing:4px; margin-bottom:16px;">
                ${targetWord}
            </div>
            <input type="text" id="mgTypeInp" style="width:100%; max-width:260px; text-align:center; padding:14px; font-size:22px; font-weight:900; text-transform:uppercase; border-radius:12px; background:var(--bg); border:2px solid var(--border2); color:var(--text); outline:none;" placeholder="Escribe aquí..." autofocus autocomplete="off">
        `;
        
        const inp = document.getElementById('mgTypeInp');
        if (inp) {
            setTimeout(() => inp.focus(), 100);
            inp.oninput = (e) => {
                if (e.target.value.trim().toUpperCase() === targetWord) {
                    clearAllMgTimers();
                    inp.style.borderColor = 'var(--green)';
                    inp.style.color = 'var(--green)';
                    finishMinigame('win', choiceData, `💻 ¡Completado a tiempo para "${prevEvent.title || 'el evento'}"!`);
                }
            };
        }
        
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let timerEl = document.getElementById('mgTimer');
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 2.5) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                finishMinigame('lose', choiceData, '⏱️ Se te acabó el tiempo.');
            }
        }, 100);

    // ──────────────────────────────────────────
    // 12. CONNECT: Conectar Red / Tubería Académica (Basado en Pou Connect)
    // ──────────────────────────────────────────
    } else if (mgType === 'connect') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Conexión: ${prevEvent.title}` : 'Red de Datos Ulima';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Gira las tuberías y nodos tocándolos para conectar el servidor principal (🔌) con el aula (🖥️).';
        
        const gridDefs = [
            { type: 'corner', correct: 180 }, { type: 'straight', correct: 90 }, { type: 'corner', correct: 270 },
            { type: 'straight', correct: 0 },   { type: 'corner', correct: 90 },  { type: 'straight', correct: 180 },
            { type: 'corner', correct: 90 },   { type: 'straight', correct: 90 }, { type: 'corner', correct: 0 }
        ];
        
        let tiles = gridDefs.map(def => {
            const randomOffsets = [90, 180, 270];
            const offset = randomOffsets[Math.floor(Math.random() * randomOffsets.length)];
            return {
                type: def.type,
                correct: def.correct,
                current: (def.correct + offset) % 360
            };
        });
        
        let timeLeft = 12.0;
        
        const renderConnectGrid = () => {
            let html = `
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:280px; margin-bottom:12px;">
                    <span style="font-size:12px; font-weight:800; color:var(--sub);">🔌 Servidor ➔ 🖥️ Aula</span>
                    <span id="mgTimer" style="font-size:20px; font-weight:900; font-variant-numeric: tabular-nums; color:var(--accent);">12.0s</span>
                </div>
                
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; width:100%; max-width:260px; margin:0 auto 16px auto; background:var(--s2); padding:10px; border-radius:16px; border:2px solid var(--border2);">
            `;
            
            tiles.forEach((tile, idx) => {
                let icon = '🔀';
                if (tile.type === 'straight') icon = '║';
                else if (tile.type === 'corner') icon = '╔';
                
                let badge = '';
                if (idx === 0) badge = '<span style="position:absolute; top:2px; left:2px; font-size:10px;">🔌</span>';
                if (idx === 8) badge = '<span style="position:absolute; bottom:2px; right:2px; font-size:10px;">🖥️</span>';
                
                let isCorrect = tile.current === tile.correct;
                let bgCol = isCorrect ? 'rgba(34, 197, 94, 0.15)' : 'var(--s1)';
                let borderCol = isCorrect ? 'var(--green)' : 'var(--border2)';
                
                html += `
                    <button class="mg-btn-tactile mgConnectTile" data-idx="${idx}" style="position:relative; width:72px; height:72px; background:${bgCol}; border:2px solid ${borderCol}; border-radius:12px; font-size:26px; display:flex; align-items:center; justify-content:center; cursor:pointer; transform:rotate(${tile.current}deg); transition:transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;">
                        ${badge}
                        <span style="display:inline-block; transition:transform 0.2s;">${icon}</span>
                    </button>
                `;
            });
            
            html += `</div>`;
            ctn.innerHTML = html;
            
            document.querySelectorAll('.mgConnectTile').forEach(btn => {
                btn.onclick = () => {
                    const i = parseInt(btn.getAttribute('data-idx'), 10);
                    tiles[i].current = (tiles[i].current + 90) % 360;
                    renderConnectGrid();
                    
                    const allSolved = tiles.every(t => t.current === t.correct);
                    if (allSolved) {
                        clearAllMgTimers();
                        finishMinigame('win', choiceData, `⚡ ¡Red conectada con éxito! Servidor y aulas sincronizados.`);
                    }
                };
            });
        };
        
        renderConnectGrid();
        
        const timerEl = document.getElementById('mgTimer');
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 3.0) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                finishMinigame('lose', choiceData, '⏱️ Se acabó el tiempo. La red de la universidad colapsó por desconexión.');
            }
        }, 100);

    // ──────────────────────────────────────────
    // 12. CATCH: ¡Atrapa al Zancudo / Mosca!
    // ──────────────────────────────────────────
    } else if (mgType === 'catch') {
        const itemIcon = choiceData.mgEmoji || prevEvent.emoji || '🦟';
        const rawTitle = choiceData.mgTitle || (prevEvent.title ? `¡Atrapa al Zancudo!: ${prevEvent.title}` : '¡Atrapa al Zancudo!');
        const rawDesc = choiceData.mgDesc || '¡Toca o aplasta al zancudo 🦟 directamente en la pantalla antes de que escape!';
        
        mgTitleEl.textContent = typeof parseGenderText === 'function' ? parseGenderText(rawTitle) : rawTitle;
        mgDescEl.textContent = typeof parseGenderText === 'function' ? parseGenderText(rawDesc) : rawDesc;
        
        let timeLeft = 5.0;
        let isCaught = false;
        
        let posX = 130;
        let posY = 100;
        let vx = (Math.random() > 0.5 ? 1 : -1) * (3.5 + Math.random() * 2);
        let vy = (Math.random() > 0.5 ? 1 : -1) * (3.5 + Math.random() * 2);
        
        ctn.innerHTML = `
            <div style="width:100%; max-width:320px; display:flex; flex-direction:column; align-items:center;">
                <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:8px; font-size:12px; font-weight:800; color:var(--sub);">
                    <span>🎯 ¡TOCA AL ZANCUDO!</span>
                    <span id="mgCatchTimer" style="color:var(--accent); font-weight:900;">5.0s</span>
                </div>
                <div id="mgCatchArena" style="position:relative; width:100%; height:260px; background:radial-gradient(circle, var(--s1) 0%, var(--s2) 100%); border-radius:16px; border:2px solid var(--border2); overflow:hidden; cursor:crosshair; user-select:none; touch-action:none;">
                    <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; pointer-events:none; opacity:0.07; font-size:110px;">✋</div>
                    <div id="mgMosquitoTarget" style="position:absolute; left:${posX}px; top:${posY}px; width:64px; height:64px; display:flex; align-items:center; justify-content:center; font-size:40px; cursor:pointer; transform:translate(-50%, -50%); transition:transform 0.05s ease-out; z-index:10; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
                        ${itemIcon}
                    </div>
                </div>
                <button id="mgSwatBtn" class="btn btn-accent mg-btn-tactile" style="width:100%; margin-top:14px; padding:16px; font-size:18px; font-weight:900; letter-spacing:0.5px;">✋ ¡APLASTAR CON LA MANO!</button>
            </div>
        `;
        
        const arena = document.getElementById('mgCatchArena');
        const target = document.getElementById('mgMosquitoTarget');
        const timerEl = document.getElementById('mgCatchTimer');
        const swatBtn = document.getElementById('mgSwatBtn');
        
        function handleCatchSuccess() {
            if (isCaught) return;
            isCaught = true;
            clearAllMgTimers();
            if (swatBtn) swatBtn.disabled = true;
            if (target) {
                target.innerHTML = '💥';
                target.style.transform = 'translate(-50%, -50%) scale(1.4)';
                target.style.filter = 'drop-shadow(0 0 12px var(--green))';
            }
            if (arena) arena.style.background = 'rgba(34, 197, 94, 0.25)';
            setTimeout(() => {
                finishMinigame('win', choiceData, '🎯 ¡ZAS! ¡Aplastaste al zancudo de un solo manotazo certero!');
            }, 300);
        }
        
        if (target) {
            target.onpointerdown = (e) => {
                e.stopPropagation();
                handleCatchSuccess();
            };
        }
        
        if (arena) {
            arena.onpointerdown = (e) => {
                if (isCaught) return;
                const rect = arena.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;
                const dist = Math.hypot(clickX - posX, clickY - posY);
                if (dist <= 48) {
                    handleCatchSuccess();
                } else {
                    const ripple = document.createElement('div');
                    ripple.style.position = 'absolute';
                    ripple.style.left = `${clickX}px`;
                    ripple.style.top = `${clickY}px`;
                    ripple.style.width = '30px';
                    ripple.style.height = '30px';
                    ripple.style.transform = 'translate(-50%, -50%)';
                    ripple.style.border = '2px solid var(--red)';
                    ripple.style.borderRadius = '50%';
                    ripple.style.pointerEvents = 'none';
                    ripple.style.opacity = '0.8';
                    ripple.style.transition = 'all 0.3s ease-out';
                    arena.appendChild(ripple);
                    setTimeout(() => {
                        ripple.style.transform = 'translate(-50%, -50%) scale(2)';
                        ripple.style.opacity = '0';
                        setTimeout(() => ripple.remove(), 300);
                    }, 10);
                    vx *= 1.15;
                    vy *= 1.15;
                }
            };
        }
        
        if (swatBtn) {
            swatBtn.onclick = () => {
                if (isCaught) return;
                handleCatchSuccess();
            };
        }
        
        mgInterval = setInterval(() => {
            if (isCaught) return;
            timeLeft -= 0.05;
            if (timerEl) timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
            
            posX += vx;
            posY += vy;
            
            if (Math.random() < 0.08) {
                vx = (Math.random() > 0.5 ? 1 : -1) * (3.5 + Math.random() * 3);
                vy = (Math.random() > 0.5 ? 1 : -1) * (3.5 + Math.random() * 3);
            }
            
            const arenaW = arena ? arena.clientWidth : 300;
            const arenaH = arena ? arena.clientHeight : 260;
            const padding = 28;
            
            if (posX <= padding) { posX = padding; vx = Math.abs(vx); }
            if (posX >= arenaW - padding) { posX = arenaW - padding; vx = -Math.abs(vx); }
            if (posY <= padding) { posY = padding; vy = Math.abs(vy); }
            if (posY >= arenaH - padding) { posY = arenaH - padding; vy = -Math.abs(vy); }
            
            if (target) {
                target.style.left = `${posX}px`;
                target.style.top = `${posY}px`;
            }
            
            if (timeLeft <= 0) {
                clearAllMgTimers();
                if (swatBtn) swatBtn.disabled = true;
                if (target) {
                    target.style.transition = 'all 0.5s ease-in';
                    target.style.transform = 'translate(180px, -180px) scale(0.4)';
                    target.style.opacity = '0';
                }
                setTimeout(() => {
                    finishMinigame('lose', choiceData, '🦟 ¡Bzzzz! El zancudo te picó y se escapó volando.');
                }, 400);
            }
        }, 50);

    // ──────────────────────────────────────────
    // 13. LUCK: Prueba de Suerte / Sorteo
    // ──────────────────────────────────────────
    } else if (mgType === 'luck') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Suerte: ${prevEvent.title}` : 'Prueba de Suerte';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Elige una de las 3 cajas misteriosas para descubrir tu suerte.';
        
        const winningIndex = Math.floor(Math.random() * 3);
        
        ctn.innerHTML = `
            <div style="display:flex; gap:16px; justify-content:center; margin-top:20px;">
                ${[0,1,2].map(i => `
                    <div class="mg-btn-tactile" id="mgLuckBox_${i}" style="width:84px; height:84px; background:var(--s2); border:2px solid var(--border2); border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:36px; cursor:pointer;" onclick="
                        if(${i} === ${winningIndex}) {
                            this.style.background = 'var(--green)';
                            this.textContent = '🎉';
                            finishMinigame('win', window.currentMgChoice, '✅ ¡La suerte estuvo de tu lado!');
                        } else {
                            this.style.background = 'var(--red)';
                            this.textContent = '💣';
                            finishMinigame('lose', window.currentMgChoice, '❌ ¡Mala suerte esta vez!');
                        }
                    ">🎁</div>
                `).join('')}
            </div>
        `;

    // ──────────────────────────────────────────
    // 14. INTRUDER: Buscar el Objeto Intruso / Llaves
    // ──────────────────────────────────────────
    } else if (mgType === 'intruder') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Búsqueda: ${prevEvent.title}` : 'Buscar Objeto Oculto';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Encuentra y toca el objeto correcto entre todos los distractores antes de que se acabe el tiempo.';
        
        const targetIcon = choiceData.mgEmoji || '🔑';
        const distractorIcons = ['📚', '🏢', '🎒', '🔒', '📱', '🖊️'];
        let gridItems = [];
        for (let i = 0; i < 15; i++) {
            gridItems.push({ icon: distractorIcons[Math.floor(Math.random() * distractorIcons.length)], isTarget: false });
        }
        gridItems.push({ icon: targetIcon, isTarget: true });
        gridItems.sort(() => Math.random() - 0.5);
        
        let timeLeft = 6.0;
        
        ctn.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:320px; margin-bottom:12px;">
                <span style="font-size:13px; font-weight:800; color:var(--sub);">Busca: <span style="font-size:18px;">${targetIcon}</span></span>
                <span id="mgTimer" style="font-size:22px; font-weight:900; font-variant-numeric: tabular-nums; color:var(--accent);">6.0s</span>
            </div>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; width:100%; max-width:300px; margin:0 auto;">
                ${gridItems.map((item, idx) => `
                    <button class="mg-btn-tactile mgIntruderBtn" data-target="${item.isTarget}" style="width:60px; height:60px; font-size:26px; border-radius:12px; background:var(--s2); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; cursor:pointer;">
                        ${item.icon}
                    </button>
                `).join('')}
            </div>
        `;
        
        document.querySelectorAll('.mgIntruderBtn').forEach(btn => {
            btn.onclick = () => {
                const isTarget = btn.getAttribute('data-target') === 'true';
                clearAllMgTimers();
                if (isTarget) {
                    btn.style.background = 'var(--green)';
                    finishMinigame('win', choiceData, `🎯 ¡Lo encontraste justo a tiempo para "${prevEvent.title || 'el evento'}"!`);
                } else {
                    btn.style.background = 'var(--red)';
                    finishMinigame('lose', choiceData, '❌ ¡Tocaste el objeto equivocado!');
                }
            };
        });
        
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let timerEl = document.getElementById('mgTimer');
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 2.5) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                finishMinigame('lose', choiceData, '⏱️ Se te acabó el tiempo buscando.');
            }
        }, 100);

    // ──────────────────────────────────────────
    // 15. ORDER_STEPS: Trámite de Reclamo / Pasos Secuenciales
    // ──────────────────────────────────────────
    } else if (mgType === 'order_steps') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title ? `Trámite: ${prevEvent.title}` : 'Trámite Administrativo';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Toca los pasos en el orden lógico correcto para que el sistema procese tu solicitud.';
        
        const steps = [
            { id: 1, text: "1. Llenar la solicitud en línea" },
            { id: 2, text: "2. Adjuntar evidencias académicas" },
            { id: 3, text: "3. Validar con Mesa de Partes" },
            { id: 4, text: "4. Confirmar resolución formal" }
        ];
        
        let shuffled = [...steps].sort(() => Math.random() - 0.5);
        let currentStep = 1;
        let timeLeft = 8.0;
        
        ctn.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; width:100%; max-width:340px; margin-bottom:12px;">
                <span style="font-size:13px; font-weight:800; color:var(--sub);">Paso requerido: <span id="mgStepReq" style="color:var(--accent); font-weight:900;">1</span> de 4</span>
                <span id="mgTimer" style="font-size:22px; font-weight:900; font-variant-numeric: tabular-nums; color:var(--accent);">8.0s</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:340px;">
                ${shuffled.map(s => `
                    <button class="mg-btn-tactile mgStepBtn btn" data-step="${s.id}" style="padding:12px 16px; font-size:14px; font-weight:800; background:var(--s1); border:1.5px solid var(--border2); border-radius:12px; color:var(--text); text-align:left; cursor:pointer;">
                        ${s.text}
                    </button>
                `).join('')}
            </div>
        `;
        
        document.querySelectorAll('.mgStepBtn').forEach(btn => {
            btn.onclick = () => {
                const s = parseInt(btn.getAttribute('data-step'), 10);
                if (s === currentStep) {
                    btn.style.background = 'var(--green)';
                    btn.style.color = '#fff';
                    btn.disabled = true;
                    currentStep++;
                    const reqEl = document.getElementById('mgStepReq');
                    if (reqEl) reqEl.textContent = currentStep <= 4 ? currentStep : 'OK';
                    
                    if (currentStep > 4) {
                        clearAllMgTimers();
                        finishMinigame('win', choiceData, `✅ ¡Trámite aprobado exitosamente para "${prevEvent.title || 'el reclamo'}"!`);
                    }
                } else {
                    btn.style.background = 'var(--red)';
                    btn.style.color = '#fff';
                    clearAllMgTimers();
                    finishMinigame('lose', choiceData, '❌ Saltaste pasos obligatorios del procedimiento.');
                }
            };
        });
        
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let timerEl = document.getElementById('mgTimer');
            if (timerEl) {
                timerEl.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
                if (timeLeft <= 3.0) timerEl.style.color = 'var(--red)';
            }
            if (timeLeft <= 0) {
                clearAllMgTimers();
                finishMinigame('lose', choiceData, '⏱️ Se te acabó el plazo para el trámite.');
            }
        }, 100);

    // ──────────────────────────────────────────
    // 16. RPS: Piedra, Papel o Tijeras
    // ──────────────────────────────────────────
    } else if (mgType === 'rps') {
        if (!choiceData.mgTitle) mgTitleEl.textContent = prevEvent.title || 'Piedra, Papel o Tijeras';
        if (!choiceData.mgDesc) mgDescEl.textContent = 'Gánale al sistema. Tienes 5 segundos.';
        const moves = ['✊', '✋', '✌️'];
        let timeLeft = 5.0;
        
        ctn.innerHTML = `
            <div style="font-size:13px; font-weight:800; color:var(--sub); margin-bottom:12px;">Tiempo: <span id="mgTimer" style="color:var(--accent);">5.0s</span></div>
            <div style="display:flex; justify-content:center; gap:16px;">
                ${moves.map(m => `<button class="mg-btn-tactile btn" style="font-size:32px; padding:12px; border-radius:12px; background:var(--s2);" onclick="
                    clearAllMgTimers();
                    const cpu = ['✊','✋','✌️'][Math.floor(Math.random()*3)];
                    let res = 'lose'; let msg = 'Empate o Perdiste contra ' + cpu;
                    if ('${m}' === '✊' && cpu === '✌️' || '${m}' === '✋' && cpu === '✊' || '${m}' === '✌️' && cpu === '✋') {
                        res = 'win'; msg = '¡Ganaste contra ' + cpu + '!';
                    }
                    finishMinigame(res, window.currentMgChoice, msg);
                ">${m}</button>`).join('')}
            </div>
        `;
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let tel = document.getElementById('mgTimer');
            if(tel) tel.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
            if(timeLeft <= 0) { clearAllMgTimers(); finishMinigame('lose', choiceData, '⏱️ Se te acabó el tiempo.'); }
        }, 100);

    // ──────────────────────────────────────────
    // 17. COIN_FLIP: Cara o Sello
    // ──────────────────────────────────────────
    } else if (mgType === 'coin_flip') {
        mgTitleEl.textContent = 'Cara o Sello';
        mgDescEl.textContent = 'La suerte decide.';
        ctn.innerHTML = `
            <div style="display:flex; justify-content:center; gap:16px;">
                <button class="mg-btn-tactile btn" style="padding:16px; font-size:16px; background:var(--s1);" onclick="
                    const res = Math.random() > 0.5;
                    finishMinigame(res ? 'win' : 'lose', window.currentMgChoice, res ? '¡Salió a tu favor!' : 'Salió en contra.');
                ">🪙 Cara</button>
                <button class="mg-btn-tactile btn" style="padding:16px; font-size:16px; background:var(--s1);" onclick="
                    const res = Math.random() > 0.5;
                    finishMinigame(res ? 'win' : 'lose', window.currentMgChoice, res ? '¡Salió a tu favor!' : 'Salió en contra.');
                ">🪙 Sello</button>
            </div>
        `;

    // ──────────────────────────────────────────
    // 18. ROULETTE: Ruleta rápida
    // ──────────────────────────────────────────
    } else if (mgType === 'roulette') {
        mgTitleEl.textContent = 'Ruleta';
        mgDescEl.textContent = 'Toca DETENER cuando la ruleta marque 🎯.';
        const slots = ['❌', '❌', '🎯', '❌', '❌', '🟡'];
        let idx = 0;
        ctn.innerHTML = `
            <div id="rlSlot" style="font-size:64px; text-align:center; margin-bottom:16px; animation:mgPulse 0.5s infinite alternate;">❌</div>
            <button class="btn btn-accent mg-btn-tactile" style="width:100%; padding:16px; font-size:20px;" onclick="
                clearAllMgTimers();
                const v = document.getElementById('rlSlot').textContent;
                if(v === '🎯') finishMinigame('win', window.currentMgChoice, '¡Le diste al centro!');
                else if(v === '🟡') finishMinigame('partial', window.currentMgChoice, 'Casi...');
                else finishMinigame('lose', window.currentMgChoice, 'Fallaste.');
            ">DETENER</button>
        `;
        mgInterval = setInterval(() => {
            idx = (idx + 1) % slots.length;
            let el = document.getElementById('rlSlot');
            if(el) el.textContent = slots[idx];
        }, 150);

    // ──────────────────────────────────────────
    // 19. COLOR_MATCH: Reflejo de colores
    // ──────────────────────────────────────────
    } else if (mgType === 'color_match') {
        mgTitleEl.textContent = 'Reflejo de Colores';
        mgDescEl.textContent = 'Toca el color con el que está ESCRITA la palabra, NO lo que dice.';
        const colors = [{n:'ROJO', c:'#ef4444', v:'red'}, {n:'VERDE', c:'#22c55e', v:'green'}, {n:'AZUL', c:'#3b82f6', v:'blue'}];
        const textObj = colors[Math.floor(Math.random()*colors.length)];
        const colObj = colors[Math.floor(Math.random()*colors.length)];
        let timeLeft = 4.0;
        
        ctn.innerHTML = `
            <div style="font-size:13px; font-weight:800; color:var(--sub); margin-bottom:12px;">Tiempo: <span id="mgTimer" style="color:var(--accent);">4.0s</span></div>
            <div style="font-size:36px; font-weight:900; color:${colObj.c}; margin-bottom:20px; text-align:center;">${textObj.n}</div>
            <div style="display:flex; justify-content:center; gap:8px;">
                ${colors.map(c => `<button class="mg-btn-tactile btn" style="width:70px; height:70px; background:${c.c}; border-radius:12px;" onclick="
                    clearAllMgTimers();
                    if('${c.v}' === '${colObj.v}') finishMinigame('win', window.currentMgChoice, '¡Correcto!');
                    else finishMinigame('lose', window.currentMgChoice, 'Equivocado.');
                "></button>`).join('')}
            </div>
        `;
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let tel = document.getElementById('mgTimer');
            if(tel) tel.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
            if(timeLeft <= 0) { clearAllMgTimers(); finishMinigame('lose', choiceData, '⏱️ Tiempo agotado.'); }
        }, 100);

    // ──────────────────────────────────────────
    // 20. QUIZ: Trivia
    // ──────────────────────────────────────────
    } else if (mgType === 'quiz') {
        mgTitleEl.textContent = 'Cultura Universitaria';
        mgDescEl.textContent = 'Responde correctamente rápido.';
        const questions = [
            { q: "¿En qué ciclo se lleva generalmente Tesis?", a: ["10mo", "1ero", "5to", "8vo"], c: 0 },
            { q: "¿Qué significa CEUL?", a: ["Centro de Estudiantes", "Comité de Evaluación", "Club Estudiantil", "Centro de Extensiones"], c: 0 },
            { q: "¿Cuál es la nota mínima aprobatoria?", a: ["11", "10", "13", "14"], c: 0 }
        ];
        const q = questions[Math.floor(Math.random()*questions.length)];
        let timeLeft = 6.0;
        
        ctn.innerHTML = `
            <div style="font-size:13px; font-weight:800; color:var(--sub); margin-bottom:12px;">Tiempo: <span id="mgTimer" style="color:var(--accent);">6.0s</span></div>
            <div style="font-size:16px; font-weight:800; margin-bottom:16px;">${q.q}</div>
            <div style="display:flex; flex-direction:column; gap:8px;">
                ${q.a.map((ans, i) => `<button class="mg-btn-tactile btn" style="padding:10px; background:var(--s1);" onclick="
                    clearAllMgTimers();
                    if(${i} === ${q.c}) finishMinigame('win', window.currentMgChoice, '¡Respuesta correcta!');
                    else finishMinigame('lose', window.currentMgChoice, 'Respuesta incorrecta.');
                ">${ans}</button>`).join('')}
            </div>
        `;
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let tel = document.getElementById('mgTimer');
            if(tel) tel.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
            if(timeLeft <= 0) { clearAllMgTimers(); finishMinigame('lose', choiceData, '⏱️ Tiempo agotado.'); }
        }, 100);

    // ──────────────────────────────────────────
    // 21. MATH_SEQUENCE
    // ──────────────────────────────────────────
    } else if (mgType === 'math_sequence') {
        mgTitleEl.textContent = 'Secuencia Lógica';
        mgDescEl.textContent = 'Encuentra el número que falta.';
        const sequences = [
            { s: "2, 4, 8, ?", a: [16, 10, 12, 14], c: 16 },
            { s: "1, 1, 2, 3, 5, ?", a: [8, 6, 7, 9], c: 8 },
            { s: "10, 7, 4, ?", a: [1, 0, 2, 3], c: 1 }
        ];
        const sq = sequences[Math.floor(Math.random()*sequences.length)];
        let timeLeft = 8.0;
        
        ctn.innerHTML = `
            <div style="font-size:13px; font-weight:800; color:var(--sub); margin-bottom:12px;">Tiempo: <span id="mgTimer" style="color:var(--accent);">8.0s</span></div>
            <div style="font-size:24px; font-weight:900; margin-bottom:16px; letter-spacing:2px; text-align:center;">${sq.s}</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                ${sq.a.map((ans) => `<button class="mg-btn-tactile btn" style="padding:12px; font-size:18px; background:var(--s1);" onclick="
                    clearAllMgTimers();
                    if(${ans} === ${sq.c}) finishMinigame('win', window.currentMgChoice, '¡Correcto!');
                    else finishMinigame('lose', window.currentMgChoice, 'Error.');
                ">${ans}</button>`).join('')}
            </div>
        `;
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let tel = document.getElementById('mgTimer');
            if(tel) tel.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
            if(timeLeft <= 0) { clearAllMgTimers(); finishMinigame('lose', choiceData, '⏱️ Tiempo agotado.'); }
        }, 100);

    // ──────────────────────────────────────────
    // 22. REACTION
    // ──────────────────────────────────────────
    } else if (mgType === 'reaction') {
        mgTitleEl.textContent = 'Reflejos';
        mgDescEl.textContent = 'Espera a que el botón se ponga VERDE y tócalo lo más rápido que puedas.';
        let state = 'waiting'; // waiting, ready, done
        let waitTime = 1000 + Math.random() * 2000;
        
        ctn.innerHTML = `
            <button id="reacBtn" class="mg-btn-tactile btn" style="width:100%; height:120px; font-size:24px; background:var(--red); color:#fff; transition:none;" onclick="
                if(window.reacState === 'done') return;
                if(window.reacState === 'waiting') {
                    window.reacState = 'done';
                    clearAllMgTimers();
                    finishMinigame('lose', window.currentMgChoice, '¡Demasiado pronto!');
                } else if(window.reacState === 'ready') {
                    window.reacState = 'done';
                    clearAllMgTimers();
                    finishMinigame('win', window.currentMgChoice, '¡Excelente reacción!');
                }
            ">ESPERA...</button>
        `;
        window.reacState = 'waiting';
        mgTimeout = setTimeout(() => {
            if(window.reacState !== 'waiting') return;
            window.reacState = 'ready';
            const btn = document.getElementById('reacBtn');
            if(btn) { btn.style.background = 'var(--green)'; btn.textContent = '¡AHORA!'; }
            mgTimeout2 = setTimeout(() => {
                if(window.reacState !== 'ready') return;
                window.reacState = 'done';
                finishMinigame('lose', choiceData, 'Demasiado lento.');
            }, 600); // 600ms window
        }, waitTime);

    // ──────────────────────────────────────────
    // 23. SLIDER_CENTER
    // ──────────────────────────────────────────
    } else if (mgType === 'slider_center') {
        mgTitleEl.textContent = 'Precisión';
        mgDescEl.textContent = 'Mueve el control para que quede exactamente en el centro (50) y presiona Confirmar.';
        let timeLeft = 6.0;
        
        ctn.innerHTML = `
            <div style="font-size:13px; font-weight:800; color:var(--sub); margin-bottom:12px;">Tiempo: <span id="mgTimer" style="color:var(--accent);">6.0s</span></div>
            <input type="range" id="mgSlider" min="0" max="100" value="0" style="width:100%; margin-bottom:20px; height:20px;">
            <button class="btn btn-accent mg-btn-tactile" style="width:100%; padding:16px;" onclick="
                clearAllMgTimers();
                const val = parseInt(document.getElementById('mgSlider').value, 10);
                if(Math.abs(val - 50) <= 5) finishMinigame('win', window.currentMgChoice, '¡Precisión perfecta!');
                else if(Math.abs(val - 50) <= 15) finishMinigame('partial', window.currentMgChoice, 'Aceptable.');
                else finishMinigame('lose', window.currentMgChoice, 'Muy desviado.');
            ">CONFIRMAR</button>
        `;
        mgInterval = setInterval(() => {
            timeLeft -= 0.1;
            let tel = document.getElementById('mgTimer');
            if(tel) tel.textContent = Math.max(0, timeLeft).toFixed(1) + 's';
            if(timeLeft <= 0) { clearAllMgTimers(); finishMinigame('lose', choiceData, '⏱️ Tiempo agotado.'); }
        }, 100);

    // ──────────────────────────────────────────
    // 24. PUMP
    // ──────────────────────────────────────────
    } else if (mgType === 'pump') {
        mgTitleEl.textContent = 'Inflar Globo';
        mgDescEl.textContent = 'Presiona BOMBEAR varias veces para llenar la barra sin pasarte del 100%.';
        let val = 0;
        ctn.innerHTML = `
            <div style="width:100%; height:30px; background:var(--bg); border:2px solid var(--border2); border-radius:15px; overflow:hidden; margin-bottom:16px; position:relative;">
                <div id="pumpBar" style="width:0%; height:100%; background:var(--accent); transition:width 0.1s;"></div>
                <div style="position:absolute; right:10px; top:4px; font-size:12px; font-weight:900; color:var(--text);">META 90-100%</div>
            </div>
            <div style="display:flex; gap:8px;">
                <button class="btn mg-btn-tactile" style="flex:1; padding:16px; background:var(--s1);" onclick="
                    window.pumpVal = (window.pumpVal || 0) + 12 + Math.random()*8;
                    const el = document.getElementById('pumpBar');
                    if(el) el.style.width = window.pumpVal + '%';
                    if(window.pumpVal > 100) {
                        clearAllMgTimers();
                        finishMinigame('lose', window.currentMgChoice, '💥 ¡El globo explotó!');
                    }
                ">BOMBEAR</button>
                <button class="btn btn-accent mg-btn-tactile" style="flex:1; padding:16px;" onclick="
                    clearAllMgTimers();
                    if(window.pumpVal >= 85 && window.pumpVal <= 100) finishMinigame('win', window.currentMgChoice, '¡Perfecto!');
                    else finishMinigame('lose', window.currentMgChoice, 'Faltó aire.');
                ">LISTO</button>
            </div>
        `;
        window.pumpVal = 0;

    // ──────────────────────────────────────────
    // 25. DODGE: Esquivar Peatones / Tráfico
    // ──────────────────────────────────────────
    } else if (mgType === 'dodge') {
        const isF = (typeof simGame !== 'undefined' && simGame && simGame.gender === 'F');
        const playerEmoji = isF ? '🏃‍♀️' : '🏃‍♂️';
        const rawTitle = choiceData.mgTitle || (prevEvent.title ? `Esquivar: ${prevEvent.title}` : 'Esquivar Tráfico y Peatones');
        const rawDesc = choiceData.mgDesc || 'Cambia de carril para esquivar a los peatones en la acera y llegar a tiempo.';
        
        mgTitleEl.textContent = typeof parseGenderText === 'function' ? parseGenderText(rawTitle) : rawTitle;
        mgDescEl.textContent = typeof parseGenderText === 'function' ? parseGenderText(rawDesc) : rawDesc;
        
        let playerLane = 1; // 0: Izq, 1: Centro, 2: Der
        let lives = 3;
        let progress = 0;
        let isFinished = false;
        let obstacles = [];
        let nextObstacleId = 1;
        let spawnCooldown = 0;
        
        const pedestrianPool = ['🚶‍♂️', '🚶‍♀️', '👴', '🛵', '🐕', '🛴', '🚖', '🧑‍🦯', '📦'];
        
        ctn.innerHTML = `
            <div style="width:100%; max-width:320px; display:flex; flex-direction:column; align-items:center;">
                <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:8px; font-size:12px; font-weight:800;">
                    <span id="mgDodgeLives" style="color:var(--red);">❤️❤️❤️</span>
                    <span id="mgDodgeProgress" style="color:var(--accent); font-weight:900;">📍 Campus: 0%</span>
                </div>
                
                <div style="width:100%; height:6px; background:var(--border2); border-radius:3px; overflow:hidden; margin-bottom:8px;">
                    <div id="mgDodgeProgressBar" style="width:0%; height:100%; background:var(--accent); transition:width 0.1s linear;"></div>
                </div>
                
                <div id="mgDodgeArena" style="position:relative; width:100%; height:270px; background:var(--bg); border:2px solid var(--border); border-radius:16px; overflow:hidden; display:flex;">
                    <div id="mgLane0" style="flex:1; height:100%; border-right:1px dashed var(--border2); cursor:pointer; position:relative;"></div>
                    <div id="mgLane1" style="flex:1; height:100%; border-right:1px dashed var(--border2); cursor:pointer; position:relative;"></div>
                    <div id="mgLane2" style="flex:1; height:100%; cursor:pointer; position:relative;"></div>
                    
                    <div id="mgDodgePlayer" style="position:absolute; bottom:12px; left:50%; transform:translateX(-50%); font-size:34px; transition:left 0.15s cubic-bezier(0.2, 0.8, 0.3, 1); z-index:10; pointer-events:none;">
                        ${playerEmoji}
                    </div>
                </div>
                
                <div style="display:flex; gap:10px; width:100%; margin-top:12px;">
                    <button id="mgBtnLeft" class="btn btn-secondary mg-btn-tactile" style="flex:1; padding:14px; font-size:15px; font-weight:900;">⬅️ IZQUIERDA</button>
                    <button id="mgBtnRight" class="btn btn-secondary mg-btn-tactile" style="flex:1; padding:14px; font-size:15px; font-weight:900;">DERECHA ➡️</button>
                </div>
            </div>
        `;
        
        const playerEl = document.getElementById('mgDodgePlayer');
        const livesEl = document.getElementById('mgDodgeLives');
        const progressEl = document.getElementById('mgDodgeProgress');
        const progressBarEl = document.getElementById('mgDodgeProgressBar');
        const arenaEl = document.getElementById('mgDodgeArena');
        
        function updatePlayerPosition() {
            if (!playerEl) return;
            const lanePercents = [16.66, 50, 83.33];
            playerEl.style.left = `${lanePercents[playerLane]}%`;
        }
        
        function moveLeft() {
            if (isFinished || playerLane <= 0) return;
            playerLane--;
            updatePlayerPosition();
        }
        function moveRight() {
            if (isFinished || playerLane >= 2) return;
            playerLane++;
            updatePlayerPosition();
        }
        
        const bLeft = document.getElementById('mgBtnLeft');
        const bRight = document.getElementById('mgBtnRight');
        if (bLeft) bLeft.onclick = moveLeft;
        if (bRight) bRight.onclick = moveRight;
        
        const l0 = document.getElementById('mgLane0');
        const l1 = document.getElementById('mgLane1');
        const l2 = document.getElementById('mgLane2');
        if (l0) l0.onclick = () => { playerLane = 0; updatePlayerPosition(); };
        if (l1) l1.onclick = () => { playerLane = 1; updatePlayerPosition(); };
        if (l2) l2.onclick = () => { playerLane = 2; updatePlayerPosition(); };
        
        const keyHandler = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') moveLeft();
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') moveRight();
        };
        window.addEventListener('keydown', keyHandler);
        
        mgInterval = setInterval(() => {
            if (isFinished) return;
            
            progress += 0.8;
            if (progressEl) progressEl.textContent = `📍 Campus: ${Math.min(100, Math.round(progress))}%`;
            if (progressBarEl) progressBarEl.style.width = `${Math.min(100, progress)}%`;
            
            spawnCooldown++;
            if (spawnCooldown >= 13 && progress < 92) {
                spawnCooldown = 0;
                const occupiedLane = Math.floor(Math.random() * 3);
                const obsEmoji = pedestrianPool[Math.floor(Math.random() * pedestrianPool.length)];
                
                const obsEl = document.createElement('div');
                obsEl.id = `mgObs_${nextObstacleId}`;
                obsEl.textContent = obsEmoji;
                obsEl.style.position = 'absolute';
                obsEl.style.top = '-40px';
                obsEl.style.fontSize = '30px';
                obsEl.style.pointerEvents = 'none';
                obsEl.style.zIndex = '5';
                obsEl.style.transform = 'translateX(-50%)';
                
                const lanePercents = [16.66, 50, 83.33];
                obsEl.style.left = `${lanePercents[occupiedLane]}%`;
                
                if (arenaEl) arenaEl.appendChild(obsEl);
                
                obstacles.push({
                    id: nextObstacleId++,
                    lane: occupiedLane,
                    y: -10,
                    el: obsEl
                });
            }
            
            for (let i = obstacles.length - 1; i >= 0; i--) {
                const obs = obstacles[i];
                obs.y += 3.8;
                if (obs.el) obs.el.style.top = `${obs.y}%`;
                
                if (obs.y >= 74 && obs.y <= 90 && obs.lane === playerLane) {
                    obs.el.remove();
                    obstacles.splice(i, 1);
                    lives--;
                    
                    if (livesEl) {
                        livesEl.textContent = '❤️'.repeat(Math.max(0, lives)) + '🖤'.repeat(Math.max(0, 3 - lives));
                    }
                    
                    if (playerEl) {
                        playerEl.style.filter = 'drop-shadow(0 0 12px var(--red))';
                        playerEl.style.transform = 'translateX(-50%) scale(1.3) rotate(-15deg)';
                        setTimeout(() => {
                            if (playerEl) {
                                playerEl.style.filter = 'none';
                                playerEl.style.transform = 'translateX(-50%) scale(1) rotate(0deg)';
                            }
                        }, 200);
                    }
                    
                    if (lives <= 0) {
                        isFinished = true;
                        window.removeEventListener('keydown', keyHandler);
                        clearAllMgTimers();
                        finishMinigame('lose', choiceData, '💥 Chocaste con demasiada gente en la acera y se te hizo tardísimo.');
                        return;
                    }
                    continue;
                }
                
                if (obs.y > 105) {
                    if (obs.el) obs.el.remove();
                    obstacles.splice(i, 1);
                }
            }
            
            if (progress >= 100) {
                isFinished = true;
                window.removeEventListener('keydown', keyHandler);
                clearAllMgTimers();
                if (playerEl) {
                    playerEl.style.filter = 'drop-shadow(0 0 14px var(--green))';
                    playerEl.style.transform = 'translateX(-50%) scale(1.4)';
                }
                setTimeout(() => {
                    finishMinigame('win', choiceData, '🏁 ¡Llegaste corriendo al campus justo antes de que cierren la puerta del aula!');
                }, 300);
            }
        }, 50);

    // Fallback genérico para cualquier otro tipo
    } else {
        // Redirigir a timing o spam según corresponda
        startMinigame('timing', choiceData);
    }
}

// ──────────────────────────────────────────
// FINISH MINIGAME: ANIMATED OUTCOME & STAT EFFECTS
// ──────────────────────────────────────────
function finishMinigame(result, choiceData, message) {
    clearAllMgTimers();
    
    // Registrar estadísticas del minijuego en el simulador
    if (typeof simGame !== 'undefined' && simGame) {
        if (!simGame.minigamesStats) simGame.minigamesStats = { total: 0, won: 0, partial: 0, lost: 0 };
        simGame.minigamesStats.total++;
        if (result === 'win') simGame.minigamesStats.won++;
        else if (result === 'partial') simGame.minigamesStats.partial++;
        else simGame.minigamesStats.lost++;
    }
    
    let eff = {};
    if (result === 'win' && choiceData.winEffects) eff = choiceData.winEffects;
    else if (result === 'partial' && choiceData.partialEffects) eff = choiceData.partialEffects;
    else if (result === 'lose' && choiceData.loseEffects) eff = choiceData.loseEffects;
    else eff = choiceData.effects || {};
    
    const outcomeBg = result === 'win' ? 'rgba(34, 197, 94, 0.15)' : (result === 'partial' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)');
    const outcomeBorder = result === 'win' ? '#22c55e' : (result === 'partial' ? '#eab308' : '#ef4444');
    const outcomeTitle = result === 'win' ? '🎉 ¡VICTORIA!' : (result === 'partial' ? '🟡 SALVASTE' : '💥 ¡HAS FALLADO!');
    
    let effectsHtml = '';
    const icons = { study: '📚 Estudio', energy: '🔋 Energía', social: '🍻 Social', money: '💰 Dinero' };
    for (let k in eff) {
        let v = eff[k];
        if (v !== 0) {
            let color = v > 0 ? '#22c55e' : '#ef4444';
            let sign = v > 0 ? '+' : '';
            effectsHtml += `<span style="color:${color}; font-weight:800; margin:0 6px;">${sign}${v} ${icons[k] || k}</span>`;
        }
    }

    const displayMessage = typeof parseGenderText === 'function' ? parseGenderText(message || 'Fin del minijuego') : (message || 'Fin del minijuego');

    // Registrar en el diario de eventos del ciclo con resultado exacto (victoria / derrota / rescate)
    if (typeof simGame !== 'undefined' && simGame) {
        if (!simGame.cycleEventsLog) simGame.cycleEventsLog = [];
        
        let pending = window._pendingSimEvent || {};
        let evTitle = pending.title || (typeof currentSimEvent !== 'undefined' && currentSimEvent ? currentSimEvent.title : 'Evento Universitario');
        let evEmoji = pending.emoji || (typeof currentSimEvent !== 'undefined' && currentSimEvent ? currentSimEvent.emoji : '🎮');
        let chText = pending.choiceText || choiceData.text || 'Decisión en minijuego';
        if (typeof parseGenderText === 'function') chText = parseGenderText(chText);
        let chWeek = pending.week || simGame.week || 1;
        
        let outcomeLabel = result === 'win' ? '¡Victoria!' : (result === 'partial' ? 'Salvado' : '¡Derrota!');
        let narrative = `Decidiste "${chText}". Minijuego: ${outcomeLabel} — ${displayMessage}`;
        
        simGame.cycleEventsLog.push({
            title: evTitle,
            emoji: evEmoji,
            choice: chText,
            hadMinigame: true,
            result: result, // 'win' | 'partial' | 'lose'
            outcomeTitle: outcomeLabel,
            message: displayMessage,
            story: narrative,
            effects: eff,
            week: chWeek
        });
        
        window._pendingSimEvent = null;
    }

    const ctn = document.getElementById('mgContainer');
    if (ctn) {
        ctn.innerHTML = `
            <div style="background:${outcomeBg}; border:2px solid ${outcomeBorder}; border-radius:18px; padding:20px; width:100%; max-width:320px; animation:mgPopIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; text-align:center;">
                <div style="font-size:24px; font-weight:900; color:${outcomeBorder}; margin-bottom:8px;">${outcomeTitle}</div>
                <p style="font-size:13px; font-weight:700; color:var(--text); margin-bottom:12px; line-height:1.4;">${displayMessage}</p>
                <div style="font-size:12px; display:flex; flex-wrap:wrap; justify-content:center; gap:4px; padding-top:8px; border-top:1px solid rgba(255,255,255,0.1);">
                    ${effectsHtml || '<span style="color:var(--muted)">Sin cambios de estadísticas</span>'}
                </div>
            </div>
        `;
    }

    setTimeout(() => {
        const mgView = document.getElementById('gameMinigameView');
        if (mgView) mgView.style.display = 'none';
        const cardView = document.getElementById('gameCardView');
        if (cardView) cardView.style.display = 'flex';
        if (typeof applyEffectsAndProceed === 'function') {
            applyEffectsAndProceed(eff, choiceData.nextEvent);
        }
    }, 1400);
}
