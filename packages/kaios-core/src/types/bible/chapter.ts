export interface BibleChapterResponse {
  response: {
    buildtime: string;
    code: number;
    data: BibleChapterData;
  };
}

export interface BibleChapterData {
  audio: Array<BibleAudio>;
  content: string;
  copyright: BibleCopyright;
  next?: BibleReference;
  previous?: BibleReference;
  reference: BibleReference;
}

export interface BibleReference {
  canonical?: boolean;
  human: string;
  toc?: boolean;
  usfm: Array<string>;
  version_id: number;
}

export interface BibleCopyright {
  html: string;
  text: string;
}

export interface BibleAudio {
  default: boolean;
  download_urls: {
    format_hls: string;
    format_mp3_32k: string;
  };
  dramatized: boolean;
  id: number;
  timing_available: boolean;
  title: string;
  version_id: number;
}

// Simplified types for common use cases
export interface ChapterInfo {
  book: string;
  chapter: number;
  content: string;
  copyright: string;
  version_id: number;
}

export interface Verse {
  content: string;
  usfm: string;
  verseNumber: number;
}
