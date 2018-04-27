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

class Page extends React.Component{
	render(){
		return(
			<main>
				<SynapseInput />
				<SynapseResults />
				<SynapseInput />
				<style jsx>{`
					main :global(a){
						text-decoration: none;
						color: #000;
					}
				`}</style>
			</main>
		)
	}
}

render(
	<Page />,
	containerEl
)