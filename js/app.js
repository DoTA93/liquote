let color = '#3DC47E'
let colorName = 'green'
document.querySelectorAll('.color').forEach(function (c) {
  c.addEventListener('click', function () {
    color = this.dataset.color
    colorName = this.dataset.name
    document.querySelector('body').style.backgroundColor = color
    document.querySelector('.button-bmc').setAttribute('class', `btn btn-primary button-bmc d-flex align-items-center ${colorName}`)
    document.querySelector('.button-cq').setAttribute('class', `btn btn-outline-primary button-cq d-flex align-items-center ${colorName}`)
  })
})

fetchQuote = (id) => {
  fetch('https://api.quotable.io/random')
    .then(data => data.json())
    .then(data => {
      console.log(document.querySelector(`.quote-${id}`))
      document.querySelector(`.quote-${id} .js-quote`).innerHTML = data.content
      document.querySelector(`.quote-${id} .js-author`).innerHTML = data.author
    })
    .catch(err => {
      console.log(err)
    })
}

fetchQuote(1)
fetchQuote(2)
fetchQuote(3)

const capture = () => {

  html2canvas(
    document.querySelector(".carousel-item.active"),
    {
      backgroundColor: color
    }
  ).then(canvas => {
    const canvasContainer = document.createElement('div')
    canvasContainer.setAttribute('class', 'canvas-container')
    canvasContainer.appendChild(canvas)
    canvasContainer.addEventListener('click', function (e) {
      canvasContainer.remove()
    })
    document.body.appendChild(canvasContainer)
    canvasContainer.classList.add('show')
  })
}

document.querySelector('.social-icons').addEventListener('click', function (e) {
  e.preventDefault()
  capture()
})