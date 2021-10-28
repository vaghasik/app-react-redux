import React, { Component, Fragment } from 'react';
import { Row, Col } from 'reactstrap';

import DataError from '../../../common/dataError/dataError';
import EntityView from '../entityView/entityView';
import SearchInput from '../../../common/searchBar/searchInput';
import './datasetList.scss';

class DatasetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Base",
      list: [{ value: "da" }],
      //entityTitle: "",
      searchDataset: "Search",
      dataErrorMsg: 'Data not available',
      ActiveDatasetList: 0,
      defaultActiveDataset: 0,
      activeStatus: true,
      tabChangeStatus: true,
      searchData: ""
    };
  }
  componentDidMount() {
    ///  this.props.getSubMenuDetails(this.state.type);
    this.getEntityDetails()
  }
  getEntityDetails = (id, data, indexI) => {
    //console.log('id', indexI);
    this.setState({
      //entityTitle: data,
      ActiveDatasetList: indexI ? indexI : 0,
    }, () => {
      this.props.getEntityDetails(id, data, this.state.ActiveDatasetList);
    })
  }
  handleInputChange = (data) => {
    this.setState({
      searchData: data
    })
  }
  render() {
    //console.log('dataList', this.state.ActiveDatasetList);
    this.props.dataList && this.props.dataList.sort((a, b) => (a.datsetNm > b.datsetNm) ? 1 : -1); //Sorting dataList
    return (
      <Row className="dataset-list-row">
        <Col xs={12} sm={12} md={4} lg={4} xl={4} className="dataset-list-col">
          {this.props.dataList && this.props.dataList.length > 0 ?
            <Fragment>
              <SearchInput placeholder={this.state.searchDataset} handleInputChange={this.handleInputChange} />
              <div className="dataset-list">
                {this.props.selectedTab === 'Others' ?
                  <ul>
                    {this.state.dataList && this.state.dataList.filter(data => {
                      return data.datsetNm.toLowerCase().indexOf(this.state.searchData) > -1;
                    }).map((data, indexI) =>
                      <li key={indexI}
                        className={this.state.ActiveDatasetList === indexI ? "activeDatasetList" : ""}
                        onClick={() => { this.getEntityDetails(data.id, data.datsetNm, indexI) }}>
                        <span className="list-index">{indexI + 1}</span>
                        {data.datsetNm}
                      </li>)
                    }
                  </ul>
                  :
                  <ul>
                    {this.props.dataList && this.props.dataList.map((data, indexI) =>
                      <li key={indexI}
                        className={this.state.ActiveDatasetList === indexI ? "activeDatasetList" : ""}
                        onClick={() => { this.getEntityDetails(data.id, data.datsetNm, indexI) }}>
                        <span className="list-index">{indexI + 1}</span>
                        {data.datsetNm.split('default.')[1]}
                      </li>)
                    }
                  </ul>
                }
              </div>
            </Fragment>
            : <DataError dataErrorMsg={this.state.dataErrorMsg} />
          }
        </Col>
        <Col xs={12} sm={12} md={4} lg={6} xl={6} className="entity-view-col">
          <EntityView selectedTab={this.props.selectedTab}
          // entityTitle={this.state.entityTitle} 
          />
        </Col>
      </Row>
    );
  }
}
export default DatasetList;