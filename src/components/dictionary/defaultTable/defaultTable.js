import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TableAction from "../../../action/oldTableAction";
import '../defaultTable/defaultTable.scss';

class DefaultTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			serviceList: [],
			startIndex: 0,
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.tableStatus) {
			this.setState({
				startIndex: nextProps.CurrentSelect
			})
		}
	}
	subMenu(i,status,data,id){
    this.props.ChangesubMenu(data ? data.split(" ").join(""):"",id)
}
	render() {
		return (
			<Row className="default-table-row">
				<Col className="default-table-col">
					<h4 className="apps-name"> {this.props.menuData} </h4>
					<div className="default-table-header">
						<table>
							<thead>
								<tr>
									<th>Service</th>
									<th>Description</th>
									<th>Use cases</th>
									<th>Contact List</th>
								</tr>
							</thead>
						</table>
					</div>
					<div className="default-table-body">
						<table>
							<tbody >
								{
									this.props.appList[this.state.startIndex] && this.props.appList[this.state.startIndex].mad && this.props.appList[this.state.startIndex].mad.length > 0 ?
										this.props.appList[this.state.startIndex].mad.map((subitem, i) =>
											<tr key={i}>
												<td onClick={() => {this.subMenu(i,false,subitem.mNm,subitem.mId)}} >
													{subitem.mNm}
													</td>
												<td>{subitem.mDes}</td>
												<td>{subitem.mUsage}</td>
												<td>{this.props.appList[this.state.startIndex] && 
														this.props.appList[this.state.startIndex].opmt && 
														this.props.appList[this.state.startIndex].opmt.apCntcts ?
														this.props.appList[this.state.startIndex].opmt.apCntcts.map((data, i) => data) : ""}
												</td>
											</tr>
										)
										: null
								}
							</tbody>
						</table>
					</div>
				</Col>
			</Row>
		)
	}
}
const mapStateToProps = state => {
	const { TabelReducer } = state;
	return {
		CurrentSelect: TabelReducer ? TabelReducer.CurrentSelect : "",
		tableStatus: TabelReducer ? TabelReducer.tableStatus : ""
	};
};
function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, TableAction), dispatch);
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DefaultTable);