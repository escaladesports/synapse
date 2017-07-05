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
const displayContent = {}
const threadReqs = {}
let threadReqId = 0
let hostname
let queryStr

self.addEventListener('message', e => {



	if('reqId' in e.data){
		console.log('Recieved DOM content from main thread')
		threadReqs[e.data.reqId] = e.data.content
		return
	}
	else if(e.data.query){
		console.log(`Starting search for ${e.data.query}`)
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
				.then(() => {
					searchBatch(queryStr, batches[e.data.batch])
				})
				.catch(console.error)
		}
		// If there's nothing left
		else{
			self.postMessage({
				query: queryStr,
				results: false
			})
		}
	}



}, false)


function fetchPage(url){
	return new Promise((resolve, reject) => {
		var req = new XMLHttpRequest()
		req.addEventListener('load', function(){
			resolve({
				id: url,
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
		console.log('Parsing pages...')
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
	return new Promise((resolve, reject) => {
		console.log('Parsing page...')
		const thisId = threadReqId++
		const interval = setInterval(() => {
			if(threadReqs[thisId]){
				clearInterval(interval)
				const parsed = threadReqs[thisId]
				parsed.id = obj.id
				delete threadReqs[thisId]
				resolve(parsed)
			}
		}, 10)
		self.postMessage(JSON.stringify({
			content: obj.data,
			reqId: thisId
		}))
	})
}
const regTag = />/g
const regSpace = /\s+/g

function createIndex(arr){
	console.log('Creating index...')
	const index = lunr(function(){
		this.field('title')
		this.field('content')
		this.field('description')
		for(let i = 0; i < arr.length; i++){
			displayContent[arr[i].id] = {
				url: arr[i].id,
				title: arr[i].title,
				description: arr[i].description
			}
			this.add(arr[i])
		}
	})
	console.log('Created lunr index.')
	return {
		pages: arr,
		index: index
	}
}

function createBatch(batchNum){
	return new Promise((resolve, reject) => {
		console.log('Creating batch...')
		fetchPages(batchNum)
			.then(parsePages)
			.then(createIndex)
			.then(obj => {
				console.log('Saving batch info...')

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
	console.log(`Searching batch for ${query}`)
	const outcome = index.search(query)
	const results = []
	for(let i = 0; i < outcome.length; i++){
		results[i] = displayContent[outcome[i].ref]
	}
	self.postMessage(JSON.stringify({
		query: query,
		results: results
	}))
}
