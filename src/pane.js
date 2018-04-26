import React, { Component } from 'react'
import { Subscribe } from 'statable'
import { ThreeBounce } from 'better-react-spinkit'
import Fetcher from './fetcher'
import Input from './input'
import Results from './results'
import termState from './states/term'

const fetcher = new Fetcher()

function clearTerm(){
	termState.setState({
		term: ''
	})
}

function closeKey(e){
	if(e.keyCode === 27){
		clearTerm()
	}
}

class Pane extends Component{
	constructor(props){
		super(props)
		this.state = {
			results: false,
		}
		this.termChange = this.termChange.bind(this)
		if (props.origin) {
			fetcher.options.origin = props.origin
		}
		fetcher.options.batchSize = props.batchSize
		fetcher.options.matchThreshold = props.matchThreshold
	}
	componentDidMount(){
		document.addEventListener('keyup', closeKey)
		termState.subscribe(this.termChange)
	}
	componentWillUnmount(){
		document.removeEventListener('keyup', closeKey)
		termState.unsubscribe(this.termChange)
	}
	termChange(){
		clearTimeout(this.timeout)
		this.timeout = setTimeout(async () => {
			if (!termState.state.term) return
			for (let i = 0; i < this.props.batchSearch; i++) {
				await fetcher.fetchBatch(termState.state.term)
			}
			let results = await fetcher.searchBatches(termState.state.term)
			this.setState({ results })
		}, 500)
	}
	render(){
		return (
			<div className='synapseBackground' onClick={clearTerm}>
				<div className='synapseContent' onClick={e => e.stopPropagation()}>
					<Input className='synapseContentInput' focus />
					{this.state.results ?
						<Results results={this.state.results} {...this.props} /> :
						<div className='synapseLoading'>
							<ThreeBounce size={20} color='#fff' />
						</div>
					}
				</div>
				{!this.props.noStyle &&
					<style jsx global>{`
						body{
							height: auto !important;
							overflow: hidden !important;
						}
						.synapseBackground{
							position: fixed;
							top: 0;
							right: 0;
							bottom: 0;
							left: 0;
							background: rgba(0, 0, 0, .75);
							zIndex: 999;
							overflow-x: auto;
							padding: 40px;
							color: #ccc;
							font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
							text-rendering: optimizeLegibility;
							letter-spacing: 1px;
							-webkit-tap-highlight-color: rgba(0,0,0,0);
							box-sizing: border-box;
						}
						.synapseBackground *,
						.synapseBackground *:after,
						.synapseBackground *:before{
							box-sizing: inherit;
						}

						.synapseContent{
							max-width: 900px;
							margin: 0 auto;
						}

						.synapseContentInput{
							background: transparent;
							color: #fff;
							outline: 0;
							border: 0;
							border-bottom: 1px solid #fff;
						}

						.synapseLoading{
							margin: 50px 0;
							text-align: center;
						}
					`}</style>
				}
			</div>
		)
	}
}

Pane.defaultProps = {
	placeholder: 'Search...',
	batchSize: 6,
	batchSearch: 3,
	matchThreshold: .007,
	resultsThreshold: 5,
	noResults: 'No Results Found',
	createLink: (href, contents) => <a href={href}>{contents}</a>
}

export default Pane