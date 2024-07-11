'use client';

import { useEffect } from 'react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center mt-14">
      <h2 className="text-center text-lg">Oops! Something went wrong!</h2>
      <h3 className="text-center my-5 text-gray-600">{error.message}</h3>
      <button
        className="mt-4 px-8 py-2 transition-colors bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-sm"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
