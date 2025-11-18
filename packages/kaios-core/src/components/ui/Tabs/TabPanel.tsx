import { type ComponentChildren } from 'preact';

interface Props {
  children: ComponentChildren;
  isSelected: boolean;
}

export default function TabPanel({ children, isSelected }: Props) {
  return <div class={`tab-panel ${isSelected ? 'active' : ''}`}>{children}</div>;
}
