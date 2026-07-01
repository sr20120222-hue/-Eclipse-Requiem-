
let gameState = "title";
let playerName = "";
let storyIndex = 0;
let route = "neutral";

// ======================
// ストーリー本体
// ======================
let story = [
  {
    text: "黒い月が空に現れた日、世界は終わりを始めた。",
    choices: null
  },

  {
    text: "少女が現れる。「力を受け入れるか？」",
    choices: [
      { text: "受け入れる", route: "dark", next: 2 },
      { text: "拒否する", route: "light", next: 3 }
    ]
  },

  {
    text: "黒い炎が世界を焼き尽くす。あなたは“終焉”そのものになった。",
    choices: null
  },

  {
    text: "あなたは力を拒んだ。しかし守れるものは少なかった。",
    choices: null
  }
];

function setup() {
  createCanvas(800, 450);
  textAlign(CENTER);
}

function draw() {
  background(0);
  fill(255);

  // ======================
  // タイトル
  // ======================
  if (gameState === "title") {
    textSize(32);
    text("終焉ノ黙示録", width / 2, height / 2 - 30);
    textSize(16);
    text("― Eclipse Requiem ―", width / 2, height / 2);
    text("ENTERで開始", width / 2, height / 2 + 60);
  }

  // ======================
  // 名前入力
  // ======================
  else if (gameState === "name") {
    textSize(20);
    text("名を刻め", width / 2, height / 2 - 40);

    textSize(24);
    text(playerName + "_", width / 2, height / 2);

    textSize(12);
    text("ENTERで決定", width / 2, height / 2 + 60);
  }

  // ======================
  // ストーリー
  // ======================
  else if (gameState === "story") {

    let current = story[storyIndex];

    textSize(16);
    text(current.text, width / 2, height / 2);

    textSize(12);
    text("主人公：" + playerName, width / 2, 30);
    text("ルート：" + route, width / 2, 50);

    // 選択肢表示
    if (current.choices) {
      for (let i = 0; i < current.choices.length; i++) {
        text(
          (i + 1) + ": " + current.choices[i].text,
          width / 2,
          height / 2 + 60 + i * 25
        );
      }
    } else {
      text("ENTERで進む", width / 2, height / 2 + 80);
    }
  }
}

// ======================
// 入力
// ======================
function keyPressed() {

  // タイトル → 名前
  if (gameState === "title") {
    if (keyCode === ENTER) {
      gameState = "name";
    }
  }

  // 名前入力
  else if (gameState === "name") {
    if (keyCode === ENTER) {
      gameState = "story";
    }
    else if (keyCode === BACKSPACE) {
      playerName = playerName.slice(0, -1);
    }
    else {
      playerName += key;
    }
  }

  // ストーリー
  else if (gameState === "story") {

    let current = story[storyIndex];

    if (current.choices) {

      if (key === "1") choose(0);
      if (key === "2") choose(1);

    } else {
      if (keyCode === ENTER) {
        storyIndex++;
      }
    }
  }
}

// ======================
// 分岐処理
// ======================
function choose(index) {
  let choice = story[storyIndex].choices[index];

  route = choice.route;
  storyIndex = choice.next;
}
