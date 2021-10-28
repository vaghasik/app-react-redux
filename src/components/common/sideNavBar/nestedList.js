import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TableAction from "../../../action/TableAction";

import '../sideNavBar/sideNavBar.scss';

class NestedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appsList: [],
      defaultSelected: 0,
      isOpen: false,
      subMenuIndex: 0
    };
  }
  componentDidMount() {
    this.toggleArrow(0, true);
    //this.subMenuList(0, 0, "", "")
  }

  toggleArrow(i, status, data) {
    if (!status) {
      this.props.ChangeTableData(i, true);
      this.props.ChangeRouter(i, data ? data.split(" ").join("") : "");
    }
    this.props.appsList.map((data, index) => {
      //key = index;
      index !== i ? this.setState({
        ["sub" + index]: false,
        ["SubList" + this.state.subMenuIndex]: "",
      }) : ""
    });
    this.setState({
      defaultSelected: 1,
      ["sub" + i]: !this.state["sub" + i],
    });
  }
  subMenuList(MainIndex, i, status, data, id) {
    this.setState({ subMenuIndex: i })
    this.props.appsList.map((item, index) => {
      //key = index;
      index !== MainIndex ? this.setState({ ["sub" + index]: false }) : ""
      item.mad.map((subData, subIndex) => {
        //key = subIndex;
        subIndex !== i ? this.setState({ ['SubList' + subIndex]: false }) : ''
      })
    });
    this.setState({
      ["SubList" + i]: !this.state["SubList" + i],
      ["sub" + MainIndex]: true
    });
    this.props.ChangesubMenu(data ? data.split(" ").join("") : "", id)
  }
  render() {
    //console.log(window.location.pathname) ///dictionary/iCloud
    //this.props.appList.sort((a, b) => (a.an > b.an) ? 1 : -1); //Sorting appList in assending order
    return (
      <div className="nested-list">
        {this.props.appList ? this.props.appList.sort((a, b) => (a.opan > b.opan) ? 1 : -1).map((item, index) => {
          return (
            <ul>
              <li key={index}
                className={this.state["sub" + index] ? "menu-active" : ""}
                onClick={() => { this.toggleArrow(index, false, item.opan) }}>
                {item.opan}
                <span className="sub-list-arrow">
                  {item.mad.length > 0 ?
                    (this.state[index] ?
                      <FontAwesomeIcon icon={faAngleDown} />
                      : <FontAwesomeIcon icon={faAngleRight} />
                    )
                    : ''
                  }
                </span>
              </li>
              {item.mad.map((subitem, subIndex) => {
                return (
                  <Collapse isOpen={this.state["sub" + index]} 
                    className="sub-list-collapse">
                    <ul>
                      <li key={subIndex}
                        className={this.state["SubList" + subIndex] ? "sub-menu-active" : ""}
                        onClick={() => { this.subMenuList(index, subIndex, false, subitem.mNm, subitem.mId) }}
                      >
                        {subitem.mNm}
                      </li></ul>
                  </Collapse>
                );
              })}
            </ul>
          )
        }) : ""}
      </div>
    )
  }
}
const mapStateToProps = state => {
  const { TabelReducer } = state;
  return {
    appsList: TabelReducer ? TabelReducer.appsList : []
  };
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, TableAction), dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NestedList);