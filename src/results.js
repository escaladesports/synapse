import React from 'react'
import termState from './states/term'

function close(){
	termState.setState({ term: '' })
}

class Results extends React.Component{
	render(){
		return (
			<ul className='synapseResults'>
				{this.props.results.length ?
					this.props.results.map((result, key) =>
						<li
							className='synapseResult'
							key={`synapseResult${key}`}
							onClick={close}
							>
							{this.props.createLink(result.url, (
								<span>
									<span className='synapseTitle'>{result.title}</span>
									<span className='synapseDescription'>{result.description}</span>
								</span>
							))}
						</li>
					) :
					<div className='synapseResultsEmpty'>No Results Found</div>
				}
				<style jsx global>{`
					.synapseResults{
						margin: 50px 0;
						list-style-type: none;
						padding: 0;
					}
					.synapseResult{
						margin: 10px 0;
					}
					.synapseTitle,
					.synapseDescription{
						display: block;
						color: #fff;
					}
					.synapseTitle{
						font-weight: bold;
					}
					.synapseResultsEmpty{
						text-align: center;
						font-size: 1.5em;
						text-transform: uppercase;
					}
				`}</style>
			</ul>
		)
	}
}

export default Results