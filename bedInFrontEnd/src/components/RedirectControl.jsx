import React from 'react';
import { hashHistory } from 'react-router';

function RedirectControl(props) {
	alert('asnd')
	hashHistory.push(`/${props.userType}`);
	return (
		<div></div>
	)
}

export default RedirectControl;