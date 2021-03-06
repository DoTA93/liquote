let color = '#3DC47E'
let colorName = 'green'
if (document.querySelectorAll('.color')) {
  document.querySelectorAll('.color').forEach(function (c) {
    c.addEventListener('click', function () {
      color = this.dataset.color
      colorName = this.dataset.name
      document.querySelector('body').setAttribute('class', colorName)
    })
  })
}

fetchQuote = (id) => {
  fetch('https://api.quotable.io/random')
    .then(data => data.json())
    .then(data => {
      document.querySelector(`.quote-${id} .js-quote`).innerHTML = data.content
      document.querySelector(`.quote-${id} .js-author`).innerHTML = data.author
    })
    .catch(err => {
      console.log(err)
    })
}
const quotesCarousel = document.getElementById('quotesCarousel')
if (quotesCarousel) {
  fetchQuote(1)
  fetchQuote(2)
  fetchQuote(3)
}

const capture = (selector) => {
  let windowWidth = window.innerWidth
  if (windowWidth > 500) windowWidth = 500
  console.log(windowWidth)
  html2canvas(
    document.querySelector(selector),
    {
      backgroundColor: color,
      width: 200,
      height: 200,
      scale: 5
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
    var link = document.createElement('a')
    link.download = 'liquote.png'
    link.href = canvas.toDataURL()
    link.click()
  })
}
const homeSocialIcons = document.querySelector('.home-social-icons')
if (homeSocialIcons) {

  document.querySelector('.home-social-icons').addEventListener('click', function (e) {
    e.preventDefault()

    // Get quote
    document.querySelector('.card-template').style.backgroundColor = color

    const quote = document.querySelector('.carousel-item.active .js-quote').innerHTML
    const author = document.querySelector('.carousel-item.active .js-author').innerHTML

    document.querySelector('.card-template .js-quote').innerHTML = quote
    document.querySelector('.card-template .js-author').innerHTML = author

    const jsQuote = document.querySelector('.card-template .js-quote')
    if (quote.length <= 90) {
      jsQuote.style.fontSize = '16px'
      jsQuote.style.lineHeight = '19.2px'
    } else if (quote.length > 90 && quote.length <= 138) {
      jsQuote.style.fontSize = '12.8px'
      jsQuote.style.lineHeight = '16px'
    } else if (quote.length > 138 && quote.length <= 200) {
      jsQuote.style.fontSize = '9.6px'
      jsQuote.style.lineHeight = '12.8px'
    }

    capture(".card-template")
  })
}

const socialIcons = document.querySelector('.social-icons')
if (socialIcons) {
  socialIcons.addEventListener('click', function (e) {
    e.preventDefault()
    // setup card template
    document.querySelector('.card-template').style.backgroundColor = color

    capture(".card-template")
  })
}


// custom quote
const createQuoteBtn = document.querySelector('.js-create-quote')

if (createQuoteBtn) {
  const picInput = document.getElementById('js-custom-pic')
  picInput.onchange = function (e) {
    const [file] = picInput.files
    if (file) {
      document.querySelector('.js-display-image').src = URL.createObjectURL(file)
      document.querySelector('.js-author-image').src = URL.createObjectURL(file)
    }
  }
  createQuoteBtn.addEventListener('click', function (e) {
    e.preventDefault()

    // get quote
    const quote = document.getElementById('js-custom-quote').value
    const author = document.getElementById('js-custom-author').value


    if (quote) {
      // set preview
      const jsQuote = document.querySelector('.card-template .js-quote')
      if (quote.length <= 90) {
        jsQuote.style.fontSize = '16px'
        jsQuote.style.lineHeight = '19.2px'
      } else if (quote.length > 90 && quote.length <= 138) {
        jsQuote.style.fontSize = '12.8px'
        jsQuote.style.lineHeight = '16px'
      } else if (quote.length > 138 && quote.length <= 200) {
        jsQuote.style.fontSize = '9.6px'
        jsQuote.style.lineHeight = '12.8px'
      } else {
        return alert('Maximum 200 characters allowed.')
      }

      document.querySelector('.js-display-quote').innerHTML = quote
      document.querySelector('.js-display-author').innerHTML = author || 'Anonymous'
      document.querySelector('.js-quote').innerHTML = quote
      document.querySelector('.js-author').innerHTML = author || 'Anonymous'
      document.getElementById('form-block').classList.add('d-none')
      document.getElementById('display-block').classList.remove('d-none')
    }


    // edit quote handler
    document.querySelector('.js-edit-quote').addEventListener('click', function (e) {
      e.preventDefault()
      document.getElementById('form-block').classList.remove('d-none')
      document.getElementById('display-block').classList.add('d-none')
    })
  })
}

if (document.querySelector('#js-custom-quote')) {
  document.querySelector('#js-custom-quote').onkeypress = function (e) {
    console.log()
    let remaining = 200 - e.target.value.length
    document.querySelector('.js-max-character').innerHTML = remaining
    if (remaining < 0) {
      return false
    }
  }
}