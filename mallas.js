/**
 * DOCUMENTO DE MALLAS CURRICULARES (PLANES DE ESTUDIO)
 * ═══════════════════════════════════════════════════
 * Este archivo centraliza todas las carreras y sus cursos por ciclo.
 * 
 * ¿CÓMO AÑADIR UNA NUEVA CARRERA?
 * 1. Crea una nueva clave dentro del objeto MALLAS (ej. `arquitectura: { ... }`)
 * 2. Define el `label` (Nombre de la carrera).
 * 3. Define la clave `mallas: { '2026': { ... } }`.
 * 4. Dentro del año de la malla (ej. '2026'), añade los ciclos del 1 al 10.
 *    Cada ciclo es un arreglo de objetos de cursos: `{ name: "Nombre del curso", credits: 4 }`
 * 5. Define la clave `electivos` que es un arreglo con la lista de cursos electivos de esa carrera.
 * 
 * El sistema del simulador leerá automáticamente cualquier carrera que añadas aquí.
 */

const MALLAS = {
  sistemas: {
    label: "Ingeniería de Sistemas",
    mallas: {
      '2026': {
        1: [ {name:"Lenguaje y comunicación I",credits:4}, {name:"Procesos psicológicos",credits:3}, {name:"Ética ciudadana",credits:2}, {name:"Introducción a la ingeniería",credits:3}, {name:"Metodologías de investigación",credits:3}, {name:"Precálculo",credits:5} ],
        2: [ {name:"Lenguaje y comunicación II",credits:3}, {name:"Filosofía aplicada",credits:3}, {name:"Fundamentos de economía",credits:3}, {name:"Introducción al comercio internacional",credits:3}, {name:"Álgebra lineal",credits:3}, {name:"Cálculo I",credits:5} ],
        3: [ {name:"Inteligencia artificial aplicada",credits:3}, {name:"Cálculo II",credits:5}, {name:"Sistemas organizacionales",credits:2}, {name:"Física para sistemas",credits:4}, {name:"Estructuras discretas de computación",credits:4}, {name:"Introducción a la programación",credits:4} ],
        4: [ {name:"Estadística y probabilidad",credits:4}, {name:"Cálculo III",credits:3}, {name:"Modelación e integración de sistemas",credits:3}, {name:"Costeo de operaciones",credits:3}, {name:"Programación orientada a objetos",credits:4}, {name:"Arquitectura de computadoras",credits:4} ],
        5: [ {name:"Estadística aplicada",credits:4}, {name:"Investigación de operaciones I",credits:4}, {name:"Sistemas operativos",credits:4}, {name:"Desarrollo de competencias gerenciales",credits:3}, {name:"Estructuras de datos I",credits:4}, {name:"Modelamiento de base de datos",credits:4} ],
        6: [ {name:"Ingeniería de procesos de negocio",credits:3}, {name:"Redes de computadoras",credits:4}, {name:"Simulación",credits:3}, {name:"Estructuras de datos II",credits:4}, {name:"Programación web",credits:3}, {name:"Gestión financiera",credits:3}, {name:"Electivo",credits:3} ],
        7: [ {name:"Sistemas de inteligencia empresarial",credits:4}, {name:"Gestión de operaciones",credits:3}, {name:"Ingeniería de software I",credits:4}, {name:"Aprendizaje de máquina",credits:4}, {name:"Ciberseguridad",credits:4}, {name:"Electivo",credits:3} ],
        8: [ {name:"Propuesta de investigación",credits:3}, {name:"Sistemas ERP",credits:3}, {name:"Auditoría y control de sistemas",credits:3}, {name:"Ingeniería de software II",credits:4}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3} ],
        9: [ {name:"Seminario de investigación I",credits:4}, {name:"Planeamiento estratégico",credits:3}, {name:"Gestión de proyectos",credits:3}, {name:"Seguridad de sistemas",credits:4}, {name:"Electivo",credits:3} ],
        10: [ {name:"Seminario de investigación II",credits:4}, {name:"Gestión de servicios digitales",credits:4}, {name:"Proyecto integrador de sistemas",credits:4}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3} ],
      }
    },
    electivos: [
      "Paradigmas de programación",
      "Análisis y diseño de algoritmos",
      "Deep learning",
      "Sistemas distribuidos",
      "Proyecto de desarrollo de software",
      "Proyecto de videojuegos",
      "Arquitectura de tecnologías de la información",
      "Seguridad, salud ocupacional y bienestar organizacional",
      "Internet de las cosas",
      "Redes avanzadas",
      "Programación móvil",
      "Analítica con big data",
      "Computación en la nube",
      "DevOps",
      "Gestión de base de datos",
      "Ingeniería del conocimiento",
      "Tópicos avanzados en ciberseguridad",
      "Analítica de negocios",
      "Innovación digital",
      "Arquitectura empresarial",
      "Interacción humano computadora",
      "Arquitectura de software"
    ]
  },
  industrial: {
    label: "Ingeniería Industrial",
    mallas: {
      '2026': {
        1: [ {name:"Lenguaje y comunicación I",credits:4}, {name:"Procesos psicológicos",credits:3}, {name:"Ética ciudadana",credits:2}, {name:"Introducción a la ingeniería",credits:3}, {name:"Metodologías de investigación",credits:3}, {name:"Precálculo",credits:5} ],
        2: [ {name:"Lenguaje y comunicación II",credits:3}, {name:"Filosofía aplicada",credits:3}, {name:"Fundamentos de economía",credits:3}, {name:"Introducción al comercio internacional",credits:3}, {name:"Álgebra lineal",credits:3}, {name:"Cálculo I",credits:5} ],
        3: [ {name:"Inteligencia artificial aplicada",credits:3}, {name:"Sistemas organizacionales",credits:2}, {name:"Diseño asistido por el computador",credits:3}, {name:"Química general",credits:4}, {name:"Física I",credits:5}, {name:"Cálculo II",credits:5} ],
        4: [ {name:"Estadística y probabilidad",credits:4}, {name:"Cálculo III",credits:3}, {name:"Costeo de operaciones",credits:3}, {name:"Fundamentos de programación",credits:3}, {name:"Física II",credits:5}, {name:"Mecánica",credits:4} ],
        5: [ {name:"Investigación de operaciones I",credits:4}, {name:"Fundamentos de operaciones y logística",credits:4}, {name:"Ingeniería económica",credits:4}, {name:"Electricidad y electrónica",credits:3}, {name:"Diseño de experimentos",credits:4}, {name:"Ecuaciones diferenciales",credits:3} ],
        6: [ {name:"Investigación de operaciones II",credits:4}, {name:"Ergonomía y diseño del trabajo",credits:4}, {name:"Planeamiento y control de operaciones",credits:4}, {name:"Innovación en ingeniería",credits:3}, {name:"Procesos industriales",credits:4}, {name:"Electivo",credits:3} ],
        7: [ {name:"Ingeniería financiera",credits:3}, {name:"Diseño de instalaciones",credits:3}, {name:"Inteligencia de negocios",credits:3}, {name:"Modelos de sistemas logísticos",credits:4}, {name:"Calidad",credits:3}, {name:"Procesos de manufactura",credits:3}, {name:"Electivo",credits:3} ],
        8: [ {name:"Simulación de procesos",credits:4}, {name:"Modelamiento predictivo de datos",credits:3}, {name:"Sistemas integrados de gestión",credits:3}, {name:"Análisis de problemas de ingeniería",credits:3}, {name:"Automatización industrial",credits:3}, {name:"Gestión de proyectos",credits:3}, {name:"Electivo",credits:3} ],
        9: [ {name:"Ética y gestión humana",credits:3}, {name:"Proyecto de ingeniería aplicada I",credits:4}, {name:"Ingeniería comercial",credits:3}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3} ],
        10: [ {name:"Proyecto ingeniería aplicada II",credits:4}, {name:"Gerencia estratégica",credits:3}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3} ],
      }
    },
    electivos: [
      "Ingeniería de seguridad",
      "Gestión de proyectos de diseño",
      "Supply chain management",
      "Dirección en implementación de proyectos",
      "Diseño y prototipado",
      "Procesos logísticos ERP",
      "Gerencia B2B",
      "Taller de liderazgo",
      "Materiales en la manufactura",
      "Compras y gestión del abastecimiento",
      "Gestión del comercio internacional",
      "Robotic process automation",
      "Ingeniería del transporte y distribución",
      "Herramientas de marketing digital",
      "Programación para ingeniería",
      "Transformacion digital",
      "Juego de negocios",
      "Creatividad, innovación y emprendimiento",
      "Machine learning",
      "Gestión de operaciones de servicios",
      "Sostenibilidad industrial",
      "Sistemas de información gerencial",
      "Introducción a sistemas de gestión de bases de datos",
      "Formulación y evaluación de proyectos",
      "Diseño de proyectos sostenibles",
      "Herramientas informáticas",
      "Gestión de recursos",
      "Seguridad, salud ocupacional y bienestar organizacional",
      "Taller de habilidades gerenciales",
      "Estrategia de inteligencia empresarial",
      "Metodologías ágiles",
      "Tecnologías de programación",
      "Lean six sigma",
      "Gestión de riesgos y portafolios"
    ]
  },
  civil: {
    label: "Ingeniería Civil",
    mallas: {
      '2026': {
        1: [ {name:"Lenguaje y comunicación I",credits:4}, {name:"Procesos psicológicos",credits:3}, {name:"Ética ciudadana",credits:2}, {name:"Introducción a la ingeniería",credits:3}, {name:"Metodologías de investigación",credits:3}, {name:"Precálculo",credits:5} ],
        2: [ {name:"Lenguaje y comunicación II",credits:3}, {name:"Filosofía aplicada",credits:3}, {name:"Fundamentos de economía",credits:3}, {name:"Introducción al comercio internacional",credits:3}, {name:"Álgebra lineal",credits:3}, {name:"Cálculo I",credits:5} ],
        3: [ {name:"Cálculo II",credits:4}, {name:"Química aplicada",credits:3}, {name:"Topografía",credits:3}, {name:"Ingeniería gráfica",credits:3}, {name:"Física I",credits:4}, {name:"Inteligencia artificial aplicada",credits:3} ],
        4: [ {name:"Ecuaciones diferenciales",credits:4}, {name:"Tecnología del concreto",credits:3}, {name:"Física II",credits:4}, {name:"Modelación de información de edificaciones I",credits:4}, {name:"Tecnología de construcción I",credits:4}, {name:"Geología aplicada",credits:4} ],
        5: [ {name:"Programación digital",credits:3}, {name:"Estática",credits:4}, {name:"Tecnología de construcción II",credits:4}, {name:"Modelación de información de edificaciones II",credits:4}, {name:"Dinámica",credits:4}, {name:"Mecánica de suelos I",credits:4} ],
        6: [ {name:"Instalaciones en edificaciones",credits:5}, {name:"Costos y presupuestos",credits:3}, {name:"Tecnología de los materiales",credits:3}, {name:"Resistencia de materiales",credits:5}, {name:"Ingeniería ambiental",credits:3}, {name:"Mecánica de suelos II",credits:4} ],
        7: [ {name:"Mecánica de fluidos",credits:4}, {name:"Gestión de proyectos de construcción",credits:4}, {name:"Métodos numéricos",credits:2}, {name:"Análisis estructural I",credits:3}, {name:"Ingeniería de transporte I",credits:3}, {name:"Fundamentos del planeamiento urbano y regional",credits:2}, {name:"Ética, liderazgo y responsabilidad social",credits:2} ],
        8: [ {name:"Hidráulica",credits:4}, {name:"Gestión de proyectos de operación y mantenimiento",credits:3}, {name:"Ingeniería sismorresistente",credits:4}, {name:"Gestión estratégica de contratos",credits:3}, {name:"Concreto armado I",credits:4}, {name:"Electivo",credits:3} ],
        9: [ {name:"Hidrología",credits:4}, {name:"Seminario de investigación I",credits:4}, {name:"Electivo",credits:3} ],
        10: [ {name:"Estructuras metálicas",credits:5}, {name:"Seminario de investigación II",credits:4}, {name:"Electivo",credits:3} ],
      }
    },
    // Electivos organizados por ciclo (ciclo 8, 9 y 10), según la malla oficial:
    // cada ciclo tiene su propia lista de electivos entre los que elegir.
    electivos: {
      8: [
        "Gestión de calidad",
        "Diseño y construcción vial",
        "Análisis estructural II",
        "Geomática"
      ],
      9: [
        "Concreto armado II",
        "Abastecimiento de agua y saneamiento",
        "Puentes",
        "Gestión de seguridad y salud en el trabajo",
        "Concreto preesforzado",
        "Túneles",
        "Gestión de riesgos y desastres",
        "Geotecnia en infraestructura de transporte",
        "Productividad en obras"
      ],
      10: [
        "Infraestructuras sostenibles",
        "Gestión y desarrollo inmobiliario",
        "Albañilería",
        "Gestión de riesgos en proyectos",
        "Ingeniería de transporte II",
        "Ingeniería de los recursos hidráulicos",
        "Pavimentos",
        "Seguridad, salud ocupacional y bienestar organizacional"
      ]
    }
  },
  mecatronica: {
    label: "Ingeniería Mecatrónica",
    mallas: {
      '2026': {
        1: [ {name:"Lenguaje y comunicación I",credits:4}, {name:"Procesos psicológicos",credits:3}, {name:"Ética ciudadana",credits:2}, {name:"Introducción a la ingeniería",credits:3}, {name:"Metodologías de investigación",credits:3}, {name:"Precálculo",credits:5} ],
        2: [ {name:"Lenguaje y comunicación II",credits:3}, {name:"Filosofía aplicada",credits:3}, {name:"Fundamentos de economía",credits:3}, {name:"Introducción al comercio internacional",credits:3}, {name:"Álgebra lineal",credits:3}, {name:"Cálculo I",credits:5} ],
        3: [ {name:"Inteligencia artificial aplicada",credits:3}, {name:"Cálculo II",credits:5}, {name:"Circuitos digitales",credits:4}, {name:"Física I",credits:4}, {name:"Sistemas organizacionales",credits:2}, {name:"Dibujo mecánico",credits:4} ],
        4: [ {name:"Ecuaciones diferenciales",credits:4}, {name:"Estadística y probabilidad",credits:4}, {name:"Circuitos eléctricos",credits:4}, {name:"Física II",credits:4}, {name:"Fundamentos de máquinas y mecanismos",credits:3}, {name:"Química general",credits:4} ],
        5: [ {name:"Análisis complejo y transformadas",credits:4}, {name:"Costos y presupuestos",credits:3}, {name:"Programación de computadoras",credits:3}, {name:"Mecánica aplicada",credits:4}, {name:"Ingeniería de resistencia de metales",credits:4}, {name:"Circuitos electrónicos",credits:4} ],
        6: [ {name:"Análisis de señales y sistemas",credits:4}, {name:"Tecnología de materiales de innovación",credits:3}, {name:"Control de sistemas dinamicos I",credits:4}, {name:"Ingeniería de fluidos y calor",credits:3}, {name:"Desarrollo de competencias gerenciales",credits:3}, {name:"Microcontroladores",credits:3}, {name:"Sensores y actuadores inteligentes",credits:3} ],
        7: [ {name:"Diseño y manufactura asistida por computador",credits:3}, {name:"Máquinas eléctricas",credits:3}, {name:"Aprendizaje de máquinas",credits:3}, {name:"Sistemas embebidos e IoT industrial",credits:4}, {name:"Control de sistemas dinámicos II",credits:4}, {name:"Formulación y evaluación de proyectos",credits:3}, {name:"Electivo",credits:3} ],
        8: [ {name:"Diseño de sistemas mecatrónicos",credits:4}, {name:"Proyecto de investigación",credits:4}, {name:"Control de procesos industriales",credits:3}, {name:"Manufactura integrada por computadora",credits:4}, {name:"Procesamiento digital de imágenes",credits:4}, {name:"Electivo",credits:3} ],
        9: [ {name:"Diseño de plantas industriales",credits:4}, {name:"Proyecto integrador de mecatrónica I",credits:4}, {name:"Gestión de proyectos",credits:3}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3} ],
        10: [ {name:"Sistemas robóticos industriales",credits:3}, {name:"Proyecto integrador de mecatrónica II",credits:4}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3} ],
      }
    },
    electivos: [
      "Sistemas neumáticos",
      "Redes y protocolos industriales",
      "Sistemas autónomos no tripulados",
      "Visión artificial para robótica",
      "Transformación digital",
      "Diseño de proyectos sostenibles",
      "Big data",
      "Ciberseguridad",
      "Diseño y fabricación de grippers",
      "Realidad virtual y aumentada",
      "Diseño y prototipado",
      "Seguridad, salud ocupacional y bienestar organizacional",
      "Gestión de proyectos de diseño",
      "Tecnología industrial",
      "Sistemas SCADA",
      "Digital twin",
      "Tecnologías de programación"
    ]
  },
  ambiental: {
    label: "Ingeniería Ambiental",
    mallas: {
      '2026': {
        1: [ {name:"Lenguaje y comunicación I",credits:4}, {name:"Procesos psicológicos",credits:3}, {name:"Ética ciudadana",credits:2}, {name:"Introducción a la ingeniería",credits:3}, {name:"Metodologías de investigación",credits:3}, {name:"Precálculo",credits:5} ],
        2: [ {name:"Lenguaje y comunicación II",credits:3}, {name:"Filosofía aplicada",credits:3}, {name:"Fundamentos de economía",credits:3}, {name:"Introducción al comercio internacional",credits:3}, {name:"Álgebra lineal",credits:3}, {name:"Cálculo I",credits:5} ],
        3: [ {name:"Inteligencia artificial aplicada",credits:3}, {name:"Sistemas de información geográfica",credits:3}, {name:"Fundamentos de programación",credits:3}, {name:"Física I",credits:5}, {name:"Química general",credits:4}, {name:"Cálculo II",credits:5} ],
        4: [ {name:"Principios de ingeniería sostenible",credits:3}, {name:"Estadística y probabilidad",credits:4}, {name:"Biología ambiental",credits:4}, {name:"Física II",credits:5}, {name:"Química ambiental",credits:4}, {name:"Cálculo III",credits:3} ],
        5: [ {name:"Estadística aplicada",credits:4}, {name:"Derecho y legislación ambiental",credits:3}, {name:"Cambio climático",credits:3}, {name:"Termodinámica",credits:3}, {name:"Ciencia del suelo",credits:3}, {name:"Técnicas instrumentales de análisis",credits:4} ],
        6: [ {name:"Gestión sostenible de residuos",credits:3}, {name:"Costeo de proyectos ambientales",credits:3}, {name:"Tecnologías de control de la contaminación del aire",credits:4}, {name:"Energías renovables",credits:3}, {name:"Mecánica de fluidos",credits:3}, {name:"Microbiología ambiental",credits:3}, {name:"Electivo",credits:3} ],
        7: [ {name:"Medio ambiente y sociedad",credits:3}, {name:"Recursos naturales y ecosistemas",credits:3}, {name:"Tecnologías de control de la contaminación del agua",credits:4}, {name:"Ética y responsabilidad social",credits:3}, {name:"Sistemas integrados de gestión",credits:3}, {name:"Economía ambiental",credits:3}, {name:"Electivo",credits:3} ],
        8: [ {name:"Evaluación del impacto ambiental",credits:3}, {name:"Hidrología",credits:4}, {name:"Tecnologías de control de la contaminación del suelo",credits:4}, {name:"Inteligencia de negocios",credits:3}, {name:"Gestión de recursos energéticos",credits:3}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3} ],
        9: [ {name:"Ecotoxicología ambiental",credits:3}, {name:"Proyecto de ingeniería aplicada I",credits:4}, {name:"Formulación y diseño de proyectos sostenibles",credits:3}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3} ],
        10: [ {name:"Proyecto de ingeniería aplicada II",credits:4}, {name:"Restauración y compensación ambiental",credits:3}, {name:"Gestión de proyectos",credits:3}, {name:"Electivo",credits:3}, {name:"Electivo",credits:3} ],
      }
    },
    electivos: [
      "Servicios ecosistémicos",
      "Análisis del ciclo de vida",
      "Evaluación de riesgos y gestión de productos químicos peligrosos",
      "Prevención y negociación de conflictos ambientales",
      "Biotecnología ambiental",
      "Modelamiento y simulación de sistemas ambientales",
      "Seguridad, salud ocupacional y bienestar organizacional",
      "Ecología",
      "Tecnología solar fotovoltaica",
      "Deterioro ambiental y salud humana",
      "Gestión de riesgos ambientales",
      "Diseño y prototipado",
      "Tecnologías para la biorremediación",
      "Economía circular",
      "Calidad de aire interior",
      "Logística verde y cadena de suministro sostenible",
      "Estrategias empresariales para la descarbonización",
      "Aplicaciones de IoT para la sostenibilidad ambiental",
      "Manejo de sitios contaminados"
    ]
  },
  administracion: {
    label: "Administración",
    mallas: {
      '2026': {
        1: [ {name:"Lenguaje y comunicación I",credits:4}, {name:"Ética ciudadana",credits:2}, {name:"Matemática aplicada a los negocios I",credits:5}, {name:"Procesos psicológicos",credits:3}, {name:"Metodologías de investigación",credits:3}, {name:"Historia económica nacional contemporánea",credits:3} ],
        2: [ {name:"Filosofía aplicada",credits:3}, {name:"Lenguaje y comunicación II",credits:3}, {name:"Economía y empresa",credits:3}, {name:"Introducción al comercio internacional",credits:3}, {name:"Estadística básica para los negocios",credits:3}, {name:"Matemática aplicada a los negocios II",credits:5} ],
        3: [ {name:"Introducción a las finanzas",credits:3}, {name:"Contabilidad general",credits:4}, {name:"Fundamentos de administración",credits:4}, {name:"Matemática para la gestión de negocios",credits:4}, {name:"Estadística para la gestión empresarial I",credits:4}, {name:"Herramientas informáticas para la gestión I",credits:3} ],
        4: [ {name:"Costos y presupuestos",credits:4}, {name:"Planeamiento estratégico I",credits:4}, {name:"Microeconomía",credits:3}, {name:"Introducción al marketing",credits:3}, {name:"Estadística para la gestión empresarial II",credits:4}, {name:"Herramientas informáticas para la gestión II",credits:3} ],
        5: [ {name:"Diseño organizacional",credits:4}, {name:"Gestión de personas",credits:3}, {name:"Elaboración de estados financieros",credits:3}, {name:"Macroeconomía",credits:3}, {name:"Marketing estratégico",credits:3}, {name:"Gestión legal empresarial",credits:4} ],
        6: [ {name:"Planeamiento estratégico II",credits:4}, {name:"Comportamiento organizacional",credits:3}, {name:"Administración de operaciones",credits:3}, {name:"Investigación y análisis de mercado",credits:4}, {name:"Tecnologías de información para la gestión",credits:3}, {name:"Análisis de la información financiera",credits:3} ],
        7: [ {name:"Taller de innovación y creatividad empresarial",credits:3}, {name:"Logística y comercio internacional",credits:3}, {name:"Taller de liderazgo y habilidades gerenciales",credits:3}, {name:"Legislación laboral",credits:3}, {name:"Gestión comercial",credits:4}, {name:"Gestión financiera",credits:4}, {name:"Electivo",credits:3} ],
        8: [ {name:"Taller de emprendimiento y creación de negocios",credits:4}, {name:"Gestión de la cadena de suministro",credits:3}, {name:"Mercado de valores",credits:3}, {name:"Ética y sostenibilidad empresarial",credits:3}, {name:"Taller de investigación empresarial",credits:3}, {name:"Electivo",credits:3} ],
        9: [ {name:"Inteligencia de negocios",credits:4}, {name:"Gerencia de operaciones",credits:4}, {name:"Gerencia financiera",credits:4}, {name:"Seminario de investigación en administración I",credits:4}, {name:"Electivo",credits:3} ],
        10: [ {name:"Dirección estratégica",credits:4}, {name:"Seminario de investigación en administración II",credits:4}, {name:"Gerencia de personas",credits:4}, {name:"Gerencia de marketing",credits:4}, {name:"Electivo",credits:3} ],
      }
    },
    // Cursos electivos: cada ciclo (7, 8, 9 y 10) tiene un slot fijo "Electivo"
    // dentro de la malla (ver arriba), igual que en Civil, así que cuentan para
    // el total de créditos del ciclo y disparan el selector de electivos por
    // ciclo automáticamente en las 3 rutas de creación (clásica, personalizada
    // y en blanco). Cada ciclo tiene su propia lista de opciones entre las que
    // elegir.
    electivos: {
      7: [
        "Gestión de empresas familiares",
        "Sistemas integrados de gestión",
        "Finanzas personales y nuevos negocios",
        "Gestión del talento global",
        "Gestión de personas por competencias",
        "Branding estratégico",
        "Taller de marketing digital"
      ],
      8: [
        "ERP para la gestión empresarial",
        "Turismo sostenible",
        "Agilidad organizacional",
        "Gerencia de activos financieros",
        "Marca personal y gestión de carrera",
        "CRM y fidelización del cliente"
      ],
      9: [
        "Gestión de startups",
        "Juego de negocios",
        "Gestión de inversiones I",
        "Gerencia de proyectos",
        "Gestión ambiental",
        "Seguridad, salud ocupacional y bienestar organizacional",
        "Trade y retail marketing",
        "Herramientas informáticas para las finanzas",
        "Resolución de conflictos y negociación"
      ],
      10: [
        "Business analytics",
        "Inteligencia artificial para la gestión",
        "Gestión del servicio",
        "Modelos de optimización logística",
        "Gestión de riesgos y seguros",
        "Gestión de inversiones II",
        "Coaching, mindfulness e inteligencia emocional",
        "Gobierno corporativo y compliance",
        "Marketing B2B"
      ]
    }
  }
};
