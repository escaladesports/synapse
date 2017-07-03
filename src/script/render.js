module.exports = function(list){
	console.log('Rendering results...')
	for(let i = 0; i < list.length; i++){
		const el = document.createElement('li')
		const url = list[i].ref
		el.innerHTML = `
			<a href="${url}">
				<span class="synapseTitle">${this.pageData[url].title}</span>
				<span class="synapseDesc">${this.pageData[url].description}</span>
			</a>
		`
		this.els.results.appendChild(el)
	}
	this.hideLoader()
	return this
}
