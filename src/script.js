function Search(el){
	this.pages = []
	this.pageData = {}
	this.results = []
	this.pageProgress = -1
	this.findElements()
	this.attachEvents()
	return this
}
Search.prototype = {
	contentSelector: 'body',
	maxDepth: 10,
	findElements: require('./script/find-elements'),
	attachEvents: require('./script/attach-events'),
	fetchPage: require('./script/fetch-page'),
	progress: require('./script/progress'),
	search: require('./script/search'),
	clearSearch: require('./script/clear-search'),
	parse: require('./script/parse')
}

window.search = new Search()
