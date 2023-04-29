// ==UserScript==
// @name        Swiss Army Copy
// @namespace   Violentmonkey Scripts
// @description Formats copy output in multiple formats
// @match       *://*/*
// @grant       GM_setClipboard
// @version     0.9.0
// @author      oooooooo
// ==/UserScript==

(function () {
  'use strict'

  const amazonUrl = /(?<url>https?:\/\/(www\.)?amazon\.(.+?))\/(.+?)?dp\/(?<asin>[a-zA-Z0-9]+)/

  document.addEventListener('copy', (e) => {
    if (window.getSelection().toString() === '') {
      let url = document.location.href

      const match = amazonUrl.exec(url)
      if (match) {
        url = `${match.groups.url}/dp/${match.groups.asin}`
      }

      navigator.clipboard.writeText(`${document.title}\n${url}`)
    }
  })

  document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'm') {
      navigator.clipboard.writeText(`[${document.title}](${document.location.href})`)
    }

    if (event.ctrlKey && event.key === 'q') {
      const text = window.getSelection().toString()
      if (text !== '') {
        navigator.clipboard.writeText(text.split('\n').map(line => `> ${line}`).join('\n'))
      }
    }
  })
})()
