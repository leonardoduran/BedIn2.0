const express = require('express');
const app = express.Router();

const patientRequest = require('../../models/patientRequest');
const errorHandler = require('../../controladores/errorHandler');

app.get('/', function(req,res) {
	patientRequest.find(
		{
			hospitalsAndState: {
				$elemMatch: {
					hospital: req.user.hospitalCode,
					state: null
					}
			},
			'sentTo.hospital': null,
			timeout: false
		}
	)
	.populate('healthcareplan', 'name')
	.populate('healthcare', 'name')
	.exec()
	.then(data => res.send(data))
	.catch(error => {console.log(error); errorHandler.sendInternalServerError(res)});
})

app.put('/', function(req,res) {
	patientRequest.findById(req.body.idPatientRequest)
	.then(patientRequestData => {
		let selectHospital = patientRequestData.hospitalsAndState.find(eachHospital =>	
			String(eachHospital.hospital) === String(req.user.hospitalCode))
		selectHospital.state = req.body.state;
		selectHospital.updatedDate = Date.now();
		selectHospital.userHospital = req.user._id;
		patientRequestData.save()
		.then(saveData => res.send(saveData));
	})
	.catch(error => {console.log(error); errorHandler.sendInternalServerError(res)});
})

app.get('/accepted', function(req,res) {
	patientRequest.find({
		hospitalsAndState: {
			$elemMatch: {
				hospital: req.user.hospitalCode,
				state: 'Aceptado'
			}
		}
	})
	.populate('healthcareplan', 'name')
	.populate('healthcare', 'name')
	.populate('hospitalsAndState.userHospital', 'name username')
	.exec()
	.then(patientRequestData => {
		if(patientRequestData.length) {
			patientRequestData = patientRequestData.map(eachPatientRequestData => {
				let selectHospital = eachPatientRequestData.hospitalsAndState.find(eachHospital =>	
					String(eachHospital.hospital) === String(req.user.hospitalCode))
				eachPatientRequestData = eachPatientRequestData.toObject();
				eachPatientRequestData.hospitalsAndState = selectHospital;
				return eachPatientRequestData;
			})	
			return res.send(patientRequestData)
		}
		res.send(patientRequestData)
	})
	.catch(error => {console.log(error); errorHandler.sendInternalServerError(res)});
})

module.exports = app;