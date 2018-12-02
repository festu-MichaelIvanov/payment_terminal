function func(s, a, b) {

	if (!s.length) return -1;

    var aIndex = s.indexOf(a) !== 0 ? s.indexOf(a) : -1;
	var bIndex = s.indexOf(b) !== 0 ? s.indexOf(b) : -1;

    if(aIndex !== -1)
        return aIndex;
    else if(bIndex !== -1)
        return bIndex;
    else
        return -1;
}