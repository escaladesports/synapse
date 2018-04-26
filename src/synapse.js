import React, { Component } from 'react'
import { Subscribe } from 'statable'
import Input from './input'
import Pane from './pane'
import termState from './states/term'

class Synapse extends Component{
	render(){
		return (
			<div>
				<Input />
				<Subscribe to={termState}>
					{({ term }) => term ?
						<Pane {...this.props} />
					: null}
				</Subscribe>
			</div>
		)
	}
}

export default Synapse