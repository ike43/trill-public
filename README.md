## 目次

- [概要](#概要)
- [技術スタック](#技術スタック)
- [開発準備](#開発準備)
- [開発モード](#開発モード)
- [本番モード](#本番モード)
- [アクセス情報](#アクセス情報)
- [ログイン情報](#ログイン情報)
- [備考](#備考)

## 概要

本プロジェクトは、バックエンドにGo・フロントエンドにTypeScriptを使用したアプリケーション開発の学習を目的としたプロジェクトです。  
ユーザ間で画像素材を販売・購入できるWebサービスをイメージして作成しています。

## 技術スタック

### バックエンド

- 言語: Golang
- フレームワーク: Echo
- ORM: GORM
- DB: MySQL

### フロントエンド

- 言語: TypeScript
- フレームワーク: Next.js (App Router)
- CSSフレームワーク: ChakraUI

## 開発準備

### バックエンド用`.env`ファイルの作成

```sh
cp backend/app/.env.local.example backend/app/.env.local
```

### フロントエンド用`.env`ファイルの作成

```sh
cp frontend/.env.local.example frontend/.env.local
```

## 開発モード

ローカルで開発する際に使用するモードです。

### ビルド

```sh
docker compose build
```

### 起動

#### サンプルデータで初期化して起動

```sh
SEEDING=true docker compose up -d
```

#### 通常起動

```sh
docker compose up -d
```

### 停止

```sh
docker compose down
```

## 本番モード

本番環境で使用するモードです。開発時に本番環境と同等の環境で動作確認したい時にも使用できます。

### ビルド

```sh
docker compose -f docker-compose.yml build
```

### 起動

```sh
docker compose -f docker-compose.yml up -d
```

### 停止

```sh
docker compose down
```

## アクセス情報

ローカル環境では http://trill.localhost でアクセスできます。

## ログイン情報

動作確認のため下記のサンプルユーザを用意しています。`SEEDING=true docker compose up -d`で起動するとサンプルユーザが作成されます。

| メールアドレス | パスワード |
| ---- | ---- |
| bob@example.com | uHrdx55u | 
| john@example.com | uHrdx55u | 
| alice@example.com | uHrdx55u | 
| emma@example.com | uHrdx55u | 

## 備考

- レスポンシブデザインには未対応です
