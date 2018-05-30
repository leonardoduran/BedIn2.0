import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import * as actionCreators from '../../redux/actions/financiadorActions/patientRequestCreateView';
import TableViewPendingPatientRequests from '../../components/financiadorViews/TableViewPendingPatientRequests.jsx';
import TableViewRequestDetails from '../../components/financiadorViews/TableViewRequestDetails.jsx';
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
        receivePending: state.patientRequestReducers.receivePending,
        pendingList: state.patientRequestReducers.pendingList,
        error: state.patientRequestReducers.error,
        reasonsF: state.patientRequestReducers.reasonsF
  }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
class ViewPatientRequestsPending extends React.Component {
    constructor(props) {
        super(props);
        this.matchHospital = this.matchHospital.bind(this);
        this.state = {
            modalIsOpen : false,
            patientDetail: null,
            modalMenssagesIsOpen:false,
            messages: null,
            patientIdCancel : null
        }
    this.openModal = this.openModal.bind(this);
    this.verMensajes=this.verMensajes.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeMessagesModal = this.closeMessagesModal.bind(this);
    this.cancelPatientRequest=this.cancelPatientRequest.bind(this);
    this.closeModalRejects = this.closeModalRejects.bind(this);
    this.confirmReject = this.confirmReject.bind(this);
    }

    componentDidMount() {
        this.props.fetchReasonRejectFin();
        this.props.fetchPendingPatientRequests();
        this.idInterval = setInterval(() => {
            this.props.fetchPendingPatientRequests();
        },500*10)
    }

    componentWillUnmount() {
        clearInterval(this.idInterval)
    }
    matchHospital(idPatientRequest, idHospital) {
        this.props.matchWithHospital(idPatientRequest, idHospital);
        this.closeModal();
    }
  openModal(patient) {
    this.setState({modalIsOpen: true, patientDetail: patient});
  }
 
  verMensajes(messages){
    this.setState({modalMenssagesIsOpen: true, messages: messages});
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
        this.props.setCancelToPatient('GENERADOS',this.state.patientIdCancel,mot);
        this.props.fetchPendingPatientRequests();
        this.setState({modalRejectsIsOpen: false, patientIdCancel: null});    
  }

  afterOpenModal() {
   // this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
  closeMessagesModal() {
    this.setState({modalMenssagesIsOpen: false});
  }

    render() {
    // const tableRequests = this.props.isRequesting ? <p>Cargando..</p>
    // : <TableViewPendingPatientRequests 
    //     listOfPending= {this.props.pendingList}
    //     openModal={this.openModal}
    //     verMensajes={this.verMensajes}
    //     cancelPatientRequest={this.cancelPatientRequest}
    //   />

    const tableRequests =  <TableViewPendingPatientRequests 
        listOfPending= {this.props.pendingList}
        openModal={this.openModal}
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
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal">
                <button onClick={this.closeModal}>close</button>
                  <TableViewRequestDetails 
                          patientDetail = {this.state.patientDetail}
                          matchHospital={this.matchHospital}/>
              </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewPatientRequestsPending);