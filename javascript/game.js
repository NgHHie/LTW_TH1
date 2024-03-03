let availableQuesions = [];
let questions = [];
let jsonQuestions = 'https://nghhie.github.io/LTW_TH1/cauhoi/cauhoi.json';

fetch(jsonQuestions)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });



startGame = () => {
    availableQuesions = [...questions];
    hiencauhoi();
};

hiencauhoi = () => {
    let cauhoi = document.getElementById('cauhoi');
    // console.log(cauhoi);
    // console.log("so cau hoi:", availableQuesions.length);
    for(let i=0; i<40; i++) {
        if(i % 10 == 0) {
            let loai = document.createElement('h1');
            loai.classList.add('loai');
            if(i == 0) {
                loai.textContent = 'Nhóm 1: Câu hỏi đúng/sai'
                loai.id = 'loai1';
            }
            else if(i == 10) {
                loai.textContent = 'Nhóm 2: Chọn 1 trong 4 đáp án'
                loai.id = 'loai2';
            }
            else if(i == 20) {
                loai.textContent = 'Nhóm 3: Chọn nhiều đáp án'
                loai.id = 'loai3';
            }
            else {
                loai.textContent = 'Nhóm 4: Tự luận'
                loai.id = 'loai4';
            }
            cauhoi.appendChild(loai);
        }
        let container_hoitrl = document.createElement('div');
        container_hoitrl.classList.add('container-hoitrl');
        container_hoitrl.id = '_' + i;

        let stt = document.createElement('div');
        stt.classList.add('stt');
        stt.textContent = 'Câu ' + (i+1);
        container_hoitrl.appendChild(stt);

        let container_cauhoi = document.createElement('div');
        container_cauhoi.textContent = availableQuesions[i].question;
        container_cauhoi.classList.add('container-cauhoi');
        container_hoitrl.appendChild(container_cauhoi);

        for(let j=1; j<=4; j++) {
            if((i < 10 && j > 2) || (i >= 30)) break;
            let container_choice = document.createElement('div');
            container_choice.classList.add('choice');
            if(i >= 20 && i < 30) container_choice.classList.add('choice-3');
            container_choice.textContent = availableQuesions[i]['choice' + j];
            container_hoitrl.appendChild(container_choice);
        }
        if(i >= 30) {
            let container_choice = document.createElement('textarea');
            container_choice.classList.add('text-answer');
            container_choice.setAttribute('placeholder', 'Nhập câu trả lời...');
            container_hoitrl.appendChild(container_choice);
        }
        cauhoi.appendChild(container_hoitrl);
    }


    let trangthai = document.getElementById('trangthai');
    let blockDiv = document.createElement('div');
    blockDiv.id = 'blockDiv';
    for(let i=0; i<40; i++) {
        let block = document.createElement('span');
        block.classList.add('block');
        block.id = 'block' + (i+1);
        block.textContent = i + 1;
        block.style.background = 'white';
        blockDiv.appendChild(block);
    }
    trangthai.appendChild(blockDiv);

    let choice = Array.from(document.getElementsByClassName('choice'));
    // console.log('choice: ', choice);
    for(let i=0; i<choice.length; i++) {
        let x = choice[i];
        x.addEventListener('click', (e) => {
            let selectedChoice = e.target;
            let cauhoiId = parseInt(selectedChoice.parentElement.id.slice(1));
            let block = document.getElementById('block'+(cauhoiId+1));
            if(selectedChoice.classList.contains('pick')) {
                selectedChoice.classList.remove('pick');
                if(!selectedChoice.classList.contains('choice-3')) block.style.background = 'white';
                else {
                    let tmp = '#' + selectedChoice.parentElement.id + ' > div';
                    let child = document.querySelectorAll(tmp);
                    // console.log(child);
                    let pick = 0;
                    child.forEach((c) => {
                        if(c.classList.contains('pick')) pick = 1;
                    })
                    if(pick === 0) block.style.background = 'white';
                }
                // ansUser[parseInt(cauhoiId) + 1] = 0;
                return;
            }
            block.style.background = '#578fde';
            let selectedAnswer = i - cauhoiId * 4 + 1;
            // ansUser[parseInt(cauhoiId) + 1] = selectedAnswer;

            selectedChoice.classList.add('pick');
            choice.forEach((x) => {
                if(x != selectedChoice && x.classList.contains('pick') && x.parentElement.id == selectedChoice.parentElement.id
                    && !x.classList.contains('choice-3'))
                    x.classList.remove('pick');
            });

        });
    }
    let textanswer = Array.from(document.getElementsByClassName('text-answer'));
    // console.log(textanswer);
    for(let i=0; i<textanswer.length; i++) {
        let x = textanswer[i];
        x.addEventListener('input', (e) => {
            let cauhoiId = parseInt(x.parentElement.id.slice(1));
            let block = document.getElementById('block'+(cauhoiId+1));
            if(x.value.trim()) {  
                block.style.background = '#578fde';
            }
            else {
                block.style.background = 'white';
            }
        })
        
    }

    let arrBlocks = Array.from(document.getElementsByClassName('block'));
    arrBlocks.forEach((block) => {
        block.addEventListener('click', () => {
            let target = document.getElementById('_'+(parseInt(block.textContent) - 1));
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
    })

}

nopbai = () => {
    // let confirmed = confirm('Thời gian làm bài thi chưa hết, bạn có chắc chắn muốn nộp bài?');
    // if(!confirmed) return;
    // console.log(ansUser);
    // localStorage.setItem('answerofUser', JSON.stringify(ansUser));
    // return window.location.assign('../html/end.html');
    let arrBlocks = Array.from(document.getElementsByClassName('block'));
    for(let i=0; i<arrBlocks.length; i++) {
        let block = arrBlocks[i];
        if(block.style.background === 'white') {
            alert('Hãy trả lời hết các câu hỏi');
            return;
        }
    }
}

// window.addEventListener('resize', () => {
//     if(parseInt(window.innerWidth) > 600) 
        document.addEventListener('scroll', () => {
            let rightDiv = document.getElementById('action');
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            let leftDiv = document.getElementById('cauhoi');
            // console.log('right: ', rightDiv.style.top);
            // rightDiv.style.top = 0;
            // leftDiv.style.top = 0;
            // console.log(rightDiv.style.top);
            if(rightDiv.getBoundingClientRect().top < leftDiv.getBoundingClientRect().bottom) {
                rightDiv.style.top = (scrollTop-400) + 'px';
                if(rightDiv.style.top[0] == '-') rightDiv.style.top = '0px';
            }
            else {
                rightDiv.style.top = '0px';
            }
        });
    // else 
    //     document.removeEventListener('scroll', () => {
    //         let rightDiv = document.getElementById('action');
    //         let scrollTop = window.scrollY || document.documentElement.scrollTop;
    //         let leftDiv = document.getElementById('cauhoi');
    //         // console.log('right: ', rightDiv.style.top);
    //         // rightDiv.style.top = 0;
    //         // leftDiv.style.top = 0;
    //         console.log(rightDiv.style.top);
    //         rightDiv.style.top = (scrollTop-400) + 'px';
    //         if(rightDiv.style.top[0] == '-') rightDiv.style.top = '0px';
    //     });
// });

render = () => {
    let div = Array.from(document.getElementsByClassName('container'));
    div[0].style.display = 'flex';

    let distance = 1000 * 1000;
    // Cập nhật thời gian mỗi 1 giây
    let timer = setInterval(function() {
    
        // Tính toán thời gian còn lại
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        distance -= 1000;
        document.getElementById('countdown').innerHTML = minutes + ':' + seconds ;
        
        if (distance < -1000) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = 'Hết thời gian!';
            alert('Hết thời gian làm bài thi!');
            // localStorage.setItem('answerofUser', JSON.stringify(ansUser));
            // return window.location.assign('../end.html');
        }
    }, 1000);
}


