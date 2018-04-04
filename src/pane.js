import React, { Component } from 'react'
import { Subscribe } from 'statable'

import Fetcher from './fetcher'
import Input from './input'
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
		this.termChange = this.termChange.bind(this)
		if (this.props.origin) {
			fetcher.options.origin = this.props.origin
		}
	}
	componentDidMount(){
		document.addEventListener('keyup', closeKey)
		termState.subscribe(this.termChange)
	}
	componentWillUnmount(){
		document.removeEventListener('keyup', closeKey)
		termState.unsubscribe(this.termChange)
	}
	async termChange(){
		console.log('Term change')
		await fetcher.fetchBatch()
		await fetcher.searchBatches(termState.state.term)
	}
	render(){
		return (
			<div className='synapseBackground' onClick={clearTerm}>
				<div className='synapseContent' onClick={e => e.stopPropagation()}>
					<Input className='synapseContentInput' focus />
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
					`}</style>
				}
			</div>
		)
	}
}

Pane.defaultProps = {
	placeholder: 'Search...',
}

export default Pane