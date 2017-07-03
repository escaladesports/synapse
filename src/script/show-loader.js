import { add as addClass } from './class-list'
module.exports = function(){
	console.log(this.els.container)
	addClass(this.els.container, 'synapseLoading')
	return this
}
