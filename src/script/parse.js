module.exports = function(data){
	const obj = {
		links: []
	}
	data = data.replace(regTag, '> ')
	const doc = new DOMParser().parseFromString(data, 'text/html')
	const main = doc.querySelector('body')
	const links = doc.querySelectorAll('a')
	const title = doc.querySelector('title')
	const description = doc.querySelector('meta[name="description"]')
	for(let i = 0; i < links.length; i++){
		let href = links[i].href
		if(href){
			obj.links.push(href)
		}
	}
	if(title){
		obj.title = title.textContent
	}
	if(main){
		obj.content = main.textContent.replace(regSpace, ' ')
	}
	if(description){
		obj.description = description.getAttribute('content')
	}
	return obj
}
const regTag = />/g
const regSpace = /\s+/g
