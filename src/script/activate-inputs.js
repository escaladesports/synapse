import { add as addClass } from './class-list'
module.exports = function(el = document){
	const inputs = el.querySelectorAll('.synapseInput:not(.synapseProcessed)')
	for(let i = inputs.length; i--;){
		addClass(inputs[i], 'synapseProcessed')
		this.els.inputs.push(inputs[i])
	}
}
