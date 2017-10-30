import { add as addClass } from './script/class-list'
function Synapse(el){
	this.els = {
		inputs: [],
		body: document.getElementsByTagName('body')[0]
	}
	this.pages = []
	this.pageData = {}
	this.results = []
	this.pageProgress = -1
	this.activateInputs()
	return this
}
Synapse.prototype = {
	contentSelector: 'body',
	maxDepth: 10,
	minDepth: 5,
	open: require('./script/open'),
	close: require('./script/close'),
	activateInputs: require('./script/activate-inputs'),
	refresh: require('./script/activate-inputs'),
	fetchPage: require('./script/fetch-page'),
	progress: require('./script/progress'),
	search: require('./script/search'),
	clearSearch: require('./script/clear-search'),
	parse: require('./script/parse'),
	query: require('./script/query'),
	inject: require('./script/inject'),
	attachEvents: require('./script/attach-events'),
	render: require('./script/render'),
	showLoader: require('./script/show-loader'),
	hideLoader: require('./script/hide-loader')
}

// Check for web worker support
if(window.Worker){
	window.synapse = new Synapse()
}
else{
	window.synapse = {}
	addClass(document.getElementsByTagName('body')[0], 'synapseNotSupported')
}
