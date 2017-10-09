import React from 'react';

import moment from 'moment';

function TableViewMessages(props) {
	const tableStyle = {border:"1px solid black"};
	const setRowColor = (color) => ({backgroundColor : color})  
	const tableBody = props.messages.map((msg) =>
		<tr style={tableStyle}>
			<td style={tableStyle}>{msg.hospitalId.name}</td>
			<td style={tableStyle}>{msg.userId.name}</td>
			<td style={tableStyle}>{msg.message}</td>
		</tr>
		)
	return (
		<div>
            <table style={{border:"1px solid grey"}} className= "table table-responsive">
            	<thead style={{border:"1px solid grey"}}>
                	<tr style={Object.assign({}, setRowColor('lightgrey'))}>
                		<th style={{border:"1px solid grey"}}>Institución</th>
                		<th style={{border:"1px solid grey"}}>Usuario</th>
                		<th style={{border:"1px solid grey"}}>          Mensaje          </th>
              		</tr>
              	</thead>
              	<tbody>
              		{tableBody}
              	</tbody>
            </table>
		</div>
	)
}

export default TableViewMessages;
