const card = document.querySelectorAll(".cardItem")         // grab all card
const image = document.querySelectorAll("img")              // grab image
const resetBtn = document.querySelector("#resetButton")     // grab reset button
const nameBoard = document.querySelector(".nameBoard")      // grab input name element
const countDown = document.querySelector("#countdown")      // grab countdown timer

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
            if (countCorrect === 8) {
                nameAppear()
                alert("Well done")
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
        // Waiting for insert the reset timer
    })
    console.log("hi")
})

// add Timer
const startingMins = 2
let time = startingMins * 60

setInterval(updateCountdown, 1000)

function updateCountdown() {
    if (countCorrect === 8) {
        return `0${minutes} : ${second}`
    }
    else {
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
            console.log(time)
        }
    }
}

function saveName () {
    var getName = [
        {
            localName: document.querySelector("inputname").value,
            // localTime: 
        }
    ]
    localStorage.setItem("Name", JSON.stringify(getName))
}