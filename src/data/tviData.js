// Datos y contenidos educativos para TVI (Tu Voz Importa)

export const PANORAMA_DATA = [
  {
    id: 1,
    percentage: 68,
    title: "Estudiantes que dudan en opinar por temor a burlas",
    subtitle: "La seguridad psicológica en el aula es clave para el aprendizaje.",
    category: "Participación y Confianza",
    accent: "#d97706",
    barColor: "linear-gradient(90deg, #1e293b 0%, #d97706 100%)",
    impact: "Cuando predomina el miedo al ridículo o a burlas machistas, el 68% de las y los alumnos opta por callar, apagando su curiosidad intelectual y bajando su rendimiento.",
    solution: "Crear normas colectivas de cero tolerancia a la burla y validar cada aporte con empatía desde el primer día."
  },
  {
    id: 2,
    percentage: 74,
    title: "Jóvenes que perciben roles desiguales en equipos",
    subtitle: "Suele asignarse el liderazgo o la redacción según estereotipos.",
    category: "Dinámica de Trabajo",
    accent: "#c2410c",
    barColor: "linear-gradient(90deg, #1e293b 0%, #c2410c 100%)",
    impact: "Aún se delega automáticamente la coordinación o áreas técnicas a los varones y la decoración o toma de notas a las mujeres. Esto limita el desarrollo integral de talentos.",
    solution: "Rotar roles de liderazgo de manera obligatoria y fomentar que todxs experimenten coordinación, investigación y oratoria."
  },
  {
    id: 3,
    percentage: 82,
    title: "Mejora del clima escolar al existir redes de apoyo",
    subtitle: "Contar con alguien de confianza reduce el aislamiento estudiantil.",
    category: "Bienestar y Respaldo",
    accent: "#0d9488",
    barColor: "linear-gradient(90deg, #0f172a 0%, #0d9488 100%)",
    impact: "Tener al menos un referente empático (docente, tutor, compañerx o directivo) disminuye el riesgo de depresión escolar y potencia las ganas de asistir al colegio.",
    solution: "Promover círculos de escucha, buzones de consulta anónima y tutorías entre pares donde la vulnerabilidad sea bienvenida."
  },
  {
    id: 4,
    percentage: 59,
    title: "Estudiantes que no saben a quién acudir ante exclusión",
    subtitle: "Visibilizar rutas de orientación escolar salva y acompaña.",
    category: "Orientación y Rutas de Ayuda",
    accent: "#d97706",
    barColor: "linear-gradient(90deg, #1e293b 0%, #d97706 100%)",
    impact: "Casi 6 de cada 10 estudiantes viven el maltrato o la discriminación en soledad porque no conocen los canales de ayuda de su institución o temen represalias.",
    solution: "Publicar en carteleras y medios digitales los pasos exactos y personas designadas para brindar auxilio sin revictimizar."
  }
];

export const AMBITO_ESCOLAR_PILARES = [
  {
    icon: "🎓",
    title: "Seguridad para Preguntar y Opinar",
    desc: "Un aula con igualdad no juzga el tono de voz ni las dudas. Cuando nadie teme burlas por su género, el aprendizaje fluye con confianza."
  },
  {
    icon: "🔬",
    title: "Vocaciones sin Etiquetas de Género",
    desc: "Ciencias, artes, tecnología y humanidades son para todxs. Derribar estereotipos abre el futuro de cada estudiante sin límites."
  },
  {
    icon: "🤝",
    title: "Convivencia y Relaciones Sanas",
    desc: "Eliminar frases como 'los niños no lloran' o 'las niñas deben callar' previene la violencia y fortalece la empatía mutua."
  },
  {
    icon: "🛡️",
    title: "Espacios Libres de Micro-Acoso",
    desc: "Apodos sexistas, burlas sobre el cuerpo o tocamientos nunca son bromas. Un colegio sano protege la integridad de todxs."
  }
];

// Textos de Mitos y Verdades optimizados y concisos para que quepan perfectamente en cualquier pantalla sin desbordar
export const MITOS_Y_VERDADES = [
  {
    id: 1,
    mito: "La igualdad solo busca favorecer a las mujeres.",
    verdad: "Beneficia a toda la comunidad escolar.",
    explicacion: "Libera a los chicos de la presión de reprimir emociones y a las chicas del silenciamiento. ¡Ganamos todxs!"
  },
  {
    id: 2,
    mito: "Con el mismo uniforme ya todxs somos iguales.",
    verdad: "El uniforme no borra los sesgos invisibles.",
    explicacion: "La desigualdad se nota al repartir liderazgos, en quién acapara el patio o en las interrupciones en clase."
  },
  {
    id: 3,
    mito: "Hay materias para chicos y materias para chicas.",
    verdad: "El talento y la inteligencia no tienen género.",
    explicacion: "La neurociencia confirma que la capacidad para ciencias, matemáticas o arte es exactamente la misma."
  },
  {
    id: 4,
    mito: "Las bromas pesadas de género son parte de crecer.",
    verdad: "Si humilla, duele o incomoda, NO es una broma.",
    explicacion: "Normalizar comentarios sexistas perpetúa el acoso y causa heridas emocionales reales."
  },
  {
    id: 5,
    mito: "Pedir ayuda a un supervisor o profesor es de débiles.",
    verdad: "Buscar apoyo es un acto de valentía y madurez.",
    explicacion: "Nadie debe aguantar exclusión a solas. Acudir a un adulto mayor de confianza protege tu bienestar."
  }
];

export const ENCUESTA_PREGUNTAS = [
  {
    id: 1,
    pregunta: "Cuando tienes una duda o quieres opinar en clase, ¿cómo te sientes habitualmente?",
    opciones: [
      { texto: "Con plena libertad y seguridad de que seré respetadx sin importar mi género.", puntos: 3, color: "verde" },
      { texto: "A veces dudo o callo por miedo a comentarios o burlas sutiles.", puntos: 2, color: "amarillo" },
      { texto: "Casi siempre callo; temo que me juzguen, se burlen o me ignoren.", puntos: 1, color: "rojo" }
    ]
  },
  {
    id: 2,
    pregunta: "En los trabajos en equipo o dinámicas escolares, ¿cómo se definen los roles?",
    opciones: [
      { texto: "De forma equitativa; todxs podemos liderar o encargarnos de cualquier área.", puntos: 3, color: "verde" },
      { texto: "A veces se asume que ciertos roles 'van con chicos' y otros 'con chicas'.", puntos: 2, color: "amarillo" },
      { texto: "Muy desiguales; se impone quién lidera o escribe según estereotipos.", puntos: 1, color: "rojo" }
    ]
  },
  {
    id: 3,
    pregunta: "Si presencias o vives discriminación o acoso por género, ¿sabes qué hacer?",
    opciones: [
      { texto: "Sí, sé a qué docente o tutorx acudir y confío en que intervendrán bien.", puntos: 3, color: "verde" },
      { texto: "Conozco a alguien para contarle, pero dudo de si harán algo efectivo.", puntos: 2, color: "amarillo" },
      { texto: "No sé a quién acudir o tengo miedo de que empeoren las cosas si hablo.", puntos: 1, color: "rojo" }
    ]
  },
  {
    id: 4,
    pregunta: "¿Sientes que tus límites personales y tus emociones son valorados por tus compañerxs?",
    opciones: [
      { texto: "Sí, existe respeto mutuo donde puedo decir 'no' sin ser juzgadx.", puntos: 3, color: "verde" },
      { texto: "A veces hay bromas incómodas sobre mi cuerpo o mis emociones.", puntos: 2, color: "amarillo" },
      { texto: "Sufro constantemente burlas, apodos denigrantes o presión de grupo.", puntos: 1, color: "rojo" }
    ]
  },
  {
    id: 5,
    pregunta: "¿En tu institución educativa se habla abiertamente sobre igualdad y respeto?",
    opciones: [
      { texto: "Sí, constantemente promueven debates respetuosos y actividades inclusivas.", puntos: 3, color: "verde" },
      { texto: "Solo en fechas puntuales de forma superficial; falta escucha real.", puntos: 2, color: "amarillo" },
      { texto: "Nunca se toca el tema o se refuerzan prejuicios desde el personal.", puntos: 1, color: "rojo" }
    ]
  },
  {
    id: 6,
    pregunta: "Durante los recreos o actividades libres, ¿sientes que los espacios son compartidos?",
    opciones: [
      { texto: "Sí, las canchas, patios y áreas comunes son compartidos con justicia.", puntos: 3, color: "verde" },
      { texto: "Ciertos grupos monopolizan los espacios y resulta incómodo integrarse.", puntos: 2, color: "amarillo" },
      { texto: "Me siento totalmente excluidx o insegurx al transitar por el colegio.", puntos: 1, color: "rojo" }
    ]
  }
];

export const RESULTADOS_SEMAFORO = {
  rojo: {
    nivel: "Alerta Crítica: Espacio No Seguro",
    color: "#ef4444",
    bgSoft: "#fef2f2",
    border: "#fca5a5",
    badge: "🔴 SEMÁFORO ROJO",
    mensajePrincipal: "No te encuentras en un lugar seguro. Tu bienestar emocional y físico es primordial, y con la ayuda de un supervisor o persona mayor de confianza debes buscar apoyo de inmediato.",
    analisis: "Tus respuestas reflejan que estás enfrentando silenciamiento, temor a represalias, exclusión constante o situaciones de acoso en tu entorno escolar. NADA de esto es tu culpa y no mereces vivir con miedo en tu propio colegio.",
    pasosAccion: [
      "Identifica a una persona adulta en la que sí confíes: puede ser un docente empático, tu tutorx de aula, el/la psicólogx escolar, tus familiares o un directivo.",
      "Cuéntale de manera honesta lo que estás sintiendo o viviendo. Puedes pedirle que la conversación sea confidencial.",
      "Si sientes que las palabras no salen, puedes escribirlo en una carta o mostrarle esta misma pantalla.",
      "Recuerda que exigir respeto y seguridad no es 'ser dramáticx' ni 'acusadorx'; es tu derecho inalienable a una educación digna y libre de violencia."
    ],
    recursos: "Si sientes que nadie en tu colegio te escucha, acude a las líneas gratuitas de protección a la niñez y adolescencia de tu ciudad o a organizaciones de defensa estudiantil."
  },
  amarillo: {
    nivel: "Zona de Atención: Medianamente Seguro",
    color: "#eab308",
    bgSoft: "#fefce8",
    border: "#fde047",
    badge: "🟡 SEMÁFORO AMARILLO",
    mensajePrincipal: "Tu entorno no es del todo seguro, pero tampoco es malo. Existen espacios de convivencia, pero también señales de alerta que deben atenderse.",
    analisis: "Aunque cuentas con algunos momentos de tranquilidad y personas amables, aún percibes comentarios sexistas, roles rígidos en los equipos o momentos donde prefieres guardar silencio para no crear conflictos. Estar en este nivel significa que la convivencia puede y debe mejorar.",
    pasosAccion: [
      "Construye alianzas: dialoga con compañerxs que piensen como tú para apoyarse mutuamente al participar en clase.",
      "Practica poner límites asertivos: cuando escuches una broma machista o excluyente, puedes decir con calma: 'Ese comentario no da risa y no está bien'.",
      "Propón a tus profesores proyectos o debates donde se aborde la equidad de género y la escucha en el aula.",
      "Acércate a tu centro de estudiantes o delegadxs escolares para solicitar que los espacios recreativos y roles de equipo sean más equitativos."
    ],
    recursos: "Tu voz puede ser el puente para que este espacio pase de 'regular' a ser un entorno verdaderamente inspirador y seguro."
  },
  verde: {
    nivel: "Espacio Seguro y Saludable",
    color: "#10b981",
    bgSoft: "#f0fdf4",
    border: "#86efac",
    badge: "🟢 SEMÁFORO VERDE",
    mensajePrincipal: "¡Te encuentras en un lugar totalmente seguro y sano! Tu colegio o tu círculo cercano fomenta la escucha activa, la igualdad de género y el respeto mutuo.",
    analisis: "Sientes libertad para opinar sin miedo a burlas, los liderazgos se comparten con justicia y sabes a quién acudir si algo se sale de control. Este es el ambiente escolar que cada niña, niño y joven en el mundo merece experimentar.",
    pasosAccion: [
      "Sé un escudo para lxs demás: si ves que alguien es interrumpidx o burladx por su género, alza la voz por esa persona ('Quiero escuchar lo que ella/él tiene que decir').",
      "Invita a compañerxs solitarixs a sumarse a tus equipos de trabajo y asegúrate de que sus ideas brillen.",
      "Mantén viva la cultura de respeto y empatía en los recreos, pasillos y grupos de mensajería.",
      "Agradece a tus docentes y tutores por construir un espacio seguro e inspira a otros salones a replicar sus buenas prácticas."
    ],
    recursos: "¡Felicitaciones! Continúa siendo un faro de empatía y liderazgo positivo para toda tu comunidad educativa."
  }
};

export const DATOS_NUBI = [
  "✨ La igualdad de género en la escuela no es competir, ¡es ser un equipo donde todxs juegan con las mismas oportunidades!",
  "💡 Cuando los docentes dan igual tiempo de palabra a chicas y chicos, la confianza de todo el grupo se duplica.",
  "🌟 Expresar tus emociones o llorar no te hace débil. ¡Demuestra madurez, valentía y autenticidad!",
  "📚 Las matemáticas, la robótica y el arte no tienen género: tu mente es capaz de alcanzar cualquier meta.",
  "🎈 Un espacio escolar sano es aquel donde jamás tienes que pedir disculpas por ser quien eres.",
  "🤍 Si sientes que nadie te escucha hoy, recuerda que tu voz existe, tiene peso y merece ser valorada.",
  "🕊️ Una broma deja de ser broma en el exacto instante en que causa dolor o incomodidad en otra persona.",
  "🌱 El 82% de las y los jóvenes mejora su rendimiento escolar cuando cuenta con una red de apoyo empática.",
  "🌈 Escuchar con respeto y sin juzgar es el superpoder más transformador de la vida escolar."
];

export const NUBI_PREGUNTAS_RAPIDAS = [
  {
    pregunta: "📚 ¿Por qué importa la igualdad en la escuela?",
    respuesta: "Porque garantiza que nadie sienta vergüenza al levantar la mano, que las materias se elijan por vocación y no por género, y que cada persona aprenda en paz."
  },
  {
    pregunta: "🛡️ ¿Qué hago si sufro burlas o acoso?",
    respuesta: "No te guardes el dolor a solas. Busca de inmediato a un supervisor mayor de confianza (tutorx, orientadorx o familiar). Contarlo no es acusar, es protegerte."
  },
  {
    pregunta: "🤝 ¿Cómo puedo ayudar a un(a) compañerx?",
    respuesta: "Si ves que alguien es interrumpidx o aisladx, acércate. Puedes decir en clase: 'Quiero escuchar lo que él/ella estaba opinando'. Tu respaldo cambia su día."
  },
  {
    pregunta: "⚽ ¿Qué pasa con el espacio en el recreo?",
    respuesta: "El patio pertenece a todxs. Democratizar las canchas para deportes mixtos y áreas de descanso hace que nadie se sienta expulsadx a las esquinas."
  },
  {
    pregunta: "🌟 Dame una palabra de aliento para hoy",
    respuesta: "Eres únicx, valiosx y fuerte. Que nadie te haga creer que eres pequeñx. ¡Tu voz tiene un propósito inmenso!"
  }
];
