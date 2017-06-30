module.exports = function(url, str){
	const doc = new DOMParser().parseFromString(str, 'text/html')
	const main = doc.querySelector(this.contentSelector)
	const links = doc.querySelectorAll('a')
	const title = doc.querySelector('title')
	for(let i = 0; i < links.length; i++){
		if(links.length >= this.maxDepth) break
		this.pages.push(links[i].href)
	}
	this.pageData[url] = {
		id: url
	}
	if(title){
		this.pageData[url].title = title.textContent
	}
	if(main){
		this.pageData[url].content = main.textContent
	}
}
