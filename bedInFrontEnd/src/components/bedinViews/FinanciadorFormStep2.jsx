import React from 'react';

import { Link } from 'react-router';


function FinanciadorFormStep2(props) {
   let popup = null;
   if(props.success) {
      popup = (<div>
        <div className="modal-backdrop" id="modal-backdrop"></div>
        <div className="modal" id="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">El financiador se ha creado exitosamente</h4>
                </div>
                <div className="modal-footer ">
                          <Link to="/Bedin" >
                          <button type="submit" className=" button " data-dismiss="modal" id="newbtn11">Home</button></Link>
                </div>
              </div>
            </div>
        </div>
              </div>)
  }
  return (
    <div>
    
        <div className="container container_a">
          <div className="row">
           
            <div className="col-xs-1 col-sm-1 col-lg-1"></div>
            
            <div className="col-xs-5 col-sm-5 col-lg-5" id="a">
              
                <div className="form-horizontal">  
                  <div className="form-group " id="b">
                    <label htmlFor="exampleInputName2" className="col-sm-2 control-label">Plan</label>
                    <div className="col-sm-10">
                        <span aria-hidden="true"></span>
                        <input type="text" className="form-control" id="inputEmail3" name="plan" placeholder="Ingrese Plan"></input>
                    </div>
                  </div>
                </div>
              
              <label>Seleccione Prestador/es <br/>acorde al plan</label>
              <form name="hospitalChecklist">
                    {props.hospitals.map((hospital, i) =>
                      <div key={i} className="checkbox" id="c">
                        <input type="checkbox" name="hospitals" type="checkbox" data-id = {hospital._id} value={hospital.name} />{hospital.name}<br/>
                      </div>
                    )}          
              </form>
                <div className="form-group" >
                <div className="col-sm-offset-3 col-sm-10">
                   <button onClick={(e) => {
                          e.preventDefault();
                          let plan = document.querySelector('input').value;
                          let hospitals = [];
                          document.querySelector('form').elements.hospitals.forEach((input) => {
                           if(input.checked) hospitals.push({value:input.value, id: input.dataset.id})
                          })
                          props.add(plan, hospitals)
                          document.querySelector('input').value = "";
                          document.querySelector('form').reset()
                        }} id="newbtn" 
                      >Add</button> 
                </div>
                </div>
            </div>
            

            <div className="col-xs-5 col-sm-5 col-lg-5" id="f">
                <table className="table  g" >
                  <thead>
                    <tr id="th" >
                      <th >PLANES</th>
                      <th >PRESTADOR</th>
                    </tr>
                  </thead>
                  <tbody>
                        {props.planInputs.map((plan, i) =>
                    <tr key={i}  >
                      <td >{props.planInputs[i]}</td>
                      <td >{props.hospitalInputs[i].map((singleHospital) => <p key={singleHospital.id}> {singleHospital.value} </p>)}</td>
                    </tr>
                    )}
                  </tbody>
                </table>
                
            </div>

          
            
          </div><button  id="newbtn1"onClick={props.submitAll}>Submit All</button>
        </div>
        <div >{popup}</div>

     </div>
  
  )
}

export default FinanciadorFormStep2;