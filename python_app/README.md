## curl

```

curl --no-buffer -X POST -H "Content-Type: application/json" -d '{
  "bot_name": "faculty",
  "question": "どのような人材を目指していますか"
}' http://localhost:4000/llama_chat



// ソースノード
curl -X POST -H "Content-Type: application/json" -d '{
  "id": "8da4d957-d9e4-48f1-a2ff-ad717314f43a"
}' http://localhost:4000/chat_source_nodes


// 検証結果
curl -X POST -H "Content-Type: application/json" -d '{
  "id": "8da4d957-d9e4-48f1-a2ff-ad717314f43a",
  "query":"どのような人材を目指していますか 日本語で回答して"
}' http://localhost:4000/llama_evaluate
```

```
docker run -d -p 6379:6379 redis
```

redis memory check

```
cedis-cli: not found
```


