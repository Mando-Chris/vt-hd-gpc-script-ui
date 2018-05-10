import React, { Component } from 'react';
import PredictiveDialer from './tabs/PredictiveDialer';
import { Tab } from 'semantic-ui-react';

const panes = [
  { menuItem: 'Predictive Campaign Settings', render: () => {
    return (
      <Tab.Pane key='pd_settings'>
        <div>Beautiful UI!!!!</div>
      </Tab.Pane>
    )
    }
  }
]

class Dashboard extends Component {
  render() {
    return (
      <Tab panes={panes}/>
    );
  }
}

export default Dashboard;