// =========================
// 終焉ノ黙示録
// Eclipse Requiem
// Part 1: 基盤システム
// =========================

let gameState = "title"; // title / name / story

let playerName = "";
let storyIndex = 0;

// 仮ストーリー（後で増える）
let storyText = [
  "黒い月が空に現れた日、世界は終わりを始めた。",
  "あなたは唯一、その異変に耐えた存在だった。",
  "――そして、“終焉因子”が覚醒する。"
];

function setup() {
  createCanvas(800, 450);
  textFont("monospace");
}

function draw() {
  background(0);

  if (gameState === "title") {
    drawTitle();
  } 
  else if (gameState === "name") {
    drawNameInput();
  } 
  else if (gameState === "story") {
    drawStory();
  }
}

// =========================
// タイトル画面
// =========================
function drawTitle() {
  fill(255);
  textAlign(CENTER);

  textSize(32);
  text("終焉ノ黙示録", width / 2, height / 2 - 40);

  textSize(16);
  text("― Eclipse Requiem ―", width / 2, height / 2);

  textSize(14);
  text("PRESS ENTER", width / 2, height / 2 + 60);
}

// =========================
// 名前入力
// =========================
function drawNameInput() {
  fill(255);
  textAlign(CENTER);

  textSize(20);
  text("―― 名を刻め ――", width / 2, height / 2 - 60);

  textSize(24);
  text(playerName + "_", width / 2, height / 2);

  textSize(12);
  text("ENTERで決定", width / 2, height / 2 + 60);
}

// =========================
// ストーリー表示
// =========================
function drawStory() {
  fill(255);
  textAlign(CENTER);

  textSize(16);

  let line = storyText[storyIndex] || "（未定義の運命）";

  text(line, width / 2, height / 2);

  textSize(12);
  text("クリック or ENTERで進む", width / 2, height / 2 + 80);

  textSize(14);
  text("主人公：" + playerName, width / 2, 30);
}

// =========================
// 入力処理
// =========================
function keyPressed() {

  // タイトル → 名前入力
  if (gameState === "title") {
    if (keyCode === ENTER) {
      gameState = "name";
    }
  }

  // 名前入力
  else if (gameState === "name") {

    if (keyCode === ENTER) {
      if (playerName.length > 0) {
        gameState = "story";
      }
    } 
    else if (keyCode === BACKSPACE) {
      playerName = playerName.slice(0, -1);
    } 
    else {
      playerName += key;
    }
  }

  // ストーリー進行
  else if (gameState === "story") {
    if (keyCode === ENTER) {
      storyIndex++;
    }
  }
}
