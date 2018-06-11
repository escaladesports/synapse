import React from 'react'
import { ThreeBounce } from 'better-react-spinkit'
import Input from './input'
import Results from './results'
import termState from './states/term'

class Modal extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			open: props.open || false
		}
		this.closeModal = this.closeModal.bind(this)
		this.escapeKey = this.escapeKey.bind(this)
		this.onTermChange = this.onTermChange.bind(this)
	}
	closeModal(){
		this.setState({ open: false })
	}
	escapeKey(e){
		if(e.keyCode === 27){
			this.closeModal()
		}
	}
	onTermChange({ term }) {
		if (!this.state.open && term && this.lastTerm !== term) {
			this.setState({ open: true })
		}
		this.lastTerm = term
	}
	componentDidMount(){
		termState.subscribe(this.onTermChange)
		document.addEventListener('keyup', this.escapeKey)
	}
	componentWillUnmount(){
		termState.unsubscribe(this.onTermChange)
		document.removeEventListener('keyup', this.escapeKey)
	}
	componentWillReceiveProps(props){
		if ('open' in props) {
			this.setState({ open: props.open })
		}
	}
	render(){
		return this.state.open ?
			<div className='synapseModal' onClick={this.closeModal}>
				<div className='synapseContent' onClick={e => e.stopPropagation()}>
					<Input focus {...this.props} />
					<Results {...this.props} />
				</div>
				{!this.props.noStyle &&
					<style jsx global>{`
						body{
							height: auto !important;
							overflow: hidden !important;
						}
						.synapseModal{
							position: fixed;
							top: 0;
							right: 0;
							bottom: 0;
							left: 0;
							background: rgba(0, 0, 0, .75);
							zIndex: 999;
							overflow-x: auto;
							padding: 40px;
							color: #ccc;
							font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
							text-rendering: optimizeLegibility;
							letter-spacing: 1px;
							-webkit-tap-highlight-color: rgba(0,0,0,0);
							box-sizing: border-box;
							a,
							button,
							input{
								color: #fff;
							}
							a{
								text-decoration: none;
							}
							button{
								background-color: transparent;
								border: 1px solid #fff;
								border-radius: none;
								padding: 10px 20px;
								outline: 0;
								text-transform: uppercase;
							}
							input{
								background: transparent;
								outline: 0;
								border: 0;
								border-bottom: 1px solid #fff;
								font-size: 1.2em;
								padding: 5px;
							}
						}
						.synapseModal *,
						.synapseModal *:after,
						.synapseModal *:before{
							box-sizing: inherit;
						}

						.synapseContent{
							max-width: 900px;
							margin: 0 auto;
						}

					`}</style>
				}
			</div>
		: null
	}
}

Modal.defaultProps = {
	loading: <ThreeBounce size={20} color='#fff' />,
}

export default Modal