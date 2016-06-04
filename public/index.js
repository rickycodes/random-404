/* global SpeechSynthesisUtterance XMLHttpRequest */
(() => {
  const json = 'http://www.reddit.com/r/wheredidthesodago/new/.json'
  const l = window.location
  const s = decodeURIComponent(l['pathname'].replace(/[/.-]/g, ' ').substring(1))
  const $ = (selector) => document.querySelector(selector)
  const synth = window.speechSynthesis || null
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
    const voices = synth ? synth.getVoices() : null
    return (voice) ? voices.filter(v => v.name === voice)[0] : voices[0]
  }

  const adjust = (utter) => {
    'pitch,rate,volume'.split(',').map(v => utter[v] = qs[v] || 1) // eslint-disable-line no-return-assign
    return utter
  }

  const delayed = (words) => {
    const utter = getUtter(words[tick])
    synth.speak(utter)
    utter.onend = () => {
      if (tick < words.length - 1) {
        tick++
        window.setTimeout(delayed, qs.wordgap, words)
      }
    }
  }

  const getUtter = (str) => {
    const utter = new SpeechSynthesisUtterance(str)
    utter.voice = getVoice(qs.voice)
    adjust(utter)
    return utter
  }

  const speak = (str) => {
    if (!synth) return
    if (qs.wordgap) {
      return delayed(str.split(' '))
    }
    synth.speak(getUtter(str))
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
    speak(s)
  }

  qs.lol ? setBG(qs.lol) : request(json)
})()
