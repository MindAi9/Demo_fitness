import { Star } from 'lucide-react';

interface StarHighlightProps {
  count?: number;
  size?: 'sm' | 'md';
  label?: string;
}

export function StarHighlight({
  count = 5,
  size = 'sm',
  label = 'Five-star visual highlight',
}: StarHighlightProps) {
  const iconClass = size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';

  return (
    <div
      className="inline-flex items-center gap-1 text-red-500"
      aria-label={label}
      role="img"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <Star
          key={idx}
          className={`${iconClass} fill-red-500 text-red-500`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
