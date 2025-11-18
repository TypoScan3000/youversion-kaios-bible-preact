import { useEffect, useRef, useState } from 'preact/hooks';

import getChapter from '../../api/get-chapter/get-chapter';
import NavBar from '../../components/ui/NavBar/NavBar';
import TitleBar from '../../components/ui/TitleBar/TitleBar';
import { useConfig } from '../../contexts/ConfigContext';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { useLocation, useRoute } from '../../routes/Router';
import type { BibleChapterResponse } from '../../types/bible/chapter';
import { parseUsfm } from '../../utils/bible/parse-usfm';
import { parseVerseFromContent } from '../../utils/bible/parse-verse-from-content/parse-verse-from-content';
import { applyGlobalFontSize } from '../../utils/font-size';

export default function BiblePage() {
  const { params } = useRoute();
  const mainRef = useRef<HTMLElement>(null);
  const config = useConfig();

  // Handle both formats: usfm parameter or bookUsfm+chapter parameters
  let usfm = params.usfm;
  if (!usfm && params.bookUsfm && params.chapter) {
    usfm = `${params.bookUsfm}.${params.chapter}`;
  }

  const [data, setData] = useState<BibleChapterResponse | null>(null);
  const [loading, setLoading] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [highlightedVerse, setHighlightedVerse] = useState<string | null>(null);

  useEffect(() => {
    async function loadChapter() {
      setLoading('pending');
      try {
        const result = await getChapter(usfm, config.offlineBibleVersion);
        setData(result);
        setLoading('success');

        // Save current location to localStorage
        localStorage.setItem('lastBibleLocation', usfm);
      } catch (error) {
        console.error('Error loading chapter:', error);
        setLoading('error');
      }
    }

    loadChapter();
  }, [usfm, config]);

  // Handle verse highlighting when data loads
  useEffect(() => {
    if (data?.response.data) {
      const targetVerse = params.verse;

      if (targetVerse) {
        const parsed = parseUsfm(usfm);
        const fullVerseUsfm = `${parsed.book}.${parsed.chapter}.${targetVerse}`;

        // Parse the specific verse to get its content
        const verseData = parseVerseFromContent({
          fullContent: data.response.data.content,
          usfms: fullVerseUsfm,
        });

        setHighlightedVerse(verseData.html);

        // Scroll to the verse after a short delay to ensure DOM is ready
        setTimeout(() => {
          const verseElement = document.querySelector(`[data-usfm="${fullVerseUsfm}"]`);
          if (verseElement) {
            // Focus the main element first for KaiOS 2.5 compatibility
            if (mainRef.current) {
              mainRef.current.focus();
            }
            verseElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Add a temporary highlight class
            verseElement.classList.add('highlight-verse');
            setTimeout(() => {
              verseElement.classList.remove('highlight-verse');
            }, 2000);
          }
        }, 100);
      } else {
        // If no specific verse, focus the main element for scrolling
        setTimeout(() => {
          if (mainRef.current) {
            mainRef.current.focus();
          }
        }, 100);
      }
    }
  }, [data, usfm, params.verse]);

  // Apply global font size when Bible text loads
  useEffect(() => {
    if (loading === 'success' && data?.response.data) {
      const bibleText = document.getElementById('bibleText');
      if (bibleText) {
        applyGlobalFontSize(bibleText);
      }
    }
  }, [loading, data]);

  const location = useLocation();

  // Handle keyboard navigation (every page will have this)
  useActionHandlers({
    horizontal: {
      onArrowLeft: () => {
        data?.response.data.previous?.usfm ? location.route(`/bible?usfm=${data.response.data.previous.usfm}`) : null;
      },
      onArrowRight: () => {
        data?.response.data.next?.usfm ? location.route(`/bible?usfm=${data.response.data.next.usfm}`) : null;
      },
    },
    navigation: {
      onEnter: () => {
        location.route('/pickers/book');
      },
      onSoftLeft: () => {
        // Navigate to menu
        location.route('/menu');
      },
      onSoftRight: () => {
        sessionStorage.setItem('lastBibleLocation', usfm);
        location.route('/font-size');
      },
    },
  });

  return (
    <>
      {loading === 'pending' || loading === 'idle' ? (
        <TitleBar showArrows={true}>Loading Chapter…</TitleBar>
      ) : (
        <TitleBar showArrows={true}>{data?.response.data.reference.human ?? 'Error'}</TitleBar>
      )}
      <main class='contained' ref={mainRef}>
        {loading === 'success' && data?.response.data ? (
          <div dangerouslySetInnerHTML={{ __html: data.response.data.content }} id='bibleText' />
        ) : null}
        {loading === 'error' ? <div>Unable to load chapter</div> : null}
        {highlightedVerse ? (
          <div class='highlighted-verse'>
            <h3>Verse of the Day:</h3>
            <div dangerouslySetInnerHTML={{ __html: highlightedVerse }} />
          </div>
        ) : null}
      </main>
      <NavBar center='Go To' left='Menu' right='Font' />
    </>
  );
}
