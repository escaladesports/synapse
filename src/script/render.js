module.exports = function(list){
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
	if(this.els.innerInput){
		this.els.innerInput.value = this.queryStr
		this.els.innerInput.focus()
	}
}
