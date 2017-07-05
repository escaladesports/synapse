module.exports = function(){
	if(this.injected === true) return this
	console.log('Injecting template...')
	const el = document.createElement('div')
	el.classList = 'synapse'
	el.innerHTML = `
		<div class="synapseClose">&#215;</div>
		<div class="synapseModal">
			<input class="synapseInput" type="text" />
			<ul class="synapseResults">
			</ul>
			<div class="loadMore">Load More</div>
			<div class="synapseLoader">
				<div class="synapseLoadAnim">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	`


	// Close on click
	el.addEventListener('click', e => {
		switch(e.target.className){
			case 'synapseClose':
			case 'synapse':
				this.close()
				break
		}
	}, false)

	// Close on escape key
	el.addEventListener('keyup', e => {
		if(e.keyCode === 27){
			this.close()
		}
	}, false)

	// Load more
	el.querySelector('.loadMore').addEventListener('click', e => {
		console.log('more...')
		this.pageProgress = 0
		this.fetchPage()
	}, false)

	this.els.container = el
	this.els.results = el.querySelector('.synapseResults')
	this.els.innerInput = el.querySelector('.synapseInput')

	this.els.innerInput.addEventListener('change', () => {
		this.search(this.els.innerInput.value)
	}, false)
	const body = document.getElementsByTagName('body')[0]
	if(body) body.appendChild(el)
	this.injected = true

	return this
}
