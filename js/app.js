document.querySelectorAll('.color').forEach(function (c) {
  c.addEventListener('click', function () {
    const color = this.dataset.color
    document.querySelector('body').style.backgroundColor = color
  })
})