import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import Schema from './schema/oldSchema';
import MetaData from './metadata/metadata';
import SampleData from './sampleData/sampleData';
import Lineage from './lineage/lineage';
import * as TableAction from "../../../../action/oldTableAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import './entityView.scss';

class EntityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: ["Schema", "Metadata", "Sample Data", "Lineage"],
      //appsList: [],
      //defaultSelected: 0,
      //isOpen: false,
      ActiveStatus:"Schema"
    };
  }
  // componentDidMount() {
  //   this.props.getEntityDetails(this.state.type);
  // }
  // getEntityDetails = (data) => {
  //  console.log("*****" +this.props.getEntityDetails);
  //  //this.props.getEntityDetails(this.state.subMenuId,data,true);
  // }
  changeTab=(data)=>{
    this.setState({
       ActiveStatus:data
    });
  }
  render() {
    return (
      <div className="entity-view">
        <div className="dataset-name">
          <span>{this.props.entityTitle ? this.props.entityTitle:""+ "  "}</span>
          <FontAwesomeIcon icon={faPencilAlt} />
          {/* TODO Textarea toggle */}
        </div>
        <div className="entity-tabs-row">
          {/* < EntityTabs /> */}
          <ul>
            {this.state.tabs.map(tab => (
              <li key={tab} className={this.state.ActiveStatus === tab ? "activeTab":""} onClick={()=>{
                this.changeTab(tab);
              }}> {tab}</li>
            ))}
          </ul>
        </div>
        <div className="entity-details-row">
          {this.state.ActiveStatus === "Schema" ? (<Schema schemaData={this.props.schemaData} />)
          :this.state.ActiveStatus === "Metadata" ? (<MetaData />)
          :this.state.ActiveStatus === "Sample Data" ? (<SampleData sampleData={this.props.sampleData}/>)
          :this.state.ActiveStatus === "Lineage" ?(<Lineage />)
          :"" }
          {/*  */}
          {/**/}
          {/* <Lineage /> */}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const { TabelReducer } = state;
  return {
    schemaData: TabelReducer && TabelReducer.entityList && 
              TabelReducer.entityList.schemaDetails
            ? TabelReducer.entityList.schemaDetails : [],
    sampleData: TabelReducer && TabelReducer.entityList && 
            TabelReducer.entityList.sample
          ? TabelReducer.entityList.sample : [],
            
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, TableAction), dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityView);
