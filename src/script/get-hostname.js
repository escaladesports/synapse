module.exports = str => {
	// Remove protocol
	str = str.split('//')[1]

	// Remove path
	str = str.split('/')[0]

	// Remove www
	if(str.indexOf('www.') === 0){
		str = str.replace('www.', '')
	}
	
	return str
}
