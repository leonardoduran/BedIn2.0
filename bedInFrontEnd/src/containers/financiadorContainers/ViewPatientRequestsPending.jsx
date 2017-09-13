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
        error: state.patientRequestReducers.error
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
            messages: null
        }
    this.openModal = this.openModal.bind(this);
    this.verMensajes=this.verMensajes.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeMessagesModal = this.closeMessagesModal.bind(this);
    
    }
    componentWillMount() {
        this.props.fetchPendingPatientRequests();
        this.idInterval = setInterval(() => {
            this.props.fetchPendingPatientRequests();
        },10000)
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
    const tableRequests = this.props.isRequesting ? <p>Cargando..</p>
    : <TableViewPendingPatientRequests 
        listOfPending= {this.props.pendingList}
        openModal={this.openModal}
        verMensajes={this.verMensajes}
      />
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
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewPatientRequestsPending);