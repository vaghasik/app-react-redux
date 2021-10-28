import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Select from 'react-select';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

import * as TableAction from "../../action/TableAction";
import NestedList from '../common/sideNavBar/nestedList';
import DefaultTable from '../dictionary/defaultTable/defaultTable';
import Tabs from './entityTable/tabs/tabs';
import DatasetList from './entityTable/datasetList/datasetList';
//import DataError from '../common/dataError/dataError';
//import EntityTable from './entityTable/entityTable';

import './dictionary.scss';

//const history = createHistory({
const history = createBrowserHistory({
	forceRefresh: false
});

class Dictionary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tenantList: [],
			appsList: [],
			tenantSelected: '',
			startIndex: 0,
			samplebook: 'Sample Book',
			tabStatus: true,
			dataErrorMsg: 'Data not available',
		};
	}
	componentDidMount = () => {
		this.props.getTenant(true, history);
		//history.push("/dictionary" + "/" + this.state.tenantSelected)
	};
	componentWillReceiveProps(nextProps) {
		if (this.state.tabStatus) {
			if (!nextProps.SubMenuStatus) {
				//console.log("if", nextProps.appsList && nextProps.appsList[this.state.startIndex]);
				this.setState({
					showStatus: false,
					menuData: nextProps.appsList && nextProps.appsList[this.state.startIndex] && nextProps.appsList[this.state.startIndex].opan && nextProps.appsList[this.state.startIndex].opan.split(" ").join("")
				}, () => {
					history.push("/dictionary" + "/" + this.props.tenantSelected.value + "/" + this.state.menuData)
				});
			} else if (nextProps.SubMenuStatus === true) {
				//console.log("else")
				this.setState({
					showStatus: true,
					menuData: nextProps.appsList && nextProps.appsList[this.state.startIndex] && nextProps.appsList[this.state.startIndex].opan && nextProps.appsList[this.state.startIndex].opan.split(" ").join("")
				}, () => {
					history.push("/dictionary" + "/" + this.props.tenantSelected.value + "/" + this.state.menuData + "/" + this.state.subMenuData + "/" + nextProps.selectedTab)
				});
			}
		}
	}
	handleChangeType = tenantSelected => {
		//console.log("tenantSelected",tenantSelected)
		this.props.getTenant(false, tenantSelected.value, tenantSelected);
		//let selectUrl = tenantSelected.value ? tenantSelected.value.split(" ").join("") : "";

		let subMenu = this.props.appsList && this.props.appsList[0].opan && this.props.appsList[0].opan.split(" ").join("");
		this.setState({ 
			//tenantSelected: selectUrl, 
			tenantSelected: tenantSelected.value, 
			showStatus: false }, 
			() => {
			this.props.subMenuChange(false);
			history.push("/dictionary" + "/" + tenantSelected.value + "/" + subMenu)
		});
	};
	ChangeRouter = (i, data) => {
		this.setState({
			menuData: data,
			startIndex: i,
			showStatus: false
		}, () => {
			this.props.subMenuChange(false);
		});
		history.push("/dictionary" + "/" + this.props.tenantSelected.value + "/" + data)
	}
	ChangesubMenu = (data, id) => {
		this.setState({
			subMenuData: data,
			showStatus: true, 
			subMenuId: id,
		}, () => {
			this.props.subMenuChange(true);
			this.props.getSubMenuDetails(id, "", false);
		})
		history.push("/dictionary" + "/" + this.props.tenantSelected.value + "/" + this.state.menuData + "/" + data)
	}
	getTabsDetails = (data, tabData) => {
		this.setState({
			tabStatus: false,
			defaultdatastatus:true
		}, () => {
			this.props.getSubMenuDetails(this.state.subMenuId, data, true);
			history.push("/dictionary" + "/" + this.props.tenantSelected.value + "/" + this.state.menuData + "/" + this.state.subMenuData + "/" + tabData)
		})
	}
	getEntityDetails = (id, data, indexI) => {
		//console.log("DATA@@@@@", indexI);
		this.setState({
			ActiveDatasetList: indexI,
		}, () => {
			this.props.getEntityDetails(id);
			history.push("/dictionary" + "/" + this.props.tenantSelected.value + "/" + this.state.menuData + "/" + this.state.subMenuData + "/" + this.props.selectedTab + "/" + data)
		})
	}
	// getEntityDetails=(id,data,index)=>{
	// 	alert(data);
	// }
	render() {
		//console.log("tenant list", this.props.tenantList);
		//console.log("tenant", this.props.tenantSelected);
		const tenentOptions = this.props.tenantList ? this.props.tenantList.map(ds => ({
			label: ds.mainMember, value: ds.mainMember
		})) : "";
		return (
			<Fragment>
				{/* { this.props.tenantList ?  */}
				<Row className="dictionary-page">
					<Col xs={12} sm={12} md={4} lg={2} xl={2} className="side-nav-col">
						<Select className="dics-select"
							value={this.props.tenantSelected}
							onChange={this.handleChangeType}
							options={tenentOptions}
						/>
						<NestedList
							appList={this.props.appsList}
							ChangeRouter={this.ChangeRouter}
							ChangesubMenu={this.ChangesubMenu}
						/>
					</Col>
					<Col xs={12} sm={12} md={8} lg={10} xl={10} className="table-view">
						{this.state.showStatus ?
							(<div className="entity-table">
								<div className="service">
									<span className="service-name" >{this.props.serviceName}</span>
									{this.props.sQueryLink === (null || '') ? "" :
										<a href={this.props.sQueryLink} target="_blank" className="sample-book-link" data-tip data-for='sampleBook' >
											<FontAwesomeIcon icon={faFileAlt} className="sample-book-icon" />
										</a>
									}
									<ReactTooltip id='sampleBook' place="top" type="dark" effect="float">{this.state.samplebook}</ReactTooltip>
								</div>
								<Tabs
									getTabsDetails={this.getTabsDetails}
									TabList={this.props.TabList}
								/>
								<DatasetList
									//getDataListDetails={this.getDataListDetails}
									dataList={this.props.dataList}
									selectedTab={this.props.selectedTab}
									getEntityDetails={this.getEntityDetails} 
									defaultdatastatus={this.state.defaultdatastatus}/>
								{/* <EntityTable /> */}
							</div>) :
							(<DefaultTable
								appList={this.props.appsList}
								ChangesubMenu={this.ChangesubMenu}
								ChangeRouter={this.ChangeRouter}
								menuData={this.state.menuData}
							/>)
						}
					</Col>
				</Row>
				{/* : <DataError dataErrorMsg={this.state.dataErrorMsg} /> } */}
			</Fragment>
		);
	}
}
const mapStateToProps = state => {
	const { TabelReducer } = state;
	return {
		tenantSelected: TabelReducer ? TabelReducer.tenantSelected : "",
		tenantList: TabelReducer ? TabelReducer.tenantList : [],
		appsList: TabelReducer ? TabelReducer.appsList : [],
		TabList: TabelReducer ? TabelReducer.TabList : [],
		dataList: TabelReducer ? TabelReducer.dataList : [],
		serviceName: TabelReducer ? TabelReducer.serviceName : "",
		sQueryLink: TabelReducer ? TabelReducer.sQueryLink : "",
		SubMenuStatus: TabelReducer ? TabelReducer.SubMenuStatus : "",
		selectedTab: TabelReducer ? TabelReducer.selectedTab : "",
	};
};
function mapDispatchToProps(dispatch) {
	return bindActionCreators(Object.assign({}, TableAction), dispatch);
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dictionary);