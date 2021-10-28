import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import * as TableAction from '../../../../action/TableAction';
import Schema from './schema/schema';
import MetaData from './metadata/metadata';
import SampleData from './sampleData/sampleData';
import Lineage from './lineage/lineage';

import './entityView.scss';

class EntityView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: ["Schema", "Metadata", "Sample Data", "Lineage"],
      ActiveStatus: "Schema"
    };
  }
  changeTab = (data) => {
    this.setState({
      ActiveStatus: data
    });
  }
  render() {
    //console.log('Title....',this.props.metaData);
    return (
      <div className="entity-view">
        <div className="dataset-name">
          <span>
            {this.props.selectedTab === 'Others' ? 
              (this.props.entityTitle ? this.props.entityTitle : ""+ "  ") :
              (this.props.entityTitle ? this.props.entityTitle.toString().split("default.")[1]:""+ "  ")
            }
          </span>
          <FontAwesomeIcon icon={faPencilAlt} className="pencil-icon"/>
          {/* <textarea className="entity-title-textarea" placeholder="Enter Dataset Discription"></textarea> */}
          {/* TODO Textarea toggle */}
        </div>
          <ul className="entity-tabs-row">
            {this.state.tabs.map(tab => (
              <li key={tab}
                className={this.state.ActiveStatus === tab ? "activeTab" : ""}
                onClick={() => { this.changeTab(tab); }} >
                {tab}
              </li>
            ))}
          </ul>
          { this.state.ActiveStatus === "Schema" ? (<Schema schemaData={this.props.schemaData}  Before={this.props.schemaData}entityTitle={this.props.entityTitle}/>)
          : this.state.ActiveStatus === "Metadata" ? (<MetaData metaData={this.props.metaData} />)
          : this.state.ActiveStatus === "Sample Data" ? (<SampleData sampleData={this.props.sampleData} />)
          : this.state.ActiveStatus === "Lineage" ? (<Lineage />)
          : "" }
      </div>
    )
  }
}
const mapStateToProps = state => {
  const { TabelReducer } = state;
  return {
    entityTitle: TabelReducer && TabelReducer.entityList 
              ? TabelReducer.entityList.datasetName : [],
    schemaData: TabelReducer && TabelReducer.entityList &&
                TabelReducer.entityList.schemaDetails 
              ? TabelReducer.entityList.schemaDetails : [],
    sampleData: TabelReducer && TabelReducer.entityList &&
                TabelReducer.entityList.sample 
              ? TabelReducer.entityList.sample : [],
    metaData: TabelReducer && TabelReducer.entityList 
              ? TabelReducer.entityList : [],
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, TableAction), dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityView);