import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import Select from 'react-select';
import axios from 'axios';
//import NestedList from '../common/sideNavBar/sideNaveBar';
import './source.scss';

class Source extends Component {
	constructor(props) {
		super(props);
		this.state = {
			source: [],
		}
	}
	componentDidMount() {
		this.getAllSource();
	}
	getAllSource = (currentData, status) => {
		let newApps = [];
		axios.get(`https://stream-restaurant-menu-svc.herokuapp.com/category`)
			.then(response => {
				console.log('response.data', response.data);
				this.setState({
					source: response.data,
				});
			})
			.catch(error => console.log(error))
	};
	handleChangeSource = sourceSelected => {
		this.getTenant(sourceSelected.value, false);
		//this.props.history.push(`/${sourceSelected.target.value}`);
		this.setState({ sourceSelected: sourceSelected });
		// TODO for Router adding the url when click
		// if (this.props.match.params.hasOwnProperty("appName")) {
		// 	let state = { 'tenant': { sourceSelected } }
		// 	history.pushState(state, null, `/dictionary/${sourceSelected}`);
		// } else {
		// 	this.props.history.push(`${sourceSelected}`);
		// }
	};
	render() {
		const sourceOptions = this.state.source.map(ds => ({
			label: ds, value: ds
		}));
		return (
			<Row className="source-page">
				<Col xs={12} md={4} lg={2} className="side-nav">
					<Select
						value={this.state.sourceSelected}
						onChange={this.handleChangeSource}
						options={sourceOptions}
					/>
					{/* <NestedList /> */}
				</Col>
				<Col xs={12} md={8} lg={10} className="table-view">
					Table
				</Col>
			</Row>
		);
	}
}
export default Source;