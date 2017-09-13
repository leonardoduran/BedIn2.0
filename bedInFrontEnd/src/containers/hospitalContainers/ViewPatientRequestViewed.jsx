import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import store from '../../redux/store';
import * as actionCreators from '../../redux/actions/hospitalActions/patients';
import TableViewViewedPatientRequests from '../../components/hospitalViews/TableViewViewedPatientRequests.jsx';
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
		isRequesting : state.patients.isRequesting,
		patientsData: state.patients.viewedPatientsData
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}
class ViewViewedPatientRequest extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            modalIsOpen : false,
            idInterval : null,
            patientId : null
        }
		// this.idInterval = null;
        // this.modalIsOpen = false;
        this.setStateV = this.setStateV.bind(this);
        this.openModal = this.openModal.bind(this);
    	this.closeModal = this.closeModal.bind(this);
    	this.sendMessage = this.sendMessage.bind(this);
	}
	componentWillMount() {
		this.props.fetchGetPatientsByState('Visto');
		this.state.idInterval = setInterval(() => {
			this.props.fetchGetPatientsByState('Visto');	
		},10000)
	}
	componentWillUnmount() {
		clearInterval(this.idInterval);
	}
    
    setStateV(idPatient,state) {	
        this.props.fecthSetPatientState(idPatient, state)
    }

  openModal(patientId) {
    this.setState({modalIsOpen: true, patientId: patientId});
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  sendMessage(){
	let hospitalCode = store.getState().authentication.institucionCode;
	let userid = store.getState().authentication.userId;
	let msg=document.getElementById("msg").value;
	let patientId=this.state.patientId;
	this.setState({modalIsOpen: false});
	this.props.sendMessageTo(patientId, hospitalCode,userid,msg)
  }
	render() {
		let patients = (!this.props.patientsData) ? <p>Cargando...</p>
		: <TableViewViewedPatientRequests 
			patientsList = {this.props.patientsData}
			setStateV = {this.setStateV}
			openModal={this.openModal}
			sendMessage={this.sendMessage}
		   />
		return (
			<div>
				{patients}
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                Enviar Mensaje
                <br/>
                <textarea name="msg" id="msg" cols="40" rows="3"></textarea>
                <br/>
                <button onClick={this.sendMessage}>Enviar</button>
                <button onClick={this.closeModal}>Cancelar</button>
              </Modal>

			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewViewedPatientRequest);