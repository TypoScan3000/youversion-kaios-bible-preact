import { createContext } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

interface RouterContextType {
  back: () => void;
  params: Record<string, string>;
  path: string;
  route: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export function useKaiosRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useKaiosRouter must be used within KaiosRouterProvider');
  }
  return context;
}

// Compatibility hooks that mimic preact-iso
export function useLocation() {
  const { path, route } = useKaiosRouter();
  return { path, route };
}

export function useRoute() {
  const { params } = useKaiosRouter();
  return { params };
}

export function Router({ children }: { children: preact.ComponentChildren }) {
  const [path, setPath] = useState(() => {
    // Get initial path from hash or default to '/'
    const hash = window.location.hash.slice(1);
    return hash || '/';
  });

  const [params, setParams] = useState<Record<string, string>>({});

  const route = (newPath: string) => {
    const cleanPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
    window.location.hash = cleanPath;
    setPath(cleanPath);
  };

  const back = () => {
    window.history.back();
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const [pathPart, query] = hash.split('?');
        const newParams = query ? Object.fromEntries(new URLSearchParams(query)) : {};
        setPath(pathPart || '/');
        setParams(newParams);
      } else {
        setPath('/');
        setParams({});
      }
    };

    // Initial setup
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return <RouterContext.Provider value={{ back, params, path, route }}>{children}</RouterContext.Provider>;
}
