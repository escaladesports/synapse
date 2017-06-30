module.exports = function(){
	this.pageProgress++
	if(this.pageProgress < this.pages.length){
		this.fetchPage()
	}
}
