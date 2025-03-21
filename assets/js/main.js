const basePath = window.location.pathname.includes('/practice/')
  ? '/practice/'
  : '/'

document.addEventListener('DOMContentLoaded', function () {
  fetch(basePath + 'components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data
    })
    .catch(error => console.error('Error loading header:', error))

  fetch(basePath + 'components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data
    })
    .catch(error => console.error('Error loading footer:', error))

  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    link.href = basePath + link.getAttribute('href')
  })

  document.querySelectorAll('script').forEach(script => {
    if (script.src) {
      script.src = basePath + script.getAttribute('src')
    }
  })
})
