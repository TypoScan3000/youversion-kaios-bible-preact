import { type ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

interface Props {
  children: ComponentChildren;
  className?: string;
  isSelected: boolean;
}

export default function ListItem({ children, className, isSelected }: Props) {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      // Focus the item for accessibility
      itemRef.current.focus();

      // Always ensure the selected item is visible
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isSelected]);

  return (
    <li class={`item ${isSelected ? 'active' : ''} ${className || ''}`} ref={itemRef} tabindex={isSelected ? 0 : -1}>
      {children}
    </li>
  );
}
