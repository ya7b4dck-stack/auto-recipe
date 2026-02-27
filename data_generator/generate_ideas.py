import os
import json
import google.generativeai as genai

# APIキーの設定
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    from dotenv import load_dotenv
    load_dotenv()
    api_key = os.environ.get("GEMINI_API_KEY")

genai.configure(api_key=api_key)

# 使用するモデルの設定
model = genai.GenerativeModel('gemini-2.5-flash')
MASTER_DATA_FILE = 'master_data.json'

def load_existing_data():
    if os.path.exists(MASTER_DATA_FILE):
        with open(MASTER_DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def generate_new_ideas(existing_data, num_ideas=3):
    # 既存のアイデア（重複を避けるための参考情報）
    existing_titles = [item['simple_title'] for item in existing_data]
    existing_list_str = "\\n".join([f"- {title}" for title in existing_titles])

    prompt = f"""
あなたは非エンジニア向けの業務効率化アドバイザーです。
プログラミング完全未経験の会社員でも、CursorやClaude CodeなどのAI開発エージェントを使えば簡単に作れる「業務効率化ツール」のアイデアを新しく {num_ideas} 件考えてください。

【条件】
1. 以下の既存のアイデアと重複しない、全く新しい切り口にしてください。
{existing_list_str}

2. ターゲット「job_role」は具体的で非エンジニアの職種（例：経理、ECサイト運営、カスタマーサポート、YouTuber等）にすること。
3. ユーザーの目的「simple_title」は、「プログラミング」という言葉を使わず、業務の何が楽になるのかが一目でわかる日本語タイトルにすること。
4. 出力は必ず以下のJSON配列形式のみを出力してください。バッククォート(```json)などのマークダウンは一切含めないでください。

[
  {{
    "slug": "英語のURLスラグ(例: ec-inventory-checker)",
    "job_role": "ターゲット職種",
    "tool_name": "使われそうな技術(例: Python + Pandas)",
    "ai_assistant": "Cursor または Claude Code または Antigravity",
    "difficulty": "初級 または 中級",
    "estimated_time_min": 10,
    "simple_title": "分かりやすいタイトル"
  }},
  ...
]
"""
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        # 万が一マークダウン付きで返ってきた場合の処理
        if text.startswith('```json'):
            text = text[7:]
        if text.endswith('```'):
            text = text[:-3]
            
        new_ideas = json.loads(text.strip())
        return new_ideas
    except Exception as e:
        print(f"Error generating ideas: {e}")
        return []

def main():
    print("既存のデータを読み込み中...")
    existing_data = load_existing_data()
    
    print("Geminiに新しいレシピのアイデアを考えさせています（3件）...")
    new_ideas = generate_new_ideas(existing_data, num_ideas=3)
    
    if new_ideas:
        print(f"{len(new_ideas)} 件の新しいアイデアが生成されました！")
        for idea in new_ideas:
            print(f"- {idea['simple_title']} ({idea['job_role']})")
            
        # データを結合して保存
        updated_data = existing_data + new_ideas
        with open(MASTER_DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(updated_data, f, ensure_ascii=False, indent=2)
        print(f"\\n{MASTER_DATA_FILE} に新しいアイデアを追記しました。")
        print("続けて `python generate.py` を実行すると記事が生成されます。")
    else:
        print("新しいアイデアの生成に失敗しました。")

if __name__ == "__main__":
    main()
