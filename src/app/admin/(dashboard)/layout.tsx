import { ReactNode } from 'react';
import Link from 'next/link';
import { logout } from '../actions';
import { Button } from '@/components/ui/button';
import { LogOut, FileText } from 'lucide-react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="w-full border-r border-border bg-navy text-paper md:w-64 md:flex-shrink-0">
        <div className="flex h-16 items-center px-6 border-b border-navy-soft">
          <span className="font-display text-xl text-brass">Admin Desk</span>
        </div>
        <nav className="space-y-1 p-4">
          <Link
            href="/admin/articles"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-navy-soft"
          >
            <FileText className="h-4 w-4" />
            Articles
          </Link>

        </nav>
        <div className="absolute bottom-4 left-4 right-4 md:static md:mt-auto md:p-4">
          <form action={logout}>
            <Button
              type="submit"
              variant="outline"
              className="w-full justify-start gap-3 border-navy-soft bg-transparent text-paper hover:bg-navy-soft hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  );
}
