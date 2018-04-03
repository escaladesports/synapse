import Worker from 'worker-loader!./worker'

const urls = []
const fetchedUrls = []

function fetchBatch(base){
	if(!urls.length && !fetchedUrls.length){
		if(!base){
			base = document.location.href
		}
		urls.push(base)
	}
}
