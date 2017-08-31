import React from 'react';
import { hashHistory } from 'react-router';

function RedirectControl(props) {
	hashHistory.push(`/${props.userType}`);
	return (
		<div></div>
	)
}

export default RedirectControl;