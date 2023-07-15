# ビルドステージ
FROM node:16-alpine as build-stage

# ワーキングディレクトリを設定
WORKDIR /app

# 依存関係のファイルをコピー
COPY package*.json ./

# パッケージをインストール
RUN npm install

# アプリケーションのソースをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# 実行ステージ
FROM node:16-alpine as run-stage

WORKDIR /app

# ビルド成果物と依存関係をコピー
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/node_modules ./node_modules

# 3000番ポートを開放
EXPOSE 3000

# Next.jsサーバーを起動
CMD ["npm", "run", "start"]
