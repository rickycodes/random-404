/* global SpeechSynthesisUtterance XMLHttpRequest */
var loaded = function () {
    var json = 'http://www.reddit.com/r/wheredidthesodago/new/.json';
    var l = window.location;
    var $ = function (selector) { return document.querySelector(selector); };
    var synth = window.speechSynthesis || null;
    var words = decodeURIComponent(l['pathname'].replace(/[/.-]/g, ' ').substring(1)).split(' ');
    var tick = 0;
    var qs = (function (src) {
        var params = {};
        var qrystr = src.split('?')[1];
        if (qrystr) {
            qrystr.split('&').forEach(function (p, i) {
                var ps = p.replace(/\/$/, '').split('=');
                var k = ps[0].replace(/^\?/, '');
                params[k] = ps[1] || true;
            });
        }
        return params;
    })(l.search);
    var getSingle = function (arr) {
        var urls = arr.filter(function (v) { return (/imgur\b.*gif|gifv\b/.test(v.data.url)); }).map(function (v) { return v.data.url.replace(/gifv/, 'gif'); });
        return urls[Math.floor(urls.length * Math.random())];
    };
    var load = function (req) {
        if (req.status >= 200 && req.status < 400) {
            var res = JSON.parse(req.responseText);
            var url = getSingle(res.data.children);
            setBG(url);
        }
    };
    var getVoice = function (voice) {
        var voices = synth.getVoices();
        return (voice) ? voices.filter(function (v) { return v.name === decodeURIComponent(voice); })[0] : null;
    };
    var adjust = function (utter) {
        'pitch,rate,volume'.split(',').forEach(function (v) { return utter[v] = qs[v] || 1; }); // eslint-disable-line no-return-assign
        return utter;
    };
    var getUtter = function (str) {
        var utter = new SpeechSynthesisUtterance(str);
        utter.voice = getVoice(qs.voice);
        return adjust(utter);
    };
    var request = function (url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.addEventListener('load', function (event) { return load(req); });
        req.send();
    };
    var setBG = function (url) {
        var style = "background-image: url('" + url + "')";
        $('body').setAttribute('style', style);
        $('body').innerHTML = $('title').innerHTML = words.join(' ');
    };
    var next = function () {
        setTimeout(function () { return speak(words[++tick]); }, parseInt(qs.wordgap));
    };
    var speak = function (word) {
        if (!word)
            return;
        var utter = getUtter(word);
        utter.addEventListener('end', next);
        synth.speak(utter);
    };
    var changed = function () {
        (qs.wordgap) ? speak(words[tick]) : synth.speak(getUtter(words.join(' ')));
    };
    qs.lol ? setBG(qs.lol) : request(json);
    if (synth)
        synth.addEventListener('voiceschanged', changed);
};
document.addEventListener('DOMContentLoaded', loaded);
