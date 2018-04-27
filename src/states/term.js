import { State } from 'statable'
import fetcher from '../fetcher/instance'

let timeout

export default new State({
	term: '',
	results: false,
	loading: false,
}, {
	changeTerm(term){
		if(term === this.state.term) return
		this.setState({ term })
		term = term.trim()
		if(!term) return

		// Wait for end of user input
		clearTimeout(timeout)
		timeout = setTimeout(async () => {
			if (!this.state.term) return
			this.setState({
				loading: true,
			})
			for (let i = 0; i < fetcher.options.batchSearch; i++) {
				await fetcher.fetchBatch(this.state.term)
			}
			let results = await fetcher.searchBatches(this.state.term)
			this.setState({
				results,
				loading: false,
			})
		}, 500)
	}
})