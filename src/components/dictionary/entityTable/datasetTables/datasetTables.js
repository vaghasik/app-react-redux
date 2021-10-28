import React from 'react';
import { Container, Row, Col } from "reactstrap";
import './DatasetTables.scss';

function DatasetTable() {
	return (
		<div className="dataset-container">
			<Container fluid>
					<Row className="tabs-row">
          <Col>
						Schema, metadata, Lineage ...
            </Col>
					</Row>
			</Container>
		</div>
	);
}

export default DatasetTable;