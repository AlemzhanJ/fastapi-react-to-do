export function LoadingSpinner({ px = 24 }) {
    return (
      <div
        style={{ width: px, height: px }}
        className="border-4 border-neutral-600 border-t-neutral-200 rounded-full animate-spin"
      />
    );
  }