import React from 'react'
import { render } from 'react-dom'

import Synapse from '../src/synapse'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

render(
	<Synapse
		createLink={(href, contents) => <span>{contents}</span>}
		origin='http://www.espn.com/' />,
	containerEl
)