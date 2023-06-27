# Semi Webアプリ　オープンキャンパス

**研究、大学について質問できるインタラクティブなChatアプリ**

- SPA にこだわってUX意識する
- シンプルでわかりやすいデザイン。モバイルファースト

## Todo

ヘッダーデザイン


## curls

```

curl --no-buffer -X POST -H "Content-Type: application/json" -d '{
  "prefecture": "愛媛県",
  "question": "観光スポットはありますか？"
}' http://localhost:4000/llama_chat


```
codespace＆local動作確認////