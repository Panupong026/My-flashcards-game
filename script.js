const card = document.querySelector("#card")

function flipCard () {
    card.classList.toggle("flipCard")
}

card.forEach((item) => {
    item.addEventListener("click", flipCard)
})
