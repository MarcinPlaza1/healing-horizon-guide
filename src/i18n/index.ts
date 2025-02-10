
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enUS = {
  general: {
    appName: 'MindfulRecovery',
    dashboard: 'Dashboard',
  },
  sidebar: {
    overview: 'Overview',
    description: {
      overview: 'General overview of your progress',
      activities: 'Track your daily activities',
      analytics: 'Detailed analytics and insights',
      dailyCheckin: 'Record your daily well-being',
      recovery: 'Monitor your recovery journey',
      dopamine: 'Manage dopamine detox activities',
      nutrition: 'Track your nutrition intake',
      stats: 'View your health statistics',
      calendar: 'Schedule and plan activities',
      settings: 'Customize your experience',
    },
    activities: 'Activities',
    analytics: 'Analytics',
    dailyCheckin: 'Daily Check-in',
    recovery: 'Recovery Progress',
    dopamine: 'Dopamine Reset',
    nutrition: 'Nutrition Log',
    stats: 'Health Stats',
    calendar: 'Calendar',
    settings: 'Settings',
  },
  dashboard: {
    title: 'Your Wellness Dashboard',
    subtitle: 'Track your progress and maintain your well-being journey',
    quickStats: {
      activeRecovery: 'Active Recovery',
      recordsTracked: 'Records being tracked',
      recoveryRate: 'Recovery Rate',
      recovered: 'recovered',
      activeChallenges: 'Active Challenges',
      dopamineDetox: 'Dopamine detox',
      currentStreak: 'Current Streak',
      days: 'days',
      best: 'Best',
    }
  }
};

// Polish translations
const plPL = {
  general: {
    appName: 'MindfulRecovery',
    dashboard: 'Panel',
  },
  sidebar: {
    overview: 'Przegląd',
    description: {
      overview: 'Ogólny przegląd postępów',
      activities: 'Śledź codzienne aktywności',
      analytics: 'Szczegółowe analizy i statystyki',
      dailyCheckin: 'Zapisuj dzienne samopoczucie',
      recovery: 'Monitoruj postęp w powrocie do zdrowia',
      dopamine: 'Zarządzaj detoksem dopaminowym',
      nutrition: 'Śledź spożycie składników odżywczych',
      stats: 'Zobacz statystyki zdrowotne',
      calendar: 'Planuj i zarządzaj aktywnościami',
      settings: 'Dostosuj ustawienia',
    },
    activities: 'Aktywności',
    analytics: 'Analityka',
    dailyCheckin: 'Dzienne zameldowanie',
    recovery: 'Postęp powrotu do zdrowia',
    dopamine: 'Reset dopaminy',
    nutrition: 'Dziennik żywienia',
    stats: 'Statystyki zdrowia',
    calendar: 'Kalendarz',
    settings: 'Ustawienia',
  },
  dashboard: {
    title: 'Twój panel dobrostanu',
    subtitle: 'Śledź postępy i dbaj o swoją podróż do zdrowia',
    quickStats: {
      activeRecovery: 'Aktywne powroty do zdrowia',
      recordsTracked: 'Śledzone rekordy',
      recoveryRate: 'Wskaźnik powrotu do zdrowia',
      recovered: 'wyleczonych',
      activeChallenges: 'Aktywne wyzwania',
      dopamineDetox: 'Detoks dopaminowy',
      currentStreak: 'Aktualna seria',
      days: 'dni',
      best: 'Najlepszy wynik',
    }
  }
};

// Spanish translations
const esES = {
  general: {
    appName: 'MindfulRecovery',
    dashboard: 'Panel',
  },
  sidebar: {
    overview: 'Resumen',
    description: {
      overview: 'Resumen general de tu progreso',
      activities: 'Seguimiento de actividades diarias',
      analytics: 'Análisis detallado y estadísticas',
      dailyCheckin: 'Registro diario de bienestar',
      recovery: 'Monitoreo de recuperación',
      dopamine: 'Gestión de desintoxicación dopamínica',
      nutrition: 'Registro de nutrición',
      stats: 'Estadísticas de salud',
      calendar: 'Calendario y planificación',
      settings: 'Personalizar experiencia',
    },
    activities: 'Actividades',
    analytics: 'Análisis',
    dailyCheckin: 'Registro Diario',
    recovery: 'Progreso de Recuperación',
    dopamine: 'Reset de Dopamina',
    nutrition: 'Registro Nutricional',
    stats: 'Estadísticas',
    calendar: 'Calendario',
    settings: 'Ajustes',
  },
  dashboard: {
    title: 'Tu Panel de Bienestar',
    subtitle: 'Sigue tu progreso y mantén tu viaje hacia el bienestar',
    quickStats: {
      activeRecovery: 'Recuperación Activa',
      recordsTracked: 'Registros seguidos',
      recoveryRate: 'Tasa de Recuperación',
      recovered: 'recuperados',
      activeChallenges: 'Desafíos Activos',
      dopamineDetox: 'Desintoxicación dopamínica',
      currentStreak: 'Racha Actual',
      days: 'días',
      best: 'Mejor',
    }
  }
};

// Chinese translations
const zhCN = {
  general: {
    appName: 'MindfulRecovery',
    dashboard: '仪表板',
  },
  sidebar: {
    overview: '概览',
    description: {
      overview: '进度总览',
      activities: '追踪日常活动',
      analytics: '详细分析和见解',
      dailyCheckin: '记录每日健康状况',
      recovery: '监测恢复进展',
      dopamine: '管理多巴胺排毒活动',
      nutrition: '追踪营养摄入',
      stats: '查看健康统计',
      calendar: '日程安排',
      settings: '自定义体验',
    },
    activities: '活动',
    analytics: '分析',
    dailyCheckin: '每日打卡',
    recovery: '恢复进度',
    dopamine: '多巴胺重置',
    nutrition: '营养日志',
    stats: '健康统计',
    calendar: '日历',
    settings: '设置',
  },
  dashboard: {
    title: '您的健康仪表板',
    subtitle: '追踪进度，保持健康之旅',
    quickStats: {
      activeRecovery: '活跃恢复',
      recordsTracked: '追踪记录',
      recoveryRate: '恢复率',
      recovered: '已恢复',
      activeChallenges: '活跃挑战',
      dopamineDetox: '多巴胺排毒',
      currentStreak: '当前连续',
      days: '天',
      best: '最佳',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enUS },
      pl: { translation: plPL },
      es: { translation: esES },
      zh: { translation: zhCN },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
