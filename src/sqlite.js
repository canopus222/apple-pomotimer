// Utilities we need
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");

const dbFile = "./.data/choices.db";
const exists = fs.existsSync(dbFile);
let db;

/* 
We're using the sqlite wrapper so that we can make async / await connections
- https://www.npmjs.com/package/sqlite
*/
async function initDB() {
  try {
    db = await dbWrapper.open({
      filename: dbFile,
      driver: sqlite3.Database
    });

    // ポモロードカウント用のテーブルがない場合は作成する
    if (!exists) {
      // テーブル作成部分
      await db.run(
        "CREATE TABLE IF NOT EXISTS pomodoro_count (id INTEGER PRIMARY KEY, count INTEGER DEFAULT 0)"
      );

      // 初期データ挿入
      await db.run(
        "INSERT INTO pomodoro_count (id, count) VALUES (1, 0) ON CONFLICT(id) DO NOTHING"
      );
    }

    // 他のテーブル作成やデータ挿入処理
    if (!exists) {
      await db.run(
        "CREATE TABLE IF NOT EXISTS Choices (id INTEGER PRIMARY KEY AUTOINCREMENT, language TEXT, picks INTEGER)"
      );

      await db.run(
        "INSERT INTO Choices (language, picks) VALUES ('HTML', 0), ('JavaScript', 0), ('CSS', 0)"
      );

      await db.run(
        "CREATE TABLE IF NOT EXISTS Log (id INTEGER PRIMARY KEY AUTOINCREMENT, choice TEXT, time STRING)"
      );
    }
  } catch (dbError) {
    console.error("Database initialization failed:", dbError);
  }
}

// ポモロードのカウントを取得する関数
async function getPomodoroCount() {
  try {
    const result = await db.get("SELECT count FROM pomodoro_count WHERE id = 1");
    return result ? result.count : 0; // データがない場合は 0 を返す
  } catch (dbError) {
    console.error(dbError);
    return 0;
  }
}

// ポモロードのカウントをインクリメントする関数
async function incrementPomodoroCount() {
  try {
    // ポモロードカウントを1増やす
    await db.run("UPDATE pomodoro_count SET count = count + 1 WHERE id = 1");
    return await getPomodoroCount(); // 最新のカウントを返す
  } catch (dbError) {
    console.error(dbError);
    return 0;
  }
}

// データベースから投票のオプションを取得
async function getOptions() {
  try {
    return await db.all("SELECT * from Choices");
  } catch (dbError) {
    console.error(dbError);
    return [];
  }
}

// ユーザーの投票を処理する関数
async function processVote(vote) {
  try {
    const option = await db.all(
      "SELECT * from Choices WHERE language = ?",
      vote
    );
    if (option.length > 0) {
      await db.run("INSERT INTO Log (choice, time) VALUES (?, ?)", [
        vote,
        new Date().toISOString()
      ]);

      await db.run(
        "UPDATE Choices SET picks = picks + 1 WHERE language = ?",
        vote
      );
    }

    return await db.all("SELECT * from Choices");
  } catch (dbError) {
    console.error(dbError);
    return [];
  }
}

// ログを取得する関数
async function getLogs() {
  try {
    return await db.all("SELECT * from Log ORDER BY time DESC LIMIT 20");
  } catch (dbError) {
    console.error(dbError);
    return [];
  }
}

// ログを削除し、投票をリセットする関数
async function clearHistory() {
  try {
    await db.run("DELETE from Log");
    await db.run("UPDATE Choices SET picks = 0");
    return [];
  } catch (dbError) {
    console.error(dbError);
    return [];
  }
}

// モジュールとしてエクスポート
module.exports = {
  initDB,
  getOptions,
  processVote,
  getLogs,
  clearHistory,
  getPomodoroCount,
  incrementPomodoroCount
};

