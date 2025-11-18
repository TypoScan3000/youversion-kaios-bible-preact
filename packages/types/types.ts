export interface AppConfig {
  colors?: {
    background?: string;
    focus?: string;
    theme?: string;
  };
  description: string;
  developer: {
    name: string;
    url: string;
  };
  id: string;
  language: string;
  name: string;
  offlineBibleVersion: number;
  /** File name for offline daily verse. */
  offlineVotdFile: string;
  subtitle: string;
  textDirection?: 'ltr' | 'rtl';
}
