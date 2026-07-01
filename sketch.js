
let gameState = "title";
let playerName = "";
let storyIndex = 0;

let route = "neutral";
let light = 0;
let dark = 0;

// ======================
// ストーリー（重厚版）
// ======================
let story = [
  {
    text: "――黒い月が空を裂いた日、世界は“終わりを思い出した”。",
    choices: null
  },

  {
    text: "少女が現れる。「あなたは“第十三因子”……まだ自覚していないのね」",
    choices: [
      { text: "力を受け入れる", route: "dark", light: 0, dark: +1, next: 2 },
      { text: "拒否する", route: "light", light: +1, dark: 0, next: 3 }
    ]
  },

  {
    text: "黒翼が背中を裂く。痛みは“祝福”へと変わった。",
    choices: [
      { text: "さらに深く力を解放する", route: "dark", light: -1, dark: +2, next: 4 },
      { text: "理性を保とうとする", route: "neutral", light: 0, dark: +1, next: 4 }
    ]
  },

  {
    text: "あなたは力を拒んだ。しかし世界はあなたを待ってはくれない。",
    choices: [
      { text: "それでも守る", route: "light", light: +2, dark: 0, next: 4 },
      { text: "逃げる", route: "neutral", light: 0, dark: 0, next: 4 }
    ]
  },

  {
    text: "ルナ『あなたの中の“黒い声”……もう抑えられないわね』",
    choices: [
      { text: "信じる", route: "bond", light: +1, dark: +1, next: 5 },
      { text: "疑う", route: "dark", light: 0, dark: +2, next: 5 }
    ]
  },

  {
    text: "――遠くで“虚人”の咆哮が響く。世界はもう、戻れない。",
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
    textSize(14);
    text("― Eclipse Requiem ―", width / 2, height / 2);
    text("ENTERで開始", width / 2, height / 2 + 60);
  }

  // ======================
  // 名前入力
  // ======================
  else if (gameState === "name") {
    textSize(20);
    text("名を刻め……", width / 2, height / 2 - 40);

    textSize(24);
    text(playerName + "_", width / 2, height / 2);

    textSize(12);
    text("ENTERで決定", width / 2, height / 2 + 60);
  }

  // ======================
  // ストーリー
  // ======================
  else if (gameState === "story") {

    let c = story[storyIndex];

    // 状態でセリフ変化（厚み）
    let prefix = "";
    if (dark > light) prefix = "【黒翼が囁く】 ";
    if (light > dark) prefix = "【記憶の声】 ";

    textSize(14);
    text(prefix + c.text, width / 2, height / 2);

    // UI
    textSize(12);
    text("主人公：" + playerName, width / 2, 30);
    text("光：" + light + " / 闇：" + dark, width / 2, 50);
    text("ルート：" + route, width / 2, 70);

    // 選択肢
    if (c.choices) {
      for (let i = 0; i < c.choices.length; i++) {
        text(
          (i + 1) + ": " + c.choices[i].text,
          width / 2,
          height / 2 + 70 + i * 25
        );
      }
    } else {
      text("ENTERで進む", width / 2, height / 2 + 90);
    }
  }
}

// ======================
// 入力
// ======================
function keyPressed() {

  if (gameState === "title" && keyCode === ENTER) {
    gameState = "name";
  }

  else if (gameState === "name") {
    if (keyCode === ENTER) {
      gameState = "story";
    } else if (keyCode === BACKSPACE) {
      playerName = playerName.slice(0, -1);
    } else {
      playerName += key;
    }
  }

  else if (gameState === "story") {
    let c = story[storyIndex];

    if (c.choices) {
      if (key === "1") choose(0);
      if (key === "2") choose(1);
    } else {
      if (keyCode === ENTER) storyIndex++;
    }
  }
}

// ======================
// 分岐処理
// ======================
function choose(i) {
  let c = story[storyIndex].choices[i];

  route = c.route;
  light += c.light;
  dark += c.dark;

  storyIndex = c.next;
}
