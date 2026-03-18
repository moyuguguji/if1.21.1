function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPlayerSource(source) {
	if (!source) return false;
	return source.toString().startsWith('EntityDamageSource (class_3222')
}