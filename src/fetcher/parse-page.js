function parsePage(text) {
	text = text.replace(regTag, '> ')
	let doc = new DOMParser()
		.parseFromString(text, 'text/html')

	let links = []
	let linkEls = doc.querySelectorAll('a')
	for (let i = 0; i < linkEls.length; i++) {
		let href = linkEls[i].href
		let str = linkEls[i].getAttribute('href')
		if (
			href &&
			str.charAt(0) !== '#' &&
			href.indexOf(this.origin) === 0 &&
			this.fetchedUrls.indexOf(href) === -1 &&
			this.urls.indexOf(href) === -1
		) {
			links.push(href)
		}
	}

	let titleEl = doc.querySelector(this.options.title)
	let title = ''
	if (titleEl) {
		title = titleEl.textContent
	}

	let contentEl = doc.querySelector(this.options.content)
	let content = ''
	if (contentEl) {
		content = contentEl.textContent.replace(regSpace, ' ')
	}

	let descriptionEl = doc.querySelector(this.options.description)
	let description = ''
	if (descriptionEl){
		description = descriptionEl.getAttribute('content') || descriptionEl.textContent
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