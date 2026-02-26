import os
import json
import random
import datetime
# import tweepy # 実際の運用時には tweepy をインストールして使用します。

# 環境変数からX (Twitter) APIのキーを取得
X_API_KEY = os.environ.get("X_API_KEY")
X_API_SECRET = os.environ.get("X_API_SECRET")
X_ACCESS_TOKEN = os.environ.get("X_ACCESS_TOKEN")
X_ACCESS_TOKEN_SECRET = os.environ.get("X_ACCESS_TOKEN_SECRET")

SNS_DIR = 'sns_output'
LOG_FILE = 'sns_posted_log.json'

def load_posted_log():
    try:
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception as e:
        print(f"Error loading log: {e}")
    return []

def save_posted_log(log):
    with open(LOG_FILE, 'w', encoding='utf-8') as f:
        json.write(f, log)

def get_unposted_files(posted_log):
    if not os.path.exists(SNS_DIR):
        print(f"SNS directory '{SNS_DIR}' not found.")
        return []

    all_files = [f for f in os.listdir(SNS_DIR) if f.endswith('.json')]
    unposted_files = [f for f in all_files if f not in posted_log]
    return unposted_files

def post_to_x(content):
    if not all([X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET]):
        print("【テストモード】 APIキーが設定されていないため、実際の投稿はスキップします。")
        print("-------------- 投稿内容 --------------")
        print(content)
        print("--------------------------------------")
        return True
    
    # 実際の運用ではTweepyなどを使用してAPIリクエストを送信します。
    # 例:
    # client = tweepy.Client(consumer_key=X_API_KEY, consumer_secret=X_API_SECRET, access_token=X_ACCESS_TOKEN, access_token_secret=X_ACCESS_TOKEN_SECRET)
    # response = client.create_tweet(text=content)
    # print(f"Successfully posted to X: {response.data}")
    return True

def main():
    print(f"[{datetime.datetime.now()}] SNS自動投稿バッチ開始")
    posted_log = load_posted_log()
    unposted_files = get_unposted_files(posted_log)

    if not unposted_files:
        print("未投稿の記事はありませんでした。")
        return

    # ランダムに1件選んで投稿（日次バッチで1日1件等）
    target_file = random.choice(unposted_files)
    file_path = os.path.join(SNS_DIR, target_file)

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # X投稿用のテキストを取得（1番目のバリエーションを使用）
    tweet_text = data['x_posts'][0]

    # バッチ処理として投稿
    print(f"Post Candidate: {target_file}")
    success = post_to_x(tweet_text)

    if success:
        posted_log.append(target_file)
        # 次回のためにログを更新
        with open(LOG_FILE, 'w', encoding='utf-8') as f:
            json.dump(posted_log, f, ensure_ascii=False, indent=2)
        print(f"投稿完了: {target_file} をログに追加しました。")

if __name__ == "__main__":
    main()
