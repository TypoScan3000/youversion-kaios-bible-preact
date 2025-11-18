import { useCallback, useEffect, useState } from 'preact/hooks';

import getVersion from '../../../api/get-version/get-version';
import Grid from '../../../components/ui/Grid/Grid';
import GridItem from '../../../components/ui/Grid/GridItem';
import NavBar from '../../../components/ui/NavBar/NavBar';
import TitleBar from '../../../components/ui/TitleBar/TitleBar';
import { useConfig } from '../../../contexts/ConfigContext';
import { useActionHandlers } from '../../../hooks/useActionHandlers';
import { useLocation, useRoute } from '../../../routes/Router';
import type { Book } from '../../../types/bible/version';

const GRID_COLUMNS = 4;

export default function ChapterPickerPage() {
  const location = useLocation();
  const { params } = useRoute();
  const bookUsfm = params.bookUsfm;
  const config = useConfig();

  const [book, setBook] = useState<Book | null>(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [loading, setLoading] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function loadBook() {
      setLoading('pending');
      try {
        const data = await getVersion(config.offlineBibleVersion);
        const foundBook = data.books.find(b => b.usfm === bookUsfm);
        if (foundBook) {
          setBook(foundBook);
          setSelectedChapter(1);
          setLoading('success');
        } else {
          setLoading('error');
        }
      } catch (error) {
        console.error('Error loading book:', error);
        setLoading('error');
      }
    }

    loadBook();
  }, [bookUsfm, config]);

  // Grid navigation helper functions
  const getGridPosition = useCallback((chapter: number) => {
    const col = (chapter - 1) % GRID_COLUMNS;
    const row = Math.floor((chapter - 1) / GRID_COLUMNS);
    return { col, row };
  }, []);

  const getChapterFromPosition = useCallback((row: number, col: number, totalChapters: number) => {
    const chapter = row * GRID_COLUMNS + col + 1;
    return chapter > totalChapters ? null : chapter;
  }, []);

  const navigateGrid = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      if (!book) {
        return;
      }

      const totalChapters = book.chapters.length;
      const rows = Math.ceil(totalChapters / GRID_COLUMNS);
      let lastRowLength = totalChapters % GRID_COLUMNS;
      if (lastRowLength === 0) {
        lastRowLength = GRID_COLUMNS;
      }
      const { row: currentRow, col: currentCol } = getGridPosition(selectedChapter);

      let newRow = currentRow;
      let newCol = currentCol;

      switch (direction) {
        case 'up':
          if (currentRow === 0) {
            newRow = currentCol > lastRowLength - 1 ? rows - 2 : rows - 1;
          } else {
            newRow = currentRow - 1;
          }
          break;
        case 'down':
          if (currentRow === rows - 1) {
            newRow = 0;
          } else {
            newRow = currentRow + 1;
          }
          if (currentRow === rows - 2 && currentCol >= lastRowLength) {
            newCol = lastRowLength - 1;
            newRow = rows - 1;
          }
          break;
        case 'left':
          if (currentCol === 0) {
            newCol = currentRow === 0 ? lastRowLength - 1 : GRID_COLUMNS - 1;
            newRow = currentRow === 0 ? rows - 1 : currentRow - 1;
          } else {
            newCol = currentCol - 1;
          }
          break;
        case 'right':
          if (currentCol === GRID_COLUMNS - 1) {
            newCol = 0;
            newRow = currentRow === rows - 1 ? 0 : currentRow + 1;
          } else {
            newCol = currentCol + 1;
          }
          if (currentRow === rows - 1 && currentCol === lastRowLength - 1) {
            newCol = 0;
            newRow = 0;
          }
          break;
      }

      const newChapter = getChapterFromPosition(newRow, newCol, totalChapters);
      if (newChapter) {
        setSelectedChapter(newChapter);
      }
    },
    [book, selectedChapter, getGridPosition, getChapterFromPosition]
  );

  // Handle keyboard navigation
  useActionHandlers({
    horizontal: {
      onArrowLeft: () => navigateGrid('left'),
      onArrowRight: () => navigateGrid('right'),
    },
    navigation: {
      onEnter: () => {
        if (selectedChapter && book) {
          // Get the actual chapter USFM from the chapters array
          const chapterIndex = selectedChapter - 1;
          const chapter = book.chapters[chapterIndex];
          if (chapter) {
            location.route(`/bible?usfm=${chapter.usfm}`);
          }
        }
      },
      onSoftLeft: () => {
        location.route(`/pickers/book`);
      },
      onSoftRight: () => {
        // No action for soft right
      },
    },
    vertical: {
      onArrowDown: () => navigateGrid('down'),
      onArrowUp: () => navigateGrid('up'),
    },
  });

  return (
    <>
      <TitleBar showArrows={true}>{book?.human || 'Chapter Picker'}</TitleBar>
      <main class='contained'>
        {loading === 'pending' || loading === 'idle' ? <div>Loading...</div> : null}
        {loading === 'error' || !book ? <div>Book not found</div> : null}
        {loading === 'success' && book ? (
          <Grid columns={GRID_COLUMNS}>
            {book.chapters.map((chapter, i) => {
              // Check if this is an intro chapter
              const isIntro = chapter.usfm.includes('INTRO');

              // Calculate the correct chapter number (skip intro in counting)
              let displayText: string;
              if (isIntro) {
                displayText = 'Intro';
              } else {
                // Count how many non-intro chapters come before this one
                const chapterNumber = book.chapters.slice(0, i + 1).filter(ch => !ch.usfm.includes('INTRO')).length;
                displayText = chapterNumber.toString();
              }

              return (
                <GridItem isSelected={selectedChapter === i + 1} key={i + 1}>
                  {displayText}
                </GridItem>
              );
            })}
          </Grid>
        ) : null}
      </main>
      <NavBar center='Select' left='Back' />
    </>
  );
}
