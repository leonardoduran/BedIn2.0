const express = require('express');
const app = express.Router();
const moment = require('moment');

const patientRequest = require('../../models/patientRequest');
const hospitalsController = require('../../controladores/hospitals');
const errorHandler = require('../../controladores/errorHandler');

app.post('/',hospitalsController.getHospitalsByPlan, function(req,res) {
	req.body.hospitalsAndState = req.hospitals;
	req.body.healthcare = req.user.osCode;
	patientRequest.create(req.body)
	.then(newRequest => res.send(newRequest))
	.catch(error => {console.log(error); errorHandler.sendInternalServerError(res)});
})

app.get('/pending', function(req,res) {
	const hoursViewev = 24;
	patientRequest.find({
		healthcare: req.user.osCode,
		'sentTo.hospital': null
	})
	.populate('healthcareplan', 'name')
	.populate('hospitalsAndState.hospital', 'name')
	.sort({dateCreated: -1})
	.exec()
	.then(patient => {
			patient = patient.filter(eachPatient => {
			eachPatient = eachPatient.toObject();
	
			var now = moment(new Date()); //todays date
			var end = moment(eachPatient.dateCreated); // another date
			var duration = moment.duration(now.diff(end));
			var hours = parseInt(duration.asHours());

			eachPatient.allRequestedHospitals = eachPatient.hospitalsAndState;
			delete eachPatient.hospitalsAndState;	
			eachPatient.viewedByHospitals = [];
			eachPatient.acceptedByHospital = [];
			eachPatient.allRequestedHospitals.forEach(eachHospital => {
				if(eachHospital.state === 'Visto') return eachPatient.viewedByHospitals.push(eachHospital)
				if(eachHospital.state === 'Aceptado') return eachPatient.acceptedByHospital.push(eachHospital)	
			})
			if(hours<hoursViewev)
				{
					return eachPatient
				}
		})
		res.send(patient)
	})
	.catch(error => {console.log(error); errorHandler.sendInternalServerError(res)});
})

// app.get('/matched', function(req,res) {
// 	const hoursViewev = 24;
// 	patientRequest.find({
// 		healthcare: req.user.osCode,
// 		'sentTo.hospital' : {"$ne": null}
// 	})
// 	.populate('healthcareplan', 'name')
// 	.populate('sentTo.hospital')
// 	.populate('sentTo.userFinanciador', 'name username')
// 	.exec()
// 	.then(patient => {
// 			patient = patient.filter(eachPatient => {
// 			eachPatient = eachPatient.toObject();	
// 			var now = moment(new Date()); //todays date
// 			var end = moment(eachPatient.dateCreated); // another date
// 			var duration = moment.duration(now.diff(end));
// 			var hours = parseInt(duration.asHours());
// 			if(hours<hoursViewev)
// 				{
// 					return eachPatient
// 				}
// 		})
// 		res.send(patient)
// 	})
// 	.catch(error => {console.log(error); errorHandler.sendInternalServerError(res)});
// })

app.get('/matched', function(req,res) {
	patientRequest.find({
		healthcare: req.user.osCode,
		'sentTo.hospital' : {"$ne": null}
	})
	.populate('healthcareplan', 'name')
	.populate('sentTo.hospital')
	.populate('sentTo.userFinanciador', 'name username')
	.exec()
	.then(patient => {res.send(patient)})
	.catch(error => {console.log(error); errorHandler.sendInternalServerError(res)});
})


app.post('/matched', function(req,res) {
	patientRequest.findByIdAndUpdate(req.body.patientRequestId, {
		$set: {
			'sentTo.hospital': req.body.idHospital,
			'sentTo.userFinanciador': req.user._id,
			'sentTo.matchedDate': Date.now()
		}
	}, {new: true})
	.then(updatedPatient => res.send(updatedPatient))
	.catch(error => {console.log(error); errorHandler.sendInternalServerError(res)});
})



module.exports = app; 