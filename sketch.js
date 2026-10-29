let walkSprite; // 儲存走路精靈圖。
let runSprite; // 儲存跑步精靈圖。
let characterX; // 儲存角色目前的水平位置。
let characterY; // 儲存角色目前的垂直位置。
let facingLeft = false; // 記錄角色是否面向左方。
const walkFrameCount = 16; // 依走路精靈圖實際排列的 16 格切分，避免同時顯示相鄰角色。
const runFrameCount = 11; // 設定跑步動畫的總影格數。
const frameDuration = 100; // 設定每張動畫影格顯示的毫秒數。
const moveSpeed = 4; // 設定角色每次繪圖移動的像素數。

function preload() { // 在畫面建立前載入角色精靈圖。
  walkSprite = loadImage("1/走/走.png"); // 載入走路動畫的橫向精靈圖。
  runSprite = loadImage("1/跑/跑.png"); // 載入跑步動畫的橫向精靈圖。
} // 結束精靈圖載入程序。

function setup() { // 設定全螢幕畫布與角色初始位置。
  createCanvas(windowWidth, windowHeight); // 建立符合視窗尺寸的畫布。
  imageMode(CENTER); // 讓精靈圖以指定座標作為中心點繪製。
  characterX = width / 2; // 將角色放在畫面水平中央。
  characterY = height / 2; // 將角色放在畫面垂直中央。
} // 結束畫布初始化程序。

function draw() { // 每一個動畫影格都執行一次繪圖與移動。
  background("#caf0f8"); // 使用指定的淺藍色清除畫面。

  const movingRight = keyIsDown(RIGHT_ARROW); // 判斷使用者是否按住右方向鍵。
  const movingLeft = keyIsDown(LEFT_ARROW); // 判斷使用者是否按住左方向鍵。
  const isMoving = movingRight || movingLeft; // 判斷角色目前是否正在移動。
  const sprite = isMoving ? runSprite : walkSprite; // 移動時使用跑步圖，停止時使用走路圖。
  const frameCount = isMoving ? runFrameCount : walkFrameCount; // 依動畫種類選擇總影格數。
  const frameWidth = sprite.width / frameCount; // 依精靈圖寬度計算單張影格寬度。
  const frameHeight = sprite.height; // 使用精靈圖高度作為單張影格高度。
  const frameIndex = floor(millis() / frameDuration) % frameCount; // 依經過時間循環取得目前影格。

  if (movingRight) { // 使用者按住右方向鍵時執行右移。
    characterX += moveSpeed; // 將角色往右移動指定像素。
    facingLeft = false; // 讓角色面向右方。
  } else if (movingLeft) { // 使用者按住左方向鍵時執行左移。
    characterX -= moveSpeed; // 將角色往左移動指定像素。
    facingLeft = true; // 讓角色面向左方。
  } // 結束方向鍵移動判斷。

  characterX = constrain(characterX, min(frameWidth / 2, width / 2), max(width - frameWidth / 2, width / 2)); // 將角色限制在畫布左右邊界內。

  push(); // 暫存繪圖狀態以便只翻轉角色圖像。
  translate(characterX, characterY); // 將繪圖原點移到角色目前的位置。
  scale(facingLeft ? -1 : 1, 1); // 面向左方時水平翻轉精靈圖。
  image(sprite, 0, 0, frameWidth, frameHeight, frameIndex * frameWidth, 0, frameWidth, frameHeight); // 擷取並繪製精靈圖中的目前影格。
  pop(); // 還原繪圖狀態避免影響後續畫面。
} // 結束本影格的繪圖程序。

function windowResized() { // 瀏覽器視窗尺寸改變時重新調整畫布。
  const previousWidth = width; // 記錄縮放前的畫布寬度。
  const previousHeight = height; // 記錄縮放前的畫布高度。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個視窗。
  characterX = constrain(characterX * width / previousWidth, 0, width); // 依新舊寬度比例調整角色水平位置。
  characterY = constrain(characterY * height / previousHeight, 0, height); // 依新舊高度比例調整角色垂直位置。
} // 結束視窗尺寸調整程序。
