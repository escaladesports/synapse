module.exports = function(){
	this.pageProgress++
	// If minimum depth is hit, render
	if(this.pageProgress >= this.minDepth || this.pageProgress >= this.pages.length){
		this.query()
	}
	else if(this.pageProgress < this.pages.length){
		this.fetchPage()
	}
}
