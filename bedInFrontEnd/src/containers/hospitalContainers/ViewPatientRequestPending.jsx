import React from 'react';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../redux/store';
import * as actionCreators from '../../redux/actions/hospitalActions/patients';
import TableViewPendingPatientRequests from '../../components/hospitalViews/TableViewPendingPatientRequests.jsx';
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
// const tabCenterButtonDiv = {textAlign:"center"} 
// const tabCenterButton = {margin:"auto"}

function mapStateToProps(state) {
    return {
        isRequesting : state.patients.isRequesting,
        patientsData: state.patients.patientsData,
        newPatients: state.patients.thereAreNewPatients,
        reasons: state.patients.reasons
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
class ViewPatientRequest extends React.Component {
    constructor(props) {
        super(props);
        this.setStateF = this.setStateF.bind(this);
        this.setAllViewed = this.setAllViewed.bind(this);
        this.setReasonRejection = this.setReasonRejection.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.confirmReject = this.confirmReject.bind(this);
        this.state = {
            modalIsOpen : false,
            idPatientReject : null,
            reasonReject : []
        }

    }
    componentWillMount() {
        this.props.fetchGetPatients();
        this.props.fetchReasonReject();     
        // this.idInterval = setInterval(() => {
        //     this.props.fetchGetPatients();
        // },1000*60)
        this.idInterval = setInterval(() => {
            this.props.fetchGetPatientsCheck();
        },1000*10)
    }
    
    componentWillUnmount() {
        clearInterval(this.idInterval);
    }
    setStateF(idPatient,state,mot) {
        this.props.fecthSetPatientState(idPatient, state,mot)
    }

    setReasonRejection(idPatient) {
        this.setState({modalIsOpen: true, idPatientReject: idPatient});
    }

    confirmReject(){
        let mot = document.getElementById("rejectReason").value
debugger;
        this.setStateF(this.state.idPatientReject,'Rechazado',mot);
        this.setState({modalIsOpen: false, idPatientReject: null});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    setAllViewed() {
        this.props.fetchSetAllViewed(this.props.patients);
    }
    getNewPatients(){
        // Ejecuto el query para traer las solicitudes y actualizo la grilla
        this.props.fetchGetPatients();
    }

    render() {
//      alert(this.props.isRequesting)
        let btnNewPatients  = (this.props.newPatients) ? 
            <div className="no-padding text-center">
                <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                <button title="Nuevas solicitudes" type="button" 
                        className="btn btn-info col-sm-10 col-md-10 col-lg-10 col-xl-10"
                    onClick={this.getNewPatients.bind(this)}>
                    Nuevas Solicitudes
                </button>
                <div className="col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
            </div>
        : null

        let patients = this.props.isRequesting ? <p>Cargando...</p>
        : <TableViewPendingPatientRequests 
            patientsList = {this.props.patientsData} 
            setStateF = {this.setStateF}
            setAllViewed = {this.setAllViewed}
            setReasonRejection = {this.setReasonRejection}/>

        let rejects = <div>
                  <form className="form-horizontal">
                    <div className="form-group">             
                      <label htmlFor="sel2" className="control-label col-sm-3">Motivo</label>
                      <div className="col-sm-8">

                        <select className="form-control" name="reject" id="rejectReason">
                            <br></br>
                            <option>---Motivo---</option>
                                {this.props.reasons.map((reason, i) =>
                            <option key={i} value={reason._id}>{reason.reason}</option>
                            )}
                        </select>
                      </div>
                    </div>
                  </form>
        </div>

        return (
            <div>
                {btnNewPatients}
                {patients}

              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                {rejects}


                <button onClick={this.confirmReject}>Confirmar</button>
                <button onClick={this.closeModal}>Cancelar</button>
              </Modal>

            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewPatientRequest);

                          // {store.getState().patients.reasonReject.map((reason, i) =>
                          //   <option key={i} value={reason.code}>{plan.reason}</option>
                          // )}