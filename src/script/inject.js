module.exports = function(){
	if(this.injected === true) return this
	const el = document.createElement('div')
	el.classList = 'search'
	el.innerHTML = `
		<div class="searchClose">&#215;</div>
		<div class="searchModal">
			<input class="searchInput" type="text" />
			<ul class='searchResults'>
			</ul>
		</div>
	`


	// Close events
	el.addEventListener('click', e => {
		switch(e.target.className){
			case 'searchClose':
			case 'search':
				this.close()
				break
		}
	}, false)

	this.els.results = el.querySelector('.searchResults')
	this.els.innerInput = el.querySelector('.searchInput')
	const body = document.getElementsByTagName('body')[0]
	if(body) body.appendChild(el)
	this.injected = true

	return this
}
