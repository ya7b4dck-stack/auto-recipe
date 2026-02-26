import Link from 'next/link';
import { ArrowLeft, ShieldAlert, Key, AlertTriangle, Eye } from 'lucide-react';
import React from 'react';

export default function SecurityGuidePage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 mb-8 transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    トップページへ戻る
                </Link>

                <article className="bg-white rounded-[2rem] shadow-xl shadow-red-900/5 border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-800 px-8 sm:px-12 py-12 text-white">
                        <div className="flex items-center space-x-3 mb-4">
                            <ShieldAlert className="w-10 h-10 text-red-200" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                            AI開発を安全に行うためのマニュアル
                        </h1>
                        <p className="text-red-100 font-medium text-lg">
                            プログラミングの知識がないからこそ気をつけたい、3つの重大なセキュリティリスクとその対策。
                        </p>
                    </div>

                    <div className="p-8 sm:p-12 prose prose-red prose-lg max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:border-b prose-h2:pb-2 prose-h2:mt-12 prose-h2:mb-6">
                        <p>
                            AIを使うと誰でも簡単に便利なツールが作れる反面、<strong>「知らないうちにパスワードを世界中に公開してしまった」「悪意のあるプログラムをパソコンに入れてしまった」</strong>といった事故が起きる可能性があります。<br />
                            ツールを作り始める前に、必ず以下の3点に注意してください。
                        </p>

                        <h2>1. APIキー（合鍵）の取り扱い</h2>
                        <div className="flex items-start mb-6 bg-red-50 p-6 rounded-2xl border border-red-100">
                            <div className="bg-red-100 p-3 rounded-xl mr-4 shrink-0">
                                <Key className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mt-0 mb-2">絶対にファイルに直接書き込まない！</h3>
                                <p className="text-base text-gray-800 mb-0">
                                    AIに「連携のためのAPIキーを教えて」と言われたとき、プログラムのファイル内に直接 `api_key = &quot;abcdefg...&quot;` のように書いてはいけません。これをそのままGitHub（プログラムの共有サイト）などにアップロードすると、世界中からあなたのアカウントで不正利用されてしまい、<strong>高額な請求（数十万〜数百万）が来る恐れがあります。</strong>
                                </p>
                                <div className="mt-4 p-4 bg-white rounded-xl border border-red-200 text-sm">
                                    <strong className="text-red-600">【対策】</strong><br />
                                    APIキーは必ず <code>.env</code> という専用の「秘密の小箱」ファイルを作成し、そこに保存するようにAIに指示してください。
                                </div>
                            </div>
                        </div>

                        <h2>2. 謎の「拡張機能」や「ライブラリ」に注意</h2>
                        <div className="flex items-start mb-6 bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <div className="bg-orange-100 p-3 rounded-xl mr-4 shrink-0">
                                <AlertTriangle className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mt-0 mb-2">AIが提案したものが安全とは限らない</h3>
                                <p className="text-base text-gray-800 mb-0">
                                    AIが「これを使うと便利ですよ」と、見知らぬプログラム（ライブラリ）のインストールを提案してくることがあります。しかし中には、有名なプログラムとそっくりな名前の「ウイルスが仕込まれた偽装プログラム（Shai-Hulud攻撃など）」が存在します。
                                </p>
                                <div className="mt-4 p-4 bg-white rounded-xl border border-orange-200 text-sm">
                                    <strong className="text-orange-600">【対策】</strong><br />
                                    AIに新しいツールを入れるように言われたら、以下の「安全チェックツール」を使って、本当に信頼できるものかを確認してください。<br />
                                    <a href="https://github.com/cisco-ai-defense/skill-scanner" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Cisco AI Defense - Skill Scanner</a>
                                </div>
                            </div>
                        </div>

                        <h2>3. AIに社外秘データを読み込ませない</h2>
                        <div className="flex items-start mb-6 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <div className="bg-blue-100 p-3 rounded-xl mr-4 shrink-0">
                                <Eye className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mt-0 mb-2">機密情報の流出リスク</h3>
                                <p className="text-base text-gray-800 mb-0">
                                    Claude CodeやAntigravityなどのAIは、あなたが指示をするとパソコン内のファイルを読み込んで内容を分析してくれます。しかし、その時間違って「顧客リスト」や「会社の機密文書」が入っているフォルダをAIに読み込ませてしまうと、そのデータがAIの学習に使われてしまったり、外部のサーバーに送信されてしまう可能性があります。
                                </p>
                                <div className="mt-4 p-4 bg-white rounded-xl border border-blue-200 text-sm">
                                    <strong className="text-blue-600">【対策】</strong><br />
                                    ツールを作るためのフォルダ（作業場所）は必ず新規で空のものを作成し、そこに実際の顧客データや関係ないファイルは絶対に置かないようにしてください。テストする際は、必ず「山田太郎」のようなダミーデータを使用しましょう。
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
