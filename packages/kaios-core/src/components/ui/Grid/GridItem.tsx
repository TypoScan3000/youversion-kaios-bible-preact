import { type ComponentChildren } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

interface Props {
  children: ComponentChildren;
  isSelected?: boolean;
}

export default function GridItem({ children, isSelected = false }: Props) {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      // Focus the item for accessibility
      itemRef.current.focus();

      // Always ensure the selected item is visible
      itemRef.current.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
  }, [isSelected]);

  return (
    <li class={`item ${isSelected ? 'active' : ''}`} ref={itemRef} tabindex={isSelected ? 0 : -1}>
      {children}
    </li>
  );
}
