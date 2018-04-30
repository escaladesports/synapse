import {
	SynapseConfig,
	SynapseInput,
	SynapseResults,
	SynapseModal,
} from './'
import React from 'react'
import { render } from 'react-dom'

function queryRender(query, component) {
	const els = document.querySelectorAll(`[data-synapse-${query}]`)
	for (let i = els.length; i--;) {
		render(component, els[i])
	}
}

class SynapseInject{
	constructor(options = {}){
		this.options = options
		SynapseConfig(options)
		this.inject()
	}
	inject(){
		queryRender('input', <SynapseInput />)
		queryRender('results', <SynapseResults />)
		queryRender('modal', <SynapseModal />)
	}
}

export default SynapseInject