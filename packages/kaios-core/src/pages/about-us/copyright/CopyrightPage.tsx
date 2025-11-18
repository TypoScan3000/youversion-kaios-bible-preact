import { useEffect, useRef, useState } from 'preact/hooks';

import getVersion from '../../../api/get-version/get-version';
import NavBar from '../../../components/ui/NavBar/NavBar';
import TitleBar from '../../../components/ui/TitleBar/TitleBar';
import { useConfig } from '../../../contexts/ConfigContext';
import { useActionHandlers } from '../../../hooks/useActionHandlers';
import { useLocation } from '../../../routes/Router';
import type { BibleVersionResponse } from '../../../types/bible/version';

export default function CopyrightPage() {
  const [versionData, setVersionData] = useState<BibleVersionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  const config = useConfig();

  useEffect(() => {
    async function fetchCopyright() {
      try {
        const data = await getVersion(config.offlineBibleVersion);
        setVersionData(data);
      } catch (err) {
        setError('Failed to load copyright information');
        console.error('Error fetching copyright:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCopyright();
  }, [config.offlineBibleVersion]);

  useActionHandlers({
    navigation: {
      onEnter: () => {
        // No action needed
      },
      onSoftLeft: () => {
        location.route('/about-us');
      },
      onSoftRight: () => {
        // No action needed
      },
    },
    vertical: {
      onArrowDown: () => {
        if (mainRef.current) {
          mainRef.current.scrollTop += 20;
        }
      },
      onArrowUp: () => {
        if (mainRef.current) {
          mainRef.current.scrollTop -= 20;
        }
      },
    },
  });

  // Handle external links in copyright content
  useEffect(() => {
    const handleLinkClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' && target instanceof HTMLAnchorElement) {
        event.preventDefault();
        const href = target.getAttribute('href');
        if (href) {
          window.open(href, '_blank');
        }
      }
    };

    // Add event listener to the main content area
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.addEventListener('click', handleLinkClick);
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener('click', handleLinkClick);
      }
    };
  }, []);

  if (loading) {
    return (
      <>
        <TitleBar>Bible Text Copyright</TitleBar>
        <main>
          <div style={{ lineHeight: '1.6', padding: '10px', textAlign: 'center' }}>
            Loading copyright information...
          </div>
        </main>
        <NavBar center='' left='Back' />
      </>
    );
  }

  if (error || !versionData) {
    return (
      <>
        <TitleBar>Bible Text Copyright</TitleBar>
        <main>
          <div style={{ color: '#dc3545', lineHeight: '1.6', padding: '10px', textAlign: 'center' }}>
            {error || 'Unable to load copyright information'}
          </div>
        </main>
        <NavBar center='' left='Back' />
      </>
    );
  }

  const copyright = versionData.copyright_long;

  if (!copyright) {
    return (
      <>
        <TitleBar>Bible Text Copyright</TitleBar>
        <main>
          <div style={{ color: '#dc3545', lineHeight: '1.6', padding: '20px', textAlign: 'center' }}>
            Copyright information not found in version data
          </div>
        </main>
        <NavBar center='' left='Back' />
      </>
    );
  }

  return (
    <>
      <TitleBar>Bible Text Copyright</TitleBar>
      <main class='contained' ref={mainRef}>
        <div style={{ lineHeight: '1.6' }}>
          <div dangerouslySetInnerHTML={{ __html: copyright.html || copyright.text }} />
        </div>
      </main>
      <NavBar center='' left='Back' />
    </>
  );
}
