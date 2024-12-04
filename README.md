![Apple-pomotimer](https://cdn.glitch.global/b1f148e8-57f3-4366-9049-0dcfc3e36928/apple-pomotimer.jpg?v=1733207361428)


# Service URL
https://apple-pomotimer.glitch.me

# Overview
- 通常のポモロードタイマーは25分5分休憩です。
- こちらのアプリでは1分経過後ランダムでやる気を阻害するアラートが表示されます
- 最悪なことにアラートのＯＫボタンを押さないと計測が再開されません。
- 本来のポモロードタイマーの機能の恩恵をまったく教授することのできないようになっています。

# Thoughts on service
Qiitaのアドベントカレンダーの企画の一つ[クソアプリ Advent Calendar 2024](https://qiita.com/advent-calendar/2024/kuso-app)に参加したいがために作成したアプリになります
クソアプリと思っていただけると幸いです。

# Target user
- Qiitaイベントを楽しみたい方。

# How to acquire users
- SNSでの情報発信
- Qiita記事作成

# Technology used
| カテゴリー        | 使用技術                                                                                                                 |  
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |  
| **フロントエンド** | HTML (Hypertext Markup Language)<br>CSS (Cascading Style Sheets)<br>JavaScript (JS)<br>JSON (JavaScript Object Notation) |  
| **バックエンド**   | Node.js (14.x)<br>Fastify (v4.21.0)<br>Handlebars (テンプレートエンジン)                                                |  
| **データベース**   | SQLite (ライブラリ: `sqlite`, `sqlite3`)                                                                                |  
| **Fastify プラグイン** | @fastify/view (テンプレートエンジン統合)<br>@fastify/static (静的ファイルの提供)<br>@fastify/formbody (フォームデータ処理) |  
| **開発環境**      | Glitch（ホスティングと開発プラットフォーム）                                                                             |  
| **インフラ**      | Glitch（サーバーを運営する環境）                                                                                          |  
| **依存管理**      | npm（Node.js パッケージマネージャー）                                                                                      |  
| **バージョン管理** | Git（Glitch のプロジェクト管理）                                                                                          |  


# Articles created for app development