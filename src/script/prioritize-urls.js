// Orders an array of URLs by match liklihood
module.exports = (urls, str) => {
	console.log('Prioritizing URLs...')
	const priority = []
	str = str.toLowerCase().split(regSplit)
	for(let i = 0; i < urls.length; i++){
		const url = urls[i]
		const lower = url.toLowerCase()
		for(let i = str.length; i--;){
			if(lower.indexOf(str[i]) > -1){
				console.log(`Priortizing ${url}`)
				priority.push(url)
				urls.splice(i, 1)
				break
			}
		}
	}
	urls.unshift(...priority)
}
const regSplit = /[^A-Za-z]/
