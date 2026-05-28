export function DragHandle() {
  return (
    <button
      type="button"
      className="dashboard-drag-handle flex size-8 items-center justify-center rounded-lg text-faint transition hover:bg-background-soft hover:text-muted"
      aria-label="위젯 이동"
    >
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="4" cy="3" r="1.3" fill="currentColor" />
        <circle cx="10" cy="3" r="1.3" fill="currentColor" />
        <circle cx="4" cy="7" r="1.3" fill="currentColor" />
        <circle cx="10" cy="7" r="1.3" fill="currentColor" />
        <circle cx="4" cy="11" r="1.3" fill="currentColor" />
        <circle cx="10" cy="11" r="1.3" fill="currentColor" />
      </svg>
    </button>
  );
}
