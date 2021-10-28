import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Container, Row } from "reactstrap";
import './mainContainer.scss';
import Header from '../../header/Header';
import MiddleContainer from '../middleContainer/middleContainer';
import Footer from '../../footer/footer';

function MainContainer() {
	return (
		<div className="main-container">
			<Container fluid>
				<BrowserRouter>
					<Row className="header-row">
						<Header />
					</Row>
					<Row className="middle-row">
						<MiddleContainer />
					</Row>
					<Row className="footer-row">
						<Footer />
					</Row>
				</BrowserRouter>
			</Container>
		</div>
	);
}

export default MainContainer;