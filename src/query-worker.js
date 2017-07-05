import lunr from 'lunr'
self.addEventListener('message', e => {
	const index = lunr(function(){
		this.field('title')
		this.field('content')
		this.field('description')
		for(let i in e.data.pageData){
			this.add(e.data.pageData[i])
		}
	})
	const results = index.search(e.data.queryStr)
	self.postMessage(JSON.stringify(results))

}, false)
