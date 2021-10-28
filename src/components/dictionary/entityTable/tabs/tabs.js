import React, { Component } from 'react';
import DataError from '../../../common/dataError/dataError';
import './tabs.scss';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [],
      dataErrorMsg: 'No Tabs Found',
      tabActive: 0
    };
  }

  getTabsDetails = (i, data) => {
    this.setState({
      tabActive: i
    })
    this.props.getTabsDetails(i, data);
  }
  render() {
    return (
      <div className="tabs">
        {this.props.TabList && this.props.TabList.length > 0 ?
        (this.props.TabList && this.props.TabList.length === 1 ?
          <ul className="one-tab">{
            this.props.TabList && this.props.TabList.map((data, i) =>
              <li key={i}
                className={this.state.tabActive == i ? "tabs-active" : ""}
                onClick={() => { this.getTabsDetails(i, data) }}>
                {data}
              </li>)}
          </ul>
       :  <ul className="multi-tabs">{
        this.props.TabList && this.props.TabList.map((data, i) =>
          <li key={i}
            className={this.state.tabActive == i ? "tabs-active" : ""}
            onClick={() => { this.getTabsDetails(i, data) }}>
            {data}
          </li>)}
      </ul>)
          : <DataError dataErrorMsg={this.state.dataErrorMsg} />
        }
      </div>
    )
  }
}
export default Tabs;