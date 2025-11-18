import { type ComponentChildren } from 'preact';

interface Props {
  children: ComponentChildren;
  id?: string;
  label?: string;
}

export default function TabNav({ children, label, id }: Props) {
  return (
    <header>
      <ul aria-label={label ?? 'Tabs'} class='nav-tabs' id={id} role='tablist'>
        {children}
      </ul>
    </header>
  );
}
