import { add as addClass } from './class-list'
module.exports = function(){
	console.log('opening...')
	addClass(this.els.body, 'synapseOpen')
}
