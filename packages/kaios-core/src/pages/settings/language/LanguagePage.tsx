import { useEffect, useState } from 'preact/hooks';

export default function LanguagePage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (formState === 'submitting') {
      setTimeout(() => {
        setFormState('success');
      }, 2000);
    }
  }, [formState]);

  const handleSubmit = () => {
    setFormState('submitting');
  };

  if (formState === 'success') {
    return <div>Success</div>;
  }

  return (
    <>
      {formState === 'submitting' ? <div>Submitting...</div> : <div>LanguagePage</div>}
      <button disabled={Boolean(formState === 'submitting' || formState === 'error')} onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
