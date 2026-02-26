import Link from 'next/link';
import { ArrowLeft, Cpu, Terminal, Zap, Code2 } from 'lucide-react';
import React from 'react';

export default function AIAgentsGuidePage() {
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

                <article className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 px-8 sm:px-12 py-12 text-white">
                        <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                            AIエージェントの紹介と基本操作
                        </h1>
                        <p className="text-blue-100 font-medium text-lg">
                            あなたに代わってプログラミングをしてくれるAIたち。それぞれの特徴と選び方を解説します。
                        </p>
                    </div>

                    <div className="p-8 sm:p-12 prose prose-blue prose-lg max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:border-b prose-h2:pb-2 prose-h2:mt-12 prose-h2:mb-6">
                        <p>
                            「プログラミングなんて全くわからない！」という方でも大丈夫です。<br />
                            最近のAIは、あなたが「お願い（指示書）」を投げるだけで、<strong>AI自身が考えてパソコンを操作し、プログラムを作り上げてくれます。</strong>
                        </p>
                        <p>ここでは、代表的なAIツールの特徴と、どれを選べばいいかをご紹介します。</p>

                        <h2>1. Cursor (カーソル)</h2>
                        <div className="flex items-start mb-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="bg-blue-100 p-3 rounded-xl mr-4 shrink-0">
                                <Code2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mt-0 mb-2">画面を見ながら直感的に操作できる（おすすめ度：高）</h3>
                                <p className="text-base text-gray-600 mb-0">
                                    世界中で今一番人気のある「AI内蔵エディタ」です。チャット画面（Composer機能など）があり、そこでAIと会話しながら、実際に作られていくツールを横目で見ることができます。<br />
                                    <strong>ブラウザのダウンロード感覚でインストールでき、初心者にも一番扱いやすいのが特徴です。</strong>
                                </p>
                            </div>
                        </div>

                        <h2>2. Claude Code (クロード・コード)</h2>
                        <div className="flex items-start mb-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="bg-purple-100 p-3 rounded-xl mr-4 shrink-0">
                                <Terminal className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mt-0 mb-2">黒い画面の「ターミナル」で動く賢いAI（おすすめ度：中）</h3>
                                <p className="text-base text-gray-600 mb-0">
                                    Anthropic社が提供するAIです。一見するとハッカーが使うような黒い画面（ターミナルやコマンドプロンプト）で動くため、最初は少しとっつきにくいかもしれません。<br />
                                    しかし、あなたのパソコンのファイルをごっそり読み込んで、ものすごい早さで自動でコードを書き換えてくれるため、慣れると圧倒的に早いです。
                                </p>
                            </div>
                        </div>

                        <h2>3. Antigravity (アンチグラビティ)</h2>
                        <div className="flex items-start mb-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="bg-yellow-100 p-3 rounded-xl mr-4 shrink-0">
                                <Zap className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mt-0 mb-2">Googleの強力な自動化エージェント（おすすめ度：中）</h3>
                                <p className="text-base text-gray-600 mb-0">
                                    Google DeepMindチームが設計した先進的なAIアシスタントです。こちらも文字入力ベースでのやり取りになりますが、AI自身が必要なファイルを調べ、コマンドを実行し、ブラウザの操作まで行う強力な自律性を持っています。
                                </p>
                            </div>
                        </div>

                        <h2>4. OpenClaw (オープンクロウ)</h2>
                        <div className="flex items-start mb-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="bg-green-100 p-3 rounded-xl mr-4 shrink-0">
                                <Cpu className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mt-0 mb-2">オープンソースの自動化ツール（おすすめ度：上級者向け）</h3>
                                <p className="text-base text-gray-600 mb-0">
                                    様々なAIモデルを裏側で切り替えながら使えるエージェントです。機能は強力ですが、設定に少し知識がいることがあるため、最初の一歩としてはCursorなどがおすすめです。
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-blue-900 mt-0 mb-4">迷ったらどうすればいい？</h3>
                            <p className="text-blue-800 font-medium m-0">
                                まずは <strong>Cursor</strong> をインストールしてみてください。<br />
                                普段使っているメモ帳やワードソフトと同じように、画面を見ながら操作できるため、パソコンが苦手な方でも一番つまずきにくい仕様になっています。<br /><br />
                                当サイトのレシピを開き、「Cursor」のタブを選択して、そこに書かれている指示をコピペするだけでツール開発がスタートします！
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
