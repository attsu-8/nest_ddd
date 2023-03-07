# これは何か？

ヘキサゴナルアーキテクチャとNestJSを組み合わせを検証するためのシステム

# 動作確認
## Installation

```bash
$ yarn install
```

## DB用のコンテナ立ち上げ

```bash
$ docker-compose --project-name nest_ddd -f docker-compose.db.yml up -d --build 
```

## Migration

```bash
$ yarn migration
```

## Seed

```bash
$ yarn seed
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
