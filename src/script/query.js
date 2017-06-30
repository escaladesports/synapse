import lunr from 'lunr'
module.exports = function(){
	const $this = this
	console.log(this.pageData)
	const idx = lunr(function(){
		this.field('title')
		this.field('content')
		console.log('DATA:')
		console.log($this.pageData)
		for(let i in $this.pageData){
			this.add($this.pageData[i])
		}
	})
	const results = idx.search(this.queryStr)
	console.log(results)
}
