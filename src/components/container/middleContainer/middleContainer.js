import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Configuration from '../../configutation/configuration';
import Source from '../../source/source';
import Dictionary from '../../dictionary/dictionary';
import './middleContainer.scss';

const history = createBrowserHistory({
	forceRefresh: false
});

function MiddleContainer() {
	return (
		<div className="middle-container">
			<Switch history={history}>
				<Redirect exact from="/" to="/dictionary/" />
				{/* <Route path="/config/" component={Configuration} /> */}
				<Route path="configuration" render={(props) => (<Configuration props/>)} />
				<Route path="/source" render={() => (<Source />)} />
				<Route path="/dictionary" render={(props) => (<Dictionary {...props}/>)} />
			</Switch>
		</div>
	);
}

export default MiddleContainer;