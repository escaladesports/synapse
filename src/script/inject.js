module.exports = function(){
	const el = document.createElement('div')
	el.classList = 'searchResults'
	el.innerHTML = `
		<ul class='searchList'>
		</ul>
	`
	const body = document.getElementsByTagName('body')[0]
	if(body) body.appendChild(el)
}
