import { characterExplanations } from './explanations.js';
import { questions } from './questions.js';

// 現在の質問番号
let currentQuestion = 0;  
// 質問毎の得点を蓄積する連想配列
let characterCount = {
    "EI": 0,
    "SN": 0,
    "TF": 0,
    "JP": 0,
};
// 16の性格タイプの文字列
let resultCharacter = "";

// 質問を表示する関数。質問が全て終わったら結果を表示する。
function displayQuestion() {
    if (currentQuestion < questions.length) {
        const buttons = document.getElementsByTagName("button");
        for (let i = 0; i < 2; i++) {
            buttons[i].textContent = questions[currentQuestion].choices[i];
        }
    } else {
        document.getElementById("quizArea").style.display = "none";
        document.getElementById("result").style.display = "block";
        resultCharacter = getCharacter(characterCount);
        console.log(resultCharacter)
        let characterDetail = characterExplanations[resultCharacter];
        console.log(characterDetail)
        document.getElementById("resultText").textContent = `あなたの性格タイプは${characterDetail.title}（${resultCharacter}）です。あなたは${characterDetail.description}です。`;
    }
}

// 質問の回答を、質問毎の得点を蓄積する連想配列に格納する関数
function answer(choice) {
    characterCount[questions[currentQuestion].character] += choice;
    currentQuestion++;
    displayQuestion();
}

// 質問毎の得点を蓄積する連想配列から16の性格タイプの文字列を返す関数
function getCharacter(characterCount) {
    const characterOrder = ["EI", "SN", "TF", "JP"];
    let result = "";
    for (const key of characterOrder) {
        result += characterCount[key] > 0 ? Array.from(key)[0] : Array.from(key)[1];
    }
    return result;
}

// リセットボタン用関数
function resetQuiz() {
    currentQuestion = 0;
    resultCharacter = "";
    characterCount = {
        "EI": 0,
        "SN": 0,
        "TF": 0,
        "JP": 0,
    };
    document.getElementById("quizArea").style.display = "block";
    document.getElementById("result").style.display = "none";
    displayQuestion();
}

// 回答ボタンにイベントリスナーを設定、回答を格納する関数を呼び出す
const answerButtons = document.querySelectorAll('#quizArea button');
answerButtons.forEach(button => {
    button.addEventListener('click', function () {
        answer(parseInt(this.dataset.answer));
    });
});

// リセットボタンにイベントリスナーを設定
document.getElementById('retryButton').addEventListener('click', resetQuiz);

// 回答ボタンに質問を設定する関数を呼び出す - ページロードしたら最初の質問を表示
displayQuestion();