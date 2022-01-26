const copyButton = document.querySelector('#copyButton')

copyButton.addEventListener('click', () => {
  const shortUrl = document.querySelector('#shortUrl').innerText
  navigator.clipboard.writeText(shortUrl)
})