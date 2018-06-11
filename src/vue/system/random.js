export default () => {
	var random = '?' + Math.floor((Math.random() * ((777 + 1) - 55)) + 99999);
	return random;
}