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
					{({ term }) => term ? <Pane {...this.props} /> : null}
				</Subscribe>
			</div>
		)
	}
}

Synapse.defaultProps = {
	batchSize: 10,
	matchThreshold: .005,
	resultsThreshold: 5,
	createLink: (href, contents) => <a href={href}>{contents}</a>
}

export default Synapse