/* global SpeechSynthesisUtterance XMLHttpRequest */
const loaded = () => {
  const json = 'http://www.reddit.com/r/wheredidthesodago/new/.json'
  const l = window.location
  const $ = (selector) => document.querySelector(selector)
  const synth = window.speechSynthesis || null
  const words = decodeURIComponent(l['pathname'].replace(/[/.-]/g, ' ').substring(1)).split(' ')

  let tick = 0

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
    const urls = arr.filter(v => (/imgur\b.*gif|gifv\b/.test(v.data.url))).map(v => v.data.url.replace(/gifv/, 'gif'))
    return urls[Math.floor(urls.length * Math.random())]
  }

  const load = (req) => {
    if (req.status >= 200 && req.status < 400) {
      const res = JSON.parse(req.responseText)
      const url = getSingle(res.data.children)
      setBG(url)
    }
  }

  const getVoice = (voice) => {
    const voices = synth.getVoices()
    return (voice) ? voices.filter(v => v.name === decodeURIComponent(voice))[0] : null
  }

  const adjust = (utter) => {
    'pitch,rate,volume'.split(',').forEach(v => utter[v] = qs[v] || 1) // eslint-disable-line no-return-assign
    return utter
  }

  const getUtter = (str) => {
    const utter = new SpeechSynthesisUtterance(str)
    utter.voice = getVoice(qs.voice)
    return adjust(utter)
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
    $('body').innerHTML = $('title').innerHTML = words.join(' ')
  }

  const next = () => {
    setTimeout(() => speak(words[++tick]), parseInt(qs.wordgap + '000'))
  }

  const speak = (word) => {
    if (!word) return
    const utter = getUtter(word)
    utter.addEventListener('end', next)
    synth.speak(utter)
  }

  const changed = () => {
    (qs.wordgap) ? speak(words[tick]) : synth.speak(getUtter(words.join(' ')))
  }

  qs.lol ? setBG(qs.lol) : request(json)
  if (synth) synth.addEventListener('voiceschanged', changed)
}

document.addEventListener('DOMContentLoaded', loaded)
