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


def generate_sns_materials(item):
    """
    Gemini APIを使用してSNS用素材（Xの投稿文とショート動画の台本）を生成する
    """
    prompt = f"""
あなたはSNSマーケティングのプロフェッショナルです。
以下の「非エンジニア向けAI活用レシピ」の内容を宣伝するための、「X（旧Twitter）用の投稿文」と、「YouTube Shorts / TikTok用の30秒動画の台本」を作成してください。

# 宣伝するレシピ情報
対象読者（職種）: {item['job_role']}
達成できること: {item['simple_title']}
使用するAI: {item['ai_assistant']}
難易度: {item['difficulty']}
予想所要時間: {item['estimated_time_min']}分

# 出力要件（以下の形式で出力してください）

## X（Twitter）用 投稿テキスト
- ターゲット（{item['job_role']}）が思わずクリックしたくなるような、煽りすぎないが魅力的な書き出しにしてください。
- 140字〜200字程度（日本語）。
- 画像を1枚添付する前提で書いてください。（例：「画像の手順通りにコピペするだけ👇」など）
- 末尾に以下のハッシュタグをつけてください。
  #AI活用 #{item['job_role']} #業務効率化 #ノーコード

## ショート動画（30秒）用 台本
- 動画の映像イメージ（テロップや画面の動き）と、ナレーション（読み上げ用テキスト）を分けて記述してください。
- 合計30秒（約150文字〜180文字のナレーション）に収まるテンポの良さを重視してください。
- 構成例：
  1. フック（0〜5秒）：視聴者の悩みに共感する（「〇〇で消耗してない？」）
  2. 解決策提示（5〜10秒）：AIアシスタント（{item['ai_assistant']}）を使えば数分で終わることを伝える。
  3. 証拠・実演イメージ（10〜25秒）：プロンプトをコピペしてツールが一瞬で完成するイメージ。
  4. CTA（25〜30秒）：プロンプトは当サイトの「一覧」からコピペできると誘導する。

※読者は「プログラミング言語」を全く理解していません。「コードが書けるようになる」という訴求ではなく、「プログラミング不要でツールだけ手に入る」というメリットを強調してください。
"""
    
    # APIキーがない場合はモックを返す
    if not client:
        return f"# Mock SNS Material for {item['task_name']}\n\nAPI KEY not set."

    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text
    except Exception as e:
        print(f"Error generating SNS content for {item['slug']}: {e}")
        return None

def main():
    # データの読み込み
    with open('master_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 出力ディレクトリの作成
    sns_output_dir = 'sns_output'
    os.makedirs(sns_output_dir, exist_ok=True)
    
    for item in data:
        slug = item['slug']
        output_path = os.path.join(sns_output_dir, f"{slug}_sns.md")
        
        # すでに生成済みの場合はスキップ
        if os.path.exists(output_path):
            print(f"Skipping {slug} SNS, already exists.")
            continue
            
        print(f"Generating SNS materials for: {slug}...")
        sns_content = generate_sns_materials(item)
        
        if sns_content:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(sns_content)
            print(f"Saved {output_path}")

if __name__ == "__main__":
    main()
