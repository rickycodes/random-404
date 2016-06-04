## Random 404

![wat](http://ricky.codes/i/deal-with-it.gif?v=lol)

A simple 404 page that uses the URL's `pathname` as input to generate a custom message.

## Features

* Dyanmic text-to-speech via [SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)
* Control [`pitch (0-2)`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/pitch), [`rate (0.1-10)`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate), [`volume (0-1)`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/volume), [`voice (depends on OS)`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/voice), and `wordgap` (ms) of speech via query parameters
* Random background fetched from: http://reddit.com/r/wheredidthesodago/ or bring your own resource via `lol` query parameter
* Complete disregard for sane coding practices

## Installation

Simply configure your http daemon to use the two files in `/public` as your global 404 e.g.: `error_page 404 /404/index.html;`, _et voilà!_

## Examples

**stringy things:**
* http://ricky.codes/no/u
* http://ricky.codes/y/u/ಠ_ಠ
* http://ricky.codes/%7C%20(•%20◡•)%7C%20(❍ᴥ❍ʋ)
* http://ricky.codes/☁→❄→☃
* http://ricky.codes/🔥

**bring your own image:**
* http://ricky.codes/lol/butts/?lol=http://i1.wp.com/farm9.staticflickr.com/8342/8176438031_ea9d9980d6_z.jpg

**alter `pitch`, `rate` & `wordgap`:**
* http://ricky.codes/where/did/the/soda/go?rate=0.1&pitch=0.1&wordgap=100

## Notes

Paths will vary depending on environment.
