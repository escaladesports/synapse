module.exports = function(){
	const $this = this
	const url = this.pages[this.pageProgress]
	if(!url) return this
	// If we've already got the data?
	if(this.pageData[url]){
		this.progress()
		return
	}
	var oReq = new XMLHttpRequest()
	oReq.addEventListener('load', function(){
		$this.pageData[url] = this.responseText
		$this.parse(url, this.responseText)
		$this.progress()
	})
	oReq.open('GET', url)
	oReq.send()
}
