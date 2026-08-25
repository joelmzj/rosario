const DOMINGO = 0;
const LUNES = 1;
const MARTES = 2;
const MIERCOLES = 3;
const JUEVES = 4;
const VIERNES = 5;
const SABADO = 6;

export const ORACIONES = {
  inicio: {
    titulo: "Inicio",
    texto: "Por la señal de la Santa Cruz, de nuestros enemigos líbranos, Señor, Dios nuestro. En el nombre del Padre, del Hijo y del Espíritu Santo. Amén."
  },
  actoContricion: {
    titulo: "Acto de Contrición",
    texto: "Señor mío Jesucristo, Dios y hombre verdadero, Creador, Padre y Redentor mío. Por ser Tú quién eres, Bondad infinita, y porque te amo sobre todas las cosas, me pesa de todo corazón haberte ofendido. También me pesa que puedes castigarme con las penas del infierno. Ayudado de tu divina gracia, propongo firmemente nunca más pecar, confesarme y cumplir la penitencia que me fuere impuesta. Amén."
  },
  actoContricionDifuntos: {
    titulo: "Acto de Contrición",
    texto: "Señor mío Jesucristo, Dios y hombre verdadero, me pesa de todo corazón haber pecado, porque he merecido el infierno y he perdido el cielo, sobre todo porque te ofendí a Ti, a quien amo sobre todas las cosas. Propongo firmemente, con tu gracia, enmendarme, evitar las ocasiones de pecado, confesarme y cumplir la penitencia. Confío en que me perdonarás por tu infinita misericordia. Amén."
  },
  apertura: {
    titulo: "Invocación Inicial",
    lineas: [
      { v: "Señor, ábreme los labios.", r: "Y mi boca proclamará tu alabanza." },
      { v: "Dios mío, ven en mi auxilio.", r: "Señor, date prisa en socorrerme." },
      { v: "Gloria al Padre y al Hijo y al Espíritu Santo.", r: "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén." }
    ]
  },
  aperturaDifuntos: {
    titulo: "Invocación Inicial",
    lineas: [
      { v: "Abre, Señor, mis labios.", r: "Y mi boca proclamará tu alabanza." },
      { v: "Atiende a mí sin tardanza.", r: "Dame tu auxilio y favor." },
      { v: "Gloria al Padre, al Hijo y al Espíritu Santo.", r: "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén." }
    ]
  },
  ohDiosPerdonas: {
    titulo: "Invocación por el Difunto",
    texto: "¡Oh Dios! Que perdonas y deseas la salvación de todos los hombres y mujeres, imploramos tu clemencia para que, por la intercesión de María Santísima y de todos los santos, concedas a tu siervo(a) N… la gracia de llegar a la Vida Eterna. Amén."
  },
  padrenuestro: {
    titulo: "Padrenuestro",
    texto: "Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación y líbranos del mal. Amén."
  },
  avemaria: {
    titulo: "Avemaría",
    guia: "Dios te salve, María, llena eres de gracia; el Señor es contigo, bendita Tú eres entre todas las mujeres y bendito es el fruto de tu vientre, Jesús.",
    respuesta: "Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén."
  },
  gloria: {
    titulo: "Gloria",
    texto: "Gloria al Padre y al Hijo y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén."
  },
  madreGracia: {
    titulo: "María, Madre de Gracia",
    texto: "María, Madre de gracia, Madre de misericordia, defiéndenos de nuestros enemigos y ampáranos ahora y en la hora de nuestra muerte. Amén."
  },
  ohJesusMio: {
    titulo: "Oh, Jesús Mío",
    texto: "Oh, Jesús mío, perdónanos, líbranos del fuego del infierno, lleva a todas las almas al cielo, especialmente a las más necesitadas."
  },
  jaculatoriaMisterioDifuntos: {
    titulo: "Jaculatoria del Misterio",
    latin: "Requiem æternam dona eis, Domine, et lux perpetua luceat eis. Requiescant in pace. Amen.",
    espanol: "Dale, Señor, el descanso eterno, y brille para él(ella) la luz eterna. Descanse en paz. Amén.",
    sangreV: "Si por tu sangre preciosa, Señor, lo(la) has redimido.",
    sangreR: "Que lo(la) perdones, te pido, por tu pasión dolorosa.",
    misericordia: "Que por Tu infinita misericordia el alma de N... y de todos los fieles difuntos descansen en paz. Así sea."
  },
  jaculatoriaFinal: {
    titulo: "Jaculatoria Final",
    guia: "Ave María Purísima.",
    respuesta: "Sin pecado concebida."
  }
};

export const CLOSING_DEVOTION = {
  ofrecimiento: {
    titulo: "Ofrecimiento de las Salves",
    guia: "Por estos misterios santos que hemos hecho recuerdo, te pedimos, ¡Oh María!, de la Fe Santa el aumento, la exaltación de la Iglesia, del Papa el mejor acierto, y de la Nación Mexicana, la unión y el feliz gobierno.\n\nQue el gentil conozca a Dios y el hereje vea sus yerros, y que todos los pecadores tengamos arrepentimiento. Goce puerto el navegante y de salud los enfermos. Que los cautivos cristianos sean libres del cautiverio, que en el Purgatorio logren las ánimas refrigerio, y que este Santo ejercicio tenga efecto tan completo en toda la cristiandad, que alcancemos por su medio el ir a alabar a Dios en tu compañía en el cielo. Amén.",
    respuesta: "Amén."
  },
  santuario: {
    titulo: "Soberano Santuario",
    texto: "¡Oh Soberano Santuario, sagrario del Verbo eterno! Libra, Virgen, del infierno a los que rezan tu Rosario. Emperatriz poderosa de los mortales consuelos, ábrenos, Señora, el cielo con una muerte dichosa, tú que eres tan grande y tan poderosa."
  },
  padrenuestro: {
    titulo: "Padrenuestro de las Salves",
    guia: "Padre nuestro, que estás en el cielo, santificado sea tu Nombre, venga a nosotros tu reino, hágase, Señor, tu voluntad, así en la tierra como en el cielo.",
    respuesta: "Danos hoy nuestro pan de cada día; perdona nuestras ofensas, así como nosotros perdonamos a los que nos ofenden; y no nos dejes caer en la tentación, y líbranos y guárdanos de todo mal. Amén."
  },
  // Salves unificadas con interpolación nativa para difuntos
  primeraSalve: {
    titulo: "Primera Salve — Fe",
    guia: "Dios te salve, María Santísima, hija de Dios Padre, Virgen purísima antes del parto, en tus manos encomiendo mi fe para que la iluminesROSARIO_DIFUNTOS_SUFIJO. Llena eres de gracia, el Señor es contigo, bendita eres entre las mujeres y bendito sea el fruto de tu vientre, Jesús.",
    respuesta: "Santa María, Madre de Dios, ruega, Señora, por ROSARIO_DIFUNTOS_RESPUESTA los pecadores, ahora y en la hora de nuestra muerte. Amén, Jesús."
  },
  segundaSalve: {
    titulo: "Segunda Salve — Esperanza",
    guia: "Dios te salve, María Santísima, Madre de Dios Hijo, Virgen purísima en el parto, en tus manos encomiendo mi esperanza para que la alientesROSARIO_DIFUNTOS_SUFIJO. Llena eres de gracia, el Señor es contigo, bendita eres entre las mujeres y bendito sea el fruto de tu vientre, Jesús.",
    respuesta: "Santa María, Madre de Dios, ruega, Señora, por ROSARIO_DIFUNTOS_RESPUESTA los pecadores, ahora y en la hora de nuestra muerte. Amén."
  },
  terceraSalve: {
    titulo: "Tercera Salve — Caridad",
    guia: "Dios te salve, María Santísima, esposa de Dios Espíritu Santo, Virgen purísima después del parto, en tus manos encomiendo mi caridad para que la inflamesROSARIO_DIFUNTOS_SUFIJO. Llena eres de gracia, el Señor es contigo, bendita eres entre las mujeres y bendito sea el fruto de tu vientre, Jesús.",
    respuesta: "Santa María, Madre de Dios, ruega, Señora, por ROSARIO_DIFUNTOS_RESPUESTA los pecadores, ahora y en la hora de nuestra muerte. Amén."
  },
  cuartaSalve: {
    titulo: "Templo, Trono y Sagrario",
    guia: "Dios te salve, María Santísima, Templo, Trono y Sagrario de la Santísima Trinidad, Virgen concebida sin la culpa original, dame, Señora, tu gracia para que con ella me salve y con pureza te diga:\n\nDios te salve, Reina y Madre, Madre de misericordia; vida, dulzura y esperanza nuestra; ¡Dios te salve! A ti clamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas. ¡Ea, pues, Señora, abogada nuestra!, vuelve a nosotros esos tus ojos misericordiosos, y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clemente, oh piadosa, oh dulce siempre Virgen María!",
    peticion: "Ruega por ROSARIO_DIFUNTOS_PETICION Santa Madre de Dios.",
    promesa: "Para que seamos dignos de alcanzar ROSARIO_DIFUNTOS_PROMESA promesas de Nuestro Señor Jesucristo. Amén."
  },
  oracionSabanaDifuntos: {
    titulo: "Oración de la Sábana Santa",
    texto: "Señor Dios, que nos dejaste las señales de tu Pasión y Muerte en la sábana santa en la cual fue envuelto tu cuerpo santísimo cuando por José fuiste bajado de la cruz; concédenos, ¡oh piadosísimo Señor!, que por tu muerte y sepultura santa y por los dolores y angustias de tu Santísima Madre María, Señora nuestra, sea llevada a descansar el alma de tu siervo(a) N… y de todos los que están en el purgatorio, a la gloria de tu Resurrección, donde vives y reinas con Dios Padre en la unidad del Espíritu Santo por los siglos de los siglos. Amén."
  }
};

export const MISTERIOS = {
  gozosos: {
    nombre: "Misterios Gozosos",
    dias: [ LUNES, SABADO ],
    lista: [
      "La Encarnación del Hijo de Dios",
      "La Visitación de Nuestra Señora a su prima santa Isabel",
      "El Nacimiento del Hijo de Dios",
      "La Presentación de Jesús en el templo",
      "El Niño Jesús perdido y hallado en el templo"
    ]
  },
  dolorosos: {
    nombre: "Misterios Dolorosos",
    dias: [ MARTES, VIERNES ],
    lista: [
      "La Oración de Jesús en el huerto",
      "La Flagelación del Señor",
      "La Coronación de espinas",
      "Jesús con la Cruz a cuestas, camino del Calvario",
      "La Crucifixión y Muerte de nuestro Señor"
    ]
  },
  gloriosos: {
    nombre: "Misterios Gloriosos",
    dias: [ MIERCOLES, DOMINGO ],
    lista: [
      "La Resurrección del Hijo de Dios",
      "La Ascensión del Señor a los cielos",
      "La Venida del Espíritu Santo sobre los apóstoles",
      "La Asunción de Nuestra Señora a los cielos",
      "La Coronación de la Santísima Virgen como Reina de cielos y tierra"
    ]
  },
  luminosos: {
    nombre: "Misterios Luminosos",
    dias: [ JUEVES ],
    lista: [
      "El Bautismo de Jesús en el Jordán",
      "La autorrevelación de Jesús en las bodas de Caná",
      "El anuncio del Reino de Dios invitando a la conversión",
      "La Transfiguración",
      "La Institución de la Eucaristía"
    ]
  }
};

export const LETANIAS = {
  // Letanías base unificadas con comodines de sufijo para difuntos
  iniciales: [
    { invocacion: "Señor, ten piedadROSARIO_DIFUNTOS_LET_SUFIX", respuesta: "Señor, ten piedadROSARIO_DIFUNTOS_LET_SUFIX" },
    { invocacion: "Cristo, ten piedadROSARIO_DIFUNTOS_LET_SUFIX", respuesta: "Cristo, ten piedadROSARIO_DIFUNTOS_LET_SUFIX" },
    { invocacion: "Señor, ten piedadROSARIO_DIFUNTOS_LET_SUFIX", respuesta: "Señor, ten piedadROSARIO_DIFUNTOS_LET_SUFIX" },
    { invocacion: "Jesucristo, óyenosROSARIO_DIFUNTOS_OYELO", respuesta: "Jesucristo, escúchanosROSARIO_DIFUNTOS_ESCUDALO" }, // Se ajustará inteligentemente
    { invocacion: "Dios Padre celestial", respuesta: "Ten misericordiaROSARIO_DIFUNTOS_TEN_PIEDAD" },
    { invocacion: "Dios Hijo, Redentor del mundo", respuesta: "Ten misericordiaROSARIO_DIFUNTOS_TEN_PIEDAD" },
    { invocacion: "Dios Espíritu Santo", respuesta: "Ten misericordiaROSARIO_DIFUNTOS_TEN_PIEDAD" },
    { invocacion: "Trinidad Santa, un solo Dios", respuesta: "Ten misericordiaROSARIO_DIFUNTOS_TEN_PIEDAD" }
  ],
  virgen: {
    respuestaComun: "Ruega por nosotros",
    respuestaComunDifuntos: "Ruega por él (ella)",
    titulos: [
      "Santa María", "Santa Madre de Dios", "Santa Virgen de las vírgenes",
      "Madre de Cristo", "Madre de la Iglesia", "Madre de la misericordia", "Madre de la divina gracia",
      "Madre de la esperanza", "Madre purísima", "Madre castísima", "Madre siempre virgen", "Madre inmaculada",
      "Madre amable", "Madre admirable", "Madre del buen consejo", "Madre del Creador", "Madre del Salvador",
      "Virgen prudentísima", "Virgen digna de veneración", "Virgen digna de alabanza", "Virgen poderosa",
      "Virgen clemente", "Virgen fiel", "Espejo de justicia", "Trono de la sabiduría", "Causa de nuestra alegría",
      "Vaso espiritual", "Vaso digno de honor", "Vaso insigne de devoción", "Rosa mística", "Torre de David",
      "Torre de marfil", "Casa de oro", "Arca de la Alianza",
      "Puerta del cielo", "Estrella de la mañana", "Salud de los enfermos", "Refugio de los pecadores",
      "Consuelo de los migrantes", "Consoladora de los afligidos", "Auxilio de los cristianos",
      "Reina de los ángeles", "Reina de los patriarcas", "Reina de los profetas",
      "Reina de los apóstoles", "Reina de los mártires", "Reina de los confesores", "Reina de las vírgenes",
      "Reina de todos los santos", "Reina concebida sin pecado original", "Reina asunta a los cielos",
      "Reina del Santo Rosario", "Reina de la familia", "Reina de la paz"
    ]
  },
  finales: [
    { invocacion: "Cordero de Dios, que quitas el pecado del mundo", respuesta: "Perdónanos, Señor" },
    { invocacion: "Cordero de Dios, que quitas el pecado del mundo", respuesta: "Escúchanos, Señor" },
    { invocacion: "Cordero de Dios, que quitas el pecado del mundo", respuesta: "Ten piedad de nosotros" }
  ],
  finalesDifuntos: [
    { invocacion: "Cordero de Dios, que quitas el pecado del mundo", respuesta: "Perdónalo (la), Señor" },
    { invocacion: "Cordero de Dios, que quitas el pecado del mundo", respuesta: "Escúchalo (la), Señor" },
    { invocacion: "Cordero de Dios, que quitas el pecado del mundo", respuesta: "Ten misericordia de él (ella)" }
  ],
  oracionFinal: {
    peticion: "Ruega por nosotros, Santa Madre de Dios.",
    promesa: "Para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo. Amén.",
    oracion: "Te pedimos, Señor, nos concedas a nosotros, tus siervos, gozar de perpetua salud de alma y cuerpo; y por la gloriosa intercesión de la bienaventurada siempre Virgen María, seamos librados de las tristezas presentes y gocemos de la eterna alegría. Por Jesucristo, nuestro Señor. Amén."
  },
  oracionFinalDifuntos: {
    sangre3V: "Si por tu preciosa Sangre, Señor, lo (la) has redimido. (Se repite 3 veces)",
    sangre3R: "Que lo (la) perdones, te pido, por tu pasión dolorosa.",
    descansoV: "Dale, Señor, el descanso eterno.",
    descansoR: "Y brille para él (ella) la luz eterna.",
    pazV: "Descanse en paz.",
    pazR: "Así sea.",
    amparo: "Bajo tu amparo nos acogemos, Santa Madre de Dios; no desprecies las oraciones que te hacemos en nuestras necesidades, antes bien, líbranos de todos los peligros, ¡oh Virgen gloriosa y bendita!",
    peticion: "Ruega por él (ella) y por nosotros, Santa Madre de Dios.",
    promesa: "Para que seamos dignos de alcanzar las divinas gracias y promesas de nuestro Señor Jesucristo. Amén."
  }
};

export const CONCLUSION_DIFUNTOS = {
  titulo: "Súplicas Finales",
  intro: "Para concluir este rosario a favor de nuestro(a) hermano(a) N..., pidamos a Dios una vez más por su eterno descanso y por las necesidades de la Iglesia y el mundo entero. A cada petición contestaremos todos:",
  respuestaComun: "Te rogamos, Señor.",
  lista: [
    "Por todos nuestros amigos y parientes difuntos, para que Dios limpie completamente su alma de toda mancha de pecado y le conceda el descanso eterno.",
    "Por todos los que están por dejar este mundo, para que se arrepientan de sus pecados y entreguen su vida a Cristo como ofrenda agradable.",
    "Por todos los que no conocen a Cristo, para que Dios mueva su corazón y les conceda la oportunidad de conocerlo y entregarse a Él antes que sea demasiado tarde.",
    "Por todos nosotros, para que estemos siempre preparados para el gran encuentro con Cristo.",
    "Por los pastores de la Iglesia, para que prediquen con valentía y autenticidad la Palabra de Dios y así vayan despertando en los feligreses el sentido verdadero de la vida y de la muerte."
  ]
};

export const LEVANTA_CRUZ = {
  intro: {
    titulo: "Ceremonia del Levanta Cruz",
    texto: "Pidamos por nuestro(a) hermano(a) N… a nuestro Señor Jesucristo, que ha dicho: Yo soy la Resurrección y la Vida; el que cree en Mí, aunque haya muerto, vivirá; y el que está vivo y cree en Mí no morirá para siempre."
  },
  peticiones: {
    titulo: "Invocaciones de Resurrección",
    respuestaComun: "Te lo pedimos, Señor.",
    items: [
      "Señor, Tú que oraste en la tumba de Lázaro, dígnate enjugar nuestras lágrimas.",
      "Tú que resucitaste a los muertos, dígnate dar la vida eterna a nuestro(a) hermano(a) N...",
      "Tú que perdonaste en la cruz al buen ladrón y le prometiste el paraíso, dígnate perdonar y llevar al cielo a nuestro(a) hermano(a) N…",
      "Tú que has purificado a nuestro(a) hermano(a) N... con el agua del bautismo y lo ungiste con el óleo de la confirmación, dígnate admitirlo entre tus santos y elegidos.",
      "Tú que alimentaste a nuestro(a) hermano(a) N... con tu Cuerpo y tu Sangre, dígnate también admitirlo en la mesa de tu Reino.",
      "Y a nosotros, que lloramos su muerte, dígnate confortarnos con la fe y la esperanza de la vida eterna."
    ]
  },
  ritoCabeza: {
    titulo: "Levantamiento de la Cabeza",
    amonestacion: "Hermanos, pidamos a Dios perdón por los pecados que nuestro(a) hermano(a) N... haya cometido por no pensar en el bien de los demás; y nosotros no olvidemos que el orgullo y la soberbia pueden secar para siempre nuestras vidas.",
    indicacion: "Ahora los padrinos recogen la parte correspondiente a la cabeza mientras cantamos.",
    estrofas: [
      { v: "Ved la Cruz de salvación", r: "donde Dios nos dio la vida." },
      { v: "Precio de la Redención", r: "de la humanidad caída." }
    ]
  },
  ritoBrazos: {
    titulo: "Levantamiento de los Brazos",
    amonestacion: "Hermanos, pidamos a Dios perdón por los pecados que con sus brazos y manos haya cometido nuestro(a) hermano(a) N…; y que a nosotros no se nos olvide que nuestras manos deben ser y estar siempre produciendo apoyos solidarios, brindando ayuda a los más necesitados y tomando la mano de otros para vivir en unidad y fortaleza.",
    indicacion: "Ahora recogen los padrinos los brazos, derecho e izquierdo, mientras cantamos.",
    estrofas: [
      { v: "Ara donde se inmoló", r: "el Cordero inmaculado." },
      { v: "Cristo, en ti, nos redimió", r: "de la muerte y del pecado." },
      { v: "Santo emblema del amor,", r: "fiel recuerdo del Amado." },
      { v: "Cruz que dice al pecador,", r: "la malicia del pecado." }
    ]
  },
  ritoPiesCentro: {
    titulo: "Levantamiento del Cuerpo y Pies",
    amonestacion: "Hermanos, pidamos a Dios perdón por todos los odios, chismes, mentiras y maldad que nuestro(a) hermano(a) N... haya cometido. Ojalá que a nosotros, que aún estamos con vida, no se nos olvide rectificar todos estos males que sólo desunen y son algunas veces hasta causa de muerte. Y también pidamos perdón por todos los caminos equivocados que nuestro(a) hermano(a) N... haya tomado en lugar de seguir a Jesús, que es el camino, la verdad y la vida; hagamos nosotros el compromiso de caminar, de hoy en adelante, por caminos de la igualdad y de la justicia para construir el Reino de Dios en nuestro pueblo, en nuestra colonia o ciudad.",
    indicacion: "Ahora recogen los padrinos el resto de la cruz mientras cantamos.",
    estrofas: [
      { v: "Árbol santo e inmortal,", r: "son tus frutos redentores." },
      { v: "Gracia y luz, perdón y paz,", r: "brindas a los pecadores." },
      { v: "Santa Cruz de Redención,", r: "arco iris de la Alianza." },
      { v: "Signo eterno del perdón,", r: "fuente viva de esperanza." }
    ]
  },
  cruzVencedor: "Cruz de Cristo Vencedor, te adoramos, Salvador.",
  cantoAdicional: {
    estrofa: "Nave firme en el luchar con las olas de la vida, faro en nuestro navegar a la patria prometida."
  },
  levantamientoFinal: {
    titulo: "Cruz Triunfante",
    texto: "Ahora ya no queda rastro de la cruz que habíamos tendido. Les pido a los padrinos que metan a la caja también las flores que la vestían; así recordamos que la victoria de Jesucristo sobre la muerte es también nuestra victoria; por eso, la cruz de nuestro hermano(a) N. ya no está tendida, ahora está de pie, está triunfante.",
    indicacion: "Se realiza la adoración de la Cruz."
  }
};

export function obtenerMisterioDelDia() {
  const diaSemana = new Date().getDay();
  if (MISTERIOS.gozosos.dias.includes(diaSemana)) return MISTERIOS.gozosos;
  if (MISTERIOS.dolorosos.dias.includes(diaSemana)) return MISTERIOS.dolorosos;
  if (MISTERIOS.gloriosos.dias.includes(diaSemana)) return MISTERIOS.gloriosos;
  return MISTERIOS.luminosos;
}
