/*
// Input:
{
	// Starting URL to crawl
	url: '',
	queryStr: '',
	// Which batch we are on
	batch: 0,
	batchLimit: 10
}
// Output:
{
	queryStr: '',
	results: []
}

*/

import lunr from 'lunr'
import getHostname from './script/get-hostname'
const urls = []
const parsedUrls = []
const batches = []
let hostname
let queryStr

self.addEventListener('message', e => {

	// Add starting URL if necessary
	if(
		e.data.url && parsedUrls.indexOf(e.data.url) === -1 &&
		urls.indexOf(e.data.url) === -1
	){
		hostname = getHostname(e.data.url)
		urls.push(e.data.url)
	}

	queryStr = e.data.query

	// Check for existing batch
	if(batches[e.data.batch]){
		searchBatch(queryStr, batches[e.data.batch])
	}
	// If batch doesn't exist
	else if(urls.length){
		createBatch(e.data.batch)
			.then(() => searchBatch(queryStr, batches[e.data.batch]))
			.catch(console.error)
	}
	// If there's nothing left
	else{
		self.postMessage({
			query: queryStr,
			results: false
		})
	}


}, false)


function fetchPage(url){
	return new Promise((resolve, reject) => {
		var req = new XMLHttpRequest()
		req.addEventListener('load', function(){
			resolve({
				url: url,
				data: this.responseText
			})
		})
		req.addEventListener('error', reject)
		req.open('GET', url)
		req.send()
	})
}

function fetchPages(batchNum){
	return new Promise((resolve, reject) => {
		// Get URLs to fetch
		const fetches = []
		for(let i = 0; i < urls.length; i++){
			if(fetches.length >= 10){
				break
			}
			fetches.push(fetchPage(urls[i]))
		}

		// Fetch
		Promise.all(fetches)
			.then(resolve)
			.catch(console.error)

	})
}


function parsePages(arr){
	return new Promise((resolve, reject) => {
		const promises = []
		for(let i = arr.length; i--;){
			promises.push(parsePage(arr[i]))
		}
		Promise.all(promises)
			.then(resolve)
			.catch(reject)
	})
}
function parsePage(obj){
	obj.links = []
	obj = obj.data.replace(regTag, '> ')
	const doc = new DOMParser().parseFromString(obj.data, 'text/html')
	const main = doc.querySelector('body')
	const links = doc.querySelectorAll('a')
	const title = doc.querySelector('title')
	const description = doc.querySelector('meta[name="description"]')
	for(let i = 0; i < links.length; i++){
		let href = links[i].href
		if(getHostname(href) === hostname && urls.indexOf(href) === -1 && parsedUrls.indexOf(href) === -1 && obj.links.indexOf(href) === -1){
			obj.links.push(href)
		}
	}
	if(title){
		obj.title = title.textContent
	}
	if(main){
		obj.content = main.textContent.replace(regSpace, ' ')
	}
	if(description){
		obj.description = description.getAttribute('content')
	}
	delete obj.data
	return obj
}

function createIndex(arr){
	const index = lunr(function(){
		this.field('title')
		this.field('content')
		this.field('description')
		for(let i = 0; i < arr.length; i++){
			this.add(arr[i])
		}
	})
	return {
		pages: arr,
		index: index
	}
}

function createBatch(batchNum){
	return new Promise((resolve, reject) => {
		fetchPages(batchNum)
			.then(parsePages)
			.then(createIndex)
			.then(obj => {
				// Cache index as a batch
				batches[batchNum] = obj.index

				// Save new URLs and move old ones
				for(let i in obj.pages){
					const page = obj.pages[i]
					let index = urls.indexOf(page.url)
					if(index > -1){
						urls.splice(index, 1)
					}
					parsedUrls.push(page.url)
					for(let i in page.links){
						if(urls.indexOf(page.links[i]) === -1 && parsedUrls.indexOf(page.links[i])){
							urls.push(page.links[i])
						}
					}
				}
			})
			.then(resolve)
			.catch(reject)
	})
}

function searchBatch(query, index){
	if(query !== queryStr) return
	const results = index.search(query)
	self.postMessage(JSON.stringify({
		query: query,
		results: results
	}))
}
