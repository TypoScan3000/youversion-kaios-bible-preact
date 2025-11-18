import { useState } from 'preact/hooks';

import List from '../../components/ui/List/List';
import ListItem from '../../components/ui/List/ListItem';
import NavBar from '../../components/ui/NavBar/NavBar';
import TitleBar from '../../components/ui/TitleBar/TitleBar';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { useLocation } from '../../routes/Router';

const ABOUT_OPTIONS = [
  { external: true, id: 'terms', label: 'Terms of Use', path: 'https://example.com/terms' },
  { external: true, id: 'privacy', label: 'Privacy Policy', path: 'https://example.com/privacy' },
  { external: false, id: 'copyright', label: 'Bible Text Copyright', path: '/about-us/copyright' },
] as const;

export default function AboutUsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();

  useActionHandlers({
    navigation: {
      onEnter: () => {
        const selectedOption = ABOUT_OPTIONS[selectedIndex];
        if (selectedOption.external) {
          window.open(selectedOption.path, '_blank');
        } else {
          location.route(selectedOption.path);
        }
      },
      onSoftLeft: () => {
        location.route('/menu');
      },
      onSoftRight: () => {
        // No action needed
      },
    },
    vertical: {
      onArrowDown: () => {
        setSelectedIndex(prev => (prev < ABOUT_OPTIONS.length - 1 ? prev + 1 : 0));
      },
      onArrowUp: () => {
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : ABOUT_OPTIONS.length - 1));
      },
    },
  });

  return (
    <>
      <TitleBar>About</TitleBar>
      <main>
        <List>
          {ABOUT_OPTIONS.map((option, index) => (
            <ListItem className='menu-list-item' isSelected={selectedIndex === index} key={option.id}>
              {option.label}
            </ListItem>
          ))}
        </List>
      </main>
      <NavBar center='Select' left='Back' />
    </>
  );
}
