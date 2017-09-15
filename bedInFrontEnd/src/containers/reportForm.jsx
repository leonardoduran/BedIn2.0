import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/formActions';
import TableViewReport from '../components/TableViewReport.jsx';
import moment from 'moment';
import store from '../redux/store';

function mapStateToProps(state) {
    return {
        isRequesting : state.formReducers.isRequesting,
        patientsData: state.formReducers.historicalPatients,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
class ViewReport extends React.Component {
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
    }

    getPatients() {
        let typeUser = store.getState().authentication.userType;
        let dateFrom=document.getElementById("dateFrom").value
        let dateTo=document.getElementById("dateTo").value
        let hospitalId=null
        let healthcareId=null
        typeUser == 'Hospital' ? hospitalId = store.getState().authentication.institucionCode :
        typeUser == 'Financiador' ? healthcareId = store.getState().authentication.institucionCode :
        hospitalId = null


        if (dateFrom=='' || dateTo=='')
            return alert("Tienen que ingresarse las dos fechas")
        if (dateFrom > dateTo)
            return alert("La fecha desde no puede ser mayor a hasta")
        
        this.props.fecthHistoricalPatients(dateFrom, dateTo, hospitalId, healthcareId)

    }
    clean(){
        this.props.cleanHistoricalPatients()
    }

    render() {
        let patients = (this.props.patientsData && this.props.patientsData.length>0) ? 
        <TableViewReport 
            patientsList = {this.props.patientsData} 
        />
        :
        null

        return (
            <div>
 
                <form className="form-inline">
                  <div className="form-group">
                    <label>Desde</label>
                    <input type="date" className="form-control" id="dateFrom"></input>
                  </div>
                  <div className="form-group">
                    <label>Hasta</label>
                    <input type="date" className="form-control" id="dateTo"></input>
                  </div>
                  <button onClick={this.getPatients.bind(this)} className="btn btn-default">Buscar</button>
                  <button onClick={this.clean.bind(this)} className="btn btn-default">Limpiar</button>
                </form>   
                    {patients}
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewReport);