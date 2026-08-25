import './style.css';
import Alpine from 'alpinejs';
import { ORACIONES, MISTERIOS, LETANIAS, CLOSING_DEVOTION, CONCLUSION_DIFUNTOS, LEVANTA_CRUZ, obtenerMisterioDelDia } from './rosario.js';

window.Alpine = Alpine;

Alpine.data('rosarioApp', () => ({
  pasos: [],
  pasoActualIndex: 0,
  avemariaActual: 0,
  letaniaActualIndex: 0,
  misterioDelDia: null,

  // Reactividad del Rosario Dual (con persistencia en localStorage)
  tipoRosario: localStorage.getItem('rosario_tipo') || 'normal',
  nombreDifunto: localStorage.getItem('rosario_nombre') || '',
  generoDifunto: localStorage.getItem('rosario_genero') || 'hermano', // 'hermano' o 'hermana'

  // Interruptores modulares para el Rosario de Difuntos
  incluirRitosIniciales: localStorage.getItem('rosario_ritos') === 'true',
  incluirLevantaCruz: localStorage.getItem('rosario_cruz') === 'true',

  // Control de interfaz
  menuAbierto: false,

  init() {
    this.misterioDelDia = obtenerMisterioDelDia();
    this.generarFlujo();

    // Observadores reactivos para guardar en localStorage y regenerar flujo al cambiar estados en vivo
    this.$watch('tipoRosario', (val) => {
      localStorage.setItem('rosario_tipo', val);
      this.generarFlujo();
      this.reiniciar();
    });
    this.$watch('generoDifunto', (val) => {
      localStorage.setItem('rosario_genero', val);
      this.generarFlujo();
    });
    this.$watch('nombreDifunto', (val) => {
      localStorage.setItem('rosario_nombre', val);
      this.generarFlujo();
    });
    this.$watch('incluirRitosIniciales', (val) => {
      localStorage.setItem('rosario_ritos', val);
      this.generarFlujo();
      this.reiniciar();
    });
    this.$watch('incluirLevantaCruz', (val) => {
      localStorage.setItem('rosario_cruz', val);
      this.generarFlujo();
      this.reiniciar();
    });
  },

  limpiarNombre() {
    this.nombreDifunto = '';
    localStorage.removeItem('rosario_nombre');
    if (navigator.vibrate) navigator.vibrate(15);
  },

  formatText(text) {
    if (!text) return '';
    let t = text;

    if (this.tipoRosario === 'difuntos') {
      const nombre = this.nombreDifunto.trim() || 'N...';
      const esMujer = this.generoDifunto === 'hermana';

      // 1. Reemplazo de comodines inteligentes para las Salves y oraciones unificadas
      t = t.replace(/ROSARIO_DIFUNTOS_SUFIJO/g, ` y el alma de nuestro(a) hermano(a) N… para que la salves`);
      t = t.replace(/ROSARIO_DIFUNTOS_RESPUESTA/g, `él (ella) y por`);
      t = t.replace(/ROSARIO_DIFUNTOS_PETICION/g, `él (ella) y por`);
      t = t.replace(/ROSARIO_DIFUNTOS_PROMESA/g, `las divinas gracias y`);

      // 2. Reemplazo de comodines para las Letanías de Difuntos
      t = t.replace(/ROSARIO_DIFUNTOS_LET_SUFIX/g, ` de él (ella)`);
      t = t.replace(/ROSARIO_DIFUNTOS_OYELO/g, `o (la)`);
      t = t.replace(/ROSARIO_DIFUNTOS_ESCUDALO/g, `lo (la)`);
      t = t.replace(/ROSARIO_DIFUNTOS_TEN_PIEDAD/g, ` de él (ella)`);

      // 3. Reemplazo de concordancias gramaticales y adjetivos específicos del Ritual de Difuntos
      t = t.replace(/bautizado\(a\)/g, esMujer ? 'bautizada' : 'bautizado');
      t = t.replace(/bendícelo\(a\)/g, esMujer ? 'bendícela' : 'bendícelo');
      t = t.replace(/levántalo\(a\)/g, esMujer ? 'levántala' : 'levántalo');
      t = t.replace(/perdónalo\(a\)/g, esMujer ? 'perdónala' : 'perdónalo');
      t = t.replace(/recíbelo\(a\)/g, esMujer ? 'recíbela' : 'recíbelo');
      t = t.replace(/este\(a\)\s+hijo\(a\)\s+tuyo/g, esMujer ? 'esta hija tuya' : 'este hijo tuyo');

      // 4. Reemplazo de hermanos
      const hermanoReplacement = esMujer ? `nuestra hermana ${nombre}` : `nuestro hermano ${nombre}`;
      t = t.replace(/nuestro\(a\)\s+hermano\(a\)\s+N[…\.]+/g, hermanoReplacement);
      t = t.replace(/nuestro\(a\)\s+hermano\(a\)/g, esMujer ? 'nuestra hermana' : 'nuestro hermano');
      t = t.replace(/hermano\(a\)/g, esMujer ? 'hermana' : 'hermano');

      // 5. Reemplazo de siervos e hijos
      t = t.replace(/siervo\(a\)\s+N[…\.]+/g, esMujer ? `sierva ${nombre}` : `siervo ${nombre}`);
      t = t.replace(/siervo\(a\)/g, esMujer ? 'sierva' : 'siervo');
      t = t.replace(/hijo\(a\)\s+N[…\.]+/g, esMujer ? `hija ${nombre}` : `hijo ${nombre}`);
      t = t.replace(/hijo\(a\)/g, esMujer ? 'hija' : 'hijo');

      // 6. Pronombres y artículos reactivos
      t = t.replace(/él\(ella\)/g, esMujer ? 'ella' : 'él');
      t = t.replace(/lo\(la\)/g, esMujer ? 'la' : 'lo');
      t = t.replace(/el\(la\)/g, esMujer ? 'la' : 'el');

      // 7. Comodín de nombre residual
      t = t.replace(/N[…\.]+/g, nombre);
    } else {
      // Limpieza de comodines para el modo Estándar (se omiten las cláusulas de difuntos)
      t = t.replace(/ROSARIO_DIFUNTOS_SUFIJO/g, '');
      t = t.replace(/ROSARIO_DIFUNTOS_RESPUESTA/g, '');
      t = t.replace(/ROSARIO_DIFUNTOS_PETICION/g, '');
      t = t.replace(/ROSARIO_DIFUNTOS_PROMESA/g, '');

      t = t.replace(/ROSARIO_DIFUNTOS_LET_SUFIX/g, '');
      t = t.replace(/ROSARIO_DIFUNTOS_OYELO/g, 's');
      t = t.replace(/ROSARIO_DIFUNTOS_ESCUDALO/g, 'nos');
      t = t.replace(/ROSARIO_DIFUNTOS_TEN_PIEDAD/g, ' de nosotros');

      // Formato neutro/masculino litúrgico para rosario estándar
      t = t.replace(/nuestro\(a\)\s+hermano\(a\)/g, 'nuestro hermano');
      t = t.replace(/hermano\(a\)/g, 'hermano');
      t = t.replace(/siervo\(a\)/g, 'siervo');
      t = t.replace(/hijo\(a\)/g, 'hijo');
      t = t.replace(/él\(ella\)/g, 'él');
      t = t.replace(/lo\(la\)/g, 'lo');
      t = t.replace(/N[…\.]+/g, 'N...');
    }

    // Retornamos con saltos HTML válidos
    return t.replace(/\n/g, '<br>');
  },

  generarFlujo() {
    const flujo = [];

    // --- OPCIONAL: RITOS INICIALES DEL VELORIO ---
    if (this.tipoRosario === 'difuntos' && this.incluirRitosIniciales) {
      flujo.push({
        tipo: 'texto',
        titulo: 'La Oración del Pésame',
        texto: 'Nos ponemos todos de pie. Hemos venido a rezar por el alma de nuestro(a) hermano(a) N…\n\nRepetirán después de mí:\n\n“En tus manos, Señor, encomiendo su espíritu (Salmo 31, 6)”.\n\nTodos responden: En tus manos, Señor, encomiendo su espíritu.\n\nRezandero: Estamos seguros de haber pasado de la muerte a la vida, porque amamos a nuestros hermanos (1 Juan 3, 14).\n\nTodos: En tus manos, Señor, encomiendo su espíritu.\n\nRezandero: Aunque camine por lugares oscuros, nada temo, porque Tú estás conmigo (Salmo 23, 4).\n\nTodos: En tus manos, Señor, encomiendo su espíritu.\n\nRezandero: Vengan benditos de mi Padre, tomen posesión del Reino preparado para ustedes (Mateo 25, 34).\n\nTodos: En tus manos, Señor, encomiendo mi espíritu.\n\nRezandero: Quiero que donde yo esté, estén también conmigo, dice Jesucristo (Juan 17, 24).\n\nTodos: En tus manos, Señor, encomiendo mi espíritu.\n\nRezandero: Señor nuestro, que eres amor; recibe en tu presencia a tu hijo(a) N... a quien has llamado de esta vida a tu presencia.\n\nPerdónale todos sus pecados, bendícelo(a) con tu luz y paz eternas, levántalo(a) para que viva siempre con todos tus santos en la gloria de la resurrección. Por Cristo Nuestro Señor.\n\nTodos: Amén.'
      });

      flujo.push({
        tipo: 'texto',
        titulo: 'Lectura del Evangelio',
        texto: 'Nos ponemos todos de pie. Del Santo Evangelio según San Lucas:\n\n“El primer día de la semana, muy temprano, fueron al sepulcro con los perfumes que habían preparado. Pero se encontraron con que la piedra que cerraba el sepulcro había sido removida, y al entrar, no encontraron el cuerpo del Señor Jesús.\n\nNo sabían qué pensar, pero, en ese momento, vieron a su lado dos hombres con ropas fulgurantes. Se asustaron mucho y no se atrevían a levantar los ojos del suelo.\n\nEllos les dijeron: ¿Por qué buscan entre los muertos al que vive? No está aquí. Resucitó. Acuérdense de lo que les dijo cuando todavía estaba en Galilea. El Hijo del Hombre debe ser entregado en manos de los pecadores y ser crucificado y resucitado al tercer día. Ellas entonces recordaron las palabras de Jesús”.\n\n(Lucas 24, 1-8)\n\nPalabra del Señor.'
      });

      flujo.push({
        tipo: 'suplicas-finales',
        titulo: 'Invocaciones de Salvación',
        intro: 'Ahora, van a responder a cada invocación: “Dale Señor, el eterno descanso”.',
        lista: [
          'Salva, Señor, a tu hijo(a), de todas las tribulaciones.',
          'Salva, Señor, a tu hijo(a), como salvaste a Noé del diluvio.',
          'Salva, Señor, a tu hijo(a), como salvaste a Abraham de sus enemigos.',
          'Salva, Señor, a tu hijo(a), como salvaste a Job de sus padecimientos.',
          'Salva, Señor, a tu hijo(a), como salvaste a Moisés del poder del opresor.',
          'Salva, Señor, a tu hijo(a), como salvaste a Pedro y a Pablo de la cárcel.'
        ],
        respuestaComun: 'Dale Señor, el eterno descanso.'
      });

      flujo.push({
        tipo: 'texto',
        titulo: 'Encomendación',
        texto: 'Rezandero: Por Jesucristo, nuestro Salvador, que padeció por nosotros una muerte tan amarga y nos mereció la vida eterna, salva, Señor, a este(a) hijo(a) tuyo.\n\nTodos: Dale Señor, el eterno descanso.\n\nRezandero: Señor nuestro Jesucristo, salvador del mundo, te encomendamos a nuestro(a) hermano(a) N... por quien viniste al mundo con tanta misericordia; recíbelo(a) bondadoso en la alegría de tu Reino: pues aunque ciertamente cayó en el pecado, no negó al Padre ni al Hijo ni al Espíritu Santo, sino que creyó y adoró fielmente a Dios, creador de todas las cosas.\n\nTodos: Amén.'
      });

      flujo.push({
        tipo: 'texto',
        titulo: 'Dios te salve, Reina y Madre',
        texto: 'Recemos juntos: ¡Dios te salve! Reina y Madre, Madre de misericordia, vida, dulzura y esperanza nuestra. ¡Dios te salve! A ti clamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas. ¡Ea, pues, Señora, abogada nuestra! Vuelve a nosotros esos tus ojos misericordiosos y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre, ¡Oh clemente, Oh piadosa, Oh dulce siempre Virgen María! Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las divinas gracias y promesas de Nuestro Señor Jesucristo. Amén.'
      });

      flujo.push({
        tipo: 'texto',
        titulo: 'Rito del Agua Bendita',
        texto: 'Sólo si el ataúd con el difunto o sus cenizas están presentes y hay agua bendita a la mano se pide a un familiar que la rocíe sobre el ataúd o la cruz.\n\nPadre Dios, nuestro(a) hermano(a) N… hace muchos años fue bautizado(a) con agua: desde ese día lleva un nombre cristiano y es tu hijo(a). No lo(la) desconozcas en este momento, no lo(la) rechaces.\n\nSi pecó e hizo mal en su vida, perdónalo(a); recuerda que es tu hijo(a) y recíbelo(a) en tu Gloria eterna. Te lo pedimos por Cristo Nuestro Señor.\n\nTodos: Amén.\n\n(Un familiar rocía un poco de agua bendita sobre el ataúd o cruz).\n\nRezandero: Dale Señor el descanso eterno y luzca para él(ella) la luz perpetua. Descanse en Paz.\n\nTodos: Así sea.'
      });
    }

    // --- INICIO COMÚN DEL ROSARIO ---
    if (this.tipoRosario === 'difuntos') {
      flujo.push({ tipo: 'texto', titulo: ORACIONES.inicio.titulo, texto: ORACIONES.inicio.texto });
      flujo.push({ tipo: 'texto', titulo: ORACIONES.actoContricionDifuntos.titulo, texto: ORACIONES.actoContricionDifuntos.texto });
      flujo.push({ tipo: 'invocacion', titulo: ORACIONES.aperturaDifuntos.titulo, lineas: ORACIONES.aperturaDifuntos.lineas });
      flujo.push({ tipo: 'texto', titulo: ORACIONES.ohDiosPerdonas.titulo, texto: ORACIONES.ohDiosPerdonas.texto });
    } else {
      flujo.push({ tipo: 'texto', titulo: ORACIONES.inicio.titulo, texto: ORACIONES.inicio.texto });
      flujo.push({ tipo: 'texto', titulo: ORACIONES.actoContricion.titulo, texto: ORACIONES.actoContricion.texto });
      flujo.push({ tipo: 'invocacion', titulo: ORACIONES.apertura.titulo, lineas: ORACIONES.apertura.lineas });
    }

    // --- MISTERIOS ---
    const misterios = this.misterioDelDia || obtenerMisterioDelDia();
    for (let i = 0; i < 5; i++) {
      const numeroMisterio = i + 1;
      const esMisterioEspecial = (numeroMisterio === 2 || numeroMisterio === 4);

      flujo.push({
        tipo: 'misterio-anuncio',
        titulo: `Misterio ${numeroMisterio}`,
        texto: misterios.lista[i]
      });

      // Padre Nuestro común para todos los misterios
      flujo.push({
        tipo: 'texto',
        titulo: ORACIONES.padrenuestro.titulo,
        texto: ORACIONES.padrenuestro.texto
      });

      // Decenario de Avemarías (Invertido en Guía/Respuesta para los misterios 2 y 4)
      flujo.push({
        tipo: 'avemarias',
        titulo: 'Diez Avemarías',
        guia: esMisterioEspecial ? ORACIONES.avemaria.respuesta : ORACIONES.avemaria.guia,
        respuesta: esMisterioEspecial ? ORACIONES.avemaria.guia : ORACIONES.avemaria.respuesta
      });

      if (esMisterioEspecial) {
        // Conclusión especial en forma de salve para los misterios 2 y 4 (Aplica a ambos modos)
        flujo.push({
          tipo: 'texto',
          titulo: 'Gloria y Conclusión del Misterio',
          texto: 'Rezandero: Gloria, Santa María, Madre de Dios, ruega por nosotros los pecadores ahora y en la hora de nuestra muerte. Amén.\n\nAsamblea responde: Gloria al Padre, al Hijo y al Espíritu Santo.\n\nRezandero continúa: Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.'
        });
      } else {
        // Gloria estándar para los misterios 1, 3 y 5
        flujo.push({
          tipo: 'texto',
          titulo: ORACIONES.gloria.titulo,
          texto: ORACIONES.gloria.texto
        });
      }

      // Jaculatorias según el tipo de rosario
      if (this.tipoRosario === 'difuntos') {
        flujo.push({
          tipo: 'jaculatorias-difuntos',
          titulo: ORACIONES.jaculatoriaMisterioDifuntos.titulo,
          latin: ORACIONES.jaculatoriaMisterioDifuntos.latin,
          espanol: ORACIONES.jaculatoriaMisterioDifuntos.espanol,
          sangreV: ORACIONES.jaculatoriaMisterioDifuntos.sangreV,
          sangreR: ORACIONES.jaculatoriaMisterioDifuntos.sangreR,
          misericordia: ORACIONES.jaculatoriaMisterioDifuntos.misericordia
        });
      } else {
        flujo.push({
          tipo: 'jaculatorias-misterio',
          titulo: 'Jaculatorias del Misterio',
          oraciones: [
            ORACIONES.madreGracia.texto,
            ORACIONES.ohJesusMio.texto
          ]
        });
      }
    }

    // --- OFRECIMIENTO Y SALVES ---
    flujo.push({
      tipo: 'guia-respuesta',
      titulo: CLOSING_DEVOTION.ofrecimiento.titulo,
      guia: CLOSING_DEVOTION.ofrecimiento.guia,
      respuesta: CLOSING_DEVOTION.ofrecimiento.respuesta
    });

    flujo.push({
      tipo: 'texto',
      titulo: CLOSING_DEVOTION.santuario.titulo,
      texto: CLOSING_DEVOTION.santuario.texto
    });

    flujo.push({
      tipo: 'guia-respuesta',
      titulo: CLOSING_DEVOTION.padrenuestro.titulo,
      guia: CLOSING_DEVOTION.padrenuestro.guia,
      respuesta: CLOSING_DEVOTION.padrenuestro.respuesta
    });

    if (this.tipoRosario === 'difuntos') {
      flujo.push({
        tipo: 'guia-respuesta',
        titulo: CLOSING_DEVOTION.primeraSalve.titulo,
        guia: CLOSING_DEVOTION.primeraSalve.guia,
        respuesta: CLOSING_DEVOTION.primeraSalve.respuesta
      });

      flujo.push({
        tipo: 'guia-respuesta',
        titulo: CLOSING_DEVOTION.segundaSalve.titulo,
        guia: CLOSING_DEVOTION.segundaSalve.guia,
        respuesta: CLOSING_DEVOTION.segundaSalve.respuesta
      });

      flujo.push({
        tipo: 'guia-respuesta',
        titulo: CLOSING_DEVOTION.terceraSalve.titulo,
        guia: CLOSING_DEVOTION.terceraSalve.guia,
        respuesta: CLOSING_DEVOTION.terceraSalve.respuesta
      });

      flujo.push({
        tipo: 'cuarta-salve-difuntos',
        titulo: CLOSING_DEVOTION.cuartaSalve.titulo,
        guia: CLOSING_DEVOTION.cuartaSalve.guia,
        peticion: CLOSING_DEVOTION.cuartaSalve.peticion,
        promesa: CLOSING_DEVOTION.cuartaSalve.promesa
      });

      flujo.push({
        tipo: 'texto',
        titulo: CLOSING_DEVOTION.oracionSabanaDifuntos.titulo,
        texto: CLOSING_DEVOTION.oracionSabanaDifuntos.texto
      });

      flujo.push({
        tipo: 'letanias-difuntos',
        titulo: 'Letanías de la Santísima Virgen (Difuntos)',
        iniciales: LETANIAS.iniciales,
        virgen: {
          respuestaComunDifuntos: LETANIAS.virgen.respuestaComunDifuntos,
          titulos: LETANIAS.virgen.titulos
        },
        finales: LETANIAS.finalesDifuntos,
        oracionFinalDifuntos: LETANIAS.oracionFinalDifuntos
      });

      flujo.push({
        tipo: 'suplicas-finales',
        titulo: CONCLUSION_DIFUNTOS.titulo,
        intro: CONCLUSION_DIFUNTOS.intro,
        lista: CONCLUSION_DIFUNTOS.lista,
        respuestaComun: CONCLUSION_DIFUNTOS.respuestaComun
      });

      if (this.incluirLevantaCruz) {
        flujo.push({
          tipo: 'texto',
          titulo: LEVANTA_CRUZ.intro.titulo,
          texto: LEVANTA_CRUZ.intro.texto
        });

        flujo.push({
          tipo: 'invocaciones-resurreccion',
          titulo: LEVANTA_CRUZ.peticiones.titulo,
          items: LEVANTA_CRUZ.peticiones.items,
          respuestaComun: LEVANTA_CRUZ.peticiones.respuestaComun
        });

        flujo.push({
          tipo: 'rito-cruz-paso',
          titulo: LEVANTA_CRUZ.ritoCabeza.titulo,
          amonestacion: LEVANTA_CRUZ.ritoCabeza.amonestacion,
          indicacion: LEVANTA_CRUZ.ritoCabeza.indicacion,
          estrofas: LEVANTA_CRUZ.ritoCabeza.estrofas,
          cruzVencedor: LEVANTA_CRUZ.cruzVencedor,
          cantoAdicional: LEVANTA_CRUZ.cantoAdicional.estrofa
        });

        flujo.push({
          tipo: 'rito-cruz-paso',
          titulo: LEVANTA_CRUZ.ritoBrazos.titulo,
          amonestacion: LEVANTA_CRUZ.ritoBrazos.amonestacion,
          indicacion: LEVANTA_CRUZ.ritoBrazos.indicacion,
          estrofas: LEVANTA_CRUZ.ritoBrazos.estrofas,
          cruzVencedor: LEVANTA_CRUZ.cruzVencedor
        });

        flujo.push({
          tipo: 'rito-cruz-paso',
          titulo: LEVANTA_CRUZ.ritoPiesCentro.titulo,
          amonestacion: LEVANTA_CRUZ.ritoPiesCentro.amonestacion,
          indicacion: LEVANTA_CRUZ.ritoPiesCentro.indicacion,
          estrofas: LEVANTA_CRUZ.ritoPiesCentro.estrofas,
          cruzVencedor: LEVANTA_CRUZ.cruzVencedor
        });

        flujo.push({
          tipo: 'cruz-triunfante',
          titulo: LEVANTA_CRUZ.levantamientoFinal.titulo,
          texto: LEVANTA_CRUZ.levantamientoFinal.texto
        });
      }

    } else {
      flujo.push({
        tipo: 'guia-respuesta',
        titulo: CLOSING_DEVOTION.primeraSalve.titulo,
        guia: CLOSING_DEVOTION.primeraSalve.guia,
        respuesta: CLOSING_DEVOTION.primeraSalve.respuesta
      });

      flujo.push({
        tipo: 'guia-respuesta',
        titulo: CLOSING_DEVOTION.segundaSalve.titulo,
        guia: CLOSING_DEVOTION.segundaSalve.guia,
        respuesta: CLOSING_DEVOTION.segundaSalve.respuesta
      });

      flujo.push({
        tipo: 'guia-respuesta',
        titulo: CLOSING_DEVOTION.terceraSalve.titulo,
        guia: CLOSING_DEVOTION.terceraSalve.guia,
        respuesta: CLOSING_DEVOTION.terceraSalve.respuesta
      });

      flujo.push({
        tipo: 'cuarta-salve',
        titulo: CLOSING_DEVOTION.cuartaSalve.titulo,
        guia: CLOSING_DEVOTION.cuartaSalve.guia,
        peticion: CLOSING_DEVOTION.cuartaSalve.peticion,
        promesa: CLOSING_DEVOTION.cuartaSalve.promesa
      });

      flujo.push({
        tipo: 'letanias',
        titulo: 'Letanías de la Santísima Virgen',
        iniciales: LETANIAS.iniciales,
        virgen: {
          respuestaComun: LETANIAS.virgen.respuestaComun,
          titulos: LETANIAS.virgen.titulos
        },
        finales: LETANIAS.finales
      });

      flujo.push({
        tipo: 'oracion-final',
        titulo: 'Oración Final',
        oracion: LETANIAS.oracionFinal.oracion,
        peticion: LETANIAS.oracionFinal.peticion,
        promesa: LETANIAS.oracionFinal.promesa
      });
    }

    flujo.push({
      tipo: 'jaculatoria-final',
      titulo: ORACIONES.jaculatoriaFinal.titulo,
      guia: ORACIONES.jaculatoriaFinal.guia,
      respuesta: ORACIONES.jaculatoriaFinal.respuesta,
      indicacion: 'Cierre del Santo Rosario.'
    });

    flujo.push({
      tipo: 'fin',
      titulo: 'Fin del Rezo',
      texto: this.tipoRosario === 'difuntos'
        ? '¡Has completado el Santo Rosario! Que las almas de los fieles difuntos, por la misericordia de Dios, descansen en paz.'
        : '¡Has completado el Santo Rosario! Que la Virgen María te acompañe siempre en tu caminar de fe.',
      indicacion: 'Amén. Podéis ir en paz.'
    });

    this.pasos = flujo;
  },

  get pasoActual() {
    return this.pasos[this.pasoActualIndex] || {};
  },

  get hitos() {
    const listado = [];
    this.pasos.forEach((paso, index) => {
      if (index === 0) {
        listado.push({ index: 0, titulo: "Inicio" });
      } else if (paso.tipo === 'misterio-anuncio') {
        listado.push({ index: index, titulo: paso.titulo });
      } else if (paso.tipo === 'guia-respuesta' && paso.titulo.includes('Ofrecimiento')) {
        listado.push({ index: index, titulo: "Ofrecimiento" });
      } else if (paso.tipo === 'letanias' || paso.tipo === 'letanias-difuntos') {
        listado.push({ index: index, titulo: "Letanías" });
      } else if (paso.tipo === 'suplicas-finales') {
        listado.push({ index: index, titulo: "Súplicas" });
      } else if (paso.tipo === 'jaculatoria-final' && paso.indicacion === 'Cierre del Santo Rosario.') {
        listado.push({ index: index, titulo: "Cierre Rosario" });
      } else if (paso.titulo === 'Ceremonia del Levanta Cruz') {
        listado.push({ index: index, titulo: "Ceremonia Cruz" });
      } else if (paso.tipo === 'rito-cruz-paso') {
        if (!listado.some(h => h.titulo === "Levantamiento")) {
          listado.push({ index: index, titulo: "Levantamiento" });
        }
      } else if (paso.tipo === 'fin') {
        listado.push({ index: index, titulo: "Fin" });
      }
    });
    return listado;
  },

  irAPaso(index) {
    this.pasoActualIndex = index;
    this.avemariaActual = 0;
    this.letaniaActualIndex = 0;
    this.menuAbierto = false;
    if (navigator.vibrate) navigator.vibrate(15);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  obtenerTotalLetanias() {
    if (this.pasoActual.tipo !== 'letanias' && this.pasoActual.tipo !== 'letanias-difuntos') return 0;
    const p = this.pasoActual;
    const totalInvocaciones = p.iniciales.length + p.virgen.titulos.length + p.finales.length;
    return this.tipoRosario === 'difuntos' ? totalInvocaciones + 5 : totalInvocaciones;
  },

  obtenerTotalLetaniasForStep(paso) {
    const totalInvocaciones = paso.iniciales.length + paso.virgen.titulos.length + paso.finales.length;
    return this.tipoRosario === 'difuntos' ? totalInvocaciones + 5 : totalInvocaciones;
  },

  progresoLetaniasPorcentaje() {
    if (this.pasoActual.tipo !== 'letanias' && this.pasoActual.tipo !== 'letanias-difuntos') return 0;
    const totalPasos = this.obtenerTotalLetanias();
    return Math.round((this.letaniaActualIndex / (totalPasos - 1)) * 100);
  },

  obtenerLetaniaActual() {
    if (this.pasoActual.tipo !== 'letanias' && this.pasoActual.tipo !== 'letanias-difuntos') return {};
    const p = this.pasoActual;
    const idx = this.letaniaActualIndex;

    const iniciales = p.iniciales;
    const virgenTitulos = p.virgen.titulos;
    const virgenRespuesta = this.tipoRosario === 'difuntos' ? p.virgen.respuestaComunDifuntos : p.virgen.respuestaComun;
    const finales = p.finales;

    const lenIniciales = iniciales.length;
    const lenVirgen = virgenTitulos.length;
    const lenFinales = finales.length;

    if (idx < lenIniciales) {
      return {
        seccion: "Invocaciones Iniciales",
        tipoSubpaso: "letania",
        v: iniciales[idx].invocacion,
        r: iniciales[idx].respuesta
      };
    } else if (idx < lenIniciales + lenVirgen) {
      const vIdx = idx - lenIniciales;
      return {
        seccion: "Letanías Lauretanas",
        tipoSubpaso: "letania",
        v: virgenTitulos[vIdx],
        r: virgenRespuesta
      };
    } else if (idx < lenIniciales + lenVirgen + lenFinales) {
      const fIdx = idx - (lenIniciales + lenVirgen);
      return {
        seccion: "Cordero de Dios",
        tipoSubpaso: "letania",
        v: finales[fIdx].invocacion,
        r: finales[fIdx].respuesta
      };
    } else if (this.tipoRosario === 'difuntos') {
      const extraIdx = idx - (lenIniciales + lenVirgen + lenFinales);
      const extra = p.oracionFinalDifuntos;
      
      if (extraIdx === 0) {
        return {
          seccion: "Sufragio por el Difunto",
          tipoSubpaso: "letania",
          titulo: "Redención por su Sangre",
          v: extra.sangre3V,
          r: extra.sangre3R
        };
      } else if (extraIdx === 1) {
        return {
          seccion: "Sufragio por el Difunto",
          tipoSubpaso: "letania",
          titulo: "Descanso Eterno",
          v: extra.descansoV,
          r: extra.descansoR
        };
      } else if (extraIdx === 2) {
        return {
          seccion: "Sufragio por el Difunto",
          tipoSubpaso: "letania",
          titulo: "Paz de Dios",
          v: extra.pazV,
          r: extra.pazR
        };
      } else if (extraIdx === 3) {
        return {
          seccion: "Sufragio por el Difunto",
          tipoSubpaso: "sufragio-texto",
          titulo: "Bajo tu amparo",
          texto: extra.amparo
        };
      } else if (extraIdx === 4) {
        return {
          seccion: "Sufragio por el Difunto",
          tipoSubpaso: "letania",
          titulo: "Súplica Final",
          v: extra.peticion,
          r: extra.promesa
        };
      }
    }
    return {};
  },

  siguiente() {
    if (this.pasoActual.tipo === 'avemarias') {
      if (this.avemariaActual < 10) {
        this.avemariaActual++;
        if (navigator.vibrate) navigator.vibrate(30);
        return;
      } else {
        this.avemariaActual = 0;
      }
    }

    if (this.pasoActual.tipo === 'letanias' || this.pasoActual.tipo === 'letanias-difuntos') {
      const totalLetanias = this.obtenerTotalLetanias();
      if (this.letaniaActualIndex < totalLetanias - 1) {
        this.letaniaActualIndex++;
        if (navigator.vibrate) navigator.vibrate(15);
        return;
      } else {
        this.letaniaActualIndex = 0;
      }
    }

    if (this.pasoActualIndex < this.pasos.length - 1) {
      this.pasoActualIndex++;
      this.avemariaActual = 0;
      this.letaniaActualIndex = 0;
      if (navigator.vibrate) navigator.vibrate(15);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  anterior() {
    if (this.pasoActual.tipo === 'avemarias' && this.avemariaActual > 0) {
      this.avemariaActual--;
      if (navigator.vibrate) navigator.vibrate(15);
      return;
    }

    if (this.pasoActual.tipo === 'letanias' || this.pasoActual.tipo === 'letanias-difuntos') {
      if (this.letaniaActualIndex > 0) {
        this.letaniaActualIndex--;
        if (navigator.vibrate) navigator.vibrate(15);
        return;
      }
    }

    if (this.pasoActualIndex > 0) {
      this.pasoActualIndex--;
      const anteriorPaso = this.pasos[this.pasoActualIndex];
      
      if (anteriorPaso.tipo === 'avemarias') {
        this.avemariaActual = 10;
      } else if (anteriorPaso_tipo_es_letania(anteriorPaso)) {
        this.letaniaActualIndex = this.obtenerTotalLetaniasForStep(anteriorPaso) - 1;
      } else {
        this.avemariaActual = 0;
        this.letaniaActualIndex = 0;
      }
      if (navigator.vibrate) navigator.vibrate(15);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  reiniciar() {
    this.pasoActualIndex = 0;
    this.avemariaActual = 0;
    this.letaniaActualIndex = 0;
    this.menuAbierto = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}));

function anteriorPaso_tipo_es_letania(paso) {
  return paso.tipo === 'letanias' || paso.tipo === 'letanias-difuntos';
}

Alpine.start();

if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/rosario/sw.js')
      .then(reg => console.log('[Service Worker] Registrado con éxito en producción:', reg.scope))
      .catch(err => console.error('[Service Worker] Falló el registro:', err));
  });
} else if ('serviceWorker' in navigator && window.location.hostname === 'localhost') {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
      registration.unregister();
      console.log('[Service Worker] Desregistrado del entorno local para desarrollo limpio.');
    }
  });
}
