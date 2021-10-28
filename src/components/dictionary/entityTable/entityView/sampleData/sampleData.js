import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './sampleData.scss';

class SampleData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFields: 'search fields',
      searchDiscription: 'Search description',
      sample: [
        [
          {
            "colNm": "container",
            "colVal": "com.apple.photos.cloud"
          },
          {
            "colNm": "ireporter_id",
            "colVal": "8e66bf735797fcf9452d97b093a7dc0e00"
          },
          {
            "colNm": "event_time",
            "colVal": "1570164364861"
          }
        ],
        [
          {
            "colNm": "container",
            "colVal": "com.apple.photos.cloud"
          },
          {
            "colNm": "ireporter_id",
            "colVal": "f90eb1eb216340f190d6bc4991f12d8400"
          },
          {
            "colNm": "event_time",
            "colVal": "1570164244393"
          }
        ]
      ]
    };
  }
  render() {
    return (
      <Row className="schema-row">
        <Col className="schema-col">
          <div className="schema-table-header">
            <table>
              <thead>
                {this.props.sampleData[0].map((subitem, i) => {
                  return (<th key={i}>{subitem.colNm}</th>);
                } ) }
              </thead>
            </table>
          </div>
          <div className="schema-table-body">
            <table>
              <tbody >
                {this.props.sampleData.map((subitem, i) => {
                  return (
                    <tr key={i}>
                      {subitem.map((colNmData, id) => {
                        return (
                          <td>{colNmData.colVal}</td>
                        )
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    );
  }
}
export default SampleData;