const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
// const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
// let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

let jsonQuestions = '../cauhoi/' + localStorage.getItem('currentSubject') + '.json';
let ansUser = JSON.parse(localStorage.getItem('answerofUser'));

fetch(jsonQuestions)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        scoring();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    // score = 0;
    availableQuesions = [...questions];
    // console.log(availableQuesions);

    hiencauhoi();
};

hiencauhoi = () => {
    let subject = document.getElementById('subject');
    subject.textContent = localStorage.getItem('nameExam');

    let cauhoi = document.getElementById('cauhoi');
    // console.log(cauhoi);
    // console.log("so cau hoi:", availableQuesions.length);
    for(let i=0; i<availableQuesions.length; i++) {
        let container_hoitrl = document.createElement('div');
        container_hoitrl.classList.add('container-hoitrl');
        container_hoitrl.classList.add('trldungorsai');
        container_hoitrl.id = i;

        let stt = document.createElement('div');
        stt.classList.add('stt');
        stt.textContent = 'Câu ' + (i+1);
        container_hoitrl.appendChild(stt);

        let container_cauhoi = document.createElement('div');
        container_cauhoi.textContent = availableQuesions[i].question;
        container_cauhoi.classList.add('container-cauhoi');
        container_hoitrl.appendChild(container_cauhoi);

        for(let j=1; j<=4; j++) {
            let container_choice = document.createElement('div');
            container_choice.classList.add('choice');
            container_choice.textContent = availableQuesions[i]['choice' + j];
            if(j==ansUser[i+1] && ansUser[i+1]!=availableQuesions[i].answer) {
                container_choice.classList.add('incorrect');
                container_hoitrl.classList.add('trlsai');
            }
            if(j==availableQuesions[i].answer && ansUser[i+1]!='0') {
                container_choice.classList.add('correct');
                if(ansUser[i+1]==availableQuesions[i].answer) container_hoitrl.classList.add('trldung');
            }
            container_hoitrl.appendChild(container_choice);
        }
        cauhoi.appendChild(container_hoitrl);
    }

    let trangthai = document.getElementById('trangthai');

    let blockDiv = document.createElement('div');
    blockDiv.id = 'blockDiv';
    for(let i=0; i<availableQuesions.length; i++) {
        let block = document.createElement('span');
        block.classList.add('block');
        block.id = 'block' + (i+1);
        block.textContent = i + 1;
        blockDiv.appendChild(block);
    }
    trangthai.appendChild(blockDiv);

    let arrBlocks = Array.from(document.getElementsByClassName('block'));
    arrBlocks.forEach((block) => {
        let target = document.getElementById(parseInt(block.textContent) - 1);
        block.addEventListener('click', () => {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        if(target.classList.contains('trldung')) block.classList.add('correct');
        else if(target.classList.contains('trlsai')) block.classList.add('incorrect');

    })
}

scoring = () => {
    availableQuesions = [...questions];
    console.log(availableQuesions);
    let score = 0;
    // console.log(listQuestions.length);
    for(let i=1; i<=availableQuesions.length; i++) {
        console.log(ansUser[i]);
        console.log(availableQuesions[i-1].answer);
        if(ansUser[i]===availableQuesions[i-1].answer) {
            // console.log(ansUser[i]);
            // console.log(listQuestions[i-1].answer);
            score ++;
        }
    }
    const finalScore = document.getElementById('finalScore');
    const finalCorrect = document.getElementById('finalCorrect');
    finalScore.innerText = (score / availableQuesions.length * 10).toFixed(2);
    finalCorrect.innerText = score ;
    startGame();
}

goGame = () => {
    window.location.assign('../html/game.html');
}

goHome = () => {
    window.location.assign('../html/luyentap.html');
}

document.addEventListener('scroll', function() {
    var rightDiv = document.getElementById('action');
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var leftDiv = document.getElementById('cauhoi');
    var leftDivBottom = leftDiv.getBoundingClientRect().bottom;
    var rightDivBottom = rightDiv.getBoundingClientRect().bottom;
    
    // console.log(leftDivBottom + ' ' + rightDivBottom);
    
    if (leftDivBottom > rightDivBottom) {
        rightDiv.style.top = (scrollTop) + 'px';
    }
});