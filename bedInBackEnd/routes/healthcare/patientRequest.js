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


/*
   var startOfDay = moment(req.params.serviceDate, 'MM/DD/YYYY')
                          .startOf('day').format('MM/DD/YYYY'),
   nextDay = moment(startOfDay, 'MM/DD/YYYY').add(1,'days')
                   .format('MM/DD/YYYY');

   console.log('startOfDay: ' + startOfDay);
   console.log('nextDay: ' + nextDay);
   BillingLog.find({
      _userId: new ObjectId(req.params.id),
      serviceDate: {
         $gte: startOfDay,
         $lt: nextDay
      }
   }).exec(function(err, billingLogs) {
      res.send(billingLogs);
   })
};
*/

app.get('/pending', function(req,res) {
   var startOfDay = moment(moment(), 'MM/DD/YYYY')
                          .startOf('day').format('MM/DD/YYYY'),

   nextDay = moment(startOfDay, 'MM/DD/YYYY').add(1,'days')
                   .format('MM/DD/YYYY');   
   prevDay = moment(startOfDay, 'MM/DD/YYYY').subtract(1,'days')
                   .format('MM/DD/YYYY');	

	patientRequest.find({
		healthcare: req.user.osCode,
		'sentTo.hospital': null,
        dateCreated: {
           $gte: prevDay,
           $lt: nextDay
        }		
	})
	.populate('healthcareplan', 'name')
	.populate('hospitalsAndState.hospital', 'name')
	.sort({dateCreated: -1})
	.exec()
	.then(patient => {
		patient = patient.map(eachPatient => {
			eachPatient = eachPatient.toObject();
			eachPatient.allRequestedHospitals = eachPatient.hospitalsAndState;
			delete eachPatient.hospitalsAndState;	
			eachPatient.viewedByHospitals = [];
			eachPatient.acceptedByHospital = [];
			eachPatient.allRequestedHospitals.forEach(eachHospital => {
				if(eachHospital.state === 'Visto') return eachPatient.viewedByHospitals.push(eachHospital)
				if(eachHospital.state === 'Aceptado') return eachPatient.acceptedByHospital.push(eachHospital)	
			})

			// if(moment(dateCreated).isSame(moment(), 'day'))
			// 	return eachPatient

			return eachPatient
		})
		res.send(patient)
	})
	.catch(error => {console.log(error); errorHandler.sendInternalServerError(res)});
})

app.get('/matched', function(req,res) {
   var startOfDay = moment(moment(), 'MM/DD/YYYY')
                          .startOf('day').format('MM/DD/YYYY'),

   nextDay = moment(startOfDay, 'MM/DD/YYYY').add(1,'days')
                   .format('MM/DD/YYYY');   
   prevDay = moment(startOfDay, 'MM/DD/YYYY').subtract(1,'days')
                   .format('MM/DD/YYYY');
	patientRequest.find({
		healthcare: req.user.osCode,
		'sentTo.hospital' : {"$ne": null},
        dateCreated: {
           $gte: prevDay,
           $lt: nextDay
        }	
	})
	.populate('healthcareplan', 'name')
	.populate('sentTo.hospital')
	.populate('sentTo.userFinanciador', 'name username')
	.sort({dateCreated: -1})
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