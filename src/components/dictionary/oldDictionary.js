import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import Select from 'react-select';
import * as TableAction from "../../action/TableAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from 'history';

import NestedList from '../common/sideNavBar/nestedList';
import DefaultTable from '../dictionary/defaultTable/defaultTable';
import Tabs from './tabs/tabs';
import DatasetList from './entityTable/datasetList/datasetList';
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
            tenantSelected: "ABC",
            startIndex:0
        };
    }
    componentDidMount = () => {
        this.props.getTenant(this.state.tenantSelected, true, "");
        history.push("/dictionary" + "/" + this.state.tenantSelected)
    };
    componentWillReceiveProps(nextProps) {
        if (!nextProps.SubMenuStatus) {
            console.log("if")
            this.setState({
                showStatus: false,
                menuData: nextProps.appsList &&
                    nextProps.appsList[this.state.startIndex] &&
                    nextProps.appsList[this.state.startIndex].opan && nextProps.appsList[this.state.startIndex].opan.split(" ").join("")
            }, () => {
                history.push("/dictionary" + "/" + this.state.tenantSelected + "/" + this.state.menuData)
            });
        } else if (nextProps.SubMenuStatus === true) {
            console.log("else")
            this.setState({
                showStatus: true,
                menuData: nextProps.appsList && nextProps.appsList[this.state.startIndex] && nextProps.appsList[this.state.startIndex].opan && nextProps.appsList[this.state.startIndex].opan.split(" ").join("")
            }, () => {
                history.push("/dictionary" + "/" + this.state.tenantSelected + "/" + this.state.menuData + "/" + this.state.subMenuData)
            });
        }
    }
    handleChangeType = tenantSelected => {
        this.props.getTenant(tenantSelected.value, false, tenantSelected);
        let selectUrl = tenantSelected.value ? tenantSelected.value.split(" ").join("") : "";

        let subMenu = this.props.appsList && this.props.appsList[0].opan && this.props.appsList[0].opan.split(" ").join("");
        this.setState({ tenantSelected: selectUrl, showStatus: false }, () => {
            this.props.subMenuChange(false);
            history.push("/dictionary" + "/" + selectUrl + "/" + subMenu)
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
        history.push("/dictionary" + "/" + this.state.tenantSelected + "/" + data)
    }
    ChangesubMenu = (data,id) => {
        this.setState({
            subMenuData: data,
            showStatus: true,
            subMenuId:id
        }, () => {
            this.props.subMenuChange(true);
            this.props.getSubMenuDetails(id,"",false);
        })
        history.push("/dictionary" + "/" + this.state.tenantSelected + "/" + this.state.menuData + "/" + data)
    }
    getTabsDetails = (data) => {
        this.props.getSubMenuDetails(this.state.subMenuId,data,true);
    }
    render() {
        const tenentOptions = this.props.tenantList ? this.props.tenantList.map(ds => ({
            label: ds.mainMember, value: ds.mainMember
        })) : ""
        return (
            <Row className="dictionary-page">
                <Col xs={12} sm={12} md={4} lg={2} xl={2} className="side-nav-col">
                    <Row className="select-row"><Col className="select-col">
                        <Select
                            value={this.props.tenantSelected}
                            onChange={this.handleChangeType}
                            options={tenentOptions}
                        /></Col></Row>
                    <Row className="sub-list-row">
                        <Col className="sub-list-col">
                            <NestedList
                                appList={this.props.appsList}
                                ChangeRouter={this.ChangeRouter}
                                ChangesubMenu={this.ChangesubMenu}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} sm={12} md={8} lg={10} xl={10} className="table-view">
                    {/* <DefaultTable appList={this.props.appsList} /> */}
                    {   this.state.showStatus ?
                        (<div>
                            <Tabs
                                getTabsDetails={this.getTabsDetails}
                                TabList={this.props.TabList}
                            />
                            <DatasetList />
                        </div> ) :
                        (<DefaultTable 
                            appList={this.props.appsList}
                            ChangesubMenu={this.ChangesubMenu}
                            ChangeRouter={this.ChangeRouter}
                            menuData={this.state.menuData}
                            />)
                    }
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = state => {
    const { TabelReducer } = state;
    return {
        tenantSelected: TabelReducer ? TabelReducer.tenantSelected : "",
        tenantList: TabelReducer ? TabelReducer.tenantList : [],
        appsList: TabelReducer ? TabelReducer.appsList : [],
        TabList:TabelReducer ? TabelReducer.TabList:[],
        SubMenuStatus:TabelReducer ? TabelReducer.SubMenuStatus:""
    };
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, TableAction), dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dictionary);