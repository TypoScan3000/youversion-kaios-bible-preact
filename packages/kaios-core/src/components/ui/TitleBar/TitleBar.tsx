interface Props {
  children: string;
  showArrows?: boolean;
}

/**
 * Top title bar, for display only.
 * Actions are handled by registering action handlers on the page.
 *
 * @param title - Title text.
 * @param showArrows - Whether to show the left and right arrows.
 *
 * @example
 * ```tsx
 * import TitleBar from '../../components/ui/TitleBar/TitleBar';
 * export default function MyPage() {
 *   // action registration handled by the page.
 *
 *   return (
 *     <>
 *       <TitleBar title='My Page' showArrows={true} />
 *     </>
 *   );
 * }
 * ```
 */
export default function TitleBar({ children, showArrows }: Props) {
  return (
    <header class={!showArrows ? 'solo' : ''}>
      {showArrows ? (
        <div class='icon'>
          <svg fill='none' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
            <path
              clip-rule='evenodd'
              d='M15.707 5.2929C16.0976 5.68342 16.0976 6.31658 15.707 6.70711L10.5909 11.8232C10.4933 11.9209 10.4933 12.0791 10.5909 12.1768L15.707 17.2929C16.0976 17.6834 16.0976 18.3166 15.707 18.7071C15.3165 19.0976 14.6833 19.0976 14.2928 18.7071L8.64637 13.0607C8.06058 12.4749 8.06058 11.5251 8.64637 10.9393L14.2928 5.2929C14.6833 4.90237 15.3165 4.90237 15.707 5.2929Z'
              fill='inherit'
              fill-rule='evenodd'
            />
          </svg>
        </div>
      ) : null}
      <h1 class='title'>{children}</h1>
      {showArrows ? (
        <div class='icon'>
          <svg fill='none' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
            <path
              clip-rule='evenodd'
              d='M8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.2322 12.3536C13.4275 12.1583 13.4275 11.8417 13.2322 11.6464L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.2929C8.68342 4.90237 9.31658 4.90237 9.70711 5.2929L15.3536 10.9393C15.9393 11.5251 15.9393 12.4749 15.3536 13.0607L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071Z'
              fill='inherit'
              fill-rule='evenodd'
            />
          </svg>
        </div>
      ) : null}
    </header>
  );
}
