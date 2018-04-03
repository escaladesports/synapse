function parsePage(text) {
	text = text.replace(regTag, '> ')
	let doc = new DOMParser()
		.parseFromString(text, 'text/html')

	let links = []
	let linkEls = doc.querySelectorAll('a')
	for (let i = 0; i < linkEls.length; i++) {
		let href = linkEls[i].getAttribute('href')
		if(!href || href.charAt(0) === '#') continue
		if(href.indexOf('http') === 0){
			if (href.indexOf(this.options.origin) !== 0){
				continue
			}
		}
		else{
			if(href.charAt(0) === '/'){
				href = href.substring(1)
			}
			href = `${this.options.origin}${href}`
		}
		if (
			this.fetchedUrls.indexOf(href) === -1 &&
			this.urls.indexOf(href) === -1 &&
			links.indexOf(href) === -1
		) {
			links.push(href)
		}
	}

	let titleEl = doc.querySelector(this.options.title)
	let title = ''
	if (titleEl) {
		title = titleEl.textContent
	}

	let descriptionEl = doc.querySelector(this.options.description)
	let description = ''
	if (descriptionEl){
		description = descriptionEl.getAttribute('content') || descriptionEl.textContent
	}

	let contentEl = doc.querySelector(this.options.content)
	let content = ''
	if (contentEl) {
		// Remove unwanted tags
		let tags = contentEl.querySelectorAll('script')
		for (let i = tags.length; i--;) {
			let tag = tags[i]
			tag.parentElement.removeChild(tag)
		}
		content = contentEl.textContent.replace(regSpace, ' ')
	}

	return {
		links,
		content,
		title,
		description,
	}
}

const regTag = />/g
const regSpace = /\s+/g

export default parsePage