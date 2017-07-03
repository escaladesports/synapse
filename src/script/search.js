module.exports = function(str){
	console.log('Searching ' + str)
	this.open()
	if(this.queryStr === str) return this
	this.clearSearch()
	this.inject()
	this.showLoader()
	this.queryStr = str
	if(this.els.innerInput){
		this.els.innerInput.value = this.queryStr
		this.els.innerInput.focus()
	}
	this.pageProgress = 0
	// Add URL if none exist yet
	if(!this.pages.length){
		this.pages[0] = this.url || document.location.href
	}
	return this.fetchPage()
}
