## Random 404

![wat](http://ricky.codes/i/deal-with-it.gif?v=lol)

A simple 404 page that uses the URL's `pathname` as input to generate a custom message.

## Features

* Dyanmic text-to-speech! (A slightly modified version of: https://github.com/kripken/speak.js)
* Control `pitch`, `speed`, `amplitude` and `wordgap` of speech via query parameters
* Random background fetched from: http://reddit.com/r/wheredidthesodago/ or bring your own resource via `lol` query parameter
* Complete disregard for sane coding practices

## Installation

Simply clone at the root of your site, configure your http daemon to use the newly created folder/files as your global 404 e.g.: `error_page 404 /404/index.html;`, _et voilà!_

## Examples

**stringy things:**
* http://ricky.codes/no/u
* http://ricky.codes/y/u/ಠ_ಠ
* http://ricky.codes/%7C%20(•%20◡•)%7C%20(❍ᴥ❍ʋ)
* http://ricky.codes/☁→❄→☃
* http://ricky.codes/🔥

**bring your own image:**
* http://ricky.codes/lol/butts/?lol=http://i1.wp.com/farm9.staticflickr.com/8342/8176438031_ea9d9980d6_z.jpg

**alter `speed`, `pitch` & `wordgap`:**
* http://ricky.codes/where/did/the/soda/go?speed=1&pitch=1&wordgap=20

## Notes

Paths will vary depending on environment.
