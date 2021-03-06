/**
 * @param  {String} n - number in range 0...999 in string
 * @return {String} number with leading zeros
 */
function zeropadTriad(n) {
    return (new Array(3 - n.length)).fill('0').join('') + n;
}

/**
 * @param  {Number} n
 * @return {Number[]} 0..999
 */
function splitOntoTriads(n) {
    var res = [];
    var i = 0;
    var n = Math.floor(Math.abs(n));
    do {
        res.unshift(n % 1e3);
        if (++i > 50) throw new Error('formatNumber: overcycle on val: ' + n);
    } while (n = Math.floor(n / 1e3));
    return res;
}

/**
 * @param {String|Number} ns - number or number in string
 * @param {Function} triadTmpl_ - e.g. triad => `<span>${triad}</span>`
 * @param {Function} numTmpl_ - e.g. num => `<div>${num}</div>`
 */
function formatNumber (ns, triadTmpl_, numTmpl_) {
    var n_ = typeof ns === 'string' ? ns : String(ns);
    if (n_.trim() === '') return '';
    var n = +n_;
    var tmpl = triadTmpl_ || function(n) { return '<span class="num__group">' + n + '</span>'; };
    var numTmpl = numTmpl_ || function(n) { return '<span class="num">' + n + '</span>'; };
    var triads = splitOntoTriads(n);
    var zeroPrefixedTriads = triads.slice(1).map(function(n) { return zeropadTriad(String(n)); });
    var html = [ String(triads[0]) ].concat( zeroPrefixedTriads ).map(tmpl).join('');

    var sign = n < 0 ? '-' : '';
    var hasFrac = /\./.test(n_);
    var frac = hasFrac ? n_.replace(/^.+\./, '.') : '';
    return numTmpl(sign + html + frac);
}

module.exports = formatNumber;
