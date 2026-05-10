import { DesktopTable } from './DesktopTable';

type AdminViewProps = {
  refreshStats: () => void;
};

export default function AdminView({
  refreshStats,
}: AdminViewProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* card stats nanti di sini */}
      </div>

      <DesktopTable onDataChange={refreshStats} />
    </div>
  );
}