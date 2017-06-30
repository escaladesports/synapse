module.exports = function(){
	this.results.length = 0
	if(this.els.results){
		this.els.results.innerHTML = ''
	}
	return this
}
