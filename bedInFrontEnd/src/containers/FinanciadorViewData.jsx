import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/viewFinanciador';
import Modal from 'react-modal';
import TableDataFinanciador from '../components/bedinViews/TableDataFinanciador.jsx';
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
		isRequesting : state.viewFinanciadores.isRequesting,
		financiadores: state.viewFinanciadores.financiadores,
		hospitals: 	   state.viewHospitals.hospitals
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class FinanciadorDataView extends React.Component {
	constructor(props) {
		super(props)
        this.state = {
            modalDeleteIsOpen : false,
            modalEditIsOpen : false,
            financiadorName : null,
            planName: null,
            financiardorId: null,
            planId: null
        }
		this.deletePlanFinanciador = this.deletePlanFinanciador.bind(this);
		this.updatePlanFinanciador = this.updatePlanFinanciador.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
		this.confirmEdit = this.confirmEdit.bind(this);
		this.closeDeleteModal = this.closeDeleteModal.bind(this);
		this.closeEditModal = this.closeEditModal.bind(this);
		this.addPlanFinanciador = this.addPlanFinanciador.bind(this);
		this.closeNewPlanModal = this.closeNewPlanModal.bind(this);
		this.confirmNewPlan = this.confirmNewPlan.bind(this);
	}

	componentWillMount() {
		if(! this.props.hospitals){
			this.props.fetchHospitals();
		}
		this.props.fetchFinancidadores();
	}
	
	deletePlanFinanciador(plan,financiador){
		this.setState({modalDeleteIsOpen: true, financiadorName : financiador.name, planName : plan.name, planId : plan._id, financiadorId: financiador._id});
	}

	updatePlanFinanciador(plan,financiador){
		this.setState({modalEditIsOpen: true, financiadorName : financiador.name, planName : plan.name, planId : plan._id, financiadorId: financiador._id});
	}

	closeDeleteModal() {
    	this.setState({modalDeleteIsOpen: false});
  	}

  	closeEditModal(){
  		this.setState({modalEditIsOpen: false});	
  	}
  
  	confirmDelete(){
		this.props.removePlanFinanciador(this.state.financiadorId,this.state.planId);
		this.setState({modalDeleteIsOpen: false});
  	}

  	confirmEdit(){	
        let htal = document.getElementById("addHospitales").value
        if (htal=="---Hospitales---")
        {
            alert("Hospital no seleccionado")
            return;
        }
		this.props.addHospitalFinanciador(this.state.financiadorId,this.state.planId,htal);
        this.setState({modalDeleteIsOpen: false});    

  	}

  	closeNewPlanModal(){
  		this.setState({modalNewPlanIsOpen: false});	
  	}
  
  	confirmNewPlan(){
		let txtNewPlan = document.getElementById("txtNewPlan").value
		this.props.addNewPlan(this.state.financiadorId,txtNewPlan);
		this.setState({modalNewPlanIsOpen: false});
  	}


	addPlanFinanciador(financiador){
		this.setState({modalNewPlanIsOpen: true, financiadorId : financiador._id});
	}

	render() {
		const dataFinanciadores = 
			(!this.props.financiadores) ? <p>Cargando...</p>
			: this.props.financiadores.map(financiador => 
				<TableDataFinanciador 
					key = {financiador._id} financiador = {financiador}
					deleteFinanciador = {this.deletePlanFinanciador}
					updateFinanciador = {this.updatePlanFinanciador}
					addPlanFinanciador = {this.addPlanFinanciador}
				/>)

        let hospitals = 
        		<div>
                  <form className="form-horizontal">
                    <div className="form-group">             
                      <label htmlFor="sel2" className="control-label col-sm-3">Hospitales</label>
                      <div className="col-sm-8">

                        <select className="form-control" name="htales" id="addHospitales">
                            <br></br>
                            <option>---Hospitales---</option>
                                {this.props.hospitals.map((hospital, i) =>
                            <option key={i} value={hospital._id}>{hospital.name}</option>
                            )}
                        </select>
                      </div>
                    </div>
                  </form>
         		</div>


		return (
			<div>
				{dataFinanciadores}

              <Modal
                isOpen={this.state.modalDeleteIsOpen}
                onRequestClose={this.closeDeleteModal}
                style={customStyles}
                contentLabel="Example Modal">
                Confirma eliminación del plan?
                <br/>
                <br/>
                Solicitante: {this.state.financiadorName}
                <br/>
                <br/>                
                Plan: {this.state.planName}
                <br/>
                <br/>
                <button onClick={this.confirmDelete}>Confirmar</button>
                <button onClick={this.closeDeleteModal}>Cancelar</button>
              </Modal>

              <Modal
                isOpen={this.state.modalEditIsOpen}
                onRequestClose={this.closeEditModal}
                style={customStyles}
                contentLabel="Example Modal">
                {hospitals}
                <br/>
                <br/>                
                <button onClick={this.confirmEdit}>Confirmar</button>
                <button onClick={this.closeEditModal}>Cancelar</button>
              </Modal>


              <Modal
                isOpen={this.state.modalNewPlanIsOpen}
                onRequestClose={this.closeNewPlanModal}
                style={customStyles}
                contentLabel="Example Modal">
                Nuevo plan
                <br/>
                <textarea name="txtNewPlan" id="txtNewPlan" cols="20" rows="1"></textarea>
                <br/>                
                <button onClick={this.confirmNewPlan}>Confirmar</button>
                <button onClick={this.closeNewPlanModal}>Cancelar</button>
              </Modal>


			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanciadorDataView);