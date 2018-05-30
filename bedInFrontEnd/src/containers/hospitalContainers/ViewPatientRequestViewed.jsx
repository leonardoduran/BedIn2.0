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
            // idInterval : null,
            modalRejectIsOpen : false,
            patientId : null
        }

        this.idInterval = null;
    // this.idInterval = null;
        // this.modalIsOpen = false;
        this.setStateV = this.setStateV.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        this.setReasonRejection = this.setReasonRejection.bind(this);
        this.closeModalReject = this.closeModalReject.bind(this);
        this.confirmReject = this.confirmReject.bind(this);

  }
  componentDidMount() {
    this.props.fetchReasonReject();
    this.props.fetchGetPatientsByState('Visto');
    this.idInterval = setInterval(() => {
      this.props.fetchGetPatientsCheck(false);
      this.props.fetchGetPatientsByState('Visto');  
    },1000*10)
  }
  componentWillUnmount() {
    clearInterval(this.idInterval);
  }
    
    setStateV(idPatient,state,mot) {	
        this.props.fecthSetPatientState(idPatient, state,mot);
        this.props.fetchGetPatientsByState('Visto');
    }

    setReasonRejection(idPatient) {
        this.setState({modalRejectIsOpen: true, idPatientReject: idPatient});
    }

    confirmReject(){
        let mot = document.getElementById("rejectReason").value
        if (mot=="---Motivo---")
        {
            alert("Motivo no ingresado")
            return;
        }
        this.setStateV(this.state.idPatientReject,'Rechazado',mot);
        this.setState({modalRejectIsOpen: false, idPatientReject: null});
    }

    closeModalReject() {
        this.setState({modalRejectIsOpen: false});
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
      setReasonRejection = {this.setReasonRejection}
		   />    
    let rejects = <div>
                  <form className="form-horizontal">
                    <div className="form-group">             
                      <label htmlFor="sel2" className="control-label col-sm-3">Motivo</label>
                      <div className="col-sm-8">

                        <select className="form-control" name="reject" id="rejectReason">
                            <br></br>
                            <option>---Motivo---</option>
                            {store.getState().patients.reasons.map((reason, i) =>
                            <option key={i} value={reason._id}>{reason.reason}</option>
                            )}
                        </select>
                      </div>
                    </div>
                  </form>
                </div>

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

              <Modal
                isOpen={this.state.modalRejectIsOpen}
                onRequestClose={this.closeModalReject}
                style={customStyles}
                contentLabel="Example Modal">
                {rejects}

                <button onClick={this.confirmReject}>Confirmar</button>
                <button onClick={this.closeModalReject}>Cancelar</button>
              </Modal>

			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewViewedPatientRequest);

// {this.props.reasons.map((reason, i) =>