import React from 'react'
import { render } from 'react-dom'

import Synapse from '../src/synapse'

const containerEl = document.createElement('div')
document.body.appendChild(containerEl)

render(
	<Synapse
		batchSize={20}
		matchThreshold={.005}
		resultsThreshold={5}
		timeThreshold={6}
		origin='http://www.espn.com/' />,
	containerEl
)