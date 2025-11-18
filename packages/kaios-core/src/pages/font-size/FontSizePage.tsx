import { useState } from 'preact/hooks';

import List from '../../components/ui/List/List';
import ListItem from '../../components/ui/List/ListItem';
import NavBar from '../../components/ui/NavBar/NavBar';
import TitleBar from '../../components/ui/TitleBar/TitleBar';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { useLocation } from '../../routes/Router';
import { getGlobalFontSize, setGlobalFontSize } from '../../utils/font-size';

const FONT_OPTIONS = [
  { id: 'large', label: 'Large', size: 20 },
  { id: 'medium', label: 'Medium', size: 16 },
  { id: 'small', label: 'Small', size: 12 },
] as const;

export default function FontSizePage() {
  // Initialize selected index based on current global font size
  const currentFontSize = getGlobalFontSize();
  const initialIndex = FONT_OPTIONS.findIndex(option => option.size === currentFontSize);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex >= 0 ? initialIndex : 1);
  const location = useLocation();

  useActionHandlers({
    navigation: {
      onEnter: () => {
        const selectedOption = FONT_OPTIONS[selectedIndex];
        setGlobalFontSize(selectedOption.size);
        const lastLocation = sessionStorage.getItem('lastBibleLocation') || 'JHN.1';
        location.route(`/bible?usfm=${lastLocation}`);
      },
      onSoftLeft: () => {
        const lastLocation = sessionStorage.getItem('lastBibleLocation') || 'JHN.1';
        location.route(`/bible?usfm=${lastLocation}`);
      },
      onSoftRight: () => {
        // No action needed
      },
    },
    vertical: {
      onArrowDown: () => {
        setSelectedIndex(prev => (prev < FONT_OPTIONS.length - 1 ? prev + 1 : 0));
      },
      onArrowUp: () => {
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : FONT_OPTIONS.length - 1));
      },
    },
  });

  return (
    <>
      <TitleBar>Font Size</TitleBar>
      <main>
        <List>
          {FONT_OPTIONS.map((option, index) => (
            <ListItem className='menu-list-item' isSelected={selectedIndex === index} key={option.id}>
              <span style={{ fontSize: `${option.size}px` }}>{option.label}</span>
            </ListItem>
          ))}
        </List>
      </main>
      <NavBar center='Select' left='Back' />
    </>
  );
}
