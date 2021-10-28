import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { BrowserRouter, Route, withRouter } from "react-router-dom";

class DicsSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenantList: [],
    };
  }
  componentDidMount = () => {
    this.getTenant();
  };
  getTenant = () => {
    //url not workiong use direct data
    axios.get(`https://stream-restaurant-menu-svc.herokuapp.com/category`) 
      .then(response => {
        this.state.defaultTenant = response.data;
        this.setState({
          tenantList: response.data,
        });
        const defaultTenant = response.data[0].tenant;
        this.handleChangeType({ label: defaultTenant, value: defaultTenant });
      })
      .catch(error => console.log(error))
  };
  handleChangeType = tenantSelected => {
    //this.props.history.push(`/${tenantSelected.target.value}`);
    this.setState({ tenantSelected });
    this.getApps(tenantSelected.value);
    //adding the url when click
    if (this.props.match.params.hasOwnProperty("appName")) {
      let state = { 'tenant': { tenantSelected } }
      history.pushState(state, null, `/dictionary/${tenantSelected}`);
    } else {
      this.props.history.push(`${tenantSelected}`);
    }
  };
  render() {
    const tenentOption = this.state.tenantList.map(ds => ({
      label: ds.tenant, value: ds.tenant
    }));
    return (
      <Select
        value={this.state.tenantSelected}
        onChange={this.handleChangeType}
        options={tenentOption}
      />
    );
  }
}
export default DicsSelect;
