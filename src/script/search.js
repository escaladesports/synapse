import { remove as removeClass } from './class-list'
import getHostname from './get-hostname'
module.exports = function(str){
	console.log('Searching ' + str)
	this.open()
	if(this.queryStr === str) return this
	this.clearSearch()
	this.inject()
	removeClass(this.els.container, 'synapseNoResults')
	this.queryStr = str
	if(this.els.innerInput){
		this.els.innerInput.value = this.queryStr
		this.els.innerInput.focus()
	}
	this.pageProgress = 0
	// Add URL if none exist yet
	if(!this.pages.length){
		const url = this.url || document.location.href
		this.pages[0] = url
		this.hostname = getHostname(url)
	}
	return this.query()
}
