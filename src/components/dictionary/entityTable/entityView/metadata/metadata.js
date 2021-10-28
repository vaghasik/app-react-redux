import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import './metaData.scss';

class MetaData extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Row>
        <div>
          <table>
            Metadata
          </table>
        </div>
        <div>
          <table>
            
          </table>
        </div>
      </Row>
    );
  }
}
export default MetaData;