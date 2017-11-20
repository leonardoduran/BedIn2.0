import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/hospitalActions/patients';
import TableViewPendingPatientRequests from '../../components/hospitalViews/TableViewPendingPatientRequests.jsx';

// const tabCenterButtonDiv = {textAlign:"center"} 
// const tabCenterButton = {margin:"auto"}

function mapStateToProps(state) {
    return {
        isRequesting : state.patients.isRequesting,
        patientsData: state.patients.patientsData,
        newPatients: state.patients.thereAreNewPatients
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
    setState(idPatient,state) {
        this.props.fecthSetPatientState(idPatient, state)
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
            setState = {this.setState}
            setAllViewed = {this.setAllViewed}/>
        return (
            <div>
                {btnNewPatients}
                {patients}
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewPatientRequest);