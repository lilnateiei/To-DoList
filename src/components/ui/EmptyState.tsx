interface EmptyStateProps {
  emoji: string;
  title: string;
  desc: string;
  action?: React.ReactNode;
}

export default function EmptyState({ emoji, title, desc, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-5xl mb-4 select-none">{emoji}</div>
      <p className="font-semibold text-gray-700 text-base mb-1">{title}</p>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">{desc}</p>
      {action}
    </div>
  );
}