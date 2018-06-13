import React from 'react'
import { render } from 'react-dom'
import {
	SynapseInput,
	SynapseModal,
	SynapseResults,
	SynapseConfig,
	SynapseInject,
} from '../src'

/*
let synapse = new SynapseInject({
	origin: 'http://www.espn.com/'
})
*/


SynapseConfig({
	createLink: (href, contents) => < span > { contents }</span >,
	origin: 'http://www.espn.com/'
})

document.body.style.height = '300vh'

class Page extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			open: false
		}
	}
	render(){
		return(
			<main>
				<SynapseInput />
				<div onClick={() => this.setState({ open: true })}>Open Modal</div>
				<SynapseModal open={this.state.open} />
			</main>
		)
	}
}

render(
	<Page />,
	document.querySelector('#container')
)
