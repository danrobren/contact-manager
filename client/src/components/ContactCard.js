import React from 'react';
import avatar from "../images/avatar.jpg"

const ContactCard = (props) => {
		const { id, name, email } = props.contact;
	return (
		<div className="item">
				<div className="content">
					<div className="header">{name}</div>
					<div>{email}</div>
				</div>
				<button className="delete"
				style = {{color: "red", marginTop: "5px"}}>
				Delete</button>
			</div>
	)
}

export default ContactCard