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
const results = document.querySelector('.results-modal')

let current = document.querySelector('#current-word')

cardFont.textContent = words[0].word
cardBack.textContent = words[0].translation
cardBackExample.textContent = words[0].example

current.textContent = 1

const slideCount = words.length;
let slideIndex = 0;
buttonBack.addEventListener('click', showPreviousSlide);
buttonNext.addEventListener('click', showNextSlide);

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

sec = 0
min = 0
time.textContent = `${format(min)}:${format(sec)}`


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
    const element = document.createElement("span");
    const element1 = document.createElement("span");

    element.textContent = tag.word;
    element1.textContent = tag.translation;
    element.classList.add("card");
    element1.classList.add("card");
    examCards.append(element);
    examCards.append(element1);
  });

  const divs = examCards.children;
  const frag = document.createDocumentFragment();
  while (divs.length) {
    frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
  }
  examCards.appendChild(frag);
})


let element = null
let click = null
let word = 0
correctPercent.textContent = `${word}%`

examCards.addEventListener('click', function (event) {
  if (event.target && event.target.tagName == "SPAN") {
    const currentCard = event.target;

    if (element) {
      let click2 = words.find((item) => {
        if (item.word === currentCard.textContent || item.translation === currentCard.textContent) {
          return true;
        }
      })
      if (click === click2) {
        currentCard.classList.add('correct')
        element.classList.add('fade-out')
        element = null;
        currentCard.classList.add('fade-out')
        examProgress.value = examProgress.value + 20
        word = word + 20
        correctPercent.textContent = `${word}%`
      }

      if (click != click2) {
        currentCard.classList.add('wrong')
        function deleteSelection() {
          element.classList.remove('correct')
          element = null;
          currentCard.classList.remove('wrong')
        }
        setTimeout(deleteSelection, 500);
      }

      if(correctPercent.textContent=='100%') {
        function showNotification() {
          alert('Вы успешно прошли тестирование')
        }
        setTimeout(showNotification, 300);

      }

    }

    else {
      currentCard.classList.add('correct')
      element = currentCard;

      click = words.find((item) => {
        if (item.word === currentCard.textContent || item.translation === currentCard.textContent) {
          return true;
        }
      })
    }

  }
})




shuffleWords.addEventListener('click', function () {

})
 //не понимаю, как перемешивать карточки случайным образом, пробывала разными способам. пыталась найти в интернете, 
 //как поменять массив объектов местами, но такого не нашла. Так же новый пыталась создать массив и рандоировать уникальные числа, и подставляла их/







const template = document.querySelector('#word-stats')
function myCard(word, attemps) {
  const myCard = template.content.clonNode(true);
  myCard.querySelector('.word').textContent = word
  myCard.querySelector('.attemps').textContent = attemps
  return myCard
}
 //////не понимаю как с помощью template вставить статистику///




