import { add as addClass } from './class-list'
module.exports = function(el = document){
	const inputs = el.querySelectorAll('.searchInput:not(.searchProcessed)')
	for(let i = inputs.length; i--;){
		addClass(inputs[i], 'searchProcessed')
		this.els.inputs.push(inputs[i])
	}
}
