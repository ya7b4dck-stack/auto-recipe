import Link from 'next/link';
import { ArrowLeft, BookOpen, Star, Search } from 'lucide-react';
import React from 'react';

// 用語データの定義
const glossaryData = [
    {
        category: 'あ行',
        terms: [
            { name: 'API (エーピーアイ)', desc: '別のサービス（例：GoogleやXなど）の機能を、自分のプログラムとパズルブロックのように繋ぎ合わせて使うための「窓口」のこと。', important: true },
            { name: 'APIキー', desc: 'APIという窓口を通るための「合鍵」や「パスワード」のようなもの。これが他人にバレると勝手に使われてしまうため、絶対にネット上に公開してはいけません。', important: true },
            { name: 'エラー (Error)', desc: 'AIやプログラムが「何かおかしいよ！」と教えてくれるメッセージ。エラーが出ても怖がらず、そのままAIに「こんなエラーが出た」と貼り付けて伝えるのが上達のコツです。', important: true },
            { name: 'エディタ (Editor)', desc: 'プログラムの文章（コード）を書くための専用のメモ帳ソフトのこと。Cursor（カーソル）などは「AIが内蔵された賢いエディタ」です。' },
            { name: 'オープンソース (OSS)', desc: '設計図（ソースコード）が世界中に無料で公開されていて、誰でも自由に使ったり改造したりできるソフトウェアのこと。' },
        ]
    },
    {
        category: 'か行',
        terms: [
            { name: '仮想環境 (venvなど)', desc: 'パソコンの中に作る、特定のプログラム専用の「隔離された実験室」。これを作らないと、複数のツールを作ったときにプログラム同士が喧嘩して壊れてしまうことがあります。', important: true },
            { name: '拡張機能 (Extensions)', desc: 'ツールに後から追加できる「便利グッズ」のこと。スマホにアプリを入れる感覚で、エディタに機能を追加できます。' },
            { name: '環境変数', desc: 'プログラムを動かすために必要な「秘密の設定（APIキーなど）」を、ファイルに直接書き込まずに安全に保存しておくための仕組みのこと。`.env` ファイルなどを使います。' },
            { name: 'コマンド (Command)', desc: '「これを実行して」とパソコンにお願いするための命令文のこと。ターミナル（黒い画面）に文字を打ち込んで実行します。' },
            { name: 'コード (Code)', desc: 'コンピューターにお願いをするために書かれた「呪文（プログラムの文章）」のこと。今のAI開発では、人間がコードを読めなくても問題ありません。' },
        ]
    },
    {
        category: 'さ行',
        terms: [
            { name: 'サーバー (Server)', desc: 'サービスを24時間提供し続けるための、インターネット上にある強力なパソコンのこと。' },
            { name: 'スクリプト (Script)', desc: '簡単な作業を自動化するために書かれた、短いプログラムの台本のこと。' },
            { name: 'スクレイピング (Scraping)', desc: 'Webサイトに表示されている文字や画像を、プログラムを使って自動的にコピーして収集する技術。取引リストなどを一気に作るときに使います。', important: true },
            { name: 'ソースコード', desc: 'プログラムの中身（設計図）のこと。略して「ソース」とも呼ばれます。' },
        ]
    },
    {
        category: 'た行',
        terms: [
            { name: 'ターミナル (Terminal)', desc: '映画のハッカーがよく使っているような、文字（コマンド）だけを打ち込んでパソコンを操作する黒い画面のこと。「コマンドプロンプト」とも呼ばれます。AIにこの画面の操作をお願いすることが多くあります。', important: true },
            { name: 'データベース (Database)', desc: '大量の情報をきれいに整理して保存し、必要なときにすぐに取り出せるようにした「電子のキャビネット」のこと。' },
            { name: 'デプロイ (Deploy)', desc: '作ったツールやWebサイトを、インターネット上に公開して世界中誰でも使える状態にすること。' },
        ]
    },
    {
        category: 'な行',
        terms: [
            { name: 'ノーコード (No-Code)', desc: 'プログラムの呪文（コード）を一行も書かずに、画面上のブロックを組み合わせるだけでアプリやツールを作れる仕組みのこと。' },
        ]
    },
    {
        category: 'は行',
        terms: [
            { name: 'バグ (Bug)', desc: 'プログラムの中に潜む「間違い」や「不具合」のこと。これを取り除く作業を「デバッグ」と呼びます。' },
            { name: 'バックエンド (Backend)', desc: 'データの保存や計算など、普段ユーザーの目には見えない裏側の処理を行う部分。レストランで例えると「厨房」の役割です。' },
            { name: 'パッケージ / ライブラリ', desc: '他の人が作ってくれた「便利なプログラムの詰め合わせセット」。これをパソコンに入れることで、ゼロから作らなくても最初から高度な機能が使えるようになります。', important: true },
            { name: 'フロントエンド (Frontend)', desc: 'ボタンや画像、文字の配置など、ユーザーが直接見て操作する画面のこと。レストランで例えると「客席とメニュー」の役割です。' },
            { name: 'プロンプト (Prompt)', desc: 'AIへの「お願いの文章」や「指示書」のこと。このプロンプトの内容が具体的で詳しいほど、AIはあなたの思い通りのツールを作ってくれます。', important: true },
            { name: '変数 (Variables)', desc: 'プログラムの中でデータを入れておく「名前つきの箱」のこと。' },
        ]
    },
    {
        category: 'ま行',
        terms: [
            { name: 'マークダウン (Markdown)', desc: '文字を太くしたり、見出しを作ったりするための簡単な書き方のルール。当サイトのAI指示書（レシピ）もこの形式で書かれています。' },
            { name: 'モックアップ (Mockup)', desc: '実際の機能はまだ動かないけれど、見た目だけを本物そっくりに作った「模型」のこと。' },
        ]
    },
    {
        category: 'ら行',
        terms: [
            { name: 'リポジトリ (Repository)', desc: 'プログラムのファイルや設計図をまとめて保存・管理しておく「金庫（フォルダ）」のこと。「GitHub」というネット上の保管庫サービスが世界的に有名です。', important: true },
            { name: 'ルーティング (Routing)', desc: '「このURLにアクセスしたら、どの画面を表示するか」を決める道案内の仕組みのこと。' },
            { name: 'ローカル (Local)', desc: 'インターネット上のサーバーではなく、「今あなたが使っているこのパソコン（手元）」のこと。「ローカル環境で動かす」＝「自分のパソコンの中だけで動かす」という意味です。' },
        ]
    },
];

export default function GlossaryPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 mb-8 transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    トップページへ戻る
                </Link>

                <article className="bg-white rounded-[2rem] shadow-xl shadow-green-900/5 border border-gray-100 overflow-hidden">
                    {/* ヘッダー */}
                    <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 px-8 sm:px-12 py-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -translate-y-10 translate-x-1/4 opacity-10">
                            <BookOpen className="w-64 h-64" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-6">
                                <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md border border-white/20 flex items-center">
                                    <BookOpen className="w-4 h-4 mr-2" /> 魔法の言葉
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                                AI開発 用語辞典（五十音順）
                            </h1>
                            <p className="text-green-100 font-medium text-lg max-w-2xl">
                                AIとの会話や、開発の途中で「これってどういう意味？」と迷ったときに引く、非エンジニアのためのわかりやすい翻訳辞書です。
                            </p>
                        </div>
                    </div>

                    <div className="p-8 sm:p-12 bg-gray-50/50">
                        {/* 凡例・案内 */}
                        <div className="flex items-center p-4 bg-white rounded-xl border border-gray-200 mb-10 shadow-sm">
                            <Star className="w-5 h-5 text-yellow-500 mr-2 shrink-0" fill="currentColor" />
                            <p className="text-sm font-bold text-gray-700 m-0">
                                マークがついている用語は、AI開発で頻繁に登場する**超・重要用語**です。ここだけは覚えておきましょう！
                            </p>
                        </div>

                        {/* 用語一覧（五十音ブロック） */}
                        <div className="space-y-16">
                            {glossaryData.map((group) => (
                                <section key={group.category} className="scroll-mt-6">
                                    <h2 className="text-2xl font-black text-green-800 border-b-2 border-green-200 pb-3 mb-6 flex items-center">
                                        <span className="bg-green-100 text-green-800 w-10 h-10 rounded-xl flex items-center justify-center mr-3 text-lg">
                                            {group.category.charAt(0)}
                                        </span>
                                        {group.category}
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                        {group.terms.map((term) => (
                                            <div
                                                key={term.name}
                                                className={`p-6 rounded-2xl border transition-all ${term.important
                                                        ? 'bg-yellow-50/50 border-yellow-200 shadow-[0_4px_20px_-4px_rgba(234,179,8,0.1)] hover:border-yellow-400'
                                                        : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-green-200'
                                                    }`}
                                            >
                                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                                                    {term.important && (
                                                        <Star className="w-5 h-5 text-yellow-500 mr-2 shrink-0" fill="currentColor" />
                                                    )}
                                                    <span className={term.important ? 'text-yellow-900' : ''}>
                                                        {term.name}
                                                    </span>
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed text-[15px]">
                                                    {term.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
