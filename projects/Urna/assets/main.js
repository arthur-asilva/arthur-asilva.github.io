const keys_container = document.querySelector('.numeric_container');
const keys_label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const candidates = {
    '10': {'name': 'Candidato 10', 'image': 'assets/images/1.jpeg'},
    '20': {'name': 'Candidato 20', 'image': 'assets/images/2.jpeg'},
    '30': {'name': 'Candidato 30', 'image': 'assets/images/3.jpeg'},
    '40': {'name': 'Candidato 40', 'image': 'assets/images/4.jpeg'},
    '50': {'name': 'Candidato 50', 'image': 'assets/images/5.jpeg'}
}
let current_vote = '';

if(localStorage.getItem('votes') == null){
    localStorage.setItem('votes', '{"blank": 0, "10": 0, "20": 0, "30": 0, "40": 0, "50": 0}');
}

for(let i=0; i<keys_label.length; i++){
    keys_container.innerHTML += `<button onclick="numericButton(this)" class="keys">${keys_label[i]}</button>`;
}

function numericButton(e){

    const audio = new Audio('assets/sounds/key_sound.mp3');
    audio.play();

    if(current_vote.length < 2){

        current_vote += e.innerText;
        const exist = Object.keys(candidates).includes(current_vote);
        document.querySelector('#vote_value').innerText = current_vote;
        
        if(exist){
            document.querySelector('#candidate_img').src = candidates[current_vote].image;
            document.querySelector('#candidate_name').innerText = candidates[current_vote].name;
        }

    }
}

function eraseCurrent(){
    current_vote = '';
    document.querySelector('#vote_value').innerText = current_vote;
    document.querySelector('#candidate_img').src = 'assets/images/default.png';
    document.querySelector('#candidate_name').innerText = '';
}

function blankVote(){
    let votes = JSON.parse(localStorage.getItem('votes'));
    votes.blank += 1;
    localStorage.setItem('votes', JSON.stringify(votes));

    setTimeout(function(){
        eraseCurrent();
    }, 1000);
}

function confirmVote(){
    
    const exist = Object.keys(candidates).includes(current_vote);

    if(exist){
        const audio = new Audio('assets/sounds/confirmation_sound.mp3');
        audio.play();

        let votes = JSON.parse(localStorage.getItem('votes'));
        votes[current_vote] += 1;
        localStorage.setItem('votes', JSON.stringify(votes));

        setTimeout(function(){
            eraseCurrent();
        }, 1000);
    }
}