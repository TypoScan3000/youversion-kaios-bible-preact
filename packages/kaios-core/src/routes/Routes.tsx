import TemplatePage from '../pages/_template/TemplatePage.tsx';
import TemplatePageGrid from '../pages/_template/TemplatePageGrid.tsx';
import TemplatePageTabs from '../pages/_template/TemplatePageTabs.tsx';
import AboutUsPage from '../pages/about-us/AboutUsPage.tsx';
import CopyrightPage from '../pages/about-us/copyright/CopyrightPage.tsx';
import BiblePage from '../pages/bible/BiblePage.tsx';
import DailyVersePage from '../pages/daily-verse/DailyVersePage.tsx';
import DebugPage from '../pages/debug.tsx';
import FontSizePage from '../pages/font-size/FontSizePage.tsx';
import MenuPage from '../pages/menu/MenuPage.tsx';
import BookPickerPage from '../pages/pickers/book/BookPickerPage.tsx';
import ChapterPickerPage from '../pages/pickers/chapter/ChapterPickerPage.tsx';
import LanguagePage from '../pages/settings/language/LanguagePage.tsx';
import ThemePage from '../pages/settings/theme/ThemePage.tsx';
import VersionPage from '../pages/settings/version/VersionPage.tsx';
import { useKaiosRouter } from './Router.tsx';

function HomeRedirect() {
  const location = useKaiosRouter();
  const lastLocation = localStorage.getItem('lastBibleLocation');

  if (lastLocation) {
    // If user has a saved location, go there
    location.route(`/bible?usfm=${lastLocation}`);
  } else {
    // Default to John 1 instead of book picker
    location.route('/bible?usfm=JHN.1');
  }

  return <div>Loading...</div>;
}

export function Routes() {
  const { path } = useKaiosRouter();

  // Route matching logic
  switch (path) {
    case '/':
      return <HomeRedirect />;
    case '/menu':
      return <MenuPage />;
    case '/settings/language':
      return <LanguagePage />;
    case '/settings/theme':
      return <ThemePage />;
    case '/settings/version':
      return <VersionPage />;
    case '/daily-verse':
      return <DailyVersePage />;
    case '/pickers/book':
      return <BookPickerPage />;
    case '/pickers/chapter':
      return <ChapterPickerPage />;
    case '/bible':
      return <BiblePage />;
    case '/about-us':
      return <AboutUsPage />;
    case '/about-us/copyright':
      return <CopyrightPage />;
    case '/template':
      return <TemplatePage />;
    case '/template/tabs':
      return <TemplatePageTabs />;
    case '/template/grid':
      return <TemplatePageGrid />;
    case '/debug':
      return <DebugPage />;
    case '/font-size':
      return <FontSizePage />;
    default:
      // Default fallback
      return <BookPickerPage />;
  }
}
