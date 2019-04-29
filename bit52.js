module.exports.and52 = function(v1, v2) {
    const hi = 0x80000000;
    const low = 0x7fffffff;
    const hi1 = ~~(v1 / hi);
    const hi2 = ~~(v2 / hi);
    const low1 = v1 & low;
    const low2 = v2 & low;
    const h = hi1 & hi2;
    const l = low1 & low2;
    return h*hi + l;
}

module.exports.or52 = function(v1, v2) {
    const hi = 0x80000000;
    const low = 0x7fffffff;
    const hi1 = ~~(v1 / hi);
    const hi2 = ~~(v2 / hi);
    const low1 = v1 & low;
    const low2 = v2 & low;
    const h = hi1 | hi2;
    const l = low1 | low2;
    return h*hi + l;
}

module.exports.xor52 = function(v1, v2) {
    const hi = 0x80000000;
    const low = 0x7fffffff;
    const hi1 = ~~(v1 / hi);
    const hi2 = ~~(v2 / hi);
    const low1 = v1 & low;
    const low2 = v2 & low;
    const h = hi1 ^ hi2;
    const l = low1 ^ low2;
    return h*hi + l;
}

module.exports.not52 = function(v1) {
	const hi = 0x80000000;
	const low = 0x7fffffff;
	const hi1 = ~~(v1 / hi);
	const low1 = v1 & low;
	const h = ~hi1;
	const l = ~low1;
	return h*hi + l;
}

module.exports.ls52 = function(num, bits) {
    return num * Math.pow(2,bits);
}

module.exports.rs52 = function(num, bits) {
    return ~~(num / Math.pow(2,bits));
}

module.exports.frexp = function(arg) {
  arg = Number(arg);
  const result = [arg, 0];
  if (arg !== 0 && Number.isFinite(arg)) {
    const absArg = Math.abs(arg);
    const log2 = Math.log2 || function log2 (n) { return Math.log(n) * Math.LOG2E }
    let exp = Math.max(-1023, ~~(log2(absArg)) + 1);
    let x = absArg * Math.pow(2, -exp);
    while (x < 0.5) {
      x *= 2;
      exp--;
    }
    while (x >= 1) {
      x *= 0.5;
      exp++;
    }
    if (arg < 0) {
      x = -x;
    }
    result[0] = x;
    result[1] = exp;
  }
  return result;
}

module.exports.fmod = function(a, b) {
  return Number((a - (~~(a / b) * b)).toPrecision(8));
}

module.exports.to_ary = function(num, bits) {
	bits = bits === undefined
    ? Math.max(1, frexp(num)[1])
    : bits;
	let t = [];
  for (var i = bits - 1; bits >= 0; bits--) {
		t[b] = fmod(num, 2);
		num = ~~((num - t[b]) / 2);
  }
	return t;
}

module.exports.to_num = function(bits) {
	let t = 0;
  for (var i = 0; i < bits.length; i++) {
		t += bits[i]*Math.pow(2, bits.length-1-i);
  }
	return t;
}

module.exports.reverse = function(num, bits) {
	const ary = to_bits(num, bits);
	let tmp = [];
  for (var i = 0; i < ary.length; i++) {
    tmp.push(ary[ary.length-i-1]);
  }
	return to_num(tmp);
}
