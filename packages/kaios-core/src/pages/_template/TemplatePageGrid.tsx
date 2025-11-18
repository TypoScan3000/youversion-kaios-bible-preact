import { useCallback, useState } from 'preact/hooks';

import Grid from '../../components/ui/Grid/Grid';
import GridItem from '../../components/ui/Grid/GridItem';
import NavBar from '../../components/ui/NavBar/NavBar';
import TitleBar from '../../components/ui/TitleBar/TitleBar';
import { useActionHandlers } from '../../hooks/useActionHandlers';
import { useLocation } from '../../routes/Router';

export default function TemplatePage() {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const gridColumns = 5;
  const totalItems = 20;

  // Arrow navigation functions adapted from the JavaScript code
  const navigateDown = useCallback(() => {
    const needsWrap = selectedIndex + gridColumns > totalItems - 1;
    if (needsWrap) {
      const lastRowLength = totalItems % gridColumns;
      const positionWithinRow = selectedIndex % gridColumns;
      const goToLastElement = positionWithinRow + 1 > lastRowLength && lastRowLength > 0;
      const setIndex = goToLastElement ? totalItems - 1 : positionWithinRow;
      setSelectedIndex(setIndex);
      return;
    }
    const setIndex = selectedIndex + gridColumns;
    setSelectedIndex(setIndex);
  }, [selectedIndex, gridColumns, totalItems]);

  const navigateUp = useCallback(() => {
    const goToLastRow = selectedIndex < gridColumns;
    if (goToLastRow) {
      const lastRowLength = totalItems % gridColumns;
      const adjustedLastRowLength = lastRowLength === 0 ? gridColumns : lastRowLength;
      const lastRowIndex = totalItems + selectedIndex - adjustedLastRowLength;
      setSelectedIndex(lastRowIndex);
      return;
    }
    const setIndex = selectedIndex - gridColumns;
    setSelectedIndex(setIndex);
  }, [selectedIndex, gridColumns, totalItems]);

  const navigateRight = useCallback(() => {
    const goToFirstElement = selectedIndex + 1 > totalItems - 1;
    const setIndex = goToFirstElement ? 0 : selectedIndex + 1;
    setSelectedIndex(setIndex);
  }, [selectedIndex, totalItems]);

  const navigateLeft = useCallback(() => {
    const goToLastElement = selectedIndex === 0;
    const setIndex = goToLastElement ? totalItems - 1 : selectedIndex - 1;
    setSelectedIndex(setIndex);
  }, [selectedIndex, totalItems]);

  // Handle keyboard navigation (every page will have this)
  useActionHandlers({
    horizontal: {
      onArrowLeft: () => {
        navigateLeft();
      },
      onArrowRight: () => {
        navigateRight();
      },
    },
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
    vertical: {
      onArrowDown: () => {
        navigateDown();
      },
      onArrowUp: () => {
        navigateUp();
      },
    },
  });

  return (
    <>
      <TitleBar showArrows={true}>Template Grid</TitleBar>
      <main class='contained'>
        <Grid columns={gridColumns}>
          {/* Normally key should be a unique identifier and not an index. But for this example, it's fine. */}
          {Array.from({ length: totalItems }, (_, index) => (
            <GridItem isSelected={index === selectedIndex} key={index}>
              {index + 1}
            </GridItem>
          ))}
        </Grid>
      </main>
      <NavBar center='Select' left='Menu' right='Settings' />
    </>
  );
}
