import { useCallback } from 'react';

export function useSmoothScroll() {
  return useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);
}
