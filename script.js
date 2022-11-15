const card = document.querySelectorAll("#card")

function flipCard () {
    this.classList.toggle("flipCard")
}

card.forEach((item) => {
    item.addEventListener("click", flipCard)
})
