import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Collapse, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes, faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
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
    this.toggle(0);
    this.getTypes();
  }
  getTypes = () => {
    axios.get(`https://stream-restaurant-menu-svc.herokuapp.com/category`)
      .then(response => {
        this.setState({
          appsList: response.data[0].apps,
        });
      })
      .catch(error => console.log(error))
  };
  toggle(i) {
    this.state.appsList.map((data, index) => {
      index !== i ? this.setState({
        [index]: false,
      }) : ""
    });
    this.setState({
      defaultSelected: 1,
      [i]: !this.state[i],
    });
  }
  render() {
    return (
      <div className="nested-list">
        {this.state.appsList.map((item, index) => {
          return (
            <ul>
              <li key={index} onClick={() => { this.toggle(index) }}>
                {/* <FontAwesomeIcon icon={faCubes} /> */}
                {/* <NavLink to={`/dictionary/${tenantClicked}/${dataItem.appName}`}> */}
                <Link>
                {item.an}
                <span className="sub-list-arrow">
                  {item.sad.length > 0 ?
                    (this.state[index] ?
                      <FontAwesomeIcon icon={faAngleDown} />
                      : <FontAwesomeIcon icon={faAngleRight} />
                    )
                    : ''
                  }
                </span>
                </Link>
              </li>
              {item.sad.map((subitem, i) => {
                return (
                  <Collapse isOpen={this.state[index]} className="sub-list-collapse">
                    <ul><li key={i}>
                      <Link>
                      {subitem.sNm}
                      </Link>
                      </li></ul>
                  </Collapse>
                );
              })}
            </ul>
          )
        })}
      </div>
    )
  }
}
export default NestedList;