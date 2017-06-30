module.exports = function(){
	this.els = {
		inputs: document.querySelectorAll('.search'),
		results: document.querySelector('.searchList')
	}
	return this
}
