module.exports = function(url, str){
	str = str.replace(regTag, '> ')
	const doc = new DOMParser().parseFromString(str, 'text/html')
	const main = doc.querySelector(this.contentSelector)
	const links = doc.querySelectorAll('a')
	const title = doc.querySelector('title')
	for(let i = 0; i < links.length; i++){
		if(this.maxDepth && this.pages.length >= this.maxDepth){
			break
		}
		let href = links[i].href
		if(this.replaceDomain){
			href = href.split('/')
			href.splice(0, 3)
			href = `${this.replaceDomain}${href.join('/')}`
		}
		if(this.pages.indexOf(href) === -1){
			this.pages.push(href)
		}
	}
	this.pageData[url] = {
		id: url
	}
	if(title){
		this.pageData[url].title = title.textContent
	}
	if(main){
		this.pageData[url].content = main.textContent.replace(regSpace, ' ')
	}
}
const regTag = />/g
const regSpace = /\s+/g
