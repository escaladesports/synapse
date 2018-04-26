import React from 'react'

class Results extends React.Component{
	render(){
		return (
			<ul className='synapseResults'>
				{this.props.results.map((result, key) =>
					<li className='synapseResult' key={`synapseResult${key}`}>
						{this.props.createLink(result.url, (
							<span>
								<span className='synapseTitle'>{result.title}</span>
								<span className='synapseDescription'>{result.description}</span>
							</span>
						))}
					</li>
				)}
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
				`}</style>
			</ul>
		)
	}
}

export default Results