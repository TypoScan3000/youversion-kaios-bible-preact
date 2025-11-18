import { useState } from 'preact/hooks';

import List from '../../components/ui/List/List';
import ListItem from '../../components/ui/List/ListItem';
import NavBar from '../../components/ui/NavBar/NavBar';
import TabItem from '../../components/ui/Tabs/TabItem';
import TabNav from '../../components/ui/Tabs/TabNav';
import TabPanel from '../../components/ui/Tabs/TabPanel';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { useLocation } from '../../routes/Router';

const tabs = [
  {
    label: 'Old Testament',
    value: 'ot',
  },
  {
    label: 'New Testament',
    value: 'nt',
  },
  {
    label: 'Apocrypha',
    value: 'ap',
  },
] as const;

const listItems = [
  {
    label: 'Genesis',
    value: 'GEN',
  },
  {
    label: 'Exodus',
    value: 'EXO',
  },
  {
    label: 'Leviticus',
    value: 'LEV',
  },
  {
    label: 'Numbers',
    value: 'NUM',
  },
];
export default function TemplatePage() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<(typeof tabs)[number]['value']>('ot');
  const [selectedListItem, setSelectedListItem] = useState<string>('GEN');

  // Handle keyboard navigation (every page will have this)
  useActionHandlers({
    horizontal: {
      onArrowLeft: () => {
        setSelectedTab(prevState => {
          const currentIndex = tabs.findIndex(tab => tab.value === prevState);
          if (currentIndex === 0) {
            return tabs[tabs.length - 1].value;
          }
          return tabs[currentIndex - 1].value;
        });
      },
      onArrowRight: () => {
        setSelectedTab(prevState => {
          const currentIndex = tabs.findIndex(tab => tab.value === prevState);
          if (currentIndex === tabs.length - 1) {
            return tabs[0].value;
          }
          return tabs[currentIndex + 1].value;
        });
      },
    },
    navigation: {
      onEnter: () => {
        location.route(`/pickers/chapter?bookUsfm=${selectedListItem}`);
      },
      onSoftLeft: () => {
        location.route('/menu');
      },
      onSoftRight: () => {
        // No action for soft right
      },
    },
    vertical: {
      onArrowDown: () => {
        setSelectedListItem(prevState => {
          const currentIndex = listItems.findIndex(item => item.value === prevState);
          if (currentIndex === listItems.length - 1) {
            return listItems[0].value;
          }
          return listItems[currentIndex + 1].value;
        });
      },
      onArrowUp: () => {
        setSelectedListItem(prevState => {
          const currentIndex = listItems.findIndex(item => item.value === prevState);
          if (currentIndex === 0) {
            return listItems[listItems.length - 1].value;
          }
          return listItems[currentIndex - 1].value;
        });
      },
    },
  });

  return (
    <>
      <TabNav>
        <TabItem isSelected={selectedTab === 'ot'}>Old Testament</TabItem>
        <TabItem isSelected={selectedTab === 'nt'}>New Testament</TabItem>
        <TabItem isSelected={selectedTab === 'ap'}>Apocrypha</TabItem>
      </TabNav>
      <main>
        <TabPanel isSelected={selectedTab === 'ot'}>
          <List>
            {listItems.map(item => (
              <ListItem isSelected={selectedListItem === item.value} key={item.value}>
                {item.label}
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel isSelected={selectedTab === 'nt'}>
          <p>New Testament</p>
        </TabPanel>
        <TabPanel isSelected={selectedTab === 'ap'}>
          <p>Apocrypha</p>
        </TabPanel>
      </main>
      <NavBar center='Select' left='Menu' right='Cancel' />
    </>
  );
}
