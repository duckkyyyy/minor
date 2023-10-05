"use strict";
//==========================================
const $ = document.querySelector.bind(document); // вместо квери селектор просто доллар везде

const quiz = $('.quiz');
const warning = $('.warning');
const btnNext = $('.quiz__next-btn');
let count = 0;
let userScore = 0;

if (typeof questions !== 'undefined' && questions.length > 0) {
    quiz.classList.remove('hidden');
    showQuestions(count);
}
else {
    warning.classList.remove('hidden');
}

btnNext.addEventListener('click', nextQuestion);

function showQuestions(index) {
    const title = $('.quiz__title');
    const list = $('.quiz__list');
    const total = $('.quiz__total');
    let progress = $('.quiz__progress-inner');

    title.innerHTML = `${questions[index].question}`; // questions - массив, индекс меняется, question - опр вопрос
    list.innerHTML = ``;
    questions[index].options.forEach(item => {
        const text = `<li class="quiz__option">${item}</li>`; // перебираем варианты ответа
        list.insertAdjacentHTML("beforeend", text) // надо вставить в список вопросов
    });
    const options = list.querySelectorAll('.quiz__option');
    options.forEach(item => item.setAttribute("onclick", "optionSelected(this)"));
      total.innerHTML = `${index + 1} из ${questions.length}`; //отображает на каком мы вопросе
      progress.style.width = `${Math.round(((index + 1) / questions.length) * 100)}%`; // значение прогресс бара

}

function optionSelected(answer) {
    const userAnswer = answer.textContent;
    const correctAnswer = questions[count].answer;
    const options = document.querySelectorAll('.quiz__option');
    const iconCorrect = "<span'>&#10004;</span>";
    const iconIncorrect = "<span'>&#9940;</span>";

    if(userAnswer == correctAnswer){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", iconCorrect);
    }
    else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", iconIncorrect);

        options.forEach(item => { // показывает какой правильный ответ
            if (item.textContent == correctAnswer) {
                setTimeout(() => {
                    item.classList.add("correct");
                    item.insertAdjacentHTML("beforeend", iconCorrect);
                }, 100);
            }
        });
    }
    options.forEach(item => item.classList.add("disabled"));
}


function nextQuestion() {
    const option = $('.quiz__option'); 
    const result = $('.result');
    const resultText = $('.result__text');

    if ((count + 1) == questions.length && option.classList.contains('disabled')){
        result.classList.remove('hidden');
        quiz.classList.add('hidden');
        resultText.innerHTML = `${userScore} из ${questions.length}`;
        return;
    }

    if (option.classList.contains('disabled')) {
        count++;
        showQuestions(count);
    }
    else {
        alert('Выбери один из вариантов!');
    }
}