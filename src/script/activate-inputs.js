module.exports = function(el = document){
	const inputs = el.querySelectorAll('.searchInput:not(.searchProcessed)')
	console.log(inputs)
	for(let i = inputs.length; i--;){
		inputs[i].className += ' searchProcessed'
		this.els.inputs.push(inputs[i])
	}
}
