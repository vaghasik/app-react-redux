import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import * as TableAction from "../../../action/oldTableAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import '../sideNavBar/sideNavBar.scss';

class NestedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appsList: [],
      defaultSelected: 0,
      isOpen: false,
    };
  }
  componentDidMount() {
    this.toggleArrow(0,true);
  }
  
  toggleArrow(i,status,data) {
     if(!status){
        this.props.ChangeTableData(i,true);
        this.props.ChangeRouter(i,data ? data.split(" ").join(""):"");
     }
    this.props.appsList.map((data, index) => {
      index !== i ? this.setState({
        [index]: false,
      }) : ""
    });
    this.setState({
      defaultSelected: 1,
      [i]: !this.state[i],
    });
  }
  subMenuArrow(i,status,data){
      this.props.ChangesubMenu(data ? data.split(" ").join(""):"")
  }
  render() {
    console.log(window.location.pathname)
    return (
      <div className="nested-list">
        {this.props.appList ? this.props.appList.map((item, index) => {
          return (
            <ul>
              <li key={index} 
                className={this.state[index] ? "MenuActive":""} 
                onClick={() => { this.toggleArrow(index,false,item.opan) }}> 
                {/* <NavLink to={`/dictionary/${tenantClicked}/${dataItem.appName}`}> */}
                <Link>
                {item.opan}
                <span className={"sub-list-arrow"}>
                  {item.mad.length > 0 ?
                    (this.state[index] ?
                      <FontAwesomeIcon icon={faAngleDown} />
                      : <FontAwesomeIcon icon={faAngleRight} />
                    )
                    : ''
                  }
                </span>
                </Link>
              </li>
              {item.mad.map((subitem, i) => {
                return (
                  <Collapse isOpen={this.state[index]} className="sub-list-collapse">
                    <ul><li key={i} onClick={() => {this.subMenuArrow(i,false,subitem.mNm)}}>
                      <Link>
                         {subitem.mNm}
                      </Link>
                      </li></ul>
                  </Collapse>
                );
              })}
            </ul>
          )
        }):""}
      </div>
    )
  }
}

const mapStateToProps = state => {
	const { TabelReducer } = state;
    return {
		    appsList:TabelReducer ? TabelReducer.appsList:[]
    };
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Object.assign({}, TableAction), dispatch);
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NestedList);