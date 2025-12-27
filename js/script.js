// 游戏状态变量
let targetNumber;       // 要猜的随机数字
let attempts = 0;       // 当前猜测次数
const maxAttempts = null; // 不限制次数

// 获取 DOM 元素
const guessInput = document.getElementById('guessInput');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');
const attemptsSpan = document.getElementById('attempts');
const restartBtn = document.getElementById('restartBtn');

// 初始化游戏
function initGame() {
    // 生成 1~100 的随机整数
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsSpan.textContent = attempts;
    messageDiv.textContent = '';
    messageDiv.className = 'message'; // 清空样式类
    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    guessInput.focus(); // 自动聚焦输入框
}

// 处理用户猜测
function handleGuess() {
    const guess = parseInt(guessInput.value.trim());

    // 输入验证
    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageDiv.textContent = '请输入 1 ~ 100 之间的有效数字！';
        messageDiv.className = 'message';
        return;
    }

    attempts++;
    attemptsSpan.textContent = attempts;

    if (guess > targetNumber) {
        messageDiv.textContent = '猜大了！';
        messageDiv.className = 'message too-high';
    } else if (guess < targetNumber) {
        messageDiv.textContent = '猜小了！';
        messageDiv.className = 'message too-low';
    } else {
        messageDiv.textContent = `恭喜你猜对了！答案就是 ${targetNumber}，用了 ${attempts} 次！`;
        messageDiv.className = 'message success';
        // 猜对后禁用输入和提交按钮
        guessInput.disabled = true;
        submitBtn.disabled = true;
    }

    guessInput.value = '';
    guessInput.focus();
}

// 重新开始游戏
function restartGame() {
    initGame();
}

// 事件绑定
submitBtn.addEventListener('click', handleGuess);

restartBtn.addEventListener('click', restartGame);

// 允许按回车键提交猜测
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

// 页面加载完成后初始化游戏
window.addEventListener('load', initGame); 
