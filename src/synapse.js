import React, { Component } from 'react'
import { Subscribe } from 'statable'

import Input from './input'
import Pane from './pane'
import termState from './states/term'

class Synapse extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div>
				<Input />
				<Subscribe to={termState}>
					{({ term }) => term ? <Pane /> : null}
				</Subscribe>
			</div>
		)
	}
}

export default Synapse