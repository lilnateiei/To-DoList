interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, desc, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-surface-2 rounded-lg text-ink">
        {icon}
      </div>
      <p className="font-semibold text-ink text-body-md mb-2">{title}</p>
      <p className="text-caption-sm text-neutral-500 mb-6 max-w-xs">{desc}</p>
      {action}
    </div>
  );
}