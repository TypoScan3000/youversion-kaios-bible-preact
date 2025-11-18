interface Props {
  center: string;
  left?: string;
  right?: string;
}

/**
 * Bottom navigation bar, for display only.
 * Actions are handled by registering action handlers on the page.
 *
 * @param center - Center button text.
 * @param left - Left button text.
 * @param right - Right button text.
 *
 * @example
 * ```tsx
 * import NavBar from '../../components/ui/NavBar/NavBar';
 * export default function MyPage() {
 *   // action registration handled by the page.
 *
 *   return (
 *     <>
 *       MyPage
 *       <NavBar center='Select' left='Menu' right='Settings' />
 *     </>
 *   );
 * }
 * ```
 */
export default function NavBar({ left, right, center }: Props) {
  return (
    <nav class='action-bar'>
      <h5>{left}</h5>
      <h5>{center}</h5>
      <h5>{right}</h5>
    </nav>
  );
}
