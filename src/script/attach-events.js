

module.exports = function(){
	
	// Close on click
	this.els.container.addEventListener('click', e => {
		switch(e.target.className){
			case 'synapseClose':
			case 'synapse':
				this.close()
				break
		}
	}, false)

	// Close on escape key
	this.els.container.addEventListener('keyup', e => {
		if(e.keyCode === 27){
			this.close()
		}
	}, false)

	// Load more
	this.els.container.querySelector('.synapseLoadMore').addEventListener('click', e => {
		console.log('more...')
		this.pageProgress++
		this.query()
	}, false)


	// Icon
	this.els.container.querySelector('svg').addEventListener('click', () => {
		this.search(this.els.innerInput.value)
	}, false)

	this.els.innerInput.addEventListener('change', () => {
		this.search(this.els.innerInput.value)
	}, false)
}
