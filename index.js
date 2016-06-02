/* global speak XMLHttpRequest */
(() => {
  const json = 'http://www.reddit.com/r/wheredidthesodago/new/.json'
  const l = window.location
  const s = l['pathname'].replace(/[/.-]/g, ' ').substring(1)
  const $ = (selector) => document.querySelector(selector)

  const qs = ((src) => {
    const params = {}
    const qrystr = src.split('?')[1]
    if (qrystr) {
      qrystr.split('&').forEach((p, i) => {
        const ps = p.replace(/\/$/, '').split('=')
        const k = ps[0].replace(/^\?/, '')
        params[k] = ps[1] || true
      })
    }
    return params
  })(l.search)

  const getSingle = (arr) => {
    const urls = arr.filter((v) => (/imgur\b.*gif|gifv\b/.test(v.data.url))).map((v) => v.data.url.replace(/gifv/, 'gif'))
    return urls[Math.floor(urls.length * Math.random())]
  }

  const load = (req) => {
    if (req.status >= 200 && req.status < 400) {
      const res = JSON.parse(req.responseText)
      const url = getSingle(res.data.children)
      setBG(url)
    }
  }

  const request = (url) => {
    const req = new XMLHttpRequest()
    req.open('GET', url, true)
    req.addEventListener('load', event => load(req))
    req.send()
  }

  const setBG = (url) => {
    const style = `background-image: url('${url}')`
    $('body').setAttribute('style', style)
    $('body').innerHTML = $('title').innerHTML = s
    speak(s, {pitch: qs.pitch, speed: qs.speed, amplitude: qs.amplitude, wordgap: qs.wordgap})
  }

  qs.lol ? setBG(qs.lol) : request(json)
})()
