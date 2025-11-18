import { useCallback, useEffect, useState } from 'preact/hooks';

import getVersion from '../../../api/get-version/get-version';
import List from '../../../components/ui/List/List';
import ListItem from '../../../components/ui/List/ListItem';
import NavBar from '../../../components/ui/NavBar/NavBar';
import TabItem from '../../../components/ui/Tabs/TabItem';
import TabNav from '../../../components/ui/Tabs/TabNav';
import TabPanel from '../../../components/ui/Tabs/TabPanel';
import { useConfig } from '../../../contexts/ConfigContext';
import { useActionHandlers } from '../../../hooks/useActionHandlers';
import { useLocation } from '../../../routes/Router';
import type { BibleVersionResponse, Book } from '../../../types/bible/version';

type Canon = 'ot' | 'nt' | 'ap';

const tabs: Array<{ label: string; value: Canon }> = [
  { label: 'Old Testament', value: 'ot' },
  { label: 'New Testament', value: 'nt' },
  { label: 'Apocrypha', value: 'ap' },
] as const;

export default function BookPickerPage() {
  const location = useLocation();
  const config = useConfig();
  const [books, setBooks] = useState<Array<Book>>([]);
  const [selectedTab, setSelectedTab] = useState<Canon>('ot');
  const [selectedBook, setSelectedBook] = useState('');
  const [loading, setLoading] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [availableTabs, setAvailableTabs] = useState<Array<(typeof tabs)[number]>>([]);

  useEffect(() => {
    async function loadBooks() {
      setLoading('pending');
      try {
        const data: BibleVersionResponse = await getVersion(config.offlineBibleVersion);
        const booksData = data.books;

        // Filter tabs based on available canons
        const availableCanons = new Set(booksData.map(book => book.canon));
        const filteredTabs = tabs.filter(tab => availableCanons.has(tab.value));

        setBooks(booksData);
        setAvailableTabs(filteredTabs);

        setLoading('success');
      } catch (error) {
        console.error('BookPickerPage: Error loading books:', error);
        setLoading('error');
      }
    }

    loadBooks();
  }, [config]); // Load when config changes

  // Set initial selected tab when books are loaded
  useEffect(() => {
    if (availableTabs.length > 0 && !availableTabs.some(tab => tab.value === selectedTab)) {
      setSelectedTab(availableTabs[0].value);
    }
  }, [availableTabs, selectedTab]);

  // Update selected book when tab changes
  useEffect(() => {
    const firstBook = books.find(book => book.canon === selectedTab);
    if (firstBook) {
      setSelectedBook(firstBook.usfm);
    }
  }, [selectedTab, books]);

  const navigateBooks = useCallback(
    (direction: 'up' | 'down') => {
      const filteredBooks = books.filter(book => book.canon === selectedTab);
      if (filteredBooks.length === 0) {
        return;
      }

      setSelectedBook(prevState => {
        const currentIndex = filteredBooks.findIndex(book => book.usfm === prevState);
        if (currentIndex === -1) {
          return filteredBooks[0].usfm;
        }

        if (direction === 'down') {
          return currentIndex === filteredBooks.length - 1
            ? filteredBooks[0].usfm
            : filteredBooks[currentIndex + 1].usfm;
        } else {
          return currentIndex === 0
            ? filteredBooks[filteredBooks.length - 1].usfm
            : filteredBooks[currentIndex - 1].usfm;
        }
      });
    },
    [books, selectedTab]
  );

  const navigateTabs = useCallback(
    (direction: 'left' | 'right') => {
      if (availableTabs.length === 0) {
        return;
      }

      setSelectedTab(prevState => {
        const currentIndex = availableTabs.findIndex(tab => tab.value === prevState);
        if (currentIndex === -1) {
          return availableTabs[0].value;
        }

        if (direction === 'right') {
          return currentIndex === availableTabs.length - 1
            ? availableTabs[0].value
            : availableTabs[currentIndex + 1].value;
        } else {
          return currentIndex === 0
            ? availableTabs[availableTabs.length - 1].value
            : availableTabs[currentIndex - 1].value;
        }
      });
    },
    [availableTabs]
  );

  // Handle keyboard navigation
  useActionHandlers({
    horizontal: {
      onArrowLeft: () => navigateTabs('left'),
      onArrowRight: () => navigateTabs('right'),
    },
    navigation: {
      onEnter: () => {
        if (selectedBook) {
          location.route(`/pickers/chapter?bookUsfm=${selectedBook}`);
        }
      },
      onSoftLeft: () => location.route('/menu'),
      onSoftRight: () => {
        // No action for soft right
      },
    },
    vertical: {
      onArrowDown: () => navigateBooks('down'),
      onArrowUp: () => navigateBooks('up'),
    },
  });

  return (
    <>
      <TabNav>
        {availableTabs.map(tab => (
          <TabItem isSelected={selectedTab === tab.value} key={tab.value}>
            {tab.label}
          </TabItem>
        ))}
      </TabNav>

      <main>
        {loading === 'pending' ? <div>Loading...</div> : null}
        {loading === 'error' ? <div>Error loading books.</div> : null}
        {loading === 'success'
          ? availableTabs.map(tab => (
              <TabPanel isSelected={selectedTab === tab.value} key={tab.value}>
                <List>
                  {books
                    .filter(book => book.canon === tab.value)
                    .map(book => (
                      <ListItem isSelected={selectedBook === book.usfm} key={book.usfm}>
                        {book.human}
                      </ListItem>
                    ))}
                </List>
              </TabPanel>
            ))
          : null}
      </main>

      <NavBar center='Select' left='Menu' right='' />
    </>
  );
}
