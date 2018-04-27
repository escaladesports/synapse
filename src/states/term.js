import { State } from 'statable'
import fetcher from '../fetcher/instance'

let timeout

export default new State({
	term: '',
	results: false,
	loading: false,
}, {
	changeTerm(term, delayed){
		if(term === this.state.term) return
		this.setState({ term })
		term = term.trim()
		if(!term) return

		// Wait for end of user input
		clearTimeout(timeout)
		if (delayed) {
			timeout = setTimeout(this.startFetch, 500)
		}
		else{
			this.startFetch()
		}
	},
	async startFetch() {
		if (!this.state.term) return
		this.setState({ loading: true })
		for (let i = 0; i < fetcher.options.batchSearch; i++) {
			await fetcher.fetchBatch(this.state.term)
		}
		let results = await fetcher.searchBatches(this.state.term)
		this.setState({
			results,
			loading: false,
		})
	},
	async nextPage() {
		this.setState({ loading: true })

		for (let i = 0; i < fetcher.options.batchSearch; i++) {
			await fetcher.fetchBatch(this.state.term)
		}

		let results = [
			...this.state.results,
			...await fetcher.searchMoreBatches(this.state.term)
		]
		this.setState({
			results,
			loading: false,
		})
	}
})