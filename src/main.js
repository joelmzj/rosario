import './style.css';
import Alpine from 'alpinejs';
import { 
  ORACIONES, 
  MISTERIOS, 
  LETANIAS, 
  CLOSING_DEVOTION, 
  CONCLUSION_DIFUNTOS, 
  LEVANTA_CRUZ, 
  obtenerMisterioDelDia 
} from './rosario.js';

window.Alpine = Alpine;

Alpine.data('rosarioApp', () => ({
  pasos: [],
  pasoActualIndex: 0,
  avemariaActual: 0,
  letaniaActualIndex: 0,
  misterioDelDia: null,
  
  // Reactividad del Rosario Dual
  tipoRosario: 'normal', 
  nombreDifunto: '',
  generoDifunto: 'hermano', // 'hermano' o 'hermana'

  // Barra / Menú de navegación rápida (Alternativa Híbrida)
  menuAbierto: false,

  init() {
    this.misterioDelDia = obtenerMisterioDelDia();
    this.generarFlujo();
    
    this.$watch('tipoRosario', () => {
      this.generarFlujo();
      this.reiniciar();
    });
    this.$watch('generoDifunto', () => {
      this.generarFlujo();
    });
  },

  formatText(text) {
    if (!text) return '';
    let t = text;
    
    if (this.tipoRosario === 'difuntos') {
      const nombreRaw = this.nombreDifunto ? this.nombreDifunto.trim() : '';
      const esFem = this.generoDifunto === 'hermana';

      // Definir los sustitutos dinámicos con/sin nombre, envueltos en <strong>
      const hermanoSust = nombreRaw ? `<strong>nuestro hermano ${nombreRaw}</strong>` : '<strong>nuestro hermano</strong>';
      const hermanaSust = nombreRaw ? `<strong>nuestra hermana ${nombreRaw}</strong>` : '<strong>nuestra hermana</strong>';
      
      const tuSiervoSust = nombreRaw ? `<strong>tu siervo ${nombreRaw}</strong>` : '<strong>tu siervo</strong>';
      const tuSiervaSust = nombreRaw ? `<strong>tu sierva ${nombreRaw}</strong>` : '<strong>tu sierva</strong>';

      const suSiervoSust = nombreRaw ? `<strong>su siervo ${nombreRaw}</strong>` : '<strong>su siervo</strong>';
      const suSiervaSust = nombreRaw ? `<strong>su sierva ${nombreRaw}</strong>` : '<strong>su sierva</strong>';

      const hijoSust = nombreRaw ? `<strong>hijo ${nombreRaw}</strong>` : '<strong>hijo</strong>';
      const hijaSust = nombreRaw ? `<strong>hija ${nombreRaw}</strong>` : '<strong>hija</strong>';

      const hermanoSoloSust = nombreRaw ? `<strong>hermano ${nombreRaw}</strong>` : '<strong>hermano</strong>';
      const hermanaSoloSust = nombreRaw ? `<strong>hermana ${nombreRaw}</strong>` : '<strong>hermana</strong>';

      const esteHijoTuyoSust = esFem ? '<strong>esta hija tuya</strong>' : '<strong>este hijo tuyo</strong>';

      // 1. Reemplazos COMBINADOS (Títulos + Nombre) para evitar colisiones y duplicaciones
      
      // "nuestro(a) hermano(a) N..." / "nuestro (a) hermano (a) N..." / "nuestro/a hermano/a N..."
      const regexRelacionN = /nuestr[oa]\s*(?:\(\s*[oa]\s*\))?\s*herman[oa]\s*(?:\(\s*[oa]\s*\))?\s*(?:N\.\.\.|N…|N\.|\.\.\.|…)?/gi;
      t = t.replace(regexRelacionN, esFem ? hermanaSust : hermanoSust);

      // "tu siervo(a) N..."
      const regexTuSiervoN = /tu\s*sierv[oa]\s*(?:\(\s*[oa]\s*\))?\s*(?:N\.\.\.|N…|N\.|\.\.\.|…)?/gi;
      t = t.replace(regexTuSiervoN, esFem ? tuSiervaSust : tuSiervoSust);

      // "su siervo(a) N..."
      const regexSuSiervoN = /su\s*sierv[oa]\s*(?:\(\s*[oa]\s*\))?\s*(?:N\.\.\.|N…|N\.|\.\.\.|…)?/gi;
      t = t.replace(regexSuSiervoN, esFem ? suSiervaSust : suSiervoSust);

      // "este(a) hijo(a) tuyo"
      const regexEsteHijoTuyo = /este\(a\)\s*hijo\(a\)\s*tuyo/gi;
      t = t.replace(regexEsteHijoTuyo, esteHijoTuyoSust);

      // "hijo(a) N..."
      const regexHijoN = /hij[oa]\s*(?:\(\s*[oa]\s*\))?\s*(?:N\.\.\.|N…|N\.|\.\.\.|…)?/gi;
      t = t.replace(regexHijoN, esFem ? hijaSust : hijoSust);

      // "hermano(a) N..."
      const regexHermanoSoloN = /herman[oa]\s*(?:\(\s*[oa]\s*\))?\s*(?:N\.\.\.|N…|N\.|\.\.\.|…)?/gi;
      t = t.replace(regexHermanoSoloN, (match) => {
        if (match.includes('strong')) return match;
        return esFem ? hermanaSoloSust : hermanoSoloSust;
      });

      // 2. Especial para el caso de las jaculatorias de cada misterio: "el alma de..." o "el alma de N..." o "el alma de N"
      const regexAlmaDe = /el\s+alma\s+de\s*(?:N\.\.\.|N…|N\.|\.\.\.|\.\.|…)?/gi;
      t = t.replace(regexAlmaDe, (match) => {
        if (match.includes('strong')) return match;
        return esFem ? `el alma de ${hermanaSust}` : `el alma de ${hermanoSust}`;
      });

      // 3. Reemplazar cualquier marcador N... huérfano restante que no haya sido capturado
      const regexNHuerfano = /(?:N\.\.\.|N…|N\.)/g;
      t = t.replace(regexNHuerfano, esFem ? hermanaSust : hermanoSust);

      // 4. Reemplazos GRAMATICALES (Standalone) para adaptar el resto del texto litúrgico
      if (esFem) {
        t = t.replace(/siervo\(a\)/gi, '<strong>sierva</strong>');
        t = t.replace(/hijo\(a\)/gi, '<strong>hija</strong>');
        t = t.replace(/él \(ella\)/gi, '<strong>ella</strong>');
        t = t.replace(/él\(ella\)/gi, '<strong>ella</strong>');
        t = t.replace(/lo\(la\)/gi, '<strong>la</strong>');
        t = t.replace(/lo \(la\)/gi, '<strong>la</strong>');
        t = t.replace(/perdónalo\(la\)/gi, '<strong>perdónala</strong>');
        t = t.replace(/escúchalo\(la\)/gi, '<strong>escúchala</strong>');
        t = t.replace(/óyelo\(la\)/gi, '<strong>óyela</strong>');
        t = t.replace(/ten piedad de él\(ella\)/gi, 'ten piedad de <strong>ella</strong>');
        t = t.replace(/ten piedad él\(ella\)/gi, 'ten piedad de <strong>ella</strong>');
        t = t.replace(/ten misericordia de él\(ella\)/gi, 'ten misericordia de <strong>ella</strong>');
      } else {
        t = t.replace(/siervo\(a\)/gi, '<strong>siervo</strong>');
        t = t.replace(/hijo\(a\)/gi, '<strong>hijo</strong>');
        t = t.replace(/él \(ella\)/gi, '<strong>él</strong>');
        t = t.replace(/él\(ella\)/gi, '<strong>él</strong>');
        t = t.replace(/lo\(la\)/gi, '<strong>lo</strong>');
        t = t.replace(/lo \(la\)/gi, '<strong>lo</strong>');
        t = t.replace(/perdónalo\(la\)/gi, '<strong>perdónalo</strong>');
        t = t.replace(/escúchalo\(la\)/gi, '<strong>escúchalo</strong>');
        t = t.replace(/óyelo\(la\)/gi, '<strong>óyelo</strong>');
        t = t.replace(/ten piedad de él\(ella\)/gi, 'ten piedad de <strong>él</strong>');
        t = t.replace(/ten piedad él\(ella\)/gi, 'ten piedad de <strong>él</strong>');
        t = t.replace(/ten misericordia de él\(ella\)/gi, 'ten misericordia de <strong>él</strong>');
      }
    }
    return t;
  },

  generarFlujo() {
    const flujo = [];

    if (this.tipoRosario === 'normal') {
      // --- ROSARIO ESTÁNDAR ---
      flujo.push({ tipo: 'texto', titulo: ORACIONES.inicio.titulo, texto: ORACIONES.inicio.texto, indicacion: "Haz la señal de la Cruz para comenzar tu oración." });
      flujo.push({ tipo: 'texto', titulo: ORACIONES.actoContricion.titulo, texto: ORACIONES.actoContricion.texto, indicacion: "Pide perdón de corazón antes de iniciar los misterios." });
      flujo.push({ tipo: 'invocacion', titulo: ORACIONES.apertura.titulo, lineas: ORACIONES.apertura.lineas, indicacion: "Oración de apertura de los labios." });

      this.misterioDelDia.lista.forEach((misterioNombre, index) => {
        const numMisterio = index + 1;
        flujo.push({ tipo: 'misterio-anuncio', titulo: `${numMisterio}º Misterio`, texto: misterioNombre, indicacion: "Medita en este misterio antes de comenzar a rezar." });
        flujo.push({ tipo: 'texto', titulo: `${numMisterio}º Misterio - Padre Nuestro`, texto: ORACIONES.padrenuestro.texto, indicacion: "Reza el Padre Nuestro que nos enseñó el Señor." });
        flujo.push({ tipo: 'avemarias', titulo: `${numMisterio}º Misterio - Avemarías`, guia: ORACIONES.avemaria.guia, respuesta: ORACIONES.avemaria.respuesta, indicacion: "Toca la pantalla o presiona Siguiente para avanzar cada cuenta." });
        flujo.push({ tipo: 'texto', titulo: `${numMisterio}º Misterio - Gloria`, texto: ORACIONES.gloria.texto, indicacion: "Adoración a la Santísima Trinidad." });
        flujo.push({ tipo: 'jaculatorias-misterio', titulo: `${numMisterio}º Misterio - Jaculatorias`, oraciones: [ORACIONES.madreGracia.texto, ORACIONES.ohJesusMio.texto], indicacion: "Jaculatorias tradicionales tras cada misterio." });
      });

      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.ofrecimiento.titulo, guia: CLOSING_DEVOTION.ofrecimiento.guia, respuesta: CLOSING_DEVOTION.ofrecimiento.respuesta, indicacion: "Ofrecimiento general de las Salves." });
      flujo.push({ tipo: 'texto', titulo: CLOSING_DEVOTION.santuario.titulo, texto: CLOSING_DEVOTION.santuario.texto, indicacion: "Sagrario del Verbo Eterno." });
      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.padrenuestro.titulo, guia: CLOSING_DEVOTION.padrenuestro.guia, respuesta: CLOSING_DEVOTION.padrenuestro.respuesta, indicacion: "Iniciamos el ciclo de tres Salves." });
      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.primeraSalve.titulo, guia: CLOSING_DEVOTION.primeraSalve.guia, respuesta: CLOSING_DEVOTION.primeraSalve.respuesta, indicacion: "Encomendamos nuestra virtud de la Fe." });
      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.segundaSalve.titulo, guia: CLOSING_DEVOTION.segundaSalve.guia, respuesta: CLOSING_DEVOTION.segundaSalve.respuesta, indicacion: "Encomendamos nuestra virtud de la Esperanza." });
      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.terceraSalve.titulo, guia: CLOSING_DEVOTION.terceraSalve.guia, respuesta: CLOSING_DEVOTION.terceraSalve.respuesta, indicacion: "Encomendamos nuestra virtud de la Caridad." });
      flujo.push({ tipo: 'cuarta-salve', titulo: CLOSING_DEVOTION.cuartaSalve.titulo, guia: CLOSING_DEVOTION.cuartaSalve.guia, peticion: CLOSING_DEVOTION.cuartaSalve.peticion, promesa: CLOSING_DEVOTION.cuartaSalve.promesa, indicacion: "Templo, Trono y Sagrario tradicional." });
      flujo.push({ tipo: 'letanias', titulo: "Letanías Lauretanas", iniciales: LETANIAS.iniciales, virgen: LETANIAS.virgen, finales: LETANIAS.finales, indicacion: "Alabanzas poéticas a la Santísima Virgen." });
      flujo.push({ tipo: 'oracion-final', titulo: "Oración Final", peticion: LETANIAS.oracionFinal.peticion, promesa: LETANIAS.oracionFinal.promesa, oracion: LETANIAS.oracionFinal.oracion, indicacion: "Concluyendo el Santo Rosario." });
      flujo.push({ tipo: 'jaculatoria-final', titulo: ORACIONES.jaculatoriaFinal.titulo, guia: ORACIONES.jaculatoriaFinal.guia, respuesta: ORACIONES.jaculatoriaFinal.respuesta, indicacion: "Último saludo." });

    } else {
      // --- ROSARIO PARA DIFUNTOS + LEVANTA CRUZ ---
      flujo.push({ tipo: 'texto', titulo: ORACIONES.inicio.titulo, texto: ORACIONES.inicio.texto, indicacion: "Inicio del Santo Rosario por las almas de nuestros seres queridos." });
      flujo.push({ tipo: 'texto', titulo: ORACIONES.actoContricionDifuntos.titulo, texto: ORACIONES.actoContricionDifuntos.texto, indicacion: "Hacemos un acto sincero de contrición." });
      flujo.push({ tipo: 'invocacion', titulo: ORACIONES.aperturaDifuntos.titulo, lineas: ORACIONES.aperturaDifuntos.lineas, indicacion: "Abrimos nuestro corazón a la plegaria." });
      flujo.push({ tipo: 'texto', titulo: ORACIONES.ohDiosPerdonas.titulo, texto: ORACIONES.ohDiosPerdonas.texto, indicacion: "Imploramos clemencia por nuestro hermano(a)." });

      this.misterioDelDia.lista.forEach((misterioNombre, index) => {
        const numMisterio = index + 1;
        flujo.push({ tipo: 'misterio-anuncio', titulo: `${numMisterio}º Misterio`, texto: misterioNombre, indicacion: "Medita en este misterio a favor del descanso de nuestro hermano(a)." });
        flujo.push({ tipo: 'texto', titulo: `${numMisterio}º Misterio - Padre Nuestro`, texto: ORACIONES.padrenuestro.texto, indicacion: "Reza por su alma el Padre Nuestro." });
        flujo.push({ tipo: 'avemarias', titulo: `${numMisterio}º Misterio - Avemarías`,  guia: ORACIONES.avemaria.guia, respuesta: "Santa María, Madre de Dios, ruega Señora por él (ella) y por nosotros los pecadores, ahora y en la hora de nuestra muerte. Amén, Jesús.", indicacion: "Ofrecemos diez Avemarías por su eterna salvación." });
        flujo.push({ tipo: 'texto', titulo: `${numMisterio}º Misterio - Gloria`, texto: ORACIONES.gloria.texto, indicacion: "Damos gloria a la Santísima Trinidad." });
        flujo.push({ tipo: 'jaculatorias-difuntos', titulo: `${numMisterio}º Misterio - Jaculatorias por los Difuntos`, latin: ORACIONES.jaculatoriaMisterioDifuntos.latin, espanol: ORACIONES.jaculatoriaMisterioDifuntos.espanol, sangreV: ORACIONES.jaculatoriaMisterioDifuntos.sangreV, sangreR: ORACIONES.jaculatoriaMisterioDifuntos.sangreR, misericordia: ORACIONES.jaculatoriaMisterioDifuntos.misericordia, indicacion: "Jaculatoria tradicional del Sufragio." });
      });

      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.ofrecimiento.titulo, guia: CLOSING_DEVOTION.ofrecimiento.guia, respuesta: CLOSING_DEVOTION.ofrecimiento.respuesta, indicacion: "Ofrecimiento de las Salves por el Purgatorio." });
      flujo.push({ tipo: 'texto', titulo: CLOSING_DEVOTION.santuario.titulo, texto: CLOSING_DEVOTION.santuario.texto, indicacion: "Libra del infierno a quienes te rezan." });
      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.padrenuestro.titulo, guia: CLOSING_DEVOTION.padrenuestro.guia, respuesta: CLOSING_DEVOTION.padrenuestro.respuesta, indicacion: "Comenzamos las Tres Salves de Encomendación." });
      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.primeraSalveDifuntos.titulo, guia: CLOSING_DEVOTION.primeraSalveDifuntos.guia, respuesta: "Santa María, Madre de Dios, ruega Señora por él (ella) y por nosotros los pecadores, ahora y en la hora de nuestra muerte. Amén, Jesús.", indicacion: "Encomendamos su Fe." });
      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.segundaSalveDifuntos.titulo, guia: CLOSING_DEVOTION.segundaSalveDifuntos.guia, respuesta: CLOSING_DEVOTION.segundaSalveDifuntos.respuesta, indicacion: "Encomendamos su Esperanza." });
      flujo.push({ tipo: 'guia-respuesta', titulo: CLOSING_DEVOTION.terceraSalveDifuntos.titulo, guia: CLOSING_DEVOTION.terceraSalveDifuntos.guia, respuesta: CLOSING_DEVOTION.terceraSalveDifuntos.respuesta, indicacion: "Encomendamos su Caridad." });
      flujo.push({ tipo: 'cuarta-salve-difuntos', titulo: CLOSING_DEVOTION.cuartaSalveDifuntos.titulo, guia: CLOSING_DEVOTION.cuartaSalveDifuntos.guia, peticion: CLOSING_DEVOTION.cuartaSalveDifuntos.peticion, promesa: CLOSING_DEVOTION.cuartaSalveDifuntos.promesa, indicacion: "Reina y Madre de Misericordia." });
      flujo.push({ tipo: 'texto', titulo: CLOSING_DEVOTION.oracionSabanaDifuntos.titulo, texto: CLOSING_DEVOTION.oracionSabanaDifuntos.texto, indicacion: "Por los méritos de la Sábana Santa." });

      flujo.push({ tipo: 'letanias-difuntos', titulo: "Letanías por el Difunto", iniciales: LETANIAS.inicialesDifuntos, virgen: LETANIAS.virgen, finales: LETANIAS.finalesDifuntos, oracionFinal: LETANIAS.oracionFinalDifuntos, indicacion: "Súplicas de absolución a favor de nuestro hermano(a)." });
      flujo.push({ tipo: 'suplicas-finales', titulo: CONCLUSION_DIFUNTOS.titulo, intro: CONCLUSION_DIFUNTOS.intro, respuestaComun: CONCLUSION_DIFUNTOS.respuestaComun, lista: CONCLUSION_DIFUNTOS.lista, indicacion: "Intercesión por los difuntos y la comunidad viva." });
      
      // Jaculatoria final del Santo Rosario de Difuntos (Cierre canónico antes de iniciar la cruz)
      flujo.push({ tipo: 'jaculatoria-final', titulo: ORACIONES.jaculatoriaFinal.titulo, guia: ORACIONES.jaculatoriaFinal.guia, respuesta: ORACIONES.jaculatoriaFinal.respuesta, indicacion: "Cierre del Santo Rosario." });

      // Rito de Levanta Cruz
      flujo.push({ tipo: 'texto', titulo: LEVANTA_CRUZ.intro.titulo, texto: LEVANTA_CRUZ.intro.texto, indicacion: "Comienza el rito del levantamiento de la Cruz." });
      flujo.push({ tipo: 'invocaciones-resurreccion', titulo: LEVANTA_CRUZ.peticiones.titulo, respuestaComun: LEVANTA_CRUZ.peticiones.respuestaComun, items: LEVANTA_CRUZ.peticiones.items, indicacion: "Oración a Cristo, Resurrección y Vida." });
      flujo.push({ tipo: 'texto', titulo: "Padre Nuestro de la Cruz", texto: ORACIONES.padrenuestro.texto, indicacion: "La oración de los hijos de Dios." });
      
      flujo.push({ tipo: 'rito-cruz-paso', titulo: LEVANTA_CRUZ.ritoCabeza.titulo, amonestacion: LEVANTA_CRUZ.ritoCabeza.amonestacion, indicacion: LEVANTA_CRUZ.ritoCabeza.indicacion, estrofas: LEVANTA_CRUZ.ritoCabeza.estrofas, cruzVencedor: LEVANTA_CRUZ.cruzVencedor, cantoAdicional: LEVANTA_CRUZ.cantoAdicional.estrofa, indicacionEspecial: "Se recoge la parte correspondiente a la cabeza." });
      flujo.push({ tipo: 'rito-cruz-paso', titulo: LEVANTA_CRUZ.ritoBrazos.titulo, amonestacion: LEVANTA_CRUZ.ritoBrazos.amonestacion, indicacion: LEVANTA_CRUZ.ritoBrazos.indicacion, estrofas: LEVANTA_CRUZ.ritoBrazos.estrofas, cruzVencedor: LEVANTA_CRUZ.cruzVencedor, indicacionEspecial: "Se recogen los brazos, derecho e izquierdo." });
      flujo.push({ tipo: 'rito-cruz-paso', titulo: LEVANTA_CRUZ.ritoPiesCentro.titulo, amonestacion: LEVANTA_CRUZ.ritoPiesCentro.amonestacion, indicacion: LEVANTA_CRUZ.ritoPiesCentro.indicacion, estrofas: LEVANTA_CRUZ.ritoPiesCentro.estrofas, cruzVencedor: LEVANTA_CRUZ.cruzVencedor, indicacionEspecial: "Se recogen el resto y pies de la cruz." });
      flujo.push({ tipo: 'cruz-triunfante', titulo: LEVANTA_CRUZ.levantamientoFinal.titulo, texto: LEVANTA_CRUZ.levantamientoFinal.texto, indicacionEspecial: LEVANTA_CRUZ.levantamientoFinal.indicacion, indicacion: "La cruz triunfa sobre la muerte." });

      flujo.push({ tipo: 'guia-respuesta', titulo: "Bajo tu Amparo", guia: "Bajo tu amparo nos acogemos, Santa Madre de Dios, no desprecies las oraciones que te hacemos en nuestras necesidades. Antes bien, líbranos de todos los peligros ¡Oh Virgen gloriosa y bendita!", respuesta: "Amén.", indicacion: "Último amparo." });
      flujo.push({ tipo: 'jaculatoria-final', titulo: ORACIONES.jaculatoriaFinal.titulo, guia: ORACIONES.jaculatoriaFinal.guia, respuesta: ORACIONES.jaculatoriaFinal.respuesta, indicacion: "Despedida del rito." });
    }

    flujo.push({ 
      tipo: 'fin', 
      titulo: "¡Santo Rosario Concluido!", 
      texto: this.tipoRosario === 'normal' 
        ? "Que el Señor nos bendiga, nos guarde de todo mal y nos lleve a la vida eterna. Amén."
        : "Dale, Señor, el descanso eterno y luzca para él (ella) la luz perpetua. Que por tu infinita misericordia su alma descanse en paz. Amén.",
      indicacion: "Muchas gracias por rezar con nosotros."
    });

    this.pasos = flujo;
  },

  get pasoActual() {
    return this.pasos[this.pasoActualIndex] || {};
  },

  // Obtiene los hitos principales dinámicamente para el menú izquierdo
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

    if (this.pasoActual.tipo === 'letanias') {
      const totalLetanias = this.pasoActual.iniciales.length + this.pasoActual.virgen.titulos.length + this.pasoActual.finales.length;
      if (this.letaniaActualIndex < totalLetanias - 1) {
        this.letaniaActualIndex++;
        if (navigator.vibrate) navigator.vibrate(25);
        return;
      }
    }

    if (this.pasoActual.tipo === 'letanias-difuntos') {
      const totalInvocaciones = this.pasoActual.iniciales.length + this.pasoActual.virgen.titulos.length + this.pasoActual.finales.length;
      const subpasosTotales = totalInvocaciones + 5; 
      if (this.letaniaActualIndex < subpasosTotales - 1) {
        this.letaniaActualIndex++;
        if (navigator.vibrate) navigator.vibrate(25);
        return;
      }
    }

    if (this.pasoActualIndex < this.pasos.length - 1) {
      this.pasoActualIndex++;
      this.letaniaActualIndex = 0;
      if (navigator.vibrate) navigator.vibrate();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  anterior() {
    if (this.pasoActual.tipo === 'avemarias' && this.avemariaActual > 0) {
      this.avemariaActual--;
      return;
    }

    if (this.pasoActual.tipo === 'letanias' && this.letaniaActualIndex > 0) {
      this.letaniaActualIndex--;
      return;
    }

    if (this.pasoActual.tipo === 'letanias-difuntos' && this.letaniaActualIndex > 0) {
      this.letaniaActualIndex--;
      return;
    }

    if (this.pasoActualIndex > 0) {
      this.pasoActualIndex--;
      
      const pasoPrevio = this.pasos[this.pasoActualIndex];
      if (pasoPrevio.tipo === 'avemarias') {
        this.avemariaActual = 10;
      } else if (pasoPrevio.tipo === 'letanias') {
        const totalLetanias = pasoPrevio.iniciales.length + pasoPrevio.virgen.titulos.length + pasoPrevio.finales.length;
        this.letaniaActualIndex = totalLetanias - 1;
      } else if (pasoPrevio.tipo === 'letanias-difuntos') {
        const totalInvocaciones = pasoPrevio.iniciales.length + pasoPrevio.virgen.titulos.length + pasoPrevio.finales.length;
        this.letaniaActualIndex = totalInvocaciones + 4;
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  obtenerLetaniaActual() {
    if (this.pasoActual.tipo !== 'letanias' && this.pasoActual.tipo !== 'letanias-difuntos') return {};
    const p = this.pasoActual;
    const idx = this.letaniaActualIndex;

    const lenIniciales = p.iniciales.length;
    const lenVirgen = p.virgen.titulos.length;
    const lenFinales = p.finales.length;

    if (idx < lenIniciales) {
      return { v: p.iniciales[idx].invocacion, r: p.iniciales[idx].respuesta, seccion: "Invocaciones Iniciales", tipoSubpaso: 'letania' };
    }

    const idxVirgen = idx - lenIniciales;
    if (idxVirgen < lenVirgen) {
      const resp = this.tipoRosario === 'difuntos' ? p.virgen.respuestaComunDifuntos : p.virgen.respuestaComun;
      return { v: p.virgen.titulos[idxVirgen], r: resp, seccion: "Alabanzas Marianas", tipoSubpaso: 'letania' };
    }

    const idxFinales = idxVirgen - lenVirgen;
    if (idxFinales < lenFinales) {
      return { v: p.finales[idxFinales].invocacion, r: p.finales[idxFinales].respuesta, seccion: "Invocaciones Finales", tipoSubpaso: 'letania' };
    }

    if (this.tipoRosario === 'difuntos') {
      const idxSufragio = idxFinales - lenFinales;
      const of = p.oracionFinal;
      
      switch(idxSufragio) {
        case 0:
          return { titulo: "Absolución por la Sangre", v: of.sangre3V, r: of.sangre3R, seccion: "Súplica de Redención", tipoSubpaso: 'sufragio-guia' };
        case 1:
          return { titulo: "Descanso Eterno", v: of.descansoV, r: of.descansoR, seccion: "Súplica de Paz", tipoSubpaso: 'sufragio-guia' };
        case 2:
          return { titulo: "Descanso en Paz", v: of.pazV, r: of.pazR, seccion: "Súplica de Paz", tipoSubpaso: 'sufragio-guia' };
        case 3:
          return { titulo: "Bajo tu Amparo", texto: of.amparo, seccion: "Consagración Mariana", tipoSubpaso: 'sufragio-texto' };
        case 4:
          return { titulo: "Súplica del Amparo", v: of.peticion, r: of.promesa, seccion: "Consagración Mariana", tipoSubpaso: 'sufragio-guia' };
      }
    }
    return {};
  },

  progresoLetaniasPorcentaje() {
    if (this.pasoActual.tipo !== 'letanias' && this.pasoActual.tipo !== 'letanias-difuntos') return 0;
    const p = this.pasoActual;
    const totalInvocaciones = p.iniciales.length + p.virgen.titulos.length + p.finales.length;
    const totalPasos = this.tipoRosario === 'difuntos' ? totalInvocaciones + 5 : totalInvocaciones;
    return Math.round((this.letaniaActualIndex / (totalPasos - 1)) * 100);
  },

  reiniciar() {
    this.pasoActualIndex = 0;
    this.avemariaActual = 0;
    this.letaniaActualIndex = 0;
    this.menuAbierto = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}));

Alpine.start();
// Registrar el Service Worker SOLO si no estamos en localhost (Entorno de producción)
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/rosario/sw.js')
      .then(reg => console.log('[Service Worker] Registrado con éxito en producción:', reg.scope))
      .catch(err => console.error('[Service Worker] Falló el registro:', err));
  });
} else if ('serviceWorker' in navigator && window.location.hostname === 'localhost') {
  // Desregistrar de forma activa cualquier service worker local viejo para limpiar desarrollo
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
      registration.unregister();
      console.log('[Service Worker] Desregistrado del entorno local para desarrollo limpio.');
    }
  });
}