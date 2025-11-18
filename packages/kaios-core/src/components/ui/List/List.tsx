import { type ComponentChildren } from 'preact';

interface Props {
  children: ComponentChildren;
}

export default function List({ children }: Props) {
  return <ul class='select-list vertical'>{children}</ul>;
}
