import { add as addClass } from './class-list'
module.exports = function(){
	addClass(this.els.container, 'synapseLoading')
	return this
}
