import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import * as actionCreators from '../../redux/actions/financiadorActions/patientRequestCreateView';

import TableViewMatchedPatientRequests from '../../components/financiadorViews/TableViewMatchedPatientRequests.jsx';
import TableViewMessages from '../../components/financiadorViews/TableViewMessages.jsx';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function mapStateToProps(state) {
  return {
		isRequesting: state.patientRequestReducers.isRequesting,
		matchedList: state.patientRequestReducers.matchedList,
		error: state.patientRequestReducers.error
  }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}


class ViewPatientRequestsMatched extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
            modalMenssagesIsOpen:false,
            messages: null
        }

		this.verMensajes=this.verMensajes.bind(this);
    	this.closeMessagesModal = this.closeMessagesModal.bind(this);
	}

	componentWillMount() {
		this.props.fetchMatchedPatientRequests();
		this.idInterval = setInterval(() => {
			this.props.fetchMatchedPatientRequests();
		},1000*60)
	}

	componentWillUnmount() {
		clearInterval(this.idInterval)
	}
    
    verMensajes(messages){
    	this.setState({modalMenssagesIsOpen: true, messages: messages});
  	}

  	closeMessagesModal() {
    	this.setState({modalMenssagesIsOpen: false});
  	}

	render() {
    const tableRequests = this.props.isRequesting ? <p>Cargando..</p>
    : <TableViewMatchedPatientRequests 
    	patients = {this.props.matchedList}
    	verMensajes={this.verMensajes}
      />
		return (
			<div>
				{tableRequests}
				<Modal
                isOpen={this.state.modalMenssagesIsOpen}
                onRequestClose={this.closeMessagesModal}
                style={customStyles}
                contentLabel="Example Modal">
                <button onClick={this.closeMessagesModal}>close</button>
                <TableViewMessages
                  messages={this.state.messages}
                />
              </Modal>   
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPatientRequestsMatched);