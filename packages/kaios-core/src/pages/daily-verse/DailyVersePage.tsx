import { useEffect, useRef, useState } from 'preact/hooks';

import type { AppConfig } from '../..';
import getChapter from '../../api/get-chapter/get-chapter';
import NavBar from '../../components/ui/NavBar/NavBar';
import TitleBar from '../../components/ui/TitleBar/TitleBar';
import { useConfig } from '../../contexts/ConfigContext';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { useLocation } from '../../routes/Router';
import type { Day, HumanRef, USFM, VOTDYear } from '../../types/votd';
import { parseUsfm } from '../../utils/bible/parse-usfm';
import { parseVerseFromContent } from '../../utils/bible/parse-verse-from-content/parse-verse-from-content';
import { getDayOfYear } from '../../utils/date/get-day-of-year';
import { applyGlobalFontSize } from '../../utils/font-size';

async function getDailyVerse(config: AppConfig): Promise<Array<Record<USFM, HumanRef>> | null> {
  try {
    const response = await fetch(`/offline/${config.offlineVotdFile}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const text = await response.text();
    const dailyVerses: VOTDYear = JSON.parse(text);

    // Get current day of year (1-366)
    const dayOfYear = getDayOfYear();

    // Get the verse for today (fallback to day 1 if not found)
    const todayVerses = dailyVerses[dayOfYear.toString() as Day] || dailyVerses['1' as Day];
    return todayVerses || null;
  } catch (error) {
    console.error('Error loading daily verse:', error);
    return null;
  }
}

export default function DailyVersePage() {
  const mainRef = useRef<HTMLElement>(null);
  const [dailyVerseData, setDailyVerseData] = useState<Array<Record<USFM, HumanRef>> | null>(null);
  const [verseContent, setVerseContent] = useState<string>('');
  const [loading, setLoading] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const location = useLocation();
  const config = useConfig();

  // Load daily verse on component mount
  useEffect(() => {
    async function loadDailyVerse() {
      setLoading('pending');
      try {
        const verseData = await getDailyVerse(config);

        if (verseData && verseData.length > 0) {
          // Get the first USFM from the first verse object
          const firstVerse = verseData[0];
          const usfm = Object.keys(firstVerse)[0] as USFM;

          const parsed = parseUsfm(usfm);
          const chapterData = await getChapter(parsed.bookChapter, config.offlineBibleVersion);

          // Get all USFMs from the verse data
          const usfms = verseData.flatMap(verse => Object.keys(verse)) as Array<USFM>;

          // Extract just the specific verses from the chapter
          const verseContent = parseVerseFromContent({
            fullContent: chapterData.response.data.content,
            usfms: usfms,
          });

          setDailyVerseData(verseData);
          setVerseContent(verseContent.html);
          setLoading('success');

          // Focus the main element for KaiOS 2.5 scrolling compatibility
          setTimeout(() => {
            if (mainRef.current) {
              mainRef.current.focus();
            }
          }, 100);
        }
      } catch (error) {
        console.error('Error loading daily verse:', error);
        setLoading('error');
      }
    }

    loadDailyVerse();
  }, [config]);

  // Apply global font size when verse content loads
  useEffect(() => {
    if (loading === 'success' && verseContent) {
      const bibleText = document.getElementById('bibleText');
      if (bibleText) {
        applyGlobalFontSize(bibleText);
      }
    }
  }, [loading, verseContent]);

  // Handle keyboard navigation
  useActionHandlers({
    navigation: {
      onEnter: () => {
        if (dailyVerseData && dailyVerseData.length > 0) {
          const firstVerse = dailyVerseData[0];
          const usfm = Object.keys(firstVerse)[0] as USFM;
          const parsed = parseUsfm(usfm);
          location.route(`/bible?usfm=${parsed.bookChapter}&verse=${parsed.verse}`);
        }
      },
      onSoftLeft: () => {
        // Navigate to menu
        location.route('/menu');
      },
      onSoftRight: () => {
        // No action for soft right
      },
    },
  });

  // Get verse reference for display from the VOTD data
  const getVerseReference = () => {
    if (!dailyVerseData || dailyVerseData.length === 0) {
      return '';
    }

    // Get all human references from the verse data
    const humanRefs = dailyVerseData.flatMap(verse => Object.values(verse));
    return humanRefs.join(', ');
  };

  return (
    <>
      <TitleBar>Verse of the Day</TitleBar>
      <main class='contained' ref={mainRef}>
        {loading === 'pending' || loading === 'idle' ? <div>Loading daily verse...</div> : null}
        {loading === 'success' && dailyVerseData && verseContent ? (
          <div>
            <h2>{getVerseReference()}</h2>
            <div id='bibleText'>
              {/* Have to nest under `chapter` to get the correct styling. */}
              <div className='chapter' dangerouslySetInnerHTML={{ __html: verseContent }} />
            </div>
          </div>
        ) : null}
        {loading === 'error' ? <div>Unable to load daily verse</div> : null}
      </main>
      <NavBar center='Read Chapter' left='Menu' right='' />
    </>
  );
}
