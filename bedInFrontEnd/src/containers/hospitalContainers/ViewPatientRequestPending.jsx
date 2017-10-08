import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/hospitalActions/patients';
import TableViewPendingPatientRequests from '../../components/hospitalViews/TableViewPendingPatientRequests.jsx';

function mapStateToProps(state) {
    return {
        isRequesting : state.patients.isRequesting,
        patientsData: state.patients.patientsData
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
class ViewPatientRequest extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.setAllViewed = this.setAllViewed.bind(this);
    }
    componentWillMount() {
        this.props.fetchGetPatients();
        this.idInterval = setInterval(() => {
            this.props.fetchGetPatients();
        },1000*60)
    }
    componentWillUnmount() {
        clearInterval(this.idInterval);
    }
    setState(idPatient,state) {
        this.props.fecthSetPatientState(idPatient, state)
    }
    setAllViewed() {
        this.props.fetchSetAllViewed(this.props.patients);
    }
    render() {
//      alert(this.props.isRequesting)
        let patients = this.props.isRequesting ? <p>Cargando...</p>
        : <TableViewPendingPatientRequests 
            patientsList = {this.props.patientsData} 
            setState = {this.setState}
            setAllViewed = {this.setAllViewed}/>
        return (
            <div>
                {patients}
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewPatientRequest);