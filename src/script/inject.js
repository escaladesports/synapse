import icon from '../img/search.svg'
module.exports = function(){
	if(this.injected === true) return this
	console.log('Injecting template...')
	const el = document.createElement('div')
	el.classList = 'synapse'
	const str = `
		<div class="synapseClose">&#215;</div>
		<div class="synapseModal">
			<input class="synapseInput" type="text" />
			${icon}
			<ul class="synapseResults">
			</ul>
			<div class="synapseLoadMore">Load More</div>
			<div class="synapseLoader">
				<div class="synapseLoadAnim">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	`;
	el.innerHTML = str



	this.els.container = el
	this.els.results = el.querySelector('.synapseResults')
	this.els.innerInput = el.querySelector('.synapseInput')

	this.attachEvents()


	this.els.body.appendChild(el)
	this.injected = true

	return this
}
