import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
        <footer className="bg-slate-900 border-t border-slate-700 py-4 px-8">
          <p className="text-center text-sm text-slate-400">
            © 2025 Invoice Manager Powered By{" "}
            <a
              href="https://www.maisolutions.qzz.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Mai Business Solutions
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
