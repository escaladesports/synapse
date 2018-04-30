import React from 'react'
import { render } from 'react-dom'
import {
	SynapseInput,
	SynapseModal,
	SynapseResults,
	SynapseConfig,
} from '../src'

SynapseConfig({
	createLink: (href, contents) => < span > { contents }</span >,
	origin: 'http://www.espn.com/'
})

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

document.body.style.height = '300vh'

class Page extends React.Component{
	render(){
		return(
			<main>
				<SynapseInput />
				<SynapseModal />
			</main>
		)
	}
}

render(
	<Page />,
	containerEl
)