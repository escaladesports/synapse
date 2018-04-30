import fetcher from './instance'

function setConfig(obj){
	for(let i in obj){
		fetcher.options[i] = obj[i]
	}
}

export default setConfig