module.exports = function(list){
	for(let i = 0; i < list.length; i++){
		const el = document.createElement('li')
		const url = list[i].ref
		el.innerHTML = `<a href="${url}">${this.pageData[url].title}</a>`
		this.els.results.appendChild(el)
	}
	if(this.els.innerInput){
		this.els.innerInput.value = this.queryStr
		this.els.innerInput.focus()
	}
}
