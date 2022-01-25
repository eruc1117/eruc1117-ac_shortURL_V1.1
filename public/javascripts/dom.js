const copyButton = document.querySelector('#copyButton')

copyButton.addEventListener('click', () => {
  let shortUrl = document.querySelector('#shortUrl').innerText
  navigator.clipboard.writeText(shortUrl)
})