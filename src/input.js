import React, { Component } from 'react'
import { Subscribe } from 'statable'

import termState from './states/term'

class Input extends Component{
	constructor(props){
		super(props)
		this.onChange = this.onChange.bind(this)
	}
	onChange(e){
		e.preventDefault()
		termState.setState({
			term: e.target.value
		})
	}
	componentDidMount(){
		if (this.props.focus) {
			let term = termState.state.term
			termState.setState({ term: ' ' })
			this.input.focus()
			if (term) {
				setTimeout(() => {
					termState.setState({ term })
				}, 0)
			}
		}
	}
	render(){
		return (
			<div>
				<Subscribe to={termState}>
					{({ term }) => (
						<input
							onChange={this.onChange}
							ref={input => this.input = input}
							value={term}
							className={this.props.className}
							placeholder={this.props.placeholder}
						/>
					)}
				</Subscribe>
			</div>
		)
	}
}

Input.defaultProps = {
	placeholder: 'Search...',
	className: 'synapseInput',
}

export default Input