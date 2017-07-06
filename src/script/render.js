import { add as addClass } from './class-list'
module.exports = function(list){
	console.log('Rendering results...')
	if(!list.length){
		addClass(this.els.container, 'synapseNoResults')
	}
	else{
		for(let i = 0; i < list.length; i++){
			const el = document.createElement('li')
			const url = list[i].url
			el.innerHTML = `
				<a href="${list[i].url}">
					<span class="synapseTitle">${list[i].title}</span>
					<span class="synapseDesc">${list[i].description}</span>
				</a>
			`
			this.els.results.appendChild(el)
		}
	}
	this.hideLoader()
	return this
}
