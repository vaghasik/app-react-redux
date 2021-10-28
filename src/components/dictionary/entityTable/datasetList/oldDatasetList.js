import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as TableAction from "../../../../action/oldTableAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import EntityView from '../entityView/entityView';
import './datasetList.scss';

class DatasetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Base",
      list: [
        {
          value: "da"
        }
      ],
      entityTitle:"",
      ActiveDatasetList: 0,
    };
  };
  componentDidMount() {
    this.props.getSubMenuDetails(this.state.type);
    this.getSchemaDate()
  }
  getSchemaDate=(id, data, indexI)=>{
    this.setState({
      entityTitle:data,
      ActiveDatasetList: indexI,
    })
    //console.log('test====',this.state.entityTitle);
    this.props.getSchemaDate(id);
  }
  render() {
    console.log('aaaaaa', this.props.dataList && this.props.dataList);
    return (
      <Row className="dataset-list-row">
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="dataset-list-col">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-input-icon" />
            <input type="search" placeholder={this.props.name} className="search-input" />
          </div>
          <div className="dataset-list">
            <ul>
              {
                this.props.dataList && this.props.dataList.map((data, indexI) =>
                  <li 
                      className={this.state.ActiveDatasetList === indexI ? "activeDatasetList":""}
                      onClick={()=>{ 
                        console.log('IndexId', indexI)
                        this.getSchemaDate(data.id,data.datsetNm) }}>
                      <span className="list-index">{indexI + 1}</span>
                      {data.datsetNm}
                  </li>)
              }
            </ul>
          </div>
        </Col>
        <Col xs={12} sm={12} md={4} lg={6} xl={6}>
          <EntityView entityTitle={this.state.entityTitle}/>
          </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  const { TabelReducer } = state;
  return {
    dataList: TabelReducer ? TabelReducer.dataList : []
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, TableAction), dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetList);