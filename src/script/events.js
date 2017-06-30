module.exports = function(){
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
	this.els.results = el.querySelector('.searchResults')
	this.els.innerInput = el.querySelector('.searchInput')
	const body = document.getElementsByTagName('body')[0]
	if(body) body.appendChild(el)
	this.injected = true
}
