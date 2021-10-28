import React from 'react';
import './footer.scss';

const Footer = (props) => {
	return (
		<footer id="footer" className="fixed-bottom border-top px-4 py-2 d-flex align-items-center">
			<div className="footer-text">
				<span className="copyright pull-right">
					Copyright © {(new Date().getFullYear())}. All rights reserved.
				</span>
			</div>
		</footer>
	);
};

export default Footer;