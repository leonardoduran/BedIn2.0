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
		error: state.patientRequestReducers.error,
    reasonsF: state.patientRequestReducers.reasonsF
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
            messages: null,
            patientIdCancel : null
        }

		this.verMensajes=this.verMensajes.bind(this);
    this.closeMessagesModal = this.closeMessagesModal.bind(this);
    this.cancelPatientRequest=this.cancelPatientRequest.bind(this);
    this.closeModalRejects = this.closeModalRejects.bind(this);
    this.confirmReject = this.confirmReject.bind(this);
	}

	componentWillMount() {
		this.props.fetchReasonRejectFin();
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

  cancelPatientRequest(patientId){
    this.setState({modalRejectsIsOpen: true, patientIdCancel : patientId});
  }

  closeModalRejects() {
    this.setState({modalRejectsIsOpen: false});
  }

  confirmReject(){
        let mot = document.getElementById("rejectReasonF").value
        if (mot=="---Motivo---")
        {
            alert("Motivo no ingresado")
            return;
        }
        this.props.setCancelToPatient('CONFIRMADOS',this.state.patientIdCancel,mot);
        this.setState({modalRejectsIsOpen: false, patientIdCancel: null});    
  }

	render() {
    const tableRequests = this.props.isRequesting ? <p>Cargando..</p>
    : <TableViewMatchedPatientRequests 
    	patients = {this.props.matchedList}
    	verMensajes={this.verMensajes}
      cancelPatientRequest={this.cancelPatientRequest}
      />

      let rejects = <div>
                  <form className="form-horizontal">
                    <div className="form-group">             
                      <label htmlFor="sel2" className="control-label col-sm-3">Motivo</label>
                      <div className="col-sm-8">

                        <select className="form-control" name="reject" id="rejectReasonF">
                            <br></br>
                            <option>---Motivo---</option>
                                {this.props.reasonsF.map((reason, i) =>
                            <option key={i} value={reason._id}>{reason.reason}</option>
                            )}
                        </select>
                      </div>
                    </div>
                  </form>
      </div>      
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

              <Modal
                isOpen={this.state.modalRejectsIsOpen}
                onRequestClose={this.closeModalRejects}
                style={customStyles}
                contentLabel="Example Modal">
                {rejects}

                <button onClick={this.confirmReject}>Confirmar</button>
                <button onClick={this.closeModalRejects}>Cancelar</button>
              </Modal>


			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPatientRequestsMatched);