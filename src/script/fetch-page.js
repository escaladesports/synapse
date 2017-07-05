module.exports = function(){
	const $this = this
	const url = this.pages[this.pageProgress]
	if(!url) return this
	this.showLoader()
	// If we've already got the data?
	if(this.pageData[url]){
		this.progress()
		return
	}

	var req = new XMLHttpRequest()
	req.addEventListener('load', function(){
		$this.pageData[url] = this.responseText
		$this.parse(url, this.responseText)
		$this.progress()
	})
	req.addEventListener('error', e => {
		this.progress()
	})
	req.open('GET', url)
	req.send()

}
