import { useEffect, useRef, useState } from 'preact/hooks';

import NavBar from '../components/ui/NavBar/NavBar';
import TitleBar from '../components/ui/TitleBar/TitleBar';
import { useActionHandlers } from '../hooks/useActionHandlers';
import { useKaiosRouter } from '../routes/Router';

export default function DebugPage() {
  const [messages, setMessages] = useState<Array<string>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useKaiosRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    function logKeydown(event: KeyboardEvent) {
      setMessages(prev => [...prev, `keydown: ${event.key}`]);
    }

    function logKeyup(event: KeyboardEvent) {
      setMessages(prev => [...prev, `keyup: ${event.key}`]);
    }

    function logKeypress(event: KeyboardEvent) {
      setMessages(prev => [...prev, `keypress: ${event.key}`]);
    }

    window.addEventListener('keydown', logKeydown);
    window.addEventListener('keyup', logKeyup);
    window.addEventListener('keypress', logKeypress);

    return () => {
      window.removeEventListener('keydown', logKeydown);
      window.removeEventListener('keyup', logKeyup);
      window.removeEventListener('keypress', logKeypress);
    };
  }, []);

  useActionHandlers({
    navigation: {
      onEnter: () => {
        // No action needed
      },
      onSoftLeft: () => {
        location.back();
      },
      onSoftRight: () => {
        // No action needed
      },
    },
  });

  return (
    <>
      <TitleBar>Debug</TitleBar>
      <main class='contained'>
        {messages.map(message => (
          <p style={{ margin: 0, padding: 0 }}>{message}</p>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <NavBar center='' left='Back' right='' />
    </>
  );
}
