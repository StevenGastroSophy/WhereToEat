import React from "react";

const BookIcon = props => (
	<div className="icon">
		<div className="book">
			<figure className="page" />
			<figure className="page" />
			<figure className="page" />
		</div>
		<div className="progress">
			{props.progress === 1
				? "Initializing . . ."
				: `${props.progress * 100}%`}
		</div>
	</div>
);

export default BookIcon;
