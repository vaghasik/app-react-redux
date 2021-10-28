import React, { Component } from 'react';
import './tabs.scss';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabList: [],
    };
  }
  getTabsDetails=(data)=>{
    this.props.getTabsDetails(data);
 }
  render() {
    return (
      <div className="tabs">
        <ul className="">{
            this.props.TabList && this.props.TabList.map((data,i) => 
            <li key={i}
            // className={this.state[data] ? "MenuActive":""}
            onClick={()=>{this.getTabsDetails(i)}}>
              {data}
          </li>)}
        </ul>
      </div>
    )
  }
}
export default Tabs;