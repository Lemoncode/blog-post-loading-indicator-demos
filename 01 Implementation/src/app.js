import React, { Component } from 'react';
import { userAPI } from './api/userAPI';
import { UserTable, LoadButton } from './components';
import './app.css';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
    };

    this.onLoadTables = this.onLoadTables.bind(this);
  }

  onLoadTables() {
    this.setState({
      users: [],      
    });

    userAPI.fetchUsers()
      .then((users) => {
        this.setState({
          users,
        })
      });
  }

  render() {
    return (
      <div>
        <LoadButton
          onLoad={this.onLoadTables}
          title="Load user table with delay"
        />
        <div>
          <UserTable users={this.state.users} />          
        </div>
      </div>
    );
  }
}
