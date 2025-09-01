import { useEffect, useState } from "react";

export function useTimeout(delay: number = 1000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return ready;
}
