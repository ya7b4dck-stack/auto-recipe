import { getAllPosts } from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              AutoRecipe
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            プログラミング不要。非エンジニアのための、<br className="hidden sm:block" />
            AIエージェント（Cursor/Claude Code等）専用コピペ開発レシピ。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/guide/ai-agents" className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 text-sm font-bold rounded-full hover:bg-blue-100 transition-colors border border-blue-200 shadow-sm">
              📚 はじめてのAIエージェント
            </Link>
            <Link href="/guide/security" className="inline-flex items-center px-4 py-2 bg-red-50 text-red-700 text-sm font-bold rounded-full hover:bg-red-100 transition-colors border border-red-200 shadow-sm">
              🛡️ 安全に使うためのルール
            </Link>
            <Link href="/guide/glossary" className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 text-sm font-bold rounded-full hover:bg-green-100 transition-colors border border-green-200 shadow-sm">
              📖 魔法の言葉（用語集）
            </Link>
          </div>
        </header>

        <div className="mb-10 flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">注目のレシピ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/recipe/${post.slug}`}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                    {post.ai_assistant}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {post.difficulty}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight flex-grow">
                  {post.title}
                </h2>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    目安: {post.estimated_time_min}分
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
