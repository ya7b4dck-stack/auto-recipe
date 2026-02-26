import json
import os
from dotenv import load_dotenv
from google import genai

# 環境変数の読み込み
load_dotenv()

# APIキーの設定
API_KEY = os.environ.get("GEMINI_API_KEY")

if not API_KEY:
    print("Warning: GEMINI_API_KEY is not set in .env")
    client = None
else:
    client = genai.Client(api_key=API_KEY)


def generate_article(item):
    """
    Gemini APIを使用してマークダウン記事（AI指示書）を生成する
    """
    prompt = f"""
あなたはITが苦手な初心者向けの親切なシステムアドバイザーです。
以下の要件に基づいて、読者がそのままAIエージェントにコピペして投げれば動く「AIへのお願い（指示書）」をマークダウン形式で作成してください。専門用語（プロンプト、スクレイピング、リポジトリ、API等のカタカナ言葉）は極力使わず、誰が読んでもわかる日本語で解説してください。

# ユーザーの目的
職種: {item['job_role']}
達成したいこと: {item['simple_title']}

# 出力構成（マークダウン）
以下の構成で出力してください。Frontmatter（メタデータ）は不要です。

1. **これを作ると何が便利になるの？**
   - このツールを使うと、毎日の仕事がどれくらい楽になるかを、専門用語を使わずに小学生でもわかるレベルで簡潔に説明してください。
2. **使うために必要な準備**
   - このツールを使うために必要なアプリ（Pythonというプログラム実行用のソフトなど）のインストール方法を、専門用語を使わずに説明してください。
3. **AIへのお願い（指示文）のコピペ**
   - ここが一番重要です。読者がAIにそのまま投げるための指示文（コードブロック `prompt` ）を作成してください。
   - 指示文の中には、AIが迷わずツールを作れるように「どんな機能が必要か」「エラーが起きたらどうするか」などを詳細に含めてください。
4. **各AIツールでの使い方（操作手順）**
   - 対象AI: Cursor, Claude Code, Antigravity, OpenClaw
   - 各AIツールについて、「どこに上記の指示文を貼り付けるか」「どうやって実行するか」の**具体的な操作手順のみ**を簡潔に、個別の見出し（`### Cursorの場合` のような形式）で分けて解説してください。（AIツールの概要説明は不要です）
   - **非常に重要**:
     - `### Cursorの場合` の見出しの直下には、必ず `![Cursorの操作画面](/images/cursor-ui.png)` という画像をマークダウン形式で挿入してください。
     - `### Claude Codeの場合` の見出しの直下には、必ず `![Claude Codeの操作画面](/images/claude-ui.png)` という画像をマークダウン形式で挿入してください。
     - その後、具体的な操作手順（画面のどこを押し、どこにプロンプトを貼り付けて実行するか）を記述してください。
5. **出来上がったツールの動かし方**
   - AIが作成してくれたツールを、どうやって起動して使うのかの手順を説明してください。
6. **もっと便利にするためのおすすめ機能拡張（Skillsなど）**
   - 追加でいれると便利な機能を紹介してください。
   - 必ず「見ず知らずの人が作ったツールは危険な場合があるので、必ず名前を確認し、安全チェック（https://github.com/cisco-ai-defense/skill-scanner）を行ってから入れてください」という注意書きを含めてください。

※読者は「プログラミング言語」を全く理解していません。「プログラムはどう動いているか」の説明は一切不要です。
※AIツール自体の詳細な解説、一般的なセキュリティの注意点、一般的な用語解説は**別のガイド記事で説明するため不要**です。「これを作るための手順」だけに注力してください。
"""
    
    # APIキーがない場合はモックを返す
    if not client:
        return f"# Mock Article for {item['task_name']}\n\nAPI KEY not set. Please set GEMINI_API_KEY in .env."

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(f"Error generating content for {item['slug']}: {e}")
        return None

def main():
    # データの読み込み
    with open('master_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 出力ディレクトリの作成
    output_dir = 'output'
    os.makedirs(output_dir, exist_ok=True)
    
    for item in data:
        slug = item['slug']
        output_path = os.path.join(output_dir, f"{slug}.md")
        
        # すでに生成済みの場合はスキップ
        if os.path.exists(output_path):
            print(f"Skipping {slug}, already exists.")
            continue
            
        print(f"Generating article for: {slug}...")
        article_content = generate_article(item)
        
        if article_content:
            # フロントマターを追加して保存
            frontmatter = f"""---
title: "{item['simple_title']}（{item['job_role']}向け）"
slug: "{slug}"
ai_assistant: "{item['ai_assistant']}"
difficulty: "{item['difficulty']}"
estimated_time_min: {item['estimated_time_min']}
---
"""
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(frontmatter + "\n" + article_content)
            print(f"Saved {output_path}")

if __name__ == "__main__":
    main()
