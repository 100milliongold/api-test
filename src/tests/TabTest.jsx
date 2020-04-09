import React, { Component } from 'react';
import { Tabs } from '../components/Tabs';

class TabTest extends Component {

    state = {
        view : "KRW"
    }

    changeTab = (view) => this.setState({ view });

    render() {
        return (
            <Tabs 
                onClick={this.changeTab}
                value={this.state.view}
                list={[{ name: "KRW" }, { name: "BTC" }, { name: "ETH" }]}
            />
        );
    }
}

export default TabTest;