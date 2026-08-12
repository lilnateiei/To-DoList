interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  desc: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, desc, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 flex items-center justify-center text-gray-300 select-none">{icon}</div>}
      <p className="font-semibold text-gray-700 text-base mb-1">{title}</p>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">{desc}</p>
      {action}
    </div>
  );
}