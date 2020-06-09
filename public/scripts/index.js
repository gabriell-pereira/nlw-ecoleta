const modal = document.querySelector("#modal")

const buttonSearch = document.querySelector("#page-home main a")

buttonSearch.addEventListener("click", () => { 
    modal.classList.remove("hide")
})

const close = document.querySelector("#modal .content .header a")

close.addEventListener("click", () => {
    modal.classList.add("hide")
})

