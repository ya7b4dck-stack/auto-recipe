import React from 'react';

type Props = {
    ai_assistant: string;
};

// 仮のアフィリエイトリンクデータ（将来的にはA8.net等のリンクに差し替える）
const affiliateData: Record<string, { name: string; url: string; copy: string; badge: string; bookTitle?: string; bookUrl?: string }> = {
    'Cursor': {
        name: 'Cursor Pro',
        url: 'https://cursor.sh/pricing', // TODO: Affiliate Link
        copy: '今すぐCursor Proで爆速AI開発を体験する',
        badge: '人気No.1',
        bookTitle: '『ChatGPT/LangChainによるチャットシステム構築［実践］入門』',
        bookUrl: 'https://amzn.to/example_cursor_book'
    },
    'Claude Code': {
        name: 'Claude Pro',
        url: 'https://anthropic.com/claude', // TODO: Affiliate Link
        copy: '圧倒的なコード理解力。Claude Proを使ってみる',
        badge: 'プロ向け',
        bookTitle: '『プロンプトエンジニアリングの教科書』',
        bookUrl: 'https://amzn.to/example_claude_book'
    },
    'Antigravity': {
        name: 'Google Workspace',
        url: 'https://workspace.google.com/', // TODO: Affiliate Link
        copy: '自動化エージェントと相性抜群のWorkspaceに登録',
        badge: 'ビジネス向け',
        bookTitle: '『Google Gemini ガイドブック』',
        bookUrl: 'https://amzn.to/example_workspace_book'
    },
    'OpenClaw': {
        name: 'OpenAI API',
        url: 'https://openai.com/api/', // TODO: Affiliate Link
        copy: 'OpenClawの頭脳となるAPIキーを取得する',
        badge: '必須ツール'
    }
};

export default function AffiliateBanner({ ai_assistant }: Props) {
    let ad = null;

    // AIアシスタント名から適切なアフィリエイトリンクを探す
    for (const [key, data] of Object.entries(affiliateData)) {
        if (ai_assistant.includes(key)) {
            ad = data;
            break;
        }
    }

    // マッチしない場合は汎用の広告（例：AWSやUdemyなど）
    if (!ad) {
        ad = {
            name: 'Udemy - AI開発入門',
            url: 'https://www.udemy.com/', // TODO: Affiliate Link
            copy: '動画で学ぶ！非エンジニアのためのAI活用講座',
            badge: 'おすすめ',
        };
    }

    return (
        <div className="my-12 p-1 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-white rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between h-full">
                <div className="mb-6 sm:mb-0 sm:pr-8">
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full mb-3">
                        {ad.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {ad.copy}
                    </h3>
                    <p className="text-gray-500 text-sm">
                        このレシピを実行するには、{ad.name} の登録がおすすめです。<br className="hidden sm:block" />
                        今すぐ準備を完了させて、自動化をスタートしましょう。
                    </p>
                </div>

                <a
                    href={ad.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-full sm:w-auto text-center px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center group"
                >
                    公式サイトへ
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </a>
            </div>

            {ad.bookTitle && (
                <div className="bg-white/90 px-8 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100">
                    <p className="text-gray-600 text-sm font-bold mb-3 sm:mb-0">
                        📚 さらに基礎からしっかり学びたい方へ
                    </p>
                    <a
                        href={ad.bookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm border border-blue-500 text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-blue-50 transition-colors w-full sm:w-auto text-center shadow-sm"
                    >
                        {ad.bookTitle} をAmazonで見る
                    </a>
                </div>
            )}

            <div className="text-center text-[10px] text-white/50 py-1">
                スポンサーリンク
            </div>
        </div>
    );
}
