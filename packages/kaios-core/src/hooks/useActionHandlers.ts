import { useEffect } from 'preact/hooks';

import { useActionHandlers as useActionHandlerContext } from '../contexts/ActionHandlerContext';

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

export function useActionHandlers(handlers: {
  horizontal?: HorizontalActionHandlers;
  navigation?: NavigationActionHandlers;
  vertical?: VerticalActionHandlers;
}) {
  const { setActionHandlers, clearActionHandlers } = useActionHandlerContext();

  useEffect(() => {
    setActionHandlers(handlers);

    return () => {
      clearActionHandlers();
    };
  }, [handlers, setActionHandlers, clearActionHandlers]);
}
