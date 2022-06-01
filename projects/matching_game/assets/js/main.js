const AVATARS_API = 'https://avatars.dicebear.com/api/bottts';

const main_DOM = document.querySelector('main .container');
const splash_screen = document.querySelector('.splash-screen');

const cards = {
              cards:[],
              urls:[],
              quantity: 0,
              selectedCards: [],
              matchs: 0
            }

const levels = {
                  width: [152, 100, 100, 70],
                  height: [230, 150, 100, 90],
                  quantity: [6, 12, 16, 20],
                  level: 0
                }

async function requestAvatar(fille_name){
  const response = await fetch(`${AVATARS_API}/${fille_name}.svg`);
  var data = await response;
  cards.urls.push(data.url);

  if(cards.urls.length == cards.quantity / 2){
    populate();
  }

}

function populate(){

  cards.urls = cards.urls.concat(cards.urls);
  cards.urls.sort(() => Math.random() - 0.5);

  for(let i=0; i<cards.urls.length; i++){
    const element = `<div class="card">
                      <img src="${cards.urls[i]}" class="front-card" />
                      <img src="assets/img/back_card.png" class="back-card" />
                    </div>`;
    main_DOM.innerHTML += element;
  }

  cards.cards = document.querySelectorAll('.card');

  cards.cards.forEach((card) => {
    card.addEventListener('click', flipCard);
    card.querySelectorAll('img')[0].style.width = levels.width[levels.level] + 'px';
    card.querySelectorAll('img')[1].style.width = levels.width[levels.level] + 'px';
    card.style.width = levels.width[levels.level] + 'px';
    card.style.height = levels.height[levels.level] + 'px';
  });

}

const init = () => {

  splash_screen.style.visibility = 'visible';
  splash_screen.style.opacity = 1;
  splash_screen.querySelector('h1').innerHTML = `${levels.level + 1}# STAGE`;

  setTimeout(function(){
    splash_screen.style.opacity = 0;
    splash_screen.style.visibility = 'hidden';
  }, 2000);

  main_DOM.innerHTML = "";

  cards.cards = [];
  cards.urls = [];
  cards.selectedCards = [];
  cards.matchs = 0;

  cards.quantity = levels.quantity[levels.level];

  for(let i=0; i<(cards.quantity/2); i++){
    requestAvatar(i);
  }

}

init();

function flipCard(){

  selectedCards = cards.selectedCards.length;

  if(selectedCards <= 1 && this != cards.selectedCards[0] && this != cards.selectedCards[1]){
    cards.selectedCards[selectedCards] = this;
    this.classList.add('flip');
  } else {
    checkAndDisableCard(cards.selectedCards[0], cards.selectedCards[1])
    cards.selectedCards = [];
  }

}

function checkAndDisableCard(first, second){

  const first_image = first.querySelector('img');
  const second_image = second.querySelector('img');

  if(first_image.src == second_image.src){

    cards.matchs += 1;
    first.removeEventListener('click', flipCard);
    second.removeEventListener('click', flipCard);

    first_image.classList.add('disableCard');
    second_image.classList.add('disableCard');

    checkNextLevel()

  } else {
    first.classList.remove('flip');
    second.classList.remove('flip');
  }

}

function checkNextLevel(){
  if(cards.matchs == cards.quantity/2 && levels.level < 3){
    levels.level += 1;
    init();
  }
  if(cards.matchs == 10){
    document.getElementById('restart').style.visibility = 'visible';
    splash_screen.style.visibility = 'visible';
    splash_screen.style.opacity = 1;
    splash_screen.querySelector('h1').innerHTML = 'CONGRATULATIONS!';
  }
}

document.getElementById('restart').addEventListener('click', function(){
  levels.level = 0;
  this.style.visibility = 'hidden';
  init();
});
