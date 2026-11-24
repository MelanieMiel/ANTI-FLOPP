import React, { useState, useMemo } from 'react';
import {
    Music, ArrowRight, CheckCircle2, Lock, Instagram,
    ChevronRight, LayoutDashboard, Calendar, FileText, Megaphone,
    Upload, Search, X, Sparkles, PlayCircle, CheckSquare, Square, Clock,
    Users, Cpu, Target, AlertTriangle, TrendingUp, MapPin, Activity, ShieldAlert
} from 'lucide-react';

// --- 20 GÉNEROS MUSICALES ---
const GENEROS_PRINCIPALES = [
    'Indie Rock',
    'Indie Pop',
    'Bedroom Pop / Lo-Fi',
    'Shoegaze / Dream Pop',
    'Post-Punk / Darkwave',
    'Folk / Cantautor',
    'Urbano / Reggaetón Mexa',
    'Hip-Hop / Rap Alternativo',
    'R&B / Neo-Soul',
    'Corridos Tumbados / Sierreño Alt',
    'Synth-Pop / Electrónica',
    'Math Rock / Midwest Emo',
    'Psicodelia / Neo-Psicodelia',
    'Punk / Garage Rock',
    'Cumbia Alternativa / Psicodélica',
    'Hyperpop / Experimental',
    'Bolero Glam / Retro Pop',
    'Metal / Hardcore',
    'House / Techno / Club',
    'Jazz Fusión / Instrumental'
];

// --- CATÁLOGO DE 45 REFERENTES ---
const MOCK_REFERENTES = [
    { id: 1, nombre: 'Bratty', genero: 'Surf Pop / Bedroom Pop' },
    { id: 2, nombre: 'Ed Maverick', genero: 'Folk / Alternativo' },
    { id: 3, nombre: 'NSQK', genero: 'Alternativo / Urbano' },
    { id: 4, nombre: 'Depresión Sonora', genero: 'Post-Punk' },
    { id: 5, nombre: 'Latin Mafia', genero: 'R&B / Pop' },
    { id: 6, nombre: 'Kevin Kaarl', genero: 'Folk / Indie' },
    { id: 7, nombre: 'Enjambre', genero: 'Indie Rock' },
    { id: 8, nombre: 'Siddhartha', genero: 'Indie Rock / Pop' },
    { id: 9, nombre: 'Little Jesus', genero: 'Indie Pop / Tropipop' },
    { id: 10, nombre: 'Camilo Séptimo', genero: 'Synth-Pop / Indie' },
    { id: 11, nombre: 'Porter', genero: 'Psicodelia / Indie Rock' },
    { id: 12, nombre: 'León Larregui', genero: 'Synth-Pop / Rock' },
    { id: 13, nombre: 'Silvana Estrada', genero: 'Folk / Cantautor' },
    { id: 14, nombre: 'Natalia Lafourcade', genero: 'Folk / Alternativo' },
    { id: 15, nombre: 'Carla Morrison', genero: 'Indie Pop' },
    { id: 16, nombre: 'El David Aguilar', genero: 'Cantautor / Folk' },
    { id: 17, nombre: 'Humbe', genero: 'Pop Alternativo / R&B' },
    { id: 18, nombre: 'Arroba Nat', genero: 'Bedroom Pop / Folk' },
    { id: 19, nombre: 'Señor Kino', genero: 'Surf Punk / Garage' },
    { id: 20, nombre: 'Margaritas Podridas', genero: 'Shoegaze / Grunge' },
    { id: 21, nombre: 'Los Blenders', genero: 'Surf Rock / Garage' },
    { id: 22, nombre: 'O Tortuga', genero: 'Garage / Punk' },
    { id: 23, nombre: 'Dromedarios Mágicos', genero: 'Folk / Bedroom Pop' },
    { id: 24, nombre: 'Daniel, Me Estás Matando', genero: 'Bolero Glam' },
    { id: 25, nombre: 'Ramona', genero: 'Psicodelia / Rock' },
    { id: 26, nombre: 'CLUBZ', genero: 'Electro Pop / Synth-Pop' },
    { id: 27, nombre: 'Girl Ultra', genero: 'R&B / Neo-Soul' },
    { id: 28, nombre: 'Jesse Baez', genero: 'R&B / Urbano' },
    { id: 29, nombre: 'Álvaro Díaz', genero: 'Urbano / Alternativo' },
    { id: 30, nombre: 'Alemán', genero: 'Hip-Hop / Rap' },
    { id: 31, nombre: 'Gera MX', genero: 'Hip-Hop / Rap' },
    { id: 32, nombre: 'Natanael Cano', genero: 'Corridos Tumbados' },
    { id: 33, nombre: 'Junior H', genero: 'Corridos Tumbados / Sad Sierreño' },
    { id: 34, nombre: 'Iván Cornejo', genero: 'Sierreño Alternativo' },
    { id: 35, nombre: 'Cuco', genero: 'Dream Pop / Psicodelia' },
    { id: 36, nombre: 'The Marías', genero: 'Indie Pop / Psicodelia' },
    { id: 37, nombre: 'Sonido Gallo Negro', genero: 'Cumbia Psicodélica' },
    { id: 38, nombre: 'Austin TV', genero: 'Post-Rock / Instrumental' },
    { id: 39, nombre: 'Belafonte Sensacional', genero: 'Folk Punk' },
    { id: 40, nombre: 'Zoe Gotusso', genero: 'Indie Pop / Folk' },
    { id: 41, nombre: 'El Mató a un Policía Motorizado', genero: 'Indie Rock' },
    { id: 42, nombre: 'Ca7riel & Paco Amoroso', genero: 'Experimental / Urbano' },
    { id: 43, nombre: 'Rels B', genero: 'R&B / Urbano' },
    { id: 44, nombre: 'Mac DeMarco', genero: 'Lo-Fi / Indie Rock' },
    { id: 45, nombre: 'Tame Impala', genero: 'Neo-Psicodelia' }
];

const MOCK_MEDIOS_MEXICO = [
    { nombre: 'Indie Rocks!', tipo: 'Revista Digital', enfoque: 'Lanzamientos, entrevistas. Ideal para proyectos en etapa media/avanzada.', contacto: 'Pitch vía email (editorial@indierocks.mx)' },
    { nombre: 'Me Hace Ruido', tipo: 'Blog / Medio Independiente', enfoque: 'Escena emergente local, reseñas de EPs y conciertos pequeños.', contacto: 'Enviar EPK (Press Kit) por correo.' },
    { nombre: 'Playlist: Escena Indie Mex (Spotify)', tipo: 'Curador Independiente', enfoque: 'Playlists no editoriales con alta tracción.', contacto: 'SubmitHub / Groover o DM en Instagram.' },
    { nombre: 'Reactor 105.7 FM', tipo: 'Radio Pública', enfoque: 'Rock y Alternativo. Tienen espacios para propuestas emergentes los fines de semana.', contacto: 'Enviar sencillo en .WAV a locutores específicos.' }
];

// --- MOCK DATA: PLAN DE CONTENIDO ---
const MOCK_PLAN_CONTENIDO = [
    {
        id: 'c1',
        dia: 'Lunes',
        formato: 'TikTok / Reel (15-25s)',
        pilar: 'Descubrimiento (Gancho de Nicho)',
        titulo: 'Comparativa directa con tus referentes',
        gancho: '"Si te gusta el sonido de [Referente] pero más crudo, escucha este puente..."',
        ejecucion: 'Graba una toma fija en tu cuarto o estudio con luz cálida. Pon la letra en subtítulos grandes y entra directo al coro en el segundo 3.',
        objetivo: 'Atraer audiencia fría que ya escucha a tus artistas de referencia.'
    },
    {
        id: 'c2',
        dia: 'Miércoles',
        formato: 'Reel / YouTube Short (30-45s)',
        pilar: 'Proceso Creativo (Behind the Scenes)',
        titulo: 'Cómo nació el sonido principal de tu canción',
        gancho: '"Así convertí una nota de voz de las 3 AM en mi próximo sencillo..."',
        ejecucion: 'Muestra 5 segundos de la nota de voz original en tu celular, haz un corte rápido a tu DAW (Ableton/FL/Logic) y suelta la mezcla final.',
        objetivo: 'Generar conexión humana y retención alta (la gente ama ver el antes y después).'
    },
    {
        id: 'c3',
        dia: 'Viernes',
        formato: 'Carrusel de Instagram (5 slides)',
        pilar: 'Identidad Visual / Storytelling',
        titulo: 'El universo estético detrás de la letra',
        gancho: 'Slide 1: Foto con grano/estética analógica + una frase vulnerable de tu canción.',
        ejecucion: 'Combina fotos del proceso, capturas de tus notas escritas a mano y un fragmento de audio de fondo usando la música oficial de IG.',
        objetivo: 'Aumentar guardados y compartidos en historias (señal clave para el algoritmo).'
    },
    {
        id: 'c4',
        dia: 'Domingo',
        formato: 'TikTok / Reel (20s)',
        pilar: 'Performance Crudo',
        titulo: 'Sesión acústica en un lugar cotidiano',
        gancho: 'Sin texto largo. Empieza cantando o tocando desde el segundo 0.5.',
        ejecucion: 'Graba en una azotea, parque o coche con el micrófono del celular. La imperfección genera más confianza que un videoclip sobreproducido.',
        objetivo: 'Demostrar talento real en vivo y validar el proyecto ante nuevos seguidores.'
    }
];

// --- MOCK DATA: ROADMAP DE LANZAMIENTO ---
const MOCK_ROADMAP = [
    {
        fase: 'Fase 1: Pre-Lanzamiento',
        tiempo: '4 a 2 semanas antes',
        color: 'text-purple-400',
        tareas: [
            { id: 't1', texto: 'Subir el master y portada a tu distribuidora (DistroKid, TuneCore, CD Baby) mínimo 21 días antes.' },
            { id: 't2', texto: 'Hacer el Pitch Editorial en Spotify for Artists (detallando instrumentos, mood y ciudad).' },
            { id: 't3', texto: 'Armar tu EPK (Press Kit de 1 página en PDF/Notion) con bio corta, 3 fotos en alta y link privado de escucha.' },
            { id: 't4', texto: 'Grabar 8 a 10 videos cortos en un solo día usando el fragmento más pegajoso (coro o puente).' }
        ]
    },
    {
        fase: 'Fase 2: Semana de Estreno',
        tiempo: 'Día -7 al Día 0',
        color: 'text-emerald-400',
        tareas: [
            { id: 't5', texto: 'Activar campaña de Pre-Save y poner el link en tu biografía de Instagram y TikTok.' },
            { id: 't6', texto: 'Subir el Spotify Canvas (video vertical en loop de 8 segundos) antes del viernes.' },
            { id: 't7', texto: 'Enviar el sencillo por correo a blogs mexicanos (Me Hace Ruido, Filter) y curadores independientes.' },
            { id: 't8', texto: 'Día 0 (Viernes): Publicar el video principal, hacer un Live corto o dinámica en historias agradeciendo.' }
        ]
    },
    {
        fase: 'Fase 3: Post-Lanzamiento',
        tiempo: 'Semanas 1 a 3 después',
        color: 'text-blue-400',
        tareas: [
            { id: 't9', texto: 'Publicar una versión acústica o "Live Session" casera en YouTube para darle segunda vida al tema.' },
            { id: 't10', texto: 'Revisar en Spotify for Artists de qué ciudades y playlists llegaron tus oyentes.' },
            { id: 't11', texto: 'Responder con video a los comentarios más interesantes en TikTok para reactivar el audio.' }
        ]
    }
];

// --- MOTOR DE DIAGNÓSTICO AVANZADO ---
function generarDiagnosticoAvanzado(projectData, selectedRefNames) {
  const genero = projectData.generoPrincipal;
  const esUrbanoORegional = /Urbano|Hip-Hop|Corridos|R&B|Reggaetón/i.test(genero);
  const esElectronica = /Synth-Pop|House|Hyperpop|Electrónica/i.test(genero);

  // Cálculo dinámico de Score de Preparación (0 - 100)
  let score = 40;
  if (projectData.spotify) score += 20;
  if (projectData.igScreenshot) score += 15;
  if (selectedRefNames.length >= 3) score += 15;
  if (projectData.subgeneros.trim().length > 2) score += 10;

  // Público Meta según género y referentes
  const publicoMeta = {
    edad: esUrbanoORegional ? '16 - 24 años (Gen Z)' : esElectronica ? '20 - 30 años (Gen Z / Millennial)' : '18 - 27 años (Universitarios y jóvenes adultos)',
    ciudades: esUrbanoORegional
      ? 'CDMX, Monterrey, Guadalajara, Tijuana y Culiacán'
      : 'CDMX, Guadalajara, Monterrey, Puebla y Querétaro (expansión a Bogotá y Santiago)',
    horariosPico: esElectronica ? 'Jueves a Sábado (9:00 PM - 2:00 AM)' : 'Lunes a Viernes (7:00 PM - 11:30 PM) y traslados',
    comportamiento: esUrbanoORegional
      ? 'Descubrimiento acelerado en TikTok y playlists de estado de ánimo. Alta interacción en comentarios y compartidos por WhatsApp/IG Stories.'
      : 'Escucha activa por álbum/EP, guarda canciones en playlists personales de nicho y valora la estética visual y el proceso creativo detrás del artista.',
    interesesCruzados: [
      `Oyentes activos de ${selectedRefNames[0] || 'la escena alternativa'}`,
      projectData.subgeneros ? `Etiquetas: ${projectData.subgeneros}` : `Escena ${genero} independiente`,
      'Festivales locales, moda streetwear/vintage, fotografía analógica y cultura visual'
    ]
  };

  // Estrategia Algorítmica por Plataforma
  const algoritmos = [
    {
      plataforma: 'Spotify (Radio y Discover Weekly)',
      afinidad: projectData.spotify ? 'Alta (Perfil listo para entrenar)' : 'Pendiente (Falta conectar perfil)',
      senalesClave: 'Tasa de guardados > 30% y Skip Rate < 25% en los primeros 30 segundos.',
      accion: `Usa a ${selectedRefNames.slice(0, 2).join(' y ') || 'tus referentes'} como puente: busca entrar a playlists independientes donde ellos ya aparezcan para entrenar el algoritmo de "Los fans también escuchan".`
    },
    {
      plataforma: 'TikTok & Instagram Reels',
      afinidad: 'Muy Alta (Motor principal de descubrimiento)',
      senalesClave: 'Retención en los primeros 3 segundos, repeticiones (loops) y guardados del video.',
      accion: `Publica micro-piezas de 15-20s enfocadas en el clímax emocional de tu canción (${genero}). Evita intros largos y usa texto en pantalla que conecte con el mood de tu público meta.`
    },
    {
      plataforma: 'YouTube & Shorts',
      afinidad: 'Media-Alta (Fidelización y búsqueda)',
      senalesClave: 'Porcentaje de reproducción promedio y clics desde Shorts hacia el video oficial o sesión en vivo.',
      accion: 'Sube Visualizers en loop o sesiones acústicas crudas. El algoritmo de YouTube premia el tiempo de sesión y posiciona muy bien búsquedas tipo "similar a [Referente]".'
    }
  ];

  // Riesgos de Flop (Brechas críticas)
  const riesgos = [];
  if (!projectData.spotify) {
    riesgos.push('No ingresaste link de Spotify/YouTube: sin catálogo indexado o Spotify for Artists activo, pierdes el acceso a Release Radar.');
  }
  if (!projectData.igScreenshot) {
    riesgos.push('Sin auditoría visual de Instagram: si tu bio no tiene un enlace directo (Linktree/Smartlink) y una estética coherente, el tráfico de TikTok no convertirá en seguidores.');
  }
  if (projectData.presupuesto.includes('$0')) {
    riesgos.push('Presupuesto Guerrilla ($0): dependerás 100% de volumen orgánico (mínimo 4-5 videos por semana) y colaboraciones con otros artistas locales de tu mismo nivel.');
  }
  if (projectData.etapa.includes('Iniciando')) {
    riesgos.push('Etapa Inicial: evita lanzar un álbum completo de golpe. El algoritmo premia la constancia; lanza sencillos cada 5 a 6 semanas para acumular señales.');
  }

  return { score, publicoMeta, algoritmos, riesgos };
}

export default function AntiFlopApp() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Estados del usuario
    const [auth, setAuth] = useState({ proyecto: '', pin: '' });
    const [projectData, setProjectData] = useState({
        spotify: '',
        instagram: '',
        etapa: 'Iniciando (Aún no lanzo música)',
        presupuesto: 'Guerrilla ($0 - Orgánico)',
        generoPrincipal: GENEROS_PRINCIPALES[0],
        subgeneros: '',
        igScreenshot: null,
        igScreenshotName: ''
    });

    // Estados de Benchmarking (Paso 2)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRefIds, setSelectedRefIds] = useState([]);
    const [activeTab, setActiveTab] = useState('diagnostico');

    // Estados para la IA de Gemini
    const [igFile, setIgFile] = useState(null);
    const [aiDiagnostico, setAiDiagnostico] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    // Estado interactivo del Roadmap (Checklist)
    const [completedTasks, setCompletedTasks] = useState([]);

    const toggleTask = (taskId) => {
        setCompletedTasks(prev =>
            prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
        );
    };

    const totalTasks = MOCK_ROADMAP.reduce((acc, fase) => acc + fase.tareas.length, 0);
    const progressPercent = Math.round((completedTasks.length / totalTasks) * 100);

    // Nombres de referentes seleccionados para personalizar textos
    const selectedRefNames = useMemo(() => {
        return selectedRefIds
            .map(id => MOCK_REFERENTES.find(a => a.id === id)?.nombre)
            .filter(Boolean);
    }, [selectedRefIds]);

    // Si Gemini ya respondió, usa sus datos reales; si no, usa el fallback local
    const diagnostico = aiDiagnostico || generarDiagnosticoAvanzado(projectData, selectedRefNames);

    // Filtrado del buscador de artistas
    const filteredReferentes = useMemo(() => {
        if (!searchQuery.trim()) return MOCK_REFERENTES;
        const q = searchQuery.toLowerCase();
        return MOCK_REFERENTES.filter(
            a => a.nombre.toLowerCase().includes(q) || a.genero.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (auth.proyecto && auth.pin.length === 4) setStep(1);
    };

    const handleScreenshotUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setIgFile(file);
            const previewUrl = URL.createObjectURL(file);
            setProjectData({
                ...projectData,
                igScreenshot: previewUrl,
                igScreenshotName: file.name
            });
        }
    };

    const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); // Quitamos el prefijo data:image/...;base64,
        reader.onerror = (error) => reject(error);
    });

    const handleGenerateWithGemini = async () => {
        setLoading(true);
        setErrorMsg('');

        try {
            let igImageBase64 = null;
            let igImageMimeType = null;

            if (igFile) {
                igImageBase64 = await fileToBase64(igFile);
                igImageMimeType = igFile.type;
            }

            const res = await fetch('/api/analizar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    proyecto: auth.proyecto,
                    projectData,
                    referentes: selectedRefNames,
                    igImageBase64,
                    igImageMimeType
                })
            });

            const data = await res.json();
            if (!data.ok) throw new Error(data.error || 'Error al analizar');

            setAiDiagnostico(data.diagnostico);
            setStep(3);
        } catch (err) {
            console.error(err);
            setErrorMsg('Hubo un problema al conectar con Gemini. Verifica tu GEMINI_API_KEY.');
        } finally {
            setLoading(false);
        }
    };

    const toggleRef = (id) => {
        if (selectedRefIds.includes(id)) {
            setSelectedRefIds(selectedRefIds.filter(item => item !== id));
        } else {
            if (selectedRefIds.length < 5) {
                setSelectedRefIds([...selectedRefIds, id]);
            }
        }
    };

    const handleSimulateAI = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 2000);
    };

    // --- 1. LOGIN / REGISTRO ---
    if (step === 0) return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 text-zinc-100">
            <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-purple-500/10 rounded-full border border-purple-500/20">
                        <Music className="w-8 h-8 text-purple-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-center mb-2">ANTI-FLOP</h1>
                <p className="text-zinc-400 text-center mb-8 text-sm">
                    Estrategia musical basada en datos reales. Ingresa tu proyecto y un PIN de 4 dígitos para guardar o retomar tu avance.
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Nombre del Proyecto</label>
                        <input
                            required
                            type="text"
                            placeholder="Ej. Los Tempestades"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                            value={auth.proyecto}
                            onChange={e => setAuth({ ...auth, proyecto: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">PIN Secreto (4 dígitos)</label>
                        <div className="relative">
                            <Lock className="w-5 h-5 text-zinc-500 absolute left-3 top-3" />
                            <input
                                required
                                type="password"
                                pattern="\d{4}"
                                maxLength="4"
                                placeholder="••••"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-purple-500 text-center tracking-[1em]"
                                value={auth.pin}
                                onChange={e => setAuth({ ...auth, pin: e.target.value.replace(/\D/g, '') })}
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        Entrar a ANTI-FLOP <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );

    // --- 2. RECOPILACIÓN DE DATOS (ONBOARDING) ---
    if (step === 1) return (
        <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100 pb-20">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-3xl font-bold">Perfil del Proyecto</h2>
                    <span className="text-xs font-bold bg-zinc-800 text-purple-400 px-3 py-1 rounded-full">ANTI-FLOP</span>
                </div>
                <p className="text-zinc-400 mb-8">Cuéntanos el estado actual de <span className="text-white font-semibold">{auth.proyecto}</span> para calibrar el análisis.</p>

                <div className="space-y-6 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Género Principal (20 opciones)</label>
                            <select
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
                                value={projectData.generoPrincipal}
                                onChange={e => setProjectData({ ...projectData, generoPrincipal: e.target.value })}
                            >
                                {GENEROS_PRINCIPALES.map((gen) => (
                                    <option key={gen} value={gen}>{gen}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Subgéneros / Etiquetas</label>
                            <input
                                type="text"
                                placeholder="Ej. Sad Sierreño, Lo-fi, 90s..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-purple-500"
                                value={projectData.subgeneros}
                                onChange={e => setProjectData({ ...projectData, subgeneros: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Etapa del Proyecto</label>
                            <select
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3"
                                value={projectData.etapa}
                                onChange={e => setProjectData({ ...projectData, etapa: e.target.value })}
                            >
                                <option>Iniciando (Aún no lanzo música)</option>
                                <option>Emergente (1 a 5 sencillos)</option>
                                <option>En Crecimiento (Ya tengo oyentes fijos)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-2">Presupuesto Mensual</label>
                            <select
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3"
                                value={projectData.presupuesto}
                                onChange={e => setProjectData({ ...projectData, presupuesto: e.target.value })}
                            >
                                <option>Guerrilla ($0 - Orgánico)</option>
                                <option>Bajo ($500 - $2,000 MXN)</option>
                                <option>Medio ($2,000 - $10,000 MXN)</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm text-zinc-400 mb-2">Link de Spotify o YouTube (Para análisis vía API)</label>
                            <input
                                type="url"
                                placeholder="https://open.spotify.com/artist/..."
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 focus:outline-none focus:border-purple-500"
                                value={projectData.spotify}
                                onChange={e => setProjectData({ ...projectData, spotify: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
                                <Instagram className="w-4 h-4 text-pink-400" />
                                Captura de pantalla de tu perfil de Instagram (Para auditar tu feed y bio)
                            </label>

                            {!projectData.igScreenshot ? (
                                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-zinc-700 hover:border-purple-500 rounded-xl cursor-pointer bg-zinc-950/50 transition-colors">
                                    <Upload className="w-7 h-7 text-zinc-400 mb-2" />
                                    <span className="text-sm text-zinc-300 font-medium">Haz clic para subir tu captura (PNG o JPG)</span>
                                    <span className="text-xs text-zinc-500 mt-1">La IA analizará tu estética, biografía y enlaces</span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleScreenshotUpload} />
                                </label>
                            ) : (
                                <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 p-3 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <img src={projectData.igScreenshot} alt="Preview IG" className="w-16 h-16 object-cover rounded-lg border border-zinc-700" />
                                        <div>
                                            <p className="text-sm font-medium text-emerald-400 flex items-center gap-1">
                                                <CheckCircle2 className="w-4 h-4" /> Captura cargada
                                            </p>
                                            <p className="text-xs text-zinc-400 truncate max-w-xs">{projectData.igScreenshotName}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => { setProjectData({ ...projectData, igScreenshot: null, igScreenshotName: '' }); setIgFile(null); }}
                                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button onClick={() => setStep(2)} className="bg-white text-black px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-zinc-200 transition-colors">
                            Siguiente Paso <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // --- 3. SELECCIÓN DE REFERENTES ---
    if (step === 2) return (
        <div className="min-h-screen bg-zinc-950 p-6 text-zinc-100 pb-24">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-2">Benchmarking y Referencias</h2>
                <p className="text-zinc-400 mb-6">
                    Busca y selecciona hasta 5 artistas que se parezcan a tu proyecto ({projectData.generoPrincipal}).
                </p>

                {loading ? (
                    <div className="h-64 flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-purple-400 font-medium animate-pulse">
                            Consultando estadísticas, auditando tu captura y cruzando estrategias...
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="relative mb-4">
                            <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
                            <input
                                type="text"
                                placeholder="Buscar artista por nombre o género (Catálogo listo para conectar a Spotify API)..."
                                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-green-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-3.5 text-zinc-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {selectedRefIds.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl">
                                {selectedRefIds.map(id => {
                                    const art = MOCK_REFERENTES.find(a => a.id === id);
                                    return (
                                        <span key={id} className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/40 text-purple-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                                            {art?.nombre}
                                            <button onClick={() => toggleRef(id)} className="hover:text-white"><X className="w-3.5 h-3.5" /></button>
                                        </span>
                                    );
                                })}
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8 max-h-[55vh] overflow-y-auto pr-2">
                            {filteredReferentes.map((artista) => {
                                const isSelected = selectedRefIds.includes(artista.id);
                                const isDisabled = !isSelected && selectedRefIds.length >= 5;
                                return (
                                    <button
                                        key={artista.id}
                                        disabled={isDisabled}
                                        onClick={() => toggleRef(artista.id)}
                                        className={`text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${isSelected
                                                ? 'border-purple-500 bg-purple-500/15'
                                                : isDisabled
                                                    ? 'border-zinc-900 bg-zinc-900/30 opacity-40 cursor-not-allowed'
                                                    : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'
                                            }`}
                                    >
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-sm truncate">{artista.nombre}</h4>
                                            <p className="text-xs text-zinc-400 truncate">{artista.genero}</p>
                                        </div>
                                        {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>

                        {errorMsg && (
                            <div className="mb-4 p-3 bg-red-950/40 border border-red-800 rounded-xl text-red-300 text-sm flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                            <span className="text-sm text-zinc-400">
                                Seleccionados: <strong className="text-white">{selectedRefIds.length}</strong> de 5
                            </span>
                            <button
                                disabled={selectedRefIds.length === 0 || loading}
                                onClick={handleGenerateWithGemini}
                                className="bg-purple-600 disabled:opacity-40 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
                            >
                                {loading ? 'Analizando con Gemini...' : 'Generar Estrategia con Gemini'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    // --- 4. EL DASHBOARD (RESULTADOS COMPLETOS) ---
    if (step === 3) return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">

            {/* Sidebar */}
            <div className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col gap-2 shrink-0">
                <div className="mb-8">
                    <span className="text-[10px] font-black tracking-widest text-purple-400 uppercase">ANTI-FLOP</span>
                    <h2 className="font-bold text-xl truncate">{auth.proyecto}</h2>
                    <p className="text-xs text-zinc-500">{projectData.generoPrincipal}</p>
                </div>

                <button onClick={() => setActiveTab('diagnostico')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'diagnostico' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'}`}>
                    <LayoutDashboard className="w-5 h-5" /> Diagnóstico
                </button>
                <button onClick={() => setActiveTab('contenido')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'contenido' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'}`}>
                    <Instagram className="w-5 h-5" /> Plan Contenido
                </button>
                <button onClick={() => setActiveTab('roadmap')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'roadmap' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'}`}>
                    <Calendar className="w-5 h-5" /> Roadmap
                </button>
                <button onClick={() => setActiveTab('medios')} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'medios' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50'}`}>
                    <Megaphone className="w-5 h-5" /> Directorio Medios
                </button>
            </div>

            {/* Contenido Principal */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">

                {/* TAB 1: DIAGNÓSTICO COMPLEJO Y COMPLETO */}
                {activeTab === 'diagnostico' && (
                  <div className="space-y-8 pb-12">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Diagnóstico Estratégico Integral</h1>
                      <p className="text-zinc-400 text-sm">
                        Análisis cruzado de <strong className="text-white">{auth.proyecto}</strong> ({projectData.generoPrincipal}) frente a {selectedRefNames.length} referentes y señales algorítmicas actuales.
                      </p>
                    </div>

                    {/* 1. KPIs SUPERIORES */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase text-zinc-400">Índice Anti-Flop</span>
                          <Activity className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-white">{diagnostico.score}</span>
                          <span className="text-sm text-zinc-500">/ 100</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
                          <div className="bg-purple-500 h-full" style={{ width: `${diagnostico.score}%` }} />
                        </div>
                      </div>

                      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase text-zinc-400">Etapa y Estrategia</span>
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-sm font-bold text-white truncate">{projectData.etapa}</p>
                        <p className="text-xs text-zinc-400 mt-1">Presupuesto: {projectData.presupuesto}</p>
                      </div>

                      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase text-zinc-400">Activos Auditados</span>
                          <Target className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${projectData.spotify ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            {projectData.spotify ? '✓ Spotify/YT' : '✗ Sin Spotify/YT'}
                          </span>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${projectData.igScreenshot ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            {projectData.igScreenshot ? '✓ Feed IG' : '✗ Sin Captura IG'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* AUDITORÍA VISUAL DE INSTAGRAM (IA) */}
                    {diagnostico.auditoriaInstagram && (
                      <div className="bg-purple-950/20 border border-purple-500/30 rounded-2xl p-6">
                        <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-purple-300">
                          <Instagram className="w-5 h-5 text-pink-400" /> Auditoría Visual de tu Instagram (IA)
                        </h2>
                        <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
                          {diagnostico.auditoriaInstagram}
                        </p>
                      </div>
                    )}

                    {/* 2. RADIOGRAFÍA DEL PÚBLICO META */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                        <Users className="w-5 h-5 text-purple-400" /> Radiografía del Público Meta
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl">
                            <p className="text-xs uppercase font-bold text-zinc-500 mb-1">Demografía Principal</p>
                            <p className="text-sm text-zinc-200 font-semibold">{diagnostico.publicoMeta.edad}</p>
                          </div>
                          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl">
                            <p className="text-xs uppercase font-bold text-zinc-500 mb-1 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-purple-400" /> Plazas / Ciudades Clave
                            </p>
                            <p className="text-sm text-zinc-200">{diagnostico.publicoMeta.ciudades}</p>
                          </div>
                          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl">
                            <p className="text-xs uppercase font-bold text-zinc-500 mb-1">Horarios Pico de Consumo</p>
                            <p className="text-sm text-zinc-200">{diagnostico.publicoMeta.horariosPico}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl">
                            <p className="text-xs uppercase font-bold text-zinc-500 mb-1">Psicografía y Descubrimiento</p>
                            <p className="text-sm text-zinc-300 leading-relaxed">{diagnostico.publicoMeta.comportamiento}</p>
                          </div>
                          <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl">
                            <p className="text-xs uppercase font-bold text-zinc-500 mb-2">Intereses Cruzados (Para Segmentación y Contenido)</p>
                            <ul className="space-y-1.5 text-sm text-zinc-300 list-disc list-inside">
                              {diagnostico.publicoMeta.interesesCruzados.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3. AFINIDAD Y ESTRATEGIA ALGORÍTMICA */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                      <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
                        <Cpu className="w-5 h-5 text-emerald-400" /> Estrategia de Algoritmos por Plataforma
                      </h2>
                      <p className="text-xs text-zinc-400 mb-5">
                        Qué algoritmos tienen mayor probabilidad de empujar tu proyecto ({projectData.generoPrincipal}) y qué señales debes detonar.
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {diagnostico.algoritmos.map((alg, idx) => (
                          <div key={idx} className="bg-zinc-950 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                                {alg.afinidad}
                              </span>
                              <h3 className="font-bold text-base text-white mt-3 mb-2">{alg.plataforma}</h3>
                              <p className="text-xs text-zinc-400 mb-3">
                                <strong className="text-zinc-200">Señal clave:</strong> {alg.senalesClave}
                              </p>
                            </div>
                            <div className="pt-3 border-t border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
                              <strong className="text-purple-400">Cómo activarlo:</strong> {alg.accion}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. FORTALEZAS VS RIESGOS DE FLOP */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                        <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> Ventajas Competitivas Detectadas
                        </h3>
                        <ul className="space-y-3 text-sm text-zinc-300">
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>Tu cruce de <strong>{projectData.generoPrincipal}</strong> con referentes como <strong>{selectedRefNames.join(', ')}</strong> define un clúster algorítmico claro.</span>
                          </li>
                          {projectData.igScreenshot && (
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>Captura de Instagram cargada: lista para optimizar biografía, destacados y coherencia visual del feed.</span>
                            </li>
                          )}
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>Alta compatibilidad con formatos cortos de bajo costo (sesiones crudas y storytelling de proceso).</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-zinc-900 p-6 rounded-2xl border border-red-900/40">
                        <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                          <ShieldAlert className="w-5 h-5" /> Riesgos de Flop y Brechas Críticas
                        </h3>
                        <ul className="space-y-3 text-sm text-zinc-300">
                          {diagnostico.riesgos.length > 0 ? (
                            diagnostico.riesgos.map((riesgo, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                <span>{riesgo}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-emerald-400">
                              ¡Excelente base! Tienes tus plataformas y referentes bien definidos. Enfócate en ejecutar el Roadmap y medir retención.
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: PLAN DE CONTENIDO */}
                {activeTab === 'contenido' && (
                    <div>
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-2">Plan de Contenido Semanal</h1>
                            <p className="text-zinc-400 text-sm">
                                Diseñado para <strong className="text-white">{auth.proyecto}</strong> ({projectData.generoPrincipal}) tomando patrones de crecimiento de {selectedRefNames[0] || 'tus referentes'}.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {MOCK_PLAN_CONTENIDO.map((item) => (
                                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                                                {item.dia} • {item.formato}
                                            </span>
                                            <span className="text-xs text-zinc-500 font-medium">{item.pilar}</span>
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                            <PlayCircle className="w-5 h-5 text-purple-400 shrink-0" />
                                            {item.titulo}
                                        </h3>

                                        <div className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-3.5 mb-4">
                                            <p className="text-[11px] uppercase font-bold text-amber-400 mb-1 flex items-center gap-1">
                                                <Sparkles className="w-3.5 h-3.5" /> Gancho (Primeros 3 segundos)
                                            </p>
                                            <p className="text-sm text-zinc-200 italic">
                                                {item.gancho.replace('[Referente]', selectedRefNames[0] || 'tus referentes')}
                                            </p>
                                        </div>

                                        <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                                            <strong className="text-zinc-200">Ejecución:</strong> {item.ejecucion}
                                        </p>
                                    </div>

                                    <div className="pt-3 border-t border-zinc-800 text-xs text-zinc-500">
                                        <strong className="text-zinc-300">Objetivo:</strong> {item.objetivo}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 3: ROADMAP DE LANZAMIENTO */}
                {activeTab === 'roadmap' && (
                    <div>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Roadmap de Lanzamiento</h1>
                                <p className="text-zinc-400 text-sm">
                                    Hoja de ruta paso a paso ajustada a tu presupuesto ({projectData.presupuesto}). Marca las tareas conforme avances.
                                </p>
                            </div>

                            {/* Barra de Progreso */}
                            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl min-w-[220px]">
                                <div className="flex justify-between text-xs font-bold mb-2">
                                    <span className="text-zinc-400">Progreso del Lanzamiento</span>
                                    <span className="text-purple-400">{progressPercent}%</span>
                                </div>
                                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                    <div
                                        className="bg-purple-500 h-full transition-all duration-300"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {MOCK_ROADMAP.map((bloque, idx) => (
                                <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                                        <h3 className={`text-lg font-bold ${bloque.color}`}>{bloque.fase}</h3>
                                        <span className="text-xs text-zinc-400 flex items-center gap-1.5 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
                                            <Clock className="w-3.5 h-3.5" /> {bloque.tiempo}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {bloque.tareas.map((tarea) => {
                                            const isDone = completedTasks.includes(tarea.id);
                                            return (
                                                <button
                                                    key={tarea.id}
                                                    onClick={() => toggleTask(tarea.id)}
                                                    className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all ${isDone
                                                            ? 'bg-zinc-950/60 border-zinc-800/50 text-zinc-500 line-through'
                                                            : 'bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                                                        }`}
                                                >
                                                    {isDone ? (
                                                        <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                                    ) : (
                                                        <Square className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
                                                    )}
                                                    <span className="text-sm">{tarea.texto}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 4: DIRECTORIO DE MEDIOS */}
                {activeTab === 'medios' && (
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Directorio de Medios (México)</h1>
                        <p className="text-zinc-400 mb-6">Curado para etapa: {projectData.etapa}</p>
                        <div className="space-y-4">
                            {MOCK_MEDIOS_MEXICO.map((medio, i) => (
                                <div key={i} className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex flex-col md:flex-row gap-4 justify-between md:items-center">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-lg text-white">{medio.nombre}</h3>
                                            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full uppercase font-bold">{medio.tipo}</span>
                                        </div>
                                        <p className="text-sm text-zinc-400">{medio.enfoque}</p>
                                    </div>
                                    <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 md:w-1/3">
                                        <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Cómo acercarse</p>
                                        <p className="text-sm text-zinc-300">{medio.contacto}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

