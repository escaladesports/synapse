module.exports = function(url, str){
	const doc = new DOMParser().parseFromString(str, 'text/html')
	const main = doc.querySelector(this.contentSelector)
	const links = doc.querySelectorAll('a')
	for(let i = 0; i < links.length; i++){
		if(links.length >= this.maxDepth) break
		this.pages.push(links[i].href)
	}
	if(main){
		this.pageData[url] = main.textContent
	}
}
