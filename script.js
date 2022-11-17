const card = document.querySelectorAll(".cardItem")                 // grab all card
const image = document.querySelectorAll("img")                      // grab image
const resetBtn = document.querySelector("#resetButton")             // grab reset button
const nameBoard = document.querySelector(".nameBoard")              // grab input name element
const countDown = document.querySelector("#countdown")              // grab countdown timer
const inputBox = document.querySelector("#inputname")               // grab input text box
const submitBtn = document.querySelector("#submitBtn")              // grab submit button
const scoreBoard = document.querySelector("#scoreBoard")            // grab scoreboard panel
const scoreBoardBtn = document.querySelector("#showScore")          // grab scoreboard button
const showNameHere = document.querySelector("#showNameHere")
const showTimeHere = document.querySelector("#showTimeHere")


let firstCard, secondCard   // Create card for matching card
let Flipped = false         // For checking that is the card is flipped?
let countCorrect = 0        // For check that is game over?
let fixBug = false          // For not allow to flip card before the 2 card is unflip

// Shuffle the card order
function shuffle() {
    card.forEach(card => {
        let random = Math.floor(Math.random() * 12)
        card.style.order = random
    })
}
shuffle()

// For flip card function
function flipCard() {
    if (fixBug) return

    if (this === firstCard) return

    this.classList.add("flipCard")
    if (!Flipped) {
        firstCard = this
        Flipped = true
    } else {
        secondCard = this
        Flipped = false
        checking()
    }
}

// Check for Match
function checking() {
    // The cards is matched
    if (firstCard.dataset.picno === secondCard.dataset.picno) {
        firstCard.removeEventListener("click", flipCard)
        secondCard.removeEventListener("click", flipCard)
        console.log(countCorrect)
        countCorrect++

        // Display the alert
        setTimeout(() => {
            if (countCorrect === 4) {
                nameAppear()
            }
        }, 1500)

    } else {
        // The cards is not matched
        fixBug = true
        setTimeout(() => {
            firstCard.classList.remove("flipCard")
            secondCard.classList.remove("flipCard")

            fixBug = false
        }, 1000)
    }
}

// Display input nameboard
function nameAppear() {
    nameBoard.style.display = "flex"
}


// Scoreboard
scoreBoardBtn.addEventListener ("click", scoreBoardAppear)


function scoreBoardAppear () {
    scoreBoard.style.display = "flex"
    // location.reload()
}

// Make the card clickable from the function flipcard
card.forEach((item) => {
    item.addEventListener("click", flipCard)
})

// Reset Button
resetBtn.addEventListener("click", () => {
    card.forEach((card) => {
        card.classList.remove("flipCard")
        card.addEventListener("click", flipCard)
        Flipped = false
        fixBug = false
        countCorrect = 0
        firstCard = null
        secondCard = null
        shuffle()
        nameBoard.style.display = "none"
        // clearTimeout(timerCountdown);
        location.reload()
    })
    console.log("hi")
})

// Timer
const startingMins = 2

let time = startingMins * 60

let timerCountdown = setInterval(updateCountdown, 1000)

function updateCountdown() {
    if (countCorrect === 4) {
        stopTimer ()
    }
    else {
       timer ()
    }
}

function timer () {
    const minutes = Math.floor(time / 60)
    let second = time % 60
    if (minutes < 0 && second < 0) {
        // alert ("Time ups!!")
        return
    }
    else {
        second = second < 10 ? "0" + second : second
        countDown.innerHTML = `0${minutes} : ${second}`
        time--
    }
}

let stopTime = ""

function stopTimer () {
    const minutes = Math.floor(time / 60)
    let second = time % 60
    stopTime = `0${minutes} : ${second}`
    console.log(stopTime)
    clearInterval (timerCountdown)
    return 
}

// Local storage

submitBtn.addEventListener ("click", function () {
    const name = inputBox.value
    console.log (name)
    scoreBoardAppear ()
    if (name) {
        localStorage.setItem(name, stopTime)
        location.reload()
    }
})

for (i = 0; i < localStorage.length; i++) {
    const names = localStorage.key(i)
    console.log(names)
    const values = localStorage.getItem(names)
    console.log(values)

    showNameHere.innerText(names)
    showTimeHere.innerHTML += `${values}<br>`
}

// localStorage.clear()