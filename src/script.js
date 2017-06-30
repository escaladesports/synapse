function Search(el){
	this.els = {
		inputs: [],
		body: document.getElementsByTagName('body')[0]
	}
	this.pages = []
	this.pageData = {}
	this.results = []
	this.pageProgress = -1
	this.activateInputs()
	this.attachEvents()
	return this
}
Search.prototype = {
	contentSelector: 'body',
	maxDepth: 10,
	minDepth: 5,
	open: require('./script/open'),
	close: require('./script/close'),
	activateInputs: require('./script/activate-inputs'),
	attachEvents: require('./script/attach-events'),
	fetchPage: require('./script/fetch-page'),
	progress: require('./script/progress'),
	search: require('./script/search'),
	clearSearch: require('./script/clear-search'),
	parse: require('./script/parse'),
	query: require('./script/query'),
	inject: require('./script/inject'),
	render: require('./script/render')
}

window.search = new Search()
