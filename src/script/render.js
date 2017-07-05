module.exports = function(list){
	console.log(list)
	console.log('Rendering results...')
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
	this.hideLoader()
	return this
}
