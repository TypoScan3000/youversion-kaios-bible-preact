import { useEffect, useRef } from 'preact/hooks';

interface Props {
  children: string;
  isSelected: boolean;
}

export default function TabItem({ children, isSelected }: Props) {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      // Focus the item for accessibility
      itemRef.current.focus();
      // Scroll into view vertically
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
      // Manually scroll horizontally if needed
      const container = itemRef.current.parentElement;
      const item = itemRef.current;
      if (container && item) {
        const containerRect = container.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        // If item is outside (even partially) of the container viewport, scroll
        if (itemRect.left < containerRect.left || itemRect.right > containerRect.right) {
          const offset = itemRect.left - containerRect.left - containerRect.width / 2 + itemRect.width / 2;
          container.scrollLeft += offset;
        }
      }
    }
  }, [isSelected]);

  return (
    <li class={`tab ${isSelected ? 'active' : ''}`} ref={itemRef} role='tab' tabindex={isSelected ? 0 : -1}>
      {children}
    </li>
  );
}
