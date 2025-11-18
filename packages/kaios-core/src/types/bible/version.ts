export type Canon = 'ot' | 'nt' | 'ap';

export interface BibleVersionResponse extends BibleVersion {
  // The actual response is directly a BibleVersion, not wrapped in a response object
}

export interface BibleVersion {
  abbreviation: string;
  audio: boolean;
  audio_count: number;
  books: Array<Book>;
  copyright_long: Copyright;
  copyright_short: Copyright;
  id: number;
  language: Language;
  local_abbreviation: string;
  local_title: string;
  metadata_build: number;
  offline: Offline;
  platforms: Platforms;
  publisher: Publisher;
  reader_footer: ReaderFooter;
  reader_footer_url: string | null;
  text: boolean;
  title: string;
  vrs: string;
}

export interface Language {
  iso_639_1: string;
  iso_639_3: string;
  language_tag: string;
  local_name: string;
  name: string;
  secondary_language_tags: Array<string> | null;
  text_direction: 'ltr' | 'rtl';
}

export interface Copyright {
  html: string;
  text: string;
}

export interface ReaderFooter {
  html: string | null;
  text: string | null;
}

export interface Publisher {
  description: string | null;
  id: number;
  local_name: string;
  name: string;
  url: string;
}

export interface Platforms {
  android: boolean;
  blackberry: boolean;
  facebook: boolean;
  ios: boolean;
  win8: boolean;
  wp7: boolean;
}

export interface Offline {
  agreement_version: string | null;
  allow_redownload: boolean;
  always_allow_updates: boolean;
  build: {
    max: number;
    min: number;
  };
  platforms: {
    android: boolean;
    blackberry: boolean;
    ios: boolean;
    win8: boolean;
    wp7: boolean;
  };
  require_email_agreement: boolean;
  url: string;
}

export interface Book {
  abbreviation: string;
  audio: boolean;
  canon: Canon;
  chapters: Array<Chapter>;
  human: string;
  human_long: string;
  text: boolean;
  usfm: string;
}

export interface Chapter {
  canonical: boolean;
  human: string;
  toc: boolean;
  usfm: string;
}
