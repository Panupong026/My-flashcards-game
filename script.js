const card = document.querySelector("#card")
console.log(card)

function flipCard () {
    card.classList.toggle("flipCard")
    console.log(card.classList)
    console.log("FLIP!!")
}

card.addEventListener("click", flipCard)
