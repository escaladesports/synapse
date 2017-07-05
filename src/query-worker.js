import lunr from 'lunr'
self.addEventListener('message', e => {
	const index = lunr(function(){
		this.field('title')
		this.field('content')
		this.field('description')
		for(let i in e.data){
			this.add(e.data[i])
		}
	})
	self.postMessage(JSON.stringify(index.toJSON()))
}, false)
