import React from 'react'
import { Subscribe } from 'statable'
import termState from './states/term'
import { ThreeBounce } from 'better-react-spinkit'

function close(){
	termState.setState({ term: '' })
}

class Results extends React.Component{
	render(){
		return (
			<div>
				<Subscribe to={termState}>{({ results, loading, end }) => (
					<div>

						{/* Results */}
						{results && results.length > 0 &&
							<ul className='synapseResults'>
								{results.map((result, key) =>
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
								)}
							</ul>
						}

						{/* Loading */}
						{loading &&
							<div className='synapseLoading'>
								{this.props.loading}
							</div>
						}

						{/* Load More */}
						{results && results.length > 0 && !loading && !end &&
							<button onClick={termState.nextPage}>Load More</button>
						}

						{/* No results */}
						{results && !results.length &&
							this.props.noResults
						}

					</div>
				)}</Subscribe>
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
					}
					.synapseTitle{
						font-weight: bold;
					}
					.synapseResultsEmpty{
						text-align: center;
						font-size: 1.5em;
						text-transform: uppercase;
					}

					.synapseLoading{
						margin: 50px 0;
						text-align: center;
					}
				`}</style>
			</div>
		)
	}
}

Results.defaultProps = {
	loading: <ThreeBounce size={20} color='#000' />,
	noResults: 'No Results Found',
	createLink: (href, contents) => <a href={href}>{contents}</a>,
}

export default Results