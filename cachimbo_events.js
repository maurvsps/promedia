// ════════════════════════════════════════════════
//  EVENTOS DEL JUEGO CACHIMBO
// ════════════════════════════════════════════════
// Para filtrar por carrera, usa: careers: ["Arquitectura", "Derecho", ...]
// Si no pones 'careers', el evento saldrá para todas las carreras.

let simEvents = [

    // ─── NUEVOS EVENTOS CON MINIJUEGOS VARIADOS ───
    {
        cycleRange: [1, 10],
        emoji: "⚡", title: "¡Pasa la Copia!",
        desc: "El examen final está imposible. Tu amigo de la fila de al lado tiene la respuesta de la pregunta 4 y te va a pasar el papelito. ¡Espera a que el profesor se distraiga!",
        choices: [
            { 
                text: "¡Pasar la copia con reflejos ninja!", 
                minigame: "reflex", 
                winEffects: { study: +25, energy: -5, social: +10, money: 0 }, 
                loseEffects: { study: -30, energy: -20, social: -15, money: 0 } 
            },
            { text: "Mejor no arriesgarme y responder lo que sé", effects: { study: -10, energy: 0, social: 0, money: 0 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "🎓", title: "Trivia Relámpago del CEUL",
        desc: "El Centro de Estudiantes tiene un stand en el patio con una ruleta de preguntas de cultura universitaria. ¡Si respondes bien te llevas premios y reconocimiento!",
        choices: [
            { 
                text: "¡Participar en la Trivia!", 
                minigame: "trivia", 
                winEffects: { study: +15, energy: +10, social: +20, money: +25 }, 
                loseEffects: { study: 0, energy: -5, social: -10, money: 0 } 
            },
            { text: "Seguir caminando hacia mi clase", effects: { study: +5, energy: 0, social: -5, money: 0 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "🏗️", title: "Equilibrio en el Corredor",
        desc: "Llevas tu maqueta gigante y una laptop en las manos. El bus frena de golpe y la gente empieza a empujar en el pasillo. ¡Mantén el equilibrio o se romperá todo!",
        choices: [
            { 
                text: "¡Equilibrar la maqueta!", 
                minigame: "balance", 
                winEffects: { study: +20, energy: -10, social: +10, money: 0 }, 
                loseEffects: { study: -25, energy: -20, social: -5, money: -30 } 
            },
            { text: "Proteger solo la laptop y dejar caer la maqueta", effects: { study: -20, energy: -5, social: 0, money: -15 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "🔐", title: "Descifra el Código Secreto",
        desc: "El profesor de laboratorio dejó una pregunta extra encriptada en la pizarra. El primer alumno en descifrar el anagrama se lleva 2 puntos en el promedio.",
        choices: [
            { 
                text: "¡Descifrar la palabra oculta!", 
                minigame: "word", 
                winEffects: { study: +25, energy: -10, social: +10, money: 0 }, 
                loseEffects: { study: -5, energy: -10, social: 0, money: 0 } 
            },
            { text: "No intentar, que se lo lleve otro", effects: { study: 0, energy: +5, social: 0, money: 0 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "🎯", title: "Calibración del Parcial",
        desc: "Estás resolviendo el último ejercicio del examen de mitad de ciclo. Requiere precisión quirúrgica en el redondeo.",
        choices: [
            { 
                text: "Calcular con máxima precisión", 
                minigame: "timing", 
                winEffects: { study: +25, energy: -10 },
                partialEffects: { study: +10, energy: -15 },
                loseEffects: { study: -20, energy: -15 }
            },
            { text: "Marcar al azar y entregar ya", effects: { study: -15, energy: +10 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "☕", title: "Resistiendo la Madrugada",
        desc: "Son las 4:30 AM en la semana de finales. Tienes que leer las últimas 30 diapositivas pero tus ojos se cierran solos.",
        choices: [
            { 
                text: "Tomar café y luchar contra el sueño", 
                minigame: "spam", 
                winEffects: { study: +20, energy: -15 },
                loseEffects: { study: -20, energy: -5, social: -5 }
            },
            { text: "Rendirse e irse a dormir", effects: { study: -25, energy: +25 } }
        ]
    },

    // NUEVOS EVENTOS MINIJUEGOS (Añadidos dinámicamente)
    {
        cycleRange: [1, 10],
        emoji: "🔢", title: "Práctica Calificada Sorpresa", 
        desc: "El profesor de matemáticas acaba de entrar al salón y decir: '¡Saquen una hoja, práctica calificada!'. Tu mente está en blanco.",
        choices: [
            { text: "¡Puedo resolverlo!", minigame: "math", winEffects: { study: +20, energy: -10, social: 0, money: 0 }, loseEffects: { study: -20, energy: -15, social: 0, money: 0 } },
            { text: "Me rindo y entrego en blanco", effects: { study: -25, energy: 0, social: 0, money: 0 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "🧠", title: "Exposición Oral sin Preparar", 
        desc: "Te toca exponer pero tu grupo no te mandó su parte. Tienes que memorizar los conceptos clave de los PPTs en tiempo récord.",
        choices: [
            { text: "Memorizar los apuntes", minigame: "memory", winEffects: { study: +15, energy: -15, social: +10, money: 0 }, loseEffects: { study: -15, energy: -10, social: -10, money: 0 } },
            { text: "Improvisar con carisma", effects: { study: -15, energy: -5, social: +20, money: 0 } }
        ]
    },

    // ─── EVENTOS ESPECÍFICOS POR CARRERA ───
    
    // SISTEMAS
    {
        cycleRange: [2, 9], careers: ["Ingeniería de Sistemas"],
        emoji: "💻", title: "Código Espagueti", 
        desc: "Son las 3 AM y tu código de Estructuras de Datos no compila. Descubres que te falta un punto y coma.",
        choices: [
            { text: "Llorar y seguir revisando", effects: { study: +20, energy: -25, social: -10, money: 0 } },
            { text: "Usar IA y rezar que el profe no se dé cuenta", effects: { study: -10, energy: +10, social: +5, money: 0 } }
        ]
    },
    {
        cycleRange: [5, 10], careers: ["Ingeniería de Sistemas"],
        emoji: "🔥", title: "Caída a Producción", 
        desc: "Borrasté la base de datos del proyecto grupal por accidente usando 'DROP TABLE'.",
        choices: [
            { text: "Admitir la culpa e invitarles el almuerzo", effects: { study: -15, energy: -10, social: +10, money: -30 } },
            { text: "Amanecerte reconstruyendo todo tú solo", effects: { study: +25, energy: -35, social: -10, money: 0 } }
        ]
    },

    // INDUSTRIAL
    {
        cycleRange: [4, 9], careers: ["Ingeniería Industrial"],
        emoji: "🏭", title: "Diseño de Planta", 
        desc: "Tu modelo de Optimización Lineal en Lingo no tiene solución factible y expones en 1 hora.",
        choices: [
            { text: "Inventar los datos", effects: { study: -20, energy: +5, social: 0, money: 0 } },
            { text: "Desarmar el modelo y hacerlo más simple", effects: { study: +15, energy: -20, social: -5, money: 0 } }
        ]
    },

    // COMUNICACIONES
    {
        cycleRange: [3, 10], careers: ["Comunicaciones"],
        emoji: "🎥", title: "Actor Desaparecido", 
        desc: "Estás grabando un corto para Audiovisuales en el campus y el actor principal no llega.",
        choices: [
            { text: "Actuar tú mismo (roche total)", effects: { study: +15, energy: -15, social: -20, money: 0 } },
            { text: "Sobornar a un amigo para que actúe", effects: { study: +10, energy: -5, social: +10, money: -25 } },
            { text: "Grabar sin él y cambiar el guion a última hora", effects: { study: -10, energy: +10, social: 0, money: 0 } }
        ]
    },
    {
        cycleRange: [4, 9], careers: ["Comunicaciones"],
        emoji: "💻", title: "Premiere Crash", 
        desc: "Premiere Pro crasheó cuando el render estaba al 99% y no guardaste. Tu grupo te quiere matar.",
        choices: [
            { text: "Aceptar la derrota e ir al bar", effects: { study: -30, energy: +10, social: +20, money: -20 } },
            { text: "Llorarle al profe por una extensión", effects: { study: -10, energy: -10, social: -10, money: 0 } }
        ]
    },

    // ARQUITECTURA
    {
        cycleRange: [1, 10], careers: ["Arquitectura"],
        emoji: "🏗️", title: "Tragedia en el Micro", 
        desc: "Subiste tu maqueta gigante al corredor y un pasajero la aplastó. Entregas en 2 horas.",
        choices: [
            { text: "Pegarla con silicona en el baño de la U", effects: { study: -15, energy: -20, social: -5, money: -10 } },
            { text: "Gastar en taxi de emergencia para los repuestos", effects: { study: +15, energy: -10, social: 0, money: -40 } }
        ]
    },
    {
        cycleRange: [2, 8], careers: ["Arquitectura"],
        emoji: "🔪", title: "Dedo Cortado", 
        desc: "Amanecida cortando cartón pluma. Te rebanaste el dedo y manchas los planos con sangre.",
        choices: [
            { text: "Ir a tópico y no entregar el plano", effects: { study: -25, energy: +10, social: 0, money: 0 } },
            { text: "Decir que la sangre es un 'concepto artístico'", effects: { study: +15, energy: -25, social: -10, money: 0 } }
        ]
    },

    // DERECHO
    {
        cycleRange: [3, 9], careers: ["Derecho"],
        emoji: "📖", title: "Control de Lectura", 
        desc: "Tienes control de lectura de Derecho Penal (300 páginas). Leíste 10.",
        choices: [
            { text: "Comprar el resumen que venden frente a la U", effects: { study: 0, energy: 0, social: +5, money: -15 } },
            { text: "Amanecida a puro café y memorizar", effects: { study: +20, energy: -30, social: -10, money: -10 } }
        ]
    },

    // PSICOLOGIA
    {
        cycleRange: [4, 9], careers: ["Psicología"],
        emoji: "🛋️", title: "Paciente Fantasma", 
        desc: "Tienes que grabar una entrevista clínica, pero tu 'paciente' voluntario te canceló.",
        choices: [
            { text: "Entrevistar a tu mamá en su lugar", effects: { study: -10, energy: 0, social: -10, money: 0 } },
            { text: "Pagarle a un cachimbo para que actúe", effects: { study: +15, energy: -5, social: +10, money: -30 } }
        ]
    },

    // ADMINISTRACION / ECONOMIA
    {
        cycleRange: [3, 8], careers: ["Administración", "Economía"],
        emoji: "📊", title: "Trabajo de Mercado", 
        desc: "Nadie ha llenado tu encuesta de Google Forms para el curso y necesitas 100 respuestas.",
        choices: [
            { text: "Llenarla tú mismo 100 veces", effects: { study: -10, energy: -20, social: -10, money: 0 } },
            { text: "Spammear a todos tus grupos de WhatsApp", effects: { study: +15, energy: -5, social: -25, money: 0 } }
        ]
    },

    // NUEVOS CIVIL
    {
        cycleRange: [4, 10], careers: ["Ingeniería Civil"],
        emoji: "🏗️", title: "Error Estructural",
        desc: "Notaste que en tu diseño del puente pusiste toneladas en lugar de kilos. Entregas en 20 minutos.",
        choices: [
            { text: "Borrar todo y rehacerlo a la velocidad de la luz", effects: { study: +20, energy: -25, social: -5, money: 0 } },
            { text: "Ponerle 'Factor de Seguridad x1000' y cruzar los dedos", effects: { study: -15, energy: 0, social: +5, money: 0 } }
        ]
    },
    {
        cycleRange: [3, 9], careers: ["Ingeniería Civil"],
        emoji: "👷", title: "Visita a Obra",
        desc: "Olvidaste tu casco blanco y botas de punta de acero para la visita técnica del curso.",
        choices: [
            { text: "Pedir prestado el de repuesto (Talla gigante)", effects: { study: +10, energy: -5, social: +10, money: 0 } },
            { text: "Comprar unos nuevos de emergencia carísimos", effects: { study: +15, energy: 0, social: 0, money: -50 } },
            { text: "Quedarte afuera anotando desde la reja", effects: { study: -10, energy: +10, social: -10, money: 0 } }
        ]
    },
    // NUEVOS MECATRONICA
    {
        cycleRange: [3, 9], careers: ["Ingeniería Mecatrónica"],
        emoji: "🤖", title: "Cortocircuito",
        desc: "Tu carrito seguidor de línea acaba de quemar su placa Arduino justo en la puerta del laboratorio.",
        choices: [
            { text: "Soldar cables de frente y rezar", effects: { study: +10, energy: -15, social: 0, money: 0 } },
            { text: "Llorarle al jefe de prácticas", effects: { study: -10, energy: 0, social: -5, money: 0 } },
            { text: "Correr a Paruro a comprar repuestos", effects: { study: +15, energy: -20, social: 0, money: -30 } }
        ]
    },
    {
        cycleRange: [5, 10], careers: ["Ingeniería Mecatrónica"],
        emoji: "🦾", title: "Torneo de Sumo-Bots",
        desc: "Tu robot está perdiendo empuje contra los de ciclos superiores. Necesitas una mejora rápida.",
        choices: [
            { text: "¡Optimizar código de motores!", minigame: "timing", winEffects: { study: +25, energy: -15, social: +10, money: 0 }, loseEffects: { study: -10, energy: -15, social: -5, money: 0 } },
            { text: "Ponerle pesas y cinta adhesiva", effects: { study: -5, energy: -5, social: +5, money: -10 } }
        ]
    },
    // NUEVOS AMBIENTAL
    {
        cycleRange: [2, 8], careers: ["Ingeniería Ambiental"],
        emoji: "🧪", title: "Muestra Contaminada",
        desc: "Alguien estornudó sobre tu placa Petri de cultivo de bacterias para microbiología.",
        choices: [
            { text: "Inventar que descubriste una nueva cepa", effects: { study: -20, energy: +5, social: -5, money: 0 } },
            { text: "Amanecerte recolectando muestras de nuevo", effects: { study: +20, energy: -30, social: -10, money: 0 } }
        ]
    },
    {
        cycleRange: [4, 9], careers: ["Ingeniería Ambiental"],
        emoji: "🌱", title: "Salida de Campo Lluviosa",
        desc: "Deben medir la calidad del suelo en las lomas, pero empezó una tormenta terrible.",
        choices: [
            { text: "Medir bajo la lluvia llenos de lodo", effects: { study: +25, energy: -25, social: +10, money: 0 } },
            { text: "Refugiarse y copiar datos del ciclo pasado", effects: { study: -25, energy: +10, social: +5, money: 0 } }
        ]
    },
    // NUEVOS ADMINISTRACION
    {
        cycleRange: [5, 10], careers: ["Administración"],
        emoji: "📈", title: "Presentación del Pitch",
        desc: "El jurado de inversores (tus profes) destruye tu idea de negocio en los primeros 2 minutos.",
        choices: [
            { text: "¡Improvisar un nuevo modelo de negocio!", minigame: "word", winEffects: { study: +30, energy: -10, social: +15, money: 0 }, loseEffects: { study: -20, energy: -15, social: -10, money: 0 } },
            { text: "Aceptar la derrota y cambiar de tema", effects: { study: -10, energy: 0, social: -5, money: 0 } }
        ]
    },
    {
        cycleRange: [2, 8], careers: ["Administración"],
        emoji: "👔", title: "Código de Vestimenta",
        desc: "Hay exposición formal para Gerencia y llegaste en buzo y zapatillas deportivas.",
        choices: [
            { text: "Exponer detrás del podio sin moverte", effects: { study: -5, energy: 0, social: -10, money: 0 } },
            { text: "Pedir saco prestado a alguien y usarlo abierto", effects: { study: +5, energy: -5, social: +15, money: 0 } },
            { text: "Ir a comprar una camisa corriendo", effects: { study: +10, energy: -10, social: 0, money: -40 } }
        ]
    },
    // NUEVOS SISTEMAS Y SOFTWARE (extras)
    {
        cycleRange: [3, 10], careers: ["Ingeniería de Sistemas"],
        emoji: "⌨️", title: "Conflicto en Git",
        desc: "Hiciste 'git push -f' y borraste el trabajo de todo el mes de tu grupo de Proyecto.",
        choices: [
            { text: "¡Restaurar commit rápido! (Tapeo)", minigame: "spam", winEffects: { study: +20, energy: -15, social: +5, money: 0 }, loseEffects: { study: -25, energy: -10, social: -20, money: 0 } },
            { text: "Hacerse el loco y decir que nos hackearon", effects: { study: -15, energy: +5, social: -30, money: 0 } }
        ]
    },
    // NUEVOS INDUSTRIAL (extras)
    {
        cycleRange: [2, 9], careers: ["Ingeniería Industrial"],
        emoji: "⏱️", title: "Estudio de Tiempos",
        desc: "Tienes que cronometrar al cajero de la cafetería, pero se da cuenta y te mira pésimo.",
        choices: [
            { text: "Explicarle e invitarle un pan con pollo", effects: { study: +15, energy: -5, social: +10, money: -15 } },
            { text: "Grabar a escondidas desde un arbusto", effects: { study: -5, energy: -10, social: -15, money: 0 } },
            { text: "Inventar los tiempos en el Excel", effects: { study: -20, energy: +10, social: 0, money: 0 } }
        ]
    },
    // ─── EVENTOS GENERALES (PARA TODOS) ───
    {
        cycleRange: [1, 3],
        emoji: "💡", title: "Semana de Integración", 
        desc: "Hay fiesta de cachimbos, conciertos y juegos. Todo el mundo está en los jardines.",
        choices: [
            { text: "Gastar todo en la kermesse y fiestas", effects: { study: -15, energy: -20, social: +30, money: -30 } },
            { text: "Ver de lejos y repasar lecturas", effects: { study: +15, energy: +5, social: -15, money: +10 } }
        ]
    },
    {
        cycleRange: [4, 7],
        emoji: "💼", title: "Entrevista de Prácticas",
        desc: "Conseguiste una entrevista para practicante en una súper empresa, pero es justo a la hora de tu PC.",
        choices: [
            { text: "Faltar a la PC e ir a la entrevista", effects: { study: -25, energy: -10, social: +10, money: +30 } },
            { text: "Priorizar la Universidad, cancelar", effects: { study: +15, energy: +5, social: -10, money: -10 } }
        ]
    },
    {
        cycleRange: [8, 10],
        emoji: "📑", title: "El Proyecto de Tesis",
        desc: "Tu asesor te destrozó el avance de tesis a semanas de la entrega final. Estás en cero.",
        choices: [
            { text: "Amanecida extrema toda la semana", effects: { study: +35, energy: -40, social: -25, money: 0 } },
            { text: "Hacer lo mínimo indispensable y rezar", effects: { study: -20, energy: +15, social: +5, money: 0 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "🍻", title: "Jueves de Palos", 
        desc: "Tus amigos se van de frente a tomar a un bar, pero mañana a las 7am tienes Práctica Calificada.",
        choices: [
            { text: "Solo una y me voy (Ir)", effects: { study: -10, energy: -15, social: +20, money: -15 } },
            { text: "Encerrarme en la biblioteca W", effects: { study: +20, energy: -10, social: -15, money: 0 } },
            { text: "Faltar a la PC y dormir", effects: { study: -25, energy: +25, social: 0, money: 0 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "🍔", title: "Almuerzo en la Cafetería", 
        desc: "Hay cola inmensa para el menú económico, pero tienes hambre. El kiosko W está vacío pero es caro.",
        choices: [
            { text: "Comprar un pan con pollo y jugo W", effects: { study: 0, energy: +15, social: 0, money: -25 } },
            { text: "Hacer la cola de 40 minutos", effects: { study: -10, energy: +10, social: +10, money: -5 } },
            { text: "No almorzar, directo a clases", effects: { study: 0, energy: -20, social: 0, money: +10 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "🤬", title: "Trabajo Grupal", 
        desc: "Tu grupo no ha avanzado nada y el trabajo final se entrega mañana a las 8:00 AM.",
        choices: [
            { text: "Amanecerte haciéndolo todo tú solo", effects: { study: +25, energy: -30, social: -10, money: 0 } },
            { text: "Quejarte con el profe para sacarlos", effects: { study: +10, energy: -5, social: -30, money: 0 } },
            { text: "Enviar lo que haya y rezar", effects: { study: -25, energy: +10, social: +10, money: 0 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "😴", title: "Clase de las 7:00 AM", 
        desc: "Tu alarma suena. Estás destruido por estudiar toda la madrugada para el parcial de hoy.",
        choices: [
            { text: "Tomar un café cargado y arrastrarte", effects: { study: +15, energy: -20, social: 0, money: -10 } },
            { text: "Faltar a la primera hora, llego tarde", effects: { study: -10, energy: +15, social: 0, money: 0 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "😱", title: "Examen Final Sorpresa", 
        desc: "El profesor adelanta el examen parcial una semana entera. Estás en cero.",
        choices: [
            { text: "Estudiar modo turbo (cero sueño)", effects: { study: +20, energy: -30, social: -10, money: 0 } },
            { text: "Pagarle a un asesor para que te enseñe", effects: { study: +25, energy: -5, social: 0, money: -40 } },
            { text: "Aceptar la bica inminente", effects: { study: -30, energy: +15, social: +10, money: 0 } }
        ]
    },
    {
        cycleRange: [1, 10],
        emoji: "💔", title: "Drama Sentimental",
        desc: "Tu casi-algo de la U te acaba de decir que mejor queden como amigos en pleno pasillo V.",
        choices: [
            { text: "Llorar en los baños y faltar a clases", effects: { study: -20, energy: -15, social: -10, money: 0 } },
            { text: "Ir a tomar con amigos para olvidar", effects: { study: -15, energy: -10, social: +25, money: -20 } },
            { text: "Enfocar el dolor en el estudio", effects: { study: +25, energy: -20, social: -15, money: 0 } }
        ]
    }
];

const newSimEvents = [
    {
        title: "Trabajo Grupal",
        desc: "Te toca con el grupo que nunca hace nada. ¿Qué haces?",
        emoji: "👥",
        cycleRange: [1, 10],
        choices: [
            { text: "Hacerlo todo tú solo", effects: { study: 20, energy: -20, social: -5, money: 0 } },
            { text: "Repartir partes y rezar", effects: { study: -10, energy: 0, social: 10, money: 0 } },
            { text: "Pagarle a un pata para que lo haga", effects: { study: 15, energy: 5, social: 0, money: -30 } }
        ]
    },
    {
        title: "Jueves de Patas",
        desc: "Tus amigos te invitan a tomar unas chelas en W, pero mañana tienes PC.",
        emoji: "🍻",
        cycleRange: [1, 10],
        choices: [
            { text: "Ir a tomar hasta morir", effects: { study: -25, energy: -15, social: 30, money: -20 } },
            { text: "Ir pero tomar gaseosa", effects: { study: -5, energy: -5, social: 15, money: -5 } },
            { text: "Quedarte estudiando", effects: { study: 20, energy: -10, social: -15, money: 0 } }
        ]
    },
    {
        title: "Tiktoker Famoso",
        desc: "Un pata está grabando un TikTok en el campus y te pide salir bailando.",
        emoji: "📱",
        cycleRange: [1, 10],
        choices: [
            { text: "Bailar con todo", effects: { study: 0, energy: -5, social: 25, money: 0 } },
            { text: "Esconderte por vergüenza", effects: { study: 0, energy: 0, social: -10, money: 0 } },
            { text: "Pedirle que te pague por derechos", effects: { study: 0, energy: 0, social: -5, money: 15 } }
        ]
    },
    {
        title: "El Profe Estricto",
        desc: "El profe te pregunta algo muy tranca frente a toda el aula.",
        emoji: "👨‍🏫",
        cycleRange: [1, 10],
        choices: [
            { text: "Inventar una respuesta filosófica", effects: { study: -10, energy: 0, social: 10, money: 0 } },
            { text: "Decir la verdad: 'No sé profe'", effects: { study: -5, energy: 0, social: -5, money: 0 } },
            { text: "Revisar ChatGPT rápido bajo la mesa", effects: { study: 15, energy: -5, social: 0, money: 0 } }
        ]
    },
    {
        title: "Huelga de Transporte",
        desc: "No hay micros. Los taxis están cobrando 50 soles hasta la U.",
        emoji: "🚕",
        cycleRange: [1, 10],
        choices: [
            { text: "Pagar el taxi", effects: { study: 10, energy: 5, social: 0, money: -40 } },
            { text: "Ir caminando (2 horas)", effects: { study: -5, energy: -30, social: 0, money: 0 } },
            { text: "Faltar y dormir", effects: { study: -20, energy: 20, social: 0, money: 0 } }
        ]
    },
    {
        title: "Amor Universitario",
        desc: "Tu crush te pide que le expliques la clase, pero tú tampoco entendiste.",
        emoji: "❤️",
        cycleRange: [1, 10],
        choices: [
            { text: "Contratar un asesor para los dos", effects: { study: 20, energy: 0, social: 20, money: -50 } },
            { text: "Chamullar y confundirla más", effects: { study: -10, energy: -5, social: 15, money: 0 } },
            { text: "Ser honesto e invitarle un café", effects: { study: 0, energy: 0, social: 20, money: -15 } }
        ]
    },
    {
        title: "Sorteo del CEUL",
        desc: "El Centro de Estudiantes está rifando un iPhone.",
        emoji: "🎫",
        cycleRange: [1, 10],
        choices: [
            { text: "Comprar 10 rifas", effects: { study: 0, energy: 0, social: 10, money: -30 } },
            { text: "Comprar 1 rifa por si acaso", effects: { study: 0, energy: 0, social: 5, money: -5 } },
            { text: "No participar, es estafa", effects: { study: 0, energy: 0, social: -5, money: 0 } }
        ]
    },
    {
        title: "Trabajo Part-Time",
        desc: "Te ofrecen ser jefe de prácticas de un profe relajado.",
        emoji: "💼",
        cycleRange: [3, 10],
        choices: [
            { text: "Aceptar (Paga bien, quita tiempo)", effects: { study: 10, energy: -20, social: -10, money: 40 } },
            { text: "Rechazar, mejor me concentro", effects: { study: 15, energy: 5, social: 0, money: 0 } }
        ]
    },
    {
        title: "Almuerzo en la Cafetería",
        desc: "La cola del menú está gigante y tienes hambre.",
        emoji: "🍛",
        cycleRange: [1, 10],
        choices: [
            { text: "Hacer la cola de 1 hora", effects: { study: -10, energy: 10, social: 5, money: -10 } },
            { text: "Comprarte un pan con pollo al paso", effects: { study: 5, energy: 5, social: 0, money: -5 } },
            { text: "Pedir un delivery caro al pabellón", effects: { study: 10, energy: 15, social: 0, money: -30 } }
        ]
    },
    {
        title: "Gato de la U",
        desc: "El gato de la U se sienta en tu regazo justo cuando ibas a estudiar.",
        emoji: "🐈",
        cycleRange: [1, 10],
        choices: [
            { text: "Quedarte acariciándolo (Pierdes tiempo)", effects: { study: -10, energy: 15, social: 10, money: 0 } },
            { text: "Botarlo suavemente", effects: { study: 15, energy: -5, social: -5, money: 0 } },
            { text: "Comprarle galletas", effects: { study: -5, energy: 10, social: 15, money: -10 } }
        ]
    },
    {
        title: "Amanecida Grupal",
        desc: "Faltan 12 horas para la entrega final y recién abren el Word.",
        emoji: "🦉",
        cycleRange: [1, 10],
        choices: [
            { text: "Comprar RedBulls para todos y darle con todo", effects: { study: 25, energy: -30, social: 15, money: -20 } },
            { text: "Dividir y dormir 3 horas", effects: { study: 10, energy: -15, social: 5, money: 0 } },
            { text: "Echarle la culpa a otro y no hacer nada", effects: { study: -30, energy: 10, social: -25, money: 0 } }
        ]
    },
    {
        title: "Torneo de FIFA / Smash",
        desc: "Hay un torneo relámpago en el centro de estudiantes.",
        emoji: "🎮",
        cycleRange: [1, 10],
        choices: [
            { text: "Inscribirte (Cuesta 10, premio 50)", effects: { study: -10, energy: -5, social: 20, money: -10 } }, // Gamble implicitly
            { text: "Solo ir a ver y hacer barra", effects: { study: -5, energy: 0, social: 15, money: 0 } },
            { text: "Ignorar y estudiar", effects: { study: 15, energy: 0, social: -10, money: 0 } }
        ]
    },
    {
        title: "Emprendimiento de Brownies",
        desc: "Un pata está vendiendo 'brownies mágicos' a 15 soles.",
        emoji: "🍪",
        cycleRange: [1, 10],
        choices: [
            { text: "Comprarle uno", effects: { study: -20, energy: 10, social: 15, money: -15 } },
            { text: "Venderle los tuyos más caros (Mentalidad de tiburón)", effects: { study: -10, energy: -10, social: 10, money: 30 } },
            { text: "No gracias, soy sano", effects: { study: 5, energy: 0, social: -5, money: 0 } }
        ]
    },
    {
        title: "Problema en Matrícula",
        desc: "Se cayó el sistema y no te pudiste matricular en tu curso favorito.",
        emoji: "💻",
        cycleRange: [1, 10],
        choices: [
            { text: "Llorar en atención al alumno", effects: { study: 5, energy: -15, social: -5, money: 0 } },
            { text: "Matricularte en lo que sobre (Con el profe barco)", effects: { study: -10, energy: 10, social: 5, money: 0 } },
            { text: "Pagar a un tramitador hacker", effects: { study: 15, energy: 0, social: 0, money: -40 } }
        ]
    },
    {
        title: "Lluvia Inesperada",
        desc: "Empieza a diluviar y estás sin paraguas.",
        emoji: "🌧️",
        cycleRange: [1, 10],
        choices: [
            { text: "Correr y llegar empapado a clase", effects: { study: 5, energy: -15, social: -5, money: 0 } },
            { text: "Faltar y meterte al cine", effects: { study: -15, energy: 10, social: 10, money: -25 } },
            { text: "Comprar un paraguas de emergencia", effects: { study: 5, energy: 0, social: 0, money: -15 } }
        ]
    },
    {
        title: "Cachimbo Perdido",
        desc: "Un cachimbo te pregunta cómo llegar al pabellón Z.",
        emoji: "🧭",
        cycleRange: [2, 10],
        choices: [
            { text: "Acompañarlo hasta allá", effects: { study: -5, energy: -5, social: 15, money: 0 } },
            { text: "Mandarlo en dirección contraria por troll", effects: { study: 0, energy: 0, social: -15, money: 0 } },
            { text: "Ignorarlo, andas tarde", effects: { study: 10, energy: 0, social: -5, money: 0 } }
        ]
    },
    {
        title: "Feria de Trabajos",
        desc: "Las mejores empresas están en el campus buscando practicantes.",
        emoji: "👔",
        cycleRange: [6, 10],
        choices: [
            { text: "Ir bien vestido a dejar tu CV", effects: { study: 5, energy: -10, social: 20, money: 0 } },
            { text: "Ir solo por el merchandising gratis", effects: { study: -5, energy: 5, social: 10, money: 5 } },
            { text: "No ir, te da ansiedad", effects: { study: 10, energy: 5, social: -10, money: 0 } }
        ]
    },
    {
        title: "Paseo de Fin de Ciclo",
        desc: "Tu promoción organiza un viaje a Cieneguilla.",
        emoji: "🚌",
        cycleRange: [1, 10],
        choices: [
            { text: "Pagar y ser el alma de la fiesta", effects: { study: -15, energy: -15, social: 35, money: -50 } },
            { text: "Ir pero en plan tranquilo", effects: { study: -5, energy: 5, social: 15, money: -30 } },
            { text: "Quedarte en casa jugando Valorant", effects: { study: 5, energy: 15, social: -20, money: 0 } }
        ]
    },
    {
        title: "El Plagio Descubierto",
        desc: "El profe te acusa injustamente de haber usado ChatGPT en tu ensayo.",
        emoji: "🤖",
        cycleRange: [1, 10],
        choices: [
            { text: "Pelear y probar tu inocencia", effects: { study: 20, energy: -20, social: 5, money: 0 } },
            { text: "Aceptar la culpa para evitar líos", effects: { study: -30, energy: 0, social: -10, money: 0 } },
            { text: "Llevarle chocolates al profe", effects: { study: -10, energy: 0, social: 15, money: -20 } }
        ]
    },
    {
        title: "Exposición en Inglés",
        desc: "De la nada el profe decide que la sustención será en inglés.",
        emoji: "🗣️",
        cycleRange: [1, 10],
        choices: [
            { text: "Improvisar con tu nivel básico", effects: { study: -10, energy: -10, social: -10, money: 0 } },
            { text: "Amanecerte practicando la pronunciación", effects: { study: 25, energy: -20, social: -5, money: 0 } },
            { text: "Pagarle a un pata para que hable por ti", effects: { study: 15, energy: 0, social: -5, money: -30 } }
        ]
    }
];


    simEvents.push(
// --- RESCATE ---
    {
        id: "rescue_study", title: "¡ALERTA ACADÉMICA!", emoji: "🚨", cycleRange: [1,10],
        desc: "Tus notas están por los suelos. Bienestar Estudiantil te ha citado y te obliga a asistir a tutorías intensivas de emergencia. Te salvas de la suspensión, pero a qué costo...",
        choices: [
            { text: "Aceptar la tutoría intensiva", effects: { study: 25, energy: -20, social: -20, money: 0 } }
        ]
    },
    {
        id: "rescue_energy", title: "¡COLAPSO TOTAL!", emoji: "🚑", cycleRange: [1,10],
        desc: "Te desmayaste en medio del pasillo por agotamiento. Te despiertas en la enfermería con suero. Vas a tener que descansar obligatoriamente.",
        choices: [
            { text: "Dormir 2 días seguidos", effects: { energy: 30, study: -20, social: -10, money: -15 } }
        ]
    },
    {
        id: "rescue_money", title: "¡BANCARROTA!", emoji: "💸", cycleRange: [1,10],
        desc: "Te quedaste sin un sol. Ni para el pasaje. Tienes que llamar llorando a tus papás para que te depositen de emergencia.",
        choices: [
            { text: "Soportar el regaño familiar", effects: { money: 30, social: -15, energy: -10, study: 0 } }
        ]
    },
    {
        id: "rescue_social", title: "¡COMPLETO AISLAMIENTO!", emoji: "👻", cycleRange: [1,10],
        desc: "Llevas semanas sin hablar con nadie. Hasta los profesores olvidaron cómo te llamas. Un compañero al azar se compadece de ti y te invita a su casa.",
        choices: [
            { text: "Aceptar la invitación de lástima", effects: { social: 25, study: -10, energy: -10, money: -5 } }
        ]
    },


// NUEVOS 30 EVENTOS GENERALES
{ cycleRange: [1,10], emoji: "🍕", title: "Pizza Gratis", desc: "Hay reunión del consejo estudiantil y sobró pizza.", choices: [ { text: "Ir a robar pizza", effects: { energy: +10, social: +5, study: -5, money: 0 } }, { text: "Ignorar y seguir estudiando", effects: { study: +10, energy: -5, social: -5, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "🎧", title: "Audífonos Rotos", desc: "Se te malograron los audífonos justo antes de entrar a estudiar a la biblioteca.", choices: [ { text: "Estudiar sin música (Tortura)", effects: { study: +5, energy: -15, social: 0, money: 0 } }, { text: "Comprar unos baratos en el Kiosko", effects: { study: +10, energy: 0, social: 0, money: -20 } } ] },
{ cycleRange: [1,10], emoji: "🚗", title: "Jalón a la U", desc: "Un amigo con carro te ofrece llevarte, pero maneja como loco.", choices: [ { text: "Aceptar el jalón", effects: { energy: +10, social: +10, study: 0, money: 0 } }, { text: "Irte en bus mejor", effects: { energy: -10, social: -5, study: +5, money: -5 } } ] },
{ cycleRange: [2,8], emoji: "🐶", title: "Perrito Callejero", desc: "Un perrito entró al campus y te está siguiendo.", choices: [ { text: "Acariciarlo un buen rato", effects: { energy: +15, social: +5, study: -10, money: 0 } }, { text: "Ignorarlo, no tienes tiempo", effects: { energy: -5, social: -10, study: +10, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "📱", title: "Distracción de TikTok", desc: "Entraste a TikTok un 'ratito' y pasaron 3 horas.", choices: [ { text: "¡Cerrar la app ya! (Fuerza de Voluntad)", minigame: "spam", mgEmoji: "📱", mgTitle: "¡Fuerza de Voluntad!", mgDesc: "Toca rápidamente para cerrar la app antes de que sea tarde.", winEffects: { study: +15, energy: -5, social: 0, money: 0 }, loseEffects: { study: -20, energy: +10, social: 0, money: 0 } }, { text: "Ver un video más...", effects: { study: -15, energy: +15, social: 0, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "💸", title: "Préstamo Peligroso", desc: "Un amigo te pide 50 soles prestados con urgencia.", choices: [ { text: "Prestarle", effects: { money: -50, social: +20, energy: 0, study: 0 } }, { text: "Decir que estás misio", effects: { money: 0, social: -10, energy: 0, study: 0 } } ] },
{ cycleRange: [1,10], emoji: "☔", title: "Charco Traicionero", desc: "Un carro pasó rápido y te salpicó agua sucia antes de tu exposición.", choices: [ { text: "Exponer sucio y con orgullo", effects: { social: -15, study: +15, energy: -10, money: 0 } }, { text: "Ir a cambiarte y perderte la expo", effects: { social: +5, study: -25, energy: 0, money: 0 } } ] },
{ cycleRange: [3,10], emoji: "🔥", title: "Simulacro de Sismo", desc: "Suena la alarma en medio del examen más difícil.", choices: [ { text: "Aprovechar para copiar", minigame: "catch", winEffects: { study: +20, energy: 0, social: 0, money: 0 }, loseEffects: { study: -30, energy: -10, social: -10, money: 0 } }, { text: "Evacuar calmadamente", effects: { study: -5, energy: +10, social: +5, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "🎟️", title: "Sorteo de la U", desc: "Están sorteando una MacBook, pero la rifa cuesta 20 soles.", choices: [ { text: "Comprar ticket (Prueba de Suerte)", minigame: "luck", winEffects: { money: +100, energy: +20, social: +10, study: 0 }, loseEffects: { money: -20, energy: -5, social: 0, study: 0 } }, { text: "No gastar plata en tonterías", effects: { money: 0, energy: 0, social: 0, study: +5 } } ] },
{ cycleRange: [2,8], emoji: "🔑", title: "Llaves Perdidas", desc: "No encuentras las llaves de tu casa y ya es de noche.", choices: [ { text: "Buscar por todo el campus", minigame: "intruder", mgEmoji: "🔑", mgTitle: "Buscar las Llaves", mgDesc: "Encuentra la llave oculta rápidamente.", winEffects: { energy: -15, social: 0, study: +5, money: 0 }, loseEffects: { energy: -25, social: -5, study: -10, money: 0 } }, { text: "Llamar a un cerrajero", effects: { energy: 0, social: 0, study: 0, money: -40 } } ] },
{ cycleRange: [1,10], emoji: "🎤", title: "Karaoke Universitario", desc: "Tus amigos armaron un karaoke improvisado en el pasto.", choices: [ { text: "Cantar a todo pulmón", effects: { energy: +20, social: +25, study: -15, money: 0 } }, { text: "Solo escuchar y estudiar", effects: { energy: +5, social: -5, study: +15, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "💤", title: "Microsueño", desc: "Te quedaste dormido en el bus y te pasaste de tu paradero.", choices: [ { text: "Correr como loco a la U", effects: { energy: -20, social: 0, study: 0, money: 0 } }, { text: "Tomar taxi directo", effects: { energy: -5, social: 0, study: +5, money: -20 } } ] },
{ cycleRange: [1,10], emoji: "🍔", title: "Bajón del Mediodía", desc: "Mueres de hambre pero la cola del comedor da tres vueltas.", choices: [ { text: "Hacer la cola estoicamente", effects: { energy: -10, social: +5, study: -10, money: -10 } }, { text: "Ir a las maquinitas", effects: { energy: +10, social: -5, study: +5, money: -15 } } ] },
{ cycleRange: [4,10], emoji: "📄", title: "USB Perdido", desc: "Perdiste el USB con tu trabajo final.", choices: [ { text: "Reescribir todo a la velocidad de la luz", minigame: "typing", winEffects: { study: +20, energy: -25, social: -10, money: 0 }, loseEffects: { study: -30, energy: -15, social: 0, money: 0 } }, { text: "Pedirle piedad al profe", effects: { study: -20, energy: -10, social: -15, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "💡", title: "Apagón", desc: "Se va la luz en pleno trabajo grupal en la biblioteca.", choices: [ { text: "Usar datos del celular y seguir", effects: { energy: -15, social: 0, study: +20, money: -10 } }, { text: "Tomarlo como señal divina y dormir", effects: { energy: +25, social: +10, study: -20, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "🤔", title: "El Dilema Ético", desc: "Encontraste un billete de 50 soles tirado en el pasillo.", choices: [ { text: "Agarrarlo y fingir demencia", effects: { money: +50, energy: 0, social: -10, study: 0 } }, { text: "Entregarlo a objetos perdidos", effects: { money: 0, energy: 0, social: +20, study: 0 } } ] },
{ cycleRange: [1,10], emoji: "🤓", title: "El Profe Barco", desc: "Ese profe que regala nota te llama para preguntarte un concepto básico.", choices: [ { text: "Responder rápido", minigame: "word", winEffects: { study: +15, energy: 0, social: +5, money: 0 }, loseEffects: { study: -10, energy: 0, social: -5, money: 0 } }, { text: "Decir que no sabes", effects: { study: -15, energy: 0, social: -5, money: 0 } } ] },
{ cycleRange: [2,8], emoji: "🛒", title: "Ofertón en Libros", desc: "Venden el libro original que necesitas a mitad de precio, pero sigue siendo caro.", choices: [ { text: "Romper el chanchito y comprarlo", effects: { study: +25, energy: 0, social: 0, money: -40 } }, { text: "Sacar copias pirata", effects: { study: +5, energy: -10, social: 0, money: -10 } } ] },
{ cycleRange: [1,10], emoji: "🤧", title: "Resfriado Inoportuno", desc: "Tienes fiebre y dolor de cabeza el día del parcial.", choices: [ { text: "Ir a dar el examen", minigame: "math2", mgEmoji: "🤧", mgTitle: "Examen con Fiebre", mgDesc: "Ajusta el presupuesto a pesar de tu dolor de cabeza.", winEffects: { study: +25, energy: -25, social: 0, money: 0 }, loseEffects: { study: -20, energy: -30, social: 0, money: 0 } }, { text: "Quedarte en cama y tramitar rezagado", effects: { study: -10, energy: +20, social: 0, money: -15 } } ] },
{ cycleRange: [1,10], emoji: "🦟", title: "Mosquito en el Aula", desc: "Hay un zancudo molestando a toda la clase. Tienes que atraparlo.", choices: [ { text: "¡Atrápalo!", minigame: "catch", mgEmoji: "🦟", mgTitle: "Atrapar al Zancudo", mgDesc: "Espera a que el zancudo baje para aplastarlo.", winEffects: { social: +15, energy: -5, study: +5, money: 0 }, loseEffects: { social: -10, energy: -10, study: -5, money: 0 } }, { text: "Dejar que pique a los demás", effects: { social: -5, energy: 0, study: +5, money: 0 } } ] },
{ cycleRange: [3,10], emoji: "💔", title: "Ruptura Amorosa", desc: "Tu crush te acaba de decir que solo te ve como amigo.", choices: [ { text: "Ahogar las penas en fiesta", effects: { social: +30, energy: -20, study: -20, money: -30 } }, { text: "Enfocarte 100% en el estudio (Villain Arc)", effects: { social: -25, energy: 0, study: +35, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "🎨", title: "Feria de Arte", desc: "Hay una feria de arte en la rotonda y puedes participar pintando.", choices: [ { text: "Relajarte pintando un rato", effects: { energy: +20, social: +10, study: -15, money: 0 } }, { text: "Comprar una pulsera bonita", effects: { energy: +5, social: +5, study: 0, money: -15 } }, { text: "No tienes tiempo para eso", effects: { energy: -5, social: -5, study: +10, money: 0 } } ] },
{ cycleRange: [4,10], emoji: "😠", title: "Grupo Flojo", desc: "Tus compañeros de grupo no han avanzado nada y se entrega mañana.", choices: [ { text: "Gritarles y obligarlos a trabajar", minigame: "spam", mgEmoji: "😠", mgTitle: "¡Trabajen Flojos!", mgDesc: "Toca rápidamente para despertar a tu grupo.", winEffects: { social: -10, study: +20, energy: -15, money: 0 }, loseEffects: { social: -20, study: -15, energy: -25, money: 0 } }, { text: "Hacerlo todo tú solo (Otra vez)", effects: { social: -10, study: +25, energy: -35, money: 0 } } ] },
{ cycleRange: [2,8], emoji: "👗", title: "Ropa Sucia", desc: "Se te acabó la ropa limpia y tienes que lavar.", choices: [ { text: "Lavar a mano (Demora mucho)", effects: { energy: -20, study: -10, social: 0, money: 0 } }, { text: "Mandar todo a la lavandería", effects: { energy: 0, study: +5, social: 0, money: -25 } } ] },
{ cycleRange: [1,10], emoji: "🧮", title: "Error en el Sistema", desc: "El sistema calculó mal tus faltas y te quieren inhabilitar del curso.", choices: [ { text: "Hacer el reclamo formal", minigame: "order_steps", mgEmoji: "🧮", mgTitle: "Trámite de Reclamo", mgDesc: "Sigue los pasos correctos para que el sistema te acepte.", winEffects: { study: +15, energy: -10, social: 0, money: 0 }, loseEffects: { study: -25, energy: -20, social: 0, money: 0 } }, { text: "Pagar el trámite de reconsideración", effects: { study: +10, energy: 0, social: 0, money: -30 } } ] },
{ cycleRange: [1,10], emoji: "🐾", title: "Caca de Paloma", desc: "Una paloma te arruinó la camiseta justo cuando ibas a exponer.", choices: [ { text: "Exponer con la mancha", effects: { social: -20, study: +10, energy: -10, money: 0 } }, { text: "Comprar polera de la U de emergencia", effects: { social: +10, study: 0, energy: 0, money: -40 } } ] },
{ cycleRange: [1,10], emoji: "🚖", title: "Tráfico Infernal", desc: "Estás atrapado en Javier Prado y el examen empieza en 10 minutos.", choices: [ { text: "Bajar y correr", minigame: "timing", mgEmoji: "🏃", mgTitle: "Carrera Contra el Tiempo", mgDesc: "Esquiva a la gente frenando en el momento exacto.", winEffects: { energy: -25, study: +15, social: 0, money: 0 }, loseEffects: { energy: -35, study: -20, social: 0, money: 0 } }, { text: "Aceptar tu destino en el taxi", effects: { energy: 0, study: -25, social: 0, money: -15 } } ] },
{ cycleRange: [5,10], emoji: "👔", title: "Entrevista de Prácticas", desc: "Te llamaron para tu primera entrevista de trabajo.", choices: [ { text: "Prepararte a full", minigame: "word", mgEmoji: "💼", mgTitle: "Entrevista Laboral", mgDesc: "Forma la palabra clave para impresionar al reclutador.", winEffects: { study: +20, social: +15, energy: -20, money: +50 }, loseEffects: { study: -10, social: -15, energy: -20, money: 0 } }, { text: "Ir a ver qué sale", effects: { study: 0, social: +5, energy: -5, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "🎁", title: "Cumpleaños del Profe", desc: "Tu salón organizó una cuota para comprarle un regalo al profe.", choices: [ { text: "Colaborar con 20 soles", effects: { social: +15, study: +10, energy: 0, money: -20 } }, { text: "Hacerte el desentendido", effects: { social: -15, study: -5, energy: 0, money: 0 } } ] },
{ cycleRange: [1,10], emoji: "📸", title: "Foto para el Carnet", desc: "Están tomando fotos para renovar el carnet universitario.", choices: [ { text: "Arreglarte bien", minigame: "sequence", mgEmoji: "📸", mgTitle: "Foto para el Carnet", mgDesc: "Sigue la secuencia de poses para la foto perfecta.", winEffects: { social: +20, energy: -5, study: 0, money: 0 }, loseEffects: { social: -15, energy: -5, study: 0, money: 0 } }, { text: "Ir así nomás", effects: { social: -10, energy: 0, study: 0, money: 0 } } ] }

);

simEvents.push(
// --- EVENTOS DE ELECCION (BANDERAS) ---
{
    id: "event_choose_club",
    title: "Feria de Actividades Extra-curriculares",
    desc: "¡Es tu segundo ciclo y debes unirte a algo si no quieres ser un fantasma en la universidad! ¿A qué te inscribes?",
    emoji: "🎪",
    cycleRange: [2, 2],
    choices: [
        { text: "Círculo de Estudios (Más notas, menos vida)", setFlag: { key: 'club', value: 'Estudios' }, effects: { study: 15, social: -5, energy: -10, money: 0 } },
        { text: "Selección Deportiva (Energía y amigos)", setFlag: { key: 'club', value: 'Deportes' }, effects: { study: -10, social: 10, energy: 15, money: 0 } },
        { text: "Elenco de Teatro (Pura vida social)", setFlag: { key: 'club', value: 'Teatro' }, effects: { study: -10, social: 20, energy: -5, money: -10 } },
        { text: "Centro de Estudiantes (Contactos y estrés)", setFlag: { key: 'club', value: 'CEUL' }, effects: { study: 0, social: 15, energy: -15, money: 0 } }
    ]
},
{
    id: "event_choose_internship",
    title: "Feria Laboral: Prácticas Pre-Profesionales",
    desc: "El ciclo 6 está aquí y es hora de enfrentarte al mundo real. Varias empresas están reclutando. ¿A dónde postulas?",
    emoji: "💼",
    cycleRange: [6, 6],
    choices: [
        { text: "Startup 'TechBros' (Ritmo loco)", setFlag: { key: 'internship', value: 'Startup' }, effects: { study: 10, energy: -20, social: 0, money: 15 } },
        { text: "Ministerio Público (Tranquilo y burocrático)", setFlag: { key: 'internship', value: 'Estado' }, effects: { study: -5, energy: 5, social: 5, money: 10 } },
        { text: "Transnacional Corp. (Pagan bien, explotan)", setFlag: { key: 'internship', value: 'Corporación' }, effects: { study: 5, energy: -25, social: -10, money: 35 } }
    ]
},

// --- EVENTOS EXCLUSIVOS DE CÍRCULOS (CICLOS 2-10) ---

// Estudios
{ requireFlag: { key: 'club', value: 'Estudios' }, cycleRange: [2,10], emoji: "📚", title: "Maratón de Código/Lectura", desc: "El círculo de estudios organizó un amanecida para repasar. Estás destruido pero aprendiste mucho.", choices: [ { text: "Sobrevivir a punta de RedBull", effects: { study: +20, energy: -25, social: -5, money: -10 } }, { text: "Rendirte a las 3 AM", effects: { study: +5, energy: -5, social: 0, money: 0 } } ] },
{ requireFlag: { key: 'club', value: 'Estudios' }, cycleRange: [2,10], emoji: "🏆", title: "Concurso Académico", desc: "Representas a la U en un torneo interuniversitario.", choices: [ { text: "Dar lo mejor de ti", minigame: "word", mgEmoji: "🏆", mgTitle: "Respuesta Clave", mgDesc: "Adivina la palabra ganadora del concurso.", winEffects: { study: +25, social: +10, energy: -15, money: +30 }, loseEffects: { study: -5, social: -5, energy: -15, money: 0 } } ] },

// Deportes
{ requireFlag: { key: 'club', value: 'Deportes' }, cycleRange: [2,10], emoji: "⚽", title: "Final Interfacultades", desc: "Tu equipo llegó a la final. Todo el mundo está mirando.", choices: [ { text: "Dejar el alma en la cancha", minigame: "timing", mgEmoji: "⚽", mgTitle: "Tiro Libre Crucial", mgDesc: "Detén el medidor en el momento exacto para meter gol.", winEffects: { social: +25, energy: -20, study: -10, money: 0 }, loseEffects: { social: -10, energy: -25, study: -10, money: 0 } } ] },
{ requireFlag: { key: 'club', value: 'Deportes' }, cycleRange: [2,10], emoji: "🩹", title: "Lesión Leve", desc: "Te esguinzaste el tobillo en el entrenamiento.", choices: [ { text: "Ir al tópico y descansar", effects: { energy: +15, social: -10, study: +10, money: 0 } }, { text: "Hacerte el fuerte y jugar", effects: { energy: -30, social: +15, study: -5, money: 0 } } ] },

// Teatro
{ requireFlag: { key: 'club', value: 'Teatro' }, cycleRange: [2,10], emoji: "🎭", title: "Ensayo General", desc: "Ensayo hasta la madrugada antes del gran estreno.", choices: [ { text: "Aprender tu guión perfecto", minigame: "memory", mgEmoji: "🎭", mgTitle: "Memorizar Líneas", mgDesc: "Recuerda el orden exacto de tus diálogos.", winEffects: { social: +25, study: -15, energy: -20, money: 0 }, loseEffects: { social: -15, study: -10, energy: -20, money: 0 } } ] },
{ requireFlag: { key: 'club', value: 'Teatro' }, cycleRange: [2,10], emoji: "🎟️", title: "Vender Entradas", desc: "Te obligaron a vender 10 entradas para la obra o las pagas tú.", choices: [ { text: "Rogarle a tus amigos", effects: { social: +10, energy: -10, study: 0, money: -10 } }, { text: "Comprarlas tú mismo", effects: { social: 0, energy: 0, study: 0, money: -30 } } ] },

// CEUL (Política)
{ requireFlag: { key: 'club', value: 'CEUL' }, cycleRange: [2,10], emoji: "📢", title: "Asamblea Estudiantil", desc: "Hay un debate intenso sobre el precio del menú universitario.", choices: [ { text: "Dar un discurso", minigame: "typing", mgEmoji: "🎤", mgTitle: "Discurso Convincente", mgDesc: "Escribe la palabra clave para convencer a la asamblea estudiantil.", winEffects: { social: +30, energy: -15, study: -10, money: 0 }, loseEffects: { social: -20, energy: -10, study: -5, money: 0 } } ] },
{ requireFlag: { key: 'club', value: 'CEUL' }, cycleRange: [2,10], emoji: "📋", title: "Logística del Evento", desc: "Te tocó cargar las sillas para el evento de bienvenida.", choices: [ { text: "Trabajar como burro", effects: { social: +20, energy: -25, study: -10, money: 0 } }, { text: "Esconderte en el baño", effects: { social: -15, energy: +10, study: +5, money: 0 } } ] },

// --- EVENTOS EXCLUSIVOS DE PRÁCTICAS (CICLOS 6-10) ---

// Startup
{ requireFlag: { key: 'internship', value: 'Startup' }, cycleRange: [6,10], emoji: "🚀", title: "Pivot de Madrugada", desc: "El CEO decidió cambiar todo el modelo de negocio a las 11 PM.", choices: [ { text: "Programar hasta que salga el sol", minigame: "typing", winEffects: { study: +20, energy: -30, social: -10, money: +25 }, loseEffects: { study: -10, energy: -30, social: -5, money: 0 } } ] },
{ requireFlag: { key: 'internship', value: 'Startup' }, cycleRange: [6,10], emoji: "🍕", title: "Día de Pizza", desc: "No hay sueldo este mes, pero pagaron con Pizza y Ping Pong.", choices: [ { text: "Comer y llorar por dentro", effects: { energy: +15, social: +10, study: 0, money: -15 } }, { text: "Exigir tu sueldo", effects: { energy: -10, social: -20, study: 0, money: +30 } } ] },

// Estado
{ requireFlag: { key: 'internship', value: 'Estado' }, cycleRange: [6,10], emoji: "🗄️", title: "Cerro de Expedientes", desc: "Te han mandado a foliar 500 páginas de un expediente técnico.", choices: [ { text: "Hacerlo con paciencia", effects: { energy: -10, social: -5, study: +10, money: +15 } }, { text: "Sellar todo rápido", minigame: "typing", mgEmoji: "🗄️", mgTitle: "Foliar Expedientes", mgDesc: "Escribe la palabra clave para sellar los folios rápidamente.", winEffects: { energy: -5, social: 0, study: 0, money: +20 }, loseEffects: { energy: -15, social: -10, study: -10, money: 0 } } ] },
{ requireFlag: { key: 'internship', value: 'Estado' }, cycleRange: [6,10], emoji: "☕", title: "Hora del Cafecito", desc: "Todo el piso se paraliza a las 11 AM para tomar café y chismear.", choices: [ { text: "Unirte al chisme", effects: { social: +20, energy: +15, study: -15, money: 0 } }, { text: "Seguir trabajando solo", effects: { social: -15, energy: -5, study: +15, money: 0 } } ] },

// Corporación
{ requireFlag: { key: 'internship', value: 'Corporación' }, cycleRange: [6,10], emoji: "👔", title: "Reunión con Jefes Gringos", desc: "Tienes que presentar los reportes trimestrales en inglés fluido.", choices: [ { text: "Mandar el chamullo corporativo", minigame: "word", mgEmoji: "👔", mgTitle: "Presentación en Inglés", mgDesc: "Forma una palabra clave en inglés corporativo.", winEffects: { study: +15, social: +15, energy: -20, money: +40 }, loseEffects: { study: -15, social: -20, energy: -25, money: 0 } } ] },
{ requireFlag: { key: 'internship', value: 'Corporación' }, cycleRange: [6,10], emoji: "💰", title: "Bono de Productividad", desc: "Trabajaste 60 horas esta semana. Tu cuerpo muere pero tu billetera vive.", choices: [ { text: "Cobrar y dormir el fin de semana", effects: { energy: -35, social: -20, study: +10, money: +60 } }, { text: "Gastar el bono en una juerga épica", effects: { energy: -40, social: +30, study: -10, money: +10 } } ] },

);

simEvents.push(
// --- EVENTOS ESPECIFICOS POR GENERO ---
{
    requireFlag: { key: 'gender', value: 'F' },
    cycleRange: [1, 10],
    emoji: "👠",
    title: "Dilema de Vestuario",
    desc: "Tienes una exposición importante pero también quieres estar cómoda para caminar por todo el campus.",
    choices: [
        { text: "Outfit ejecutivo (Incomodidad total)", effects: { study: 10, social: 5, energy: -15, money: 0 } },
        { text: "Jeans y zapatillas (Prioridad confort)", effects: { study: 0, social: -5, energy: 10, money: 0 } }
    ]
},
{
    requireFlag: { key: 'gender', value: 'M' },
    cycleRange: [1, 10],
    emoji: "🪒",
    title: "El Debate de la Barba",
    desc: "Tienes una presentación final. Tu grupo te exige que te afeites porque te ves muy 'desarreglado'.",
    choices: [
        { text: "Afeitarte a regañadientes", effects: { study: 10, social: 5, energy: -5, money: 0 } },
        { text: "Ir así, es mi estilo", effects: { study: -5, social: 10, energy: 0, money: 0 } }
    ]
},

);
simEvents.push(...newSimEvents);

// CHAIN EVENTS & MINIGAME EVENTS
simEvents.push({
    id: "mg_examen",
    title: "Examen Parcial Sorpresa",
    desc: "El profe saca las hojas. Es hora de demostrar qué tanto estudiaste.",
    emoji: "📝",
    cycleRange: [1, 10],
    choices: [
        { 
            text: "Dar el examen (Minijuego de Concentración)", 
            minigame: "timing",
            winEffects: { study: 20, energy: -10 },
            partialEffects: { study: 5, energy: -15 },
            loseEffects: { study: -25, energy: -20, social: -5 },
            nextEvent: "mg_examen_result" // Chain event
        },
        { 
            text: "Fingir que te desmayas", 
            effects: { study: -15, energy: 0, social: 10, money: -20 },
            nextEvent: "mg_hospital" // Chain event
        }
    ]
});

simEvents.push({
    id: "mg_examen_result",
    title: "Notas Publicadas",
    desc: "Ya subieron las notas al sistema. Tu estrés está al límite.",
    emoji: "📊",
    cycleRange: [1, 10], // Technically triggered by chain
    choices: [
        { text: "Celebrar con los patas", effects: { social: 20, money: -20 } },
        { text: "Irte a dormir", effects: { energy: 30 } }
    ]
});

simEvents.push({
    id: "mg_hospital",
    title: "Enfermería de la U",
    desc: "Te llevaron a la enfermería. Tienes que pagar la medicina.",
    emoji: "🏥",
    cycleRange: [1, 10], // Chain target
    choices: [
        { text: "Pagar medicina cara", effects: { energy: 20, money: -40 } },
        { text: "Solo tomar agua y descansar", effects: { energy: 5, money: 0 } }
    ]
});

simEvents.push({
    id: "mg_sueño",
    title: "Clase de las 7:00 AM",
    desc: "El profesor está hablando con tono monótono. Tus ojos se cierran.",
    emoji: "🥱",
    cycleRange: [1, 10],
    choices: [
        { 
            text: "Luchar contra el sueño (Minijuego Tap)", 
            minigame: "spam",
            winEffects: { study: 15, energy: -10 },
            loseEffects: { study: -20, social: -10, energy: 10 },
            nextEvent: "mg_sueño_result"
        },
        { 
            text: "Rendirte y dormir en la carpeta", 
            effects: { study: -25, energy: 30, social: -10 } 
        }
    ]
});

simEvents.push({
    id: "mg_sueño_result",
    title: "Fin de la Clase",
    desc: "La clase terminó. Estás destrozado pero el profe notó tu esfuerzo.",
    emoji: "🔔",
    cycleRange: [1, 10], // Chain target
    choices: [
        { text: "Ir a tomar un café", effects: { energy: 20, money: -10 } },
        { text: "Preguntarle algo al profe", effects: { study: 15, social: 5 } }
    ]
});
