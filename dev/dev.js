import React from 'react'
import { render } from 'react-dom'
import Synapse from '../src/synapse'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

render(
	<Synapse />,
	containerEl
)