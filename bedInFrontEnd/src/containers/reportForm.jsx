import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/formActions';
import TableViewReport from '../components/TableViewReport.jsx';
import moment from 'moment';
import store from '../redux/store';

const tabButton = {marginLeft:"10px"} 

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

    saveTable(){
        let data_type = 'data:application/vnd.ms-excel';
        let table_div = document.getElementById('table_wrapper');
        let table_html = table_div.outerHTML.replace(/ /g, '%20');

        while (table_html.indexOf('á') != -1) table_html = table_html.replace('á', '&aacute;');
        while (table_html.indexOf('Á') != -1) table_html = table_html.replace('Á', '&Aacute;');
        while (table_html.indexOf('é') != -1) table_html = table_html.replace('é', '&eacute;');
        while (table_html.indexOf('É') != -1) table_html = table_html.replace('É', '&Eacute;');
        while (table_html.indexOf('í') != -1) table_html = table_html.replace('í', '&iacute;');
        while (table_html.indexOf('Í') != -1) table_html = table_html.replace('Í', '&Iacute;');
        while (table_html.indexOf('ó') != -1) table_html = table_html.replace('ó', '&oacute;');
        while (table_html.indexOf('Ó') != -1) table_html = table_html.replace('Ó', '&Oacute;');
        while (table_html.indexOf('ú') != -1) table_html = table_html.replace('ú', '&uacute;');
        while (table_html.indexOf('Ú') != -1) table_html = table_html.replace('Ú', '&Uacute;');
        while (table_html.indexOf('º') != -1) table_html = table_html.replace('º', '&ordm;');
        while (table_html.indexOf('ñ') != -1) table_html = table_html.replace('ñ', '&ntilde;'); 
        while (table_html.indexOf('Ñ') != -1) table_html = table_html.replace('Ñ', '&Ntilde;');

        let dateFrom=document.getElementById("dateFrom").value
        let dateTo=document.getElementById("dateTo").value

        let a = document.createElement('a');
        a.href = data_type + ', ' + table_html;
        a.download = 'Reporte_Desde_'+dateFrom+'_Hasta_'+dateTo+'.xls';
        a.click();

    }

    render() {
        let patients = (this.props.patientsData && this.props.patientsData.length>0) ? 
        <TableViewReport 
            patientsList = {this.props.patientsData} 
        />
        :
        null
        let btnExcel  = (this.props.patientsData && this.props.patientsData.length>0) ? 
            <button title="Generar Excel" type="button" className="btn btn-success" style={tabButton}
                onClick={this.saveTable.bind(this)}>
                Excel
            </button>
        : null
        return (
            <div>
 
                <form className="form-inline">
                  <div className="form-group">
                    <label>Desde</label>
                    <input type="date" className="form-control" id="dateFrom" style={tabButton}></input>
                  </div>
                  <div className="form-group" style={tabButton}>
                    <label style={tabButton}>Hasta</label>
                    <input type="date" className="form-control" id="dateTo" style={tabButton}></input>
                  </div>
                  <button onClick={this.getPatients.bind(this)} className="btn btn-default" style={tabButton}>Buscar</button>
                  <button onClick={this.clean.bind(this)} className="btn btn-default" style={tabButton}>Limpiar</button>
                  {btnExcel}
                </form>   
                <div>
                    {patients}
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewReport);