import { createContext } from 'preact';
import { useContext, useEffect, useRef } from 'preact/hooks';

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

interface ActionHandlers {
  horizontal?: HorizontalActionHandlers;
  navigation?: NavigationActionHandlers;
  vertical?: VerticalActionHandlers;
}

const ActionHandlerContext = createContext<{
  clearActionHandlers: () => void;
  setActionHandlers: (handlers: ActionHandlers) => void;
}>({
  clearActionHandlers: () => {},
  setActionHandlers: () => {},
});

export function useActionHandlers() {
  const context = useContext(ActionHandlerContext);
  if (!context) {
    throw new Error('useActionHandlers must be used within ActionHandlerProvider');
  }
  return context;
}

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

export function ActionHandlerProvider({ children }: { children: preact.ComponentChildren }) {
  const currentHandlers = useRef<ActionHandlers>({});

  const setActionHandlers = (handlers: ActionHandlers) => {
    currentHandlers.current = handlers;
  };

  const clearActionHandlers = () => {
    currentHandlers.current = {};
  };

  useEffect(() => {
    function handleKeyEvent(event: KeyboardEvent) {
      const { vertical, horizontal, navigation } = currentHandlers.current;
      actionHandlers(event, vertical, horizontal, navigation);
    }

    // Use window.addEventListener like the debug page for consistency
    window.addEventListener('keydown', handleKeyEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
    };
  }, []);

  return (
    <ActionHandlerContext.Provider value={{ clearActionHandlers, setActionHandlers }}>
      {children}
    </ActionHandlerContext.Provider>
  );
}
