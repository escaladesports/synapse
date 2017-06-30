module.exports = function(str){
	console.log('searching ' + str)
	this.queryStr = str
	this.pageProgress = 0
	// Add URL if none exist yet
	if(!this.pages.length){
		this.pages[0] = this.url || document.location.href
	}
	return this.fetchPage()
}
