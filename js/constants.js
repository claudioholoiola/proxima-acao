export const DB_VERSION = 1;
export const STORAGE_KEY = "proxima-acao-db";
export const BACKUP_KEY = "proxima-acao-before-import";
export const AREAS = {
  trabalho: "Trabalho", organizacao: "Organização", estudo: "Estudo", leitura: "Leitura", lazer: "Lazer"
};
export const SUBAREAS = {
  trabalho: ["operacional", "administracao", "marketing", "desenvolvimento_empresa", "organizacao_trabalho"],
  organizacao: ["geral"], estudo: ["linguas", "piano", "livro_tecnico", "concurso"], leitura: ["geral"], lazer: ["filmes_series", "jogos", "outro"]
};
export const AREA_LABELS = { ...AREAS, pausas: "Pausas" };
export const SUBAREA_LABELS = { operacional: "Operacional", administracao: "Administração", marketing: "Marketing", desenvolvimento_empresa: "Desenvolvimento", organizacao_trabalho: "Organização de trabalho", geral: "Geral", linguas: "Línguas", piano: "Piano", livro_tecnico: "Livro técnico", concurso: "Concurso", filmes_series: "Filmes e séries", jogos: "Jogos", outro: "Outro" };
export const CONTEXTS = ["computador", "celular", "internet", "telefone", "casa", "rua", "cidade", "silencio", "piano", "leitura_disponivel"];
export const CONTEXT_LABELS = { computador: "Computador", celular: "Celular", internet: "Internet", telefone: "Telefone", casa: "Casa", rua: "Rua", cidade: "Cidade", silencio: "Silêncio", piano: "Piano", leitura_disponivel: "Leitura disponível" };
export const ENERGY_LABELS = { 1: "Baixa", 2: "Média", 3: "Alta" };
export const PRIORITY_LABELS = { normal: "Normal", alta: "Alta", critica: "Crítica" };
export const STATUS_LABELS = { ativa: "Ativa", em_andamento: "Em andamento", concluida: "Concluída", arquivada: "Arquivada" };
export const DURATIONS = [15, 30, 60];
export const AREA_COLORS = { trabalho: "blue", organizacao: "green", estudo: "purple", leitura: "amber", lazer: "coral", pausas: "gray" };
export const DEFAULT_SETTINGS = {
  databaseVersion: DB_VERSION, weekStartsOn: 1,
  goals: {
    trabalho: { minimumMinutes: 1080, targetMinutes: 1440, dailySoftMinimumMinutes: 180, dailySecondThresholdMinutes: 240, dailyMaximumMinutes: 300 },
    organizacao: { minimumMinutes: 180, targetMinutes: 300, minimumSessions: 5, validSessionMinutes: 15 },
    estudo: { minimumMinutes: 480, targetMinutes: 840 },
    leitura: { minimumMinutes: 150, targetMinutes: 300, validSessionMinutes: 15 }
  },
  studyFrequency: { linguas: { sessions: 3, validSessionMinutes: 15 }, piano: { sessions: 2, validSessionMinutes: 15 }, livro_tecnico: { sessions: 3, validSessionMinutes: 30 }, concurso: { sessions: 2, validSessionMinutes: 30 } },
  strategicWork: { marketing: { weeklySessions: 1, validSessionMinutes: 30 }, desenvolvimento_empresa: { weeklySessions: 1, validSessionMinutes: 30 } },
  areaWeights: { trabalho: 50, organizacao: 40, estudo: 30, leitura: 20, lazer: 10 },
  rhythmThresholds: { critical: .5, behind: .85, onTrack: 1.1 },
  scoring: { belowMinimumBonus: 35, belowTargetBonus: 15, rhythmBehindBonus: 20, rhythmCriticalBonus: 40, frequencyPendingBonus: 18, criticalTaskBonus: 60, targetReachedPenalty: 30, workAfterThreeHoursPenalty: 18, workAfterFourHoursPenalty: 30, workAtFiveHoursPenalty: 1000, energyPenalty: 24, refusalPenalty: 35, continuitySameDay: 20, continuityPreviousDay: 10 },
  strategicBonus: { noSessionThisWeek: 15, threeDaysWithoutActivity: 12, fiveDaysWithoutActivity: 25, sundayWithoutSession: 40 }
};
