type Props = { message: string; onRetry?: () => void };
export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div role="alert">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}
