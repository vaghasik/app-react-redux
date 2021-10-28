import React from 'react';
import './app.scss';
import MainContainer from './components/container/mainContainer/mainContainer';//'./components/mainContainer/MainContainer'

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainContainer />
        )
    }
}
export default App