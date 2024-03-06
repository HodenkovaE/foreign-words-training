'use strict'

const words = [
  { word: 'apple', translation: 'яблоко', example: 'Apple is low in calories' },
  { word: 'chiken', translation: 'курица', example: 'Chicken is a bird that is one of the most popular pets in the world' },
  { word: 'car', translation: 'машина', example: 'Cars are an essential part of many people’s lives nowadays' },
  { word: 'salt', translation: 'соль', example: 'Salt was once used as currency' },
  { word: 'mother', translation: 'мама', example: 'Mother is closest and dearest person' },
]

const card = document.querySelector('.flip-card')
card.addEventListener('click', function () {
  card.classList.toggle('active')
})

const cardFont = document.querySelector('#card-front h1')
const cardBack = document.querySelector('#card-back h1')
const cardBackExample = document.querySelector('#card-back span')
const buttonBack = document.querySelector('#back')
const buttonNext = document.querySelector('#next')
const buttonExam = document.querySelector('#exam')
const examCards = document.querySelector('#exam-cards')
const wordsProgress = document.querySelector('#words-progress')
const studyMode = document.querySelector('#study-mode')
const examMode = document.querySelector('#exam-mode')
const shuffleWords = document.querySelector('#shuffle-words')
const time = document.querySelector('#time')
const correctPercent = document.querySelector('#correct-percent')
const examProgress = document.querySelector('#exam-progress')

let current = document.querySelector('#current-word')

cardFont.textContent = words[0].word
cardBack.textContent = words[0].translation
cardBackExample.textContent = words[0].example
current.textContent = 1

const slideCount = words.length;
let slideIndex = 0;
buttonBack.addEventListener('click', showPreviousSlide);
buttonNext.addEventListener('click', showNextSlide);

shuffleWords.addEventListener('click', function () {
  words.sort(()=>Math.random()-0.5)
  cardFont.textContent = words[slideIndex].word
  cardBack.textContent = words[slideIndex].translation
  cardBackExample.textContent = words[slideIndex].example
});


function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  cardFont.textContent = words[slideIndex].word
  cardBack.textContent = words[slideIndex].translation
  cardBackExample.textContent = words[slideIndex].example
  current.textContent = slideIndex + 1
  wordsProgress.value = wordsProgress.value + 25

  if (current.textContent == 5) {
    buttonNext.disabled = true
  }
  if (current.textContent > 1) {
    buttonBack.disabled = false
  }
}

function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  cardFont.textContent = words[slideIndex].word
  cardBack.textContent = words[slideIndex].translation
  current.textContent = current.textContent - 1
  cardBackExample.textContent = words[slideIndex].example
  wordsProgress.value = wordsProgress.value - 25

  if (current.textContent < 5) {
    buttonNext.disabled = false
  }
  if (current.textContent == 1) {
    buttonBack.disabled = true
  }
}


function format(val) {
  if (val < 10) {
    return `0${val}`
  }
  return val;
}

let sec = 0
let min = 0
time.textContent = `${format(min)}:${format(sec)}`



function makeExamCard(key) {
  const item = document.createElement("span");
  item.classList.add('card');
  item.textContent = key;
  examCards.append(item)
};


buttonExam.addEventListener('click', function () {
  card.classList.add('hidden')
  buttonExam.classList.add('hidden')
  buttonNext.classList.add('hidden')
  buttonBack.classList.add('hidden')
  studyMode.classList.add('hidden')
  examMode.classList.remove('hidden')

   let timeId = setInterval(() => {
    sec++

    if (sec == 60) {
      min++
      sec = 0
    }
    time.textContent = `${format(min)}:${format(sec)}`

  }, 1000)

  words.forEach((tag) => {
    makeExamCard(tag.word)
    makeExamCard(tag.translation)
  });

  const divs = examCards.children;
  const frag = document.createDocumentFragment();
  while (divs.length) {
    frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
  }
  examCards.appendChild(frag);
})


let element = null
let firstClick = null
let word = 0
correctPercent.textContent = `${word}%`

examCards.addEventListener('click', function (event) {
  if (event.target && event.target.tagName == "SPAN") {
    const currentCard = event.target;

    if (element) {
      const secondClick = words.find((item) => {
        if (item.word === currentCard.textContent || item.translation === currentCard.textContent) {
          return true;
        }
      })
      if (firstClick === secondClick) {
        currentCard.classList.add('correct')
        element.classList.add('fade-out')
        element = null;
        currentCard.classList.add('fade-out')
        examProgress.value = examProgress.value + 20
        word = word + 20
        correctPercent.textContent = `${word}%`
      }

      if (firstClick !== secondClick) {
        currentCard.classList.add('wrong')
        function deleteSelection() {
          element.classList.remove('correct')
          element = null;
          currentCard.classList.remove('wrong')
        }
        setTimeout(deleteSelection, 500);
      }

      if(correctPercent.textContent==='100%') {
        function showNotification() {
          alert('Вы успешно прошли тестирование')
        }
        setTimeout(showNotification, 300);

      }

    }

    else {
      currentCard.classList.add('correct')
      element = currentCard;

      firstClick = words.find((item) => {
        if (item.word === currentCard.textContent || item.translation === currentCard.textContent) {
          return true;
        }
      })
    }

  }
})




