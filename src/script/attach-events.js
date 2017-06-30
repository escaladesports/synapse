

module.exports = function(){
	for(let i = this.els.inputs.length; i--;){
		const el = this.els.inputs[i]
		el.addEventListener('change', () => {
			this.search(el.value)
		}, false)
	}
	return this
}
