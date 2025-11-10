import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-layout">
      <div className="container">
        <div className="dashboard-grid">{children}</div>
      </div>
    </div>
  );
}
