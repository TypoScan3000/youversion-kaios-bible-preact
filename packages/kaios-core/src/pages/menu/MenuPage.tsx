import { useState } from 'preact/hooks';

import List from '../../components/ui/List/List';
import ListItem from '../../components/ui/List/ListItem';
import NavBar from '../../components/ui/NavBar/NavBar';
import TitleBar from '../../components/ui/TitleBar/TitleBar';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { useKaiosRouter } from '../../routes/Router';
import { getIconPath } from '../../utils/asset-paths';

const MENU_OPTIONS = [
  {
    external: false,
    icon: getIconPath('bible.png'),
    id: 'reader',
    label: 'Bible',
    path: '/pickers/book',
  },
  {
    external: false,
    icon: getIconPath('sun.png'),
    id: 'daily-verse',
    label: 'Verse of the Day',
    path: '/daily-verse',
  },
  {
    external: true,
    icon: getIconPath('pencil.png'),
    id: 'feedback',
    label: 'Feedback',
    path: 'https://lifechurch.formstack.com/forms/kaios_feedback',
  },
  {
    external: false,
    icon: getIconPath('people.png'),
    id: 'about-us',
    label: 'About Us',
    path: '/about-us',
  },
  ...(process.env.NODE_ENV === 'development'
    ? [
        {
          external: false,
          icon: undefined,
          id: 'debug',
          label: 'Debug',
          path: '/debug',
        },
      ]
    : []),
] as const;

export default function MenuPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useKaiosRouter();

  useActionHandlers({
    navigation: {
      onEnter: () => {
        const selectedOption = MENU_OPTIONS[selectedIndex];
        if (selectedOption.external) {
          window.open(selectedOption.path, '_blank');
        } else {
          location.route(selectedOption.path);
        }
      },
      onSoftLeft: () => {
        location.back();
      },
      onSoftRight: () => {
        // No action needed
      },
    },
    vertical: {
      onArrowDown: () => {
        setSelectedIndex(prev => (prev < MENU_OPTIONS.length - 1 ? prev + 1 : 0));
      },
      onArrowUp: () => {
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : MENU_OPTIONS.length - 1));
      },
    },
  });

  return (
    <>
      <TitleBar>Menu</TitleBar>
      <main>
        <List>
          {MENU_OPTIONS.map((option, index) => (
            <ListItem className='menu-list-item' isSelected={selectedIndex === index} key={option.id}>
              <div>
                {option.icon ? (
                  <img
                    alt=''
                    src={option.icon}
                    style={{
                      filter: selectedIndex === index ? 'brightness(0) invert(1)' : 'none',
                      height: '20px',
                      marginRight: '12px',
                      verticalAlign: 'middle',
                      width: '20px',
                    }}
                  />
                ) : null}
                <span style={{ verticalAlign: 'middle' }}>{option.label}</span>
              </div>
            </ListItem>
          ))}
        </List>
      </main>
      <NavBar center='Select' left='Back' right='' />
    </>
  );
}
