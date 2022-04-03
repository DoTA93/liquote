document.querySelectorAll('.color').forEach(function (c) {
  c.addEventListener('click', function () {
    const color = this.dataset.color
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