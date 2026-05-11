import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';

type Props = {
  words: readonly string[];
  className?: string;
};

export function Typewriter({ words, className = '' }: Props) {
  const text = useTypewriter(words);

  return (
    <span className={className}>
      <span aria-hidden>{text}</span>
      <motion.span
        aria-hidden
        className="ml-1 inline-block w-[2px] bg-accent align-middle"
        style={{ height: '1em' }}
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
          times: [0, 0.5, 0.5, 1],
        }}
      />
    </span>
  );
}
