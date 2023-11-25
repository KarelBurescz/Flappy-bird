class UI {
    constructor() {
        this.hole = document.getElementById('hole')
        this.block = document.getElementById('block')
        this.character = document.getElementById('character')
        this.characterTop = parseInt(window.getComputedStyle(this.character).getPropertyValue('top'));
        this.blockLeft = parseInt(window.getComputedStyle(this.block).getPropertyValue('left'));
        this.holeTop = parseInt(window.getComputedStyle(this.hole).getPropertyValue('top'));
        this.counter = document.getElementById('counter')
    }

    updateUI(model) {
        this.character.style.top = model.characterTop + 'px';
        this.counter.textContent = model.counter;
    }

    getBlockLeft() {
        return parseInt(window.getComputedStyle(this.block).getPropertyValue('left'));
    }

    getHoleTop() {
        return parseInt(window.getComputedStyle(this.hole).getPropertyValue('top'));
    }
}

class Model {
    constructor(ui) {
        this.jumping = 0;
        this.counter = 0;
        this.jumpCount = 0;
        this.dead = false;
        this.setCharacterTop(200);
        this.ui = ui
    }

    setCharacterTop(value) {
        this.characterTop = value;
        this.cTop = this.characterTop - 500;
    }

    getBlockLeft() {
        return this.ui.getBlockLeft()
    }

    getHoleTop() {
        return this.ui.getHoleTop()
    }
}


let myUi = new UI;
let myModel = new Model(myUi)

let start = true

myUi.hole.addEventListener('animationiteration', () => {

    let random = Math.random();
    let top = (random * 507);
    myUi.hole.style.top = (top) + 'px';
    myModel.counter++;
    myUi.updateUI(myModel);

});

setInterval(function () {
    // start = true

    // if(start === true) {
    //     myUi.character.style.transform = 'rotate(20deg)'
    // }

    if (myModel.jumping === 0) {
        myModel.characterTop += 3
        myUi.updateUI(myModel)
    }

    if (
        (myModel.characterTop > 670) ||
        (
            (myModel.getBlockLeft() < 20)
            && (myModel.getBlockLeft() > -50)
            && ((myModel.characterTop < myModel.getHoleTop()) ||
                (myModel.characterTop + 55 > myModel.getHoleTop() + 200))
        )
    ) {
        alert('game over ,score : ' + myModel.counter)
        myModel.setCharacterTop(100);
        myModel.counter = 0;
        myUi.updateUI(myModel)
    }

}, 10);

function jump() {
    // start = false
    myModel.jumping = 1;

    // if(start === false) {
    //     myUi.character.style.transform = 'rotate(-10deg)'
    // }

    let jumpInterval = setInterval(function () {

        if (myModel.characterTop > 6) {
            myModel.setCharacterTop(myModel.characterTop - 5);
            myUi.updateUI(myModel);
        }

        if (myModel.jumpCount > 20) {
            clearInterval(jumpInterval);
            myModel.jumping = 0;
            myModel.jumpCount = 0;
        }

        myModel.jumpCount++;

    }, 10)
}




// myUi.character.animate(
//     [
//         {top: `${myModel.setCharacterTop()}px`},
//         {top: `${window.innerHeight}px`},
//     ],
//     {
//         duration: 5000,
//         iteration: 1,
//     },
// );

// if(parseInt(myModel.setCharacterTop()) >= window.innerHeight) {
//     myModel.dead = true;
//     console.log(dead);
// }