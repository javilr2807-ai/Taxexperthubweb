import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { ArticleActions } from '@/components/admin/ArticleActions';

export const dynamic = 'force-dynamic';

function wordCount(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function formatCategory(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default async function CronDashboardPage() {
  const logs = await prisma.cronLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50, // Show the last 50 logs
  });

  const errorLogs = logs.filter(l => l.status === 'ERROR');

  // Find all articles that were published by the cron
  // We can join this simply by fetching the articles that are referenced in successful logs
  const cronArticleIds = logs.filter(l => l.status === 'SUCCESS' && l.articleId).map(l => l.articleId as string);
  
  const cronArticles = await prisma.article.findMany({
    where: {
      id: { in: cronArticleIds }
    },
    orderBy: { publishDate: 'desc' }
  });

  function renderArticle(article: typeof cronArticles[0]) {
    return (
      <div key={article.id} className="rounded-md border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground flex items-center">
              {formatCategory(article.category)}
              <span className="mx-1.5">•</span>
              <span className="text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded mr-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Auto-Publicado
              </span>
              {new Date(article.publishDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
              {' a las '}
              {new Date(article.publishDate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              <span className="mx-1.5">•</span>
              {wordCount(article.content)} palabras
            </p>
            <h3 className="mt-1 font-display text-xl text-navy">
              <Link href={`/admin/articles/${article.id}`} className="hover:text-brass transition-colors">
                {article.title}
              </Link>
            </h3>
            {article.excerpt && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2 max-w-prose">
                {article.excerpt}
              </p>
            )}
          </div>
          <div className="shrink-0 flex items-start gap-1 pt-1">
            <ArticleActions article={article} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-navy">Automations (Cron)</h1>
        <p className="mt-2 text-muted-foreground">Monitoriza las tareas automáticas y la IA de DeepSeek.</p>
      </div>

      {errorLogs.length > 0 && (
        <div className="mb-8 rounded-md bg-red-50 border border-red-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="font-medium text-red-800 text-lg">Errores Recientes del Cron</h3>
          </div>
          <ul className="space-y-3">
            {errorLogs.slice(0, 5).map(log => (
              <li key={log.id} className="text-sm text-red-700 bg-white/50 rounded p-3">
                <p className="font-semibold">{new Date(log.createdAt).toLocaleString('es-ES')}</p>
                <p className="mt-1">{log.message}</p>
                {log.message.includes('No quedan borradores') && (
                  <p className="mt-2 text-xs font-medium text-red-900 border-t border-red-200 pt-2">
                    💡 Solución: Sube más borradores desde la sección de artículos y asegúrate de que el contenido principal esté vacío.
                  </p>
                )}
                {log.message.includes('DeepSeek') && (
                  <p className="mt-2 text-xs font-medium text-red-900 border-t border-red-200 pt-2">
                    💡 Solución: Verifica que tienes saldo en DeepSeek o comprueba que la API key en Dokploy es válida.
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-md border border-border bg-card p-5 text-center">
          <p className="text-3xl font-display text-blue-600">{cronArticles.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Artículos Auto-Publicados</p>
        </div>
        <div className="rounded-md border border-border bg-card p-5 text-center">
          <p className="text-3xl font-display text-red-600">{errorLogs.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Errores Detectados</p>
        </div>
      </div>

      {cronArticles.length === 0 ? (
        <div className="rounded-md border border-border bg-card p-12 text-center text-muted-foreground">
          Aún no hay artículos publicados por el cron. El primer artículo aparecerá aquí automáticamente.
        </div>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-2xl text-navy mb-4">Historial de Publicaciones IA</h2>
            <div className="space-y-4">
              {cronArticles.map(renderArticle)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
