import { type ComponentChildren } from 'preact';

interface Props {
  children: ComponentChildren;
  columns?: 4 | 5;
}

export default function Grid({ children, columns = 4 }: Props) {
  return <ul class={`select-list grid columns-${columns}`}>{children}</ul>;
}
