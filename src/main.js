/* eslint-disable prettier/prettier */
import './styles.css'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

// Detect if a link's href goes to the current page
function getSamePageAnchor(link) {
  if (
    link.protocol !== window.location.protocol ||
    link.host !== window.location.host ||
    link.pathname !== window.location.pathname ||
    link.search !== window.location.search
  ) {
    return false
  }

  return link.hash
}

// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
  const elem = hash ? document.querySelector(hash) : false
  if (elem) {
    if (e) e.preventDefault()
    gsap.to(window, { scrollTo: elem })
  }
}

// If a link's href is within the current page, scroll to it instead
document.querySelectorAll('a[href]').forEach((a) => {
  a.addEventListener('click', (e) => {
    scrollToHash(getSamePageAnchor(a), e)
  })
})

// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash)
