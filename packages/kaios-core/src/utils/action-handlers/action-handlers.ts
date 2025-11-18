interface VerticalActionHandlers {
  onArrowDown: () => void;
  onArrowUp: () => void;
}

interface HorizontalActionHandlers {
  onArrowLeft: () => void;
  onArrowRight: () => void;
}

interface NavigationActionHandlers {
  onEnter: () => void;
  onSoftLeft: () => void;
  onSoftRight: () => void;
}

// interface DirectionalPadActionHandlers extends VerticalActionHandlers, HorizontalActionHandlers, NavigationActionHandlers {}

function actionHandlers(
  event: KeyboardEvent,
  vertical?: VerticalActionHandlers,
  horizontal?: HorizontalActionHandlers,
  navigation?: NavigationActionHandlers
) {
  switch (event.key) {
    case 'SoftLeft':
    case 'z':
      navigation?.onSoftLeft();
      break;
    case 'SoftRight':
    case 'x':
      navigation?.onSoftRight();
      break;
    case 'Enter':
      navigation?.onEnter();
      break;
    case 'ArrowUp':
      vertical?.onArrowUp();
      break;
    case 'ArrowDown':
      vertical?.onArrowDown();
      break;
    case 'ArrowLeft':
      horizontal?.onArrowLeft();
      break;
    case 'ArrowRight':
      horizontal?.onArrowRight();
      break;
  }
}

export default function registerActionHandlers({
  vertical,
  horizontal,
  navigation,
}: {
  horizontal?: HorizontalActionHandlers;
  navigation?: NavigationActionHandlers;
  vertical?: VerticalActionHandlers;
}) {
  function handleKeyEvent(event: KeyboardEvent) {
    actionHandlers(event, vertical, horizontal, navigation);
  }

  // Add event listeners based on browser
  // if (navigator.userAgent.indexOf('Chrome') > -1) {
  console.log('Adding event listener, vertical:', vertical, 'horizontal:', horizontal, 'navigation:', navigation);
  document.addEventListener('keydown', handleKeyEvent);
  // } else {
  // document.addEventListener('keypress', handleKeyEvent);
  // }

  return () => {
    console.log('Removing event listener, vertical:', vertical, 'horizontal:', horizontal, 'navigation:', navigation);
    // if (navigator.userAgent.indexOf('Chrome') > -1) {
    document.removeEventListener('keydown', handleKeyEvent);
    // } else {
    // document.removeEventListener('keypress', handleKeyEvent);
    // }
  };
}
