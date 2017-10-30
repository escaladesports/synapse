import { add as addClass } from './class-list'
module.exports = function(el = document){

	const inputs = el.querySelectorAll('.synapseInput:not(.synapseProcessed)')
	for(let i = inputs.length; i--;){
		addClass(inputs[i], 'synapseProcessed')
		this.els.inputs.push(inputs[i])
		inputs[i].addEventListener('change', () => {
			this.search(inputs[i].value)
		}, false)
	}

	const toggle = el.querySelectorAll('.synapseToggle:not(.synapseProcessed)')
	for(let i = toggle.length; i--;){
		addClass(toggle[i], 'synapseProcessed')
		toggle[i].addEventListener('click', () => {
			this.clearSearch()
			this.inject()
			this.open()
			if (this.els.innerInput) {
				this.els.innerInput.value = ''
				this.els.innerInput.focus()
			}
		}, false)
	}

}
