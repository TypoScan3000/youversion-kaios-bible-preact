import NavBar from '../../components/ui/NavBar/NavBar';
import TitleBar from '../../components/ui/TitleBar/TitleBar';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { useLocation } from '../../routes/Router';

export default function TemplatePage() {
  const location = useLocation();

  // Handle keyboard navigation (every page will have this)
  useActionHandlers({
    navigation: {
      onEnter: () => {
        // Navigate to the full chapter
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

  return (
    <>
      <TitleBar showArrows={true}>Template Page</TitleBar>
      <main class='contained'>Content goes here</main>
      <NavBar center='Select' left='Menu' right='Settings' />
    </>
  );
}
