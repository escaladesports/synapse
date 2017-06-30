import { add as addClass } from './class-list'
module.exports = function(){
	console.log(this.els.body)
	addClass(this.els.body, 'searchOpen')
}
