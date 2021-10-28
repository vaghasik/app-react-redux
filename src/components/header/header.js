import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect, Prompt } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCalculator} from '@fortawesome/free-solid-svg-icons';
import { faAdobe } from '@fortawesome/free-brands-svg-icons';
import './header.scss';
//import ModalPopUp from '../common/modalPopUp/headerModal';
import ReactTooltip from 'react-tooltip';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	openBugWindow = () => {
		const bugLink = 'https://google.com';
		window.open(bugLink, '_self');
	}
	render() {
		const email = 'abcxyz@gmail.com';
		return (
			<header className="header-row">
				{/* <img src={xyzLogo} alt="Logo" className="xyz-logo-img" /> */}
				<span className="header-menu">
					<NavLink to="/configuration" className="header-menu-link" activeStyle={{ color: '#3a3a3a' }}>
						<FontAwesomeIcon icon={faCoffee}
							className="header-menu-icon"
							data-tip data-for='conform' />
					</NavLink>
					<NavLink to="/source" className="header-menu-link" activeStyle={{ color: '#3a3a3a' }}>
						<FontAwesomeIcon icon={faCalculator}
							className="header-menu-icon"
							data-tip data-for='source' /></NavLink>
					<NavLink exact to="/dictionary" className="header-menu-link" activeStyle={{ color: '#3a3a3a' }}>
						<FontAwesomeIcon icon={faAdobe}
							className="header-menu-icon"
							aria-hidden="true"
							data-tip data-for='dictionary' /></NavLink>
						{/* <Prompt>TODO for authentication
						when={}
						message={(location)=> {
							return location.pathname.startWith('/asdf')
						}}
						</Prompt> */}
				</span>
				<ReactTooltip id='source' place="top" type="dark" effect="float">Sources</ReactTooltip>
				<ReactTooltip id='dictionary' place="top" type="dark" effect="float">Dictionary</ReactTooltip>
				<ReactTooltip id='configuration' place="top" type="dark" effect="float">Configuration</ReactTooltip>
				{/* <ModalPopUp /> */}
			</header>
		);
	}
}

export default Header;
