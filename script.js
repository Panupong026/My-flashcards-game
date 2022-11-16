const card = document.querySelectorAll(".cardItem")
const image = document.querySelectorAll("img")
const resetBtn = document.querySelector("#resetButton")


let firstCard, secondCard
let Flipped = false
let countCorrect = 0
let fixBug = false

function shuffle () {
    card.forEach(card => {
        let random = Math.floor(Math.random() * 12)
        card.style.order = random
    })
}
shuffle()


function flipCard () {
    if (fixBug) return

    if (this === firstCard) return

    this.classList.add("flipCard")
    if (!Flipped) {
        firstCard = this
        Flipped = true
    } else {
        secondCard = this
        Flipped = false
        checking ()
    }
}


// Check for Match
function checking () {
    // The cards is matched
    if (firstCard.dataset.picno === secondCard.dataset.picno) {
        firstCard.removeEventListener("click", flipCard)
        secondCard.removeEventListener("click", flipCard)
        
        countCorrect ++
        
        // Display the alert
        setTimeout (() => {
            if (countCorrect === 4) {
                    alert ("Well done")
                }
            }, 1500)
        
    } else {
        // The cards is not matched
        fixBug = true
        setTimeout (() => {
            firstCard.classList.remove("flipCard")
            secondCard.classList.remove("flipCard")
            
            fixBug = false
        }, 1000)
    }
}

card.forEach((item) => {
    item.addEventListener("click", flipCard)
})


// Reset Button
resetBtn.addEventListener ("click", () => {
    card.forEach((card) => {
        card.classList.remove("flipCard")
        card.addEventListener("click", flipCard)
        Flipped = false
        fixBug = false
        countCorrect = 0
        firstCard = null
        secondCard = null
    })
    console.log("hi")
})
