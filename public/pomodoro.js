// 必要な要素を取得（スタートボタンと描画用のキャンバス）
const startButton = document.getElementById("startButton");
const tomatoCanvas = document.getElementById("tomatoCanvas");
const context = tomatoCanvas.getContext("2d");

// タイマー関連の設定
let timer = 25 * 60; // 初期設定で25分を秒に変換した値（25分 = 1500秒）
let intervalId; // タイマーの間隔を管理する変数
let isRunning = false; // タイマーが動作中かどうかを記録

// リンゴのデータ（座標の配列として管理）
const apples = [];

// 木を描画する関数
function drawTree() {
  // キャンバスの内容をクリア（以前の描画を消去）
  context.clearRect(0, 0, tomatoCanvas.width, tomatoCanvas.height);

  // 木の幹を描画（中央に短めの茶色の四角形を描く）
  context.fillStyle = "saddlebrown";
  const trunkHeight = 100; // 幹の高さを定義
  context.fillRect(tomatoCanvas.width / 2 - 15, tomatoCanvas.height - trunkHeight, 30, trunkHeight);

  // 木の葉を描画（楕円形を3つ重ねることで自然な形状に）
  context.beginPath();
  context.ellipse(tomatoCanvas.width / 2, tomatoCanvas.height - trunkHeight - 80, 100, 100, Math.PI / 4, 0, Math.PI * 2);
  context.ellipse(tomatoCanvas.width / 2 - 50, tomatoCanvas.height - trunkHeight - 40, 80, 60, -Math.PI / 6, 0, Math.PI * 2);
  context.ellipse(tomatoCanvas.width / 2 + 50, tomatoCanvas.height - trunkHeight - 40, 80, 40, Math.PI / 6, 0, Math.PI * 2);
  context.fillStyle = "forestgreen"; // 深い緑色
  context.fill();

  // 葉のディテール（ランダムな位置に小さい緑の点を追加）
  for (let i = 0; i < 50; i++) {
    const x = tomatoCanvas.width / 2 + (Math.random() * 150 - 75);
    const y = tomatoCanvas.height - trunkHeight - 80 + (Math.random() * 120 - 60);
    const radius = Math.random() * 5 + 2;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = "green";
    context.fill();
  }
}

// リンゴを描画する関数（よりリアルなリンゴに近づける）
function drawApples() {
  for (const apple of apples) {
    context.beginPath();
    // 楕円形でリンゴの形を描画（x, y はリンゴの位置、幅と高さを設定）
    context.ellipse(apple.x, apple.y, 10, 12, 0, 0, Math.PI * 2); // 半径12x15の楕円形
    context.fillStyle = "red"; // リンゴの色
    context.fill();
    context.stroke(); // 輪郭を描く

    // へたを描画（上部に小さな線を描画）
    context.beginPath();
    context.moveTo(apple.x, apple.y - 15); // リンゴの上部中心
    context.lineTo(apple.x, apple.y - 25); // へたの先端
    context.lineWidth = 2; // 線の太さ
    context.strokeStyle = "saddlebrown"; // へたの色（茶色）
    context.stroke();

    // へたの葉を描画（小さな緑の三角形）
    context.beginPath();
    context.moveTo(apple.x - 5, apple.y - 25); // へたの左側
    context.lineTo(apple.x + 5, apple.y - 25); // へたの右側
    context.lineTo(apple.x, apple.y - 35); // へたの先端
    context.closePath();
    context.fillStyle = "green"; // 葉の色
    context.fill();
  }
}

// 新しいリンゴを木に追加する関数
function addApple() {
  // ランダムな位置にリンゴを配置（葉のエリア内）
  const x = tomatoCanvas.width / 2 + (Math.random() * 80 - 40);
  const y = tomatoCanvas.height - 180 + (Math.random() * 80 - 40);
  apples.push({ x, y }); // 配列にリンゴの座標を追加
}

// 時間を「分:秒」形式で表示する関数
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60); // 分を計算
  const remainingSeconds = seconds % 60; // 残りの秒を計算
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`; // 2桁で表示
}

// やる気を阻害するアラートメッセージの配列
const discouragingMessages = [
  "もうやめたら？",
  "集中力が足りないんじゃない？",
  "他の人ならもっと早く終わってるよ。",
  "これで本当に大丈夫？",
  "頑張ってるつもり？",
  "やる気あるの？",
  "全然進んでないね。",
  "やめて遊んだほうが楽しいよ。",
  "こんなんで成功すると思ってるの？",
  "もう時間の無駄じゃない？"
];

// ランダムなアラートメッセージを取得する関数
function getRandomMessage() {
  const randomIndex = Math.floor(Math.random() * discouragingMessages.length);
  return discouragingMessages[randomIndex];
}

// カウントダウンを開始する関数
function startPomodoro() {
  if (isRunning) return; // タイマーが既に動作中なら何もしない
  isRunning = true;

  intervalId = setInterval(() => {
    timer -= 1; // 残り時間を1秒減らす

    // 1分ごとの処理
    if (timer % 60 === 0) {
      addApple(); // 新しいリンゴを追加
      const randomMessage = getRandomMessage(); // ランダムなメッセージを取得
      alert(randomMessage); // アラートを表示
    }

    // 残り時間が0になった場合の処理
    if (timer <= 0) {
      clearInterval(intervalId); // タイマーを停止
      isRunning = false;
      alert("ポモポモ！"); // ユーザーに終了を通知
      timer = 25 * 60; // タイマーをリセット
    }

    // ボタンに現在の残り時間を表示
    startButton.textContent = formatTime(timer);

    // 木とリンゴを再描画
    drawTree();
    drawApples();
  }, 1000); // 毎秒実行
}

// スタートボタンがクリックされたときにタイマーを開始
startButton.addEventListener("click", startPomodoro);

// キャンバスの初期設定（描画領域のサイズ）
tomatoCanvas.width = 300; // 幅300ピクセル
tomatoCanvas.height = 300; // 高さ300ピクセル

// 初期状態で木を描画
drawTree();
startButton.textContent = "スタート"; // ボタンの初期テキスト
