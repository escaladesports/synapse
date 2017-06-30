module.exports = function(){
	const $this = this
	const url = this.pages[this.pageProgress]
	if(!url) return this
	// If we've already got the data?
	if(this.pageData[url]){

	}
	var oReq = new XMLHttpRequest()
	oReq.addEventListener('load', function(){
		$this.pageData[url] = this.responseText
		console.log($this.pageData)
		$this.progress()

	})
	oReq.open('GET', url)
	oReq.send()
}

function parse(){
	const parser = new DOMParser()
}
