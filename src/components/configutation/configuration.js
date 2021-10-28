import React, { Component, Fragment } from 'react';
import { Row, Col } from "reactstrap";
import NestedList from '../common/sideNavBar/nestedList';
import './configuration.scss';

class Configuration extends Component {
	constructor(props) {
		super(props);
		this.state = {
    
		}
	}
	render() {
		return (
			<Row className="configuration-page">
				<Col xs={6} md={4} lg={2} className="side-nav">
					<NestedList />
				</Col>
				<Col xs={12} md={8} lg={10} className="table-view">
					Table
				</Col>
			</Row>
		);
	}
}
export default Configuration;