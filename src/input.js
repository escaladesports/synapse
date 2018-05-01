import React, { Component } from 'react'
import { Subscribe } from 'statable'
import termState from './states/term'

function onChange(e) {
	e.preventDefault()
	termState.changeTerm(e.target.value, true)
}
function onEnter(e) {
	if (e.keyCode === 13) {
		e.preventDefault()
		let val = e.target.value
		termState.changeTerm('')
		termState.changeTerm(val)
	}
}
function moveCursorToEnd(el) {
	if (typeof el.selectionStart == 'number') {
		el.selectionStart = el.selectionEnd = el.value.length
	}
	else if (typeof el.createTextRange != 'undefined') {
		el.focus()
		var range = el.createTextRange()
		range.collapse(false)
		range.select()
	}
}

class Input extends Component{
	constructor(props){
		super(props)
	}
	componentDidMount(){
		this.input.addEventListener('keyup', onEnter)
		if(this.props.focus){
			this.input.focus()
			moveCursorToEnd(this.input)
		}
	}
	componentWillUnmount(){
		this.input.removeEventListener('keyup', onEnter)
	}
	render(){
		return (
			<div>
				<Subscribe to={termState}>
					{({ term }) => (
						<input
							onChange={onChange}
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