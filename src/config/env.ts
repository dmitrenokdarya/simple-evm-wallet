type AppEnv = 'prod' | 'stage' | 'dev';

type RuntimeEnv = Record<string, string | boolean | undefined>;

const runtimeEnv = import.meta.env as RuntimeEnv;

const resolveAppEnv = (): AppEnv => {
  const explicit = String(runtimeEnv.VITE_APP_ENV || '').toLowerCase();
  if (explicit === 'prod' || explicit === 'production') return 'prod';
  if (explicit === 'stage' || explicit === 'staging') return 'stage';
  if (explicit === 'dev' || explicit === 'development') return 'dev';

  const mode = String(runtimeEnv.MODE || '').toLowerCase();
  if (mode === 'production') return 'prod';
  if (mode === 'development') return 'dev';

  return 'stage';
};

const APP_ENV = resolveAppEnv();

const pickByEnv = (stageUrl?: string, prodUrl?: string): string => {
  if (APP_ENV === 'prod') return prodUrl || stageUrl || '';
  return stageUrl || prodUrl || '';
};

const HISTORY_API_BASE_URL_STAGE = String(
  runtimeEnv.VITE_HISTORY_API_BASE_URL_STAGE
  || runtimeEnv.HISTORY_API_BASE_URL_STAGE
  || 'https://blackfort-exchange-stage-q6a2snvefq-ez.a.run.app/',
);

const HISTORY_API_BASE_URL_PROD = String(
  runtimeEnv.VITE_HISTORY_API_BASE_URL_PROD
  || runtimeEnv.HISTORY_API_BASE_URL_PROD
  || 'https://blackfort-exchange-api-q6a2snvefq-ez.a.run.app/',
);


export const HISTORY_API_BASE_URL = pickByEnv(
  HISTORY_API_BASE_URL_STAGE,
  HISTORY_API_BASE_URL_PROD,
).replace(/\/$/, '');
