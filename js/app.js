let color = '#3DC47E'
document.querySelectorAll('.color').forEach(function (c) {
  c.addEventListener('click', function () {
    color = this.dataset.color
    document.querySelector('body').style.backgroundColor = color
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