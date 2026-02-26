import { getPostBySlug, getPostSlugs } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ArrowLeft, Clock, BarChart, Tag, Sparkles, HelpCircle } from 'lucide-react';
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import AffiliateBanner from "@/components/AffiliateBanner";

// SSG（静的サイト生成）のためのパス一覧を生成
export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const title = `${post.title} | AutoRecipe`;
    const description = `プログラミング不要で${post.title}を${post.ai_assistant}を使って作成するプロンプトと手順を解説します。作業時間は約${post.estimated_time_min}分です。`;

    return {
        title: post.title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            url: `https://auto-recipe.example.com/recipe/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        }
    }
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    // Markdownのコンテンツを強引に見出し単位でパースする簡易ロジック
    // (本来はremark等のASTを使うべきですが、今回はシンプルなUI変更のためテキストで分割します)
    const content = post.content || '';

    // 見出し1から3までは「概要・準備」として扱う
    const introSectionEnd = content.indexOf('## 4. 各AIツールでの使い方と違い（重要）') !== -1
        ? content.indexOf('## 4. 各AIツールでの使い方と違い（重要）')
        : content.indexOf('## 5. 出来上がった');

    const introPart = introSectionEnd !== -1 ? content.substring(0, introSectionEnd) : content;
    const restPart = introSectionEnd !== -1 ? content.substring(introSectionEnd) : '';

    // 「4. 各AIツールの使い方」と「5. その後」を分ける
    const aiSectionEnd = restPart.indexOf('## 5. 出来上がった');
    const aiToolsPart = aiSectionEnd !== -1 ? restPart.substring(0, aiSectionEnd) : restPart;
    const footerPart = aiSectionEnd !== -1 ? restPart.substring(aiSectionEnd) : '';

    // AIツールの解説を `### XXXXX の場合` で分割する
    const aiToolBlocks = aiToolsPart.split('### ').filter(block => block.trim() !== '' && !block.startsWith('##'));

    // AIツールの種類ごとにオブジェクト化
    const aiTabs = aiToolBlocks.map(block => {
        const lines = block.split('\n');
        const title = lines[0].trim().replace('の場合', '');
        const body = lines.slice(1).join('\n');
        return { title, body };
    }).filter(tab => tab.title.includes('Cursor') || tab.title.includes('Claude') || tab.title.includes('Antigravity') || tab.title.includes('OpenClaw'));

    // Tailwind 共通クラス設定（Markdownのレンダリング用）
    const sharedProseClasses = "prose prose-blue prose-lg max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:border-b prose-h2:pb-2 prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-600 prose-p:leading-relaxed prose-li:text-gray-600 prose-a:text-blue-600";

    const renderMarkdown = (text: string) => (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                code: ({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) => {
                    const match = /language-(\w+)/.exec(className || '') || [];
                    return !inline ? (
                        <div className="relative group rounded-xl overflow-hidden my-6 bg-gray-900 shadow-lg border border-gray-800">
                            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
                                <span className="text-xs font-medium text-gray-300 flex items-center">
                                    <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                                    AIにお願いする指示文（プロンプト）
                                </span>
                                <button className="text-xs text-blue-400 font-bold flex items-center hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-md">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    コピーしてAIに貼り付ける
                                </button>
                            </div>
                            <pre className="p-5 overflow-x-auto text-[15px] text-gray-300 font-mono leading-relaxed" {...props}>
                                <code>
                                    {children}
                                </code>
                            </pre>
                        </div>
                    ) : (
                        <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded-md text-sm font-mono font-bold" {...props}>
                            {children}
                        </code>
                    )
                }
            }}
        >
            {text}
        </ReactMarkdown>
    );

    // JSON-LD 構造化データ (HowTo / Article)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": post.title,
        "description": `${post.title}を${post.ai_assistant}を使ってノーコードで作成する手順です。`,
        "totalTime": `PT${post.estimated_time_min}M`,
        "step": [
            {
                "@type": "HowToStep",
                "name": "準備",
                "text": "環境の準備とツールのインストールを行います。"
            },
            {
                "@type": "HowToStep",
                "name": "プロンプトの入力",
                "text": `${post.ai_assistant}に専用のプロンプトを入力してツールを生成します。`
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-blue-200">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 mb-8 transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    レシピ一覧へ戻る
                </Link>

                <article className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
                    {/* ヘッダーセクション */}
                    <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 px-8 sm:px-12 py-12 text-white relative overflow-hidden">
                        {/* 装飾 */}
                        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20">
                            <svg width="404" height="384" fill="none" viewBox="0 0 404 384"><defs><pattern id="d3eb07ae-5182-43e6-857d-35c643af9034" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="4" height="4" fill="currentColor"></rect></pattern></defs><rect width="404" height="384" fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"></rect></svg>
                        </div>

                        <div className="relative z-10">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-white/20 text-white text-sm font-bold rounded-full backdrop-blur-md border border-white/30">
                                    おすすめAI: {post.ai_assistant}
                                </span>
                                <span className="px-4 py-1.5 bg-white/20 text-white text-sm font-bold rounded-full backdrop-blur-md border border-white/30">
                                    難易度: {post.difficulty}
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                                {post.title}
                            </h1>
                            <p className="text-blue-100 font-medium flex items-center text-lg bg-black/20 w-fit px-4 py-2 rounded-xl backdrop-blur-sm">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                予想作成時間: たったの {post.estimated_time_min} 分
                            </p>
                        </div>
                    </div>

                    <div className="p-8 sm:p-12">
                        {/* 前半：概要・準備・プロンプト */}
                        <div className="mb-16">
                            <div className="bg-blue-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100/50">
                                <div className={sharedProseClasses}>
                                    {renderMarkdown(introPart)}
                                </div>
                            </div>
                        </div>

                        {/* 中盤：各AIごとの使い方をタブで表示 */}
                        {aiTabs.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-bold text-gray-900 border-b pb-4 mb-8 flex items-center">
                                    <HelpCircle className="w-6 h-6 mr-3 text-blue-500" />
                                    お使いのAIを選んでください
                                </h2>

                                <Tabs.Root defaultValue={aiTabs[0].title} className="flex flex-col">
                                    <Tabs.List className="flex shrink-0 border-b border-gray-200" aria-label="AI Tools">
                                        {aiTabs.map((tab) => (
                                            <Tabs.Trigger
                                                key={tab.title}
                                                value={tab.title}
                                                className="px-6 py-4 text-sm font-bold text-gray-500 hover:text-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-[inset_0_-2px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:bg-blue-50/50 cursor-pointer transition-all outline-none"
                                            >
                                                {tab.title}
                                            </Tabs.Trigger>
                                        ))}
                                    </Tabs.List>

                                    {aiTabs.map((tab) => (
                                        <Tabs.Content
                                            key={tab.title}
                                            value={tab.title}
                                            className="grow p-6 sm:p-8 bg-white border border-t-0 border-gray-200 rounded-b-2xl outline-none"
                                        >
                                            <div className={sharedProseClasses}>
                                                {renderMarkdown(tab.body)}
                                            </div>
                                        </Tabs.Content>
                                    ))}
                                </Tabs.Root>
                            </div>
                        )}

                        {/* 後半：使い方・セキュリティなど */}
                        <div className="mt-16 pt-12 border-t-2 border-dashed border-gray-200">
                            <div className={sharedProseClasses}>
                                {renderMarkdown(footerPart)}
                            </div>
                        </div>
                    </div>
                    {/* 動的アフィリエイトバナー（AIツールに応じた広告切り替え） */}
                    <div className="px-8 sm:px-12 pb-12">
                        <AffiliateBanner ai_assistant={post.ai_assistant} />
                    </div>
                </article>
            </div>
        </div>
    );
}
