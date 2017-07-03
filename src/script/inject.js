module.exports = function(){
	if(this.injected === true) return this
	const el = document.createElement('div')
	el.classList = 'synapse'
	el.innerHTML = `
		<div class="synapseClose">&#215;</div>
		<div class="synapseModal">
			<input class="synapseInput" type="text" />
			<ul class='synapseResults'>
			</ul>
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
