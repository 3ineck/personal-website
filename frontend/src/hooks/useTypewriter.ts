import { useEffect, useState } from 'react';

type Options = {
  typeSpeedMs?: number;
  deleteSpeedMs?: number;
  holdAfterTypeMs?: number;
  holdAfterDeleteMs?: number;
};

const defaults: Required<Options> = {
  typeSpeedMs: 90,
  deleteSpeedMs: 40,
  holdAfterTypeMs: 1600,
  holdAfterDeleteMs: 400,
};

export function useTypewriter(words: readonly string[], options: Options = {}) {
  const {
    typeSpeedMs,
    deleteSpeedMs,
    holdAfterTypeMs,
    holdAfterDeleteMs,
  } = { ...defaults, ...options };

  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[index % words.length];

    let delay: number;
    let next: () => void;

    if (!deleting) {
      if (text.length < current.length) {
        delay = typeSpeedMs;
        next = () => setText(current.slice(0, text.length + 1));
      } else {
        delay = holdAfterTypeMs;
        next = () => setDeleting(true);
      }
    } else {
      if (text.length > 0) {
        delay = deleteSpeedMs;
        next = () => setText(current.slice(0, text.length - 1));
      } else {
        delay = holdAfterDeleteMs;
        next = () => {
          setDeleting(false);
          setIndex((i) => (i + 1) % words.length);
        };
      }
    }

    const id = window.setTimeout(next, delay);
    return () => window.clearTimeout(id);
  }, [
    text,
    deleting,
    index,
    words,
    typeSpeedMs,
    deleteSpeedMs,
    holdAfterTypeMs,
    holdAfterDeleteMs,
  ]);

  return text;
}
