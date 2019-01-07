import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import DroneQuadrant from './DroneQuadrant';
import { transformDronesData } from './transforms/dronesData';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: false,
      endpoint: "http://localhost:4001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      transformDronesData(data);
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div style={{ textAlign: "center", height: '400px' }}>
        {data
          ? <DroneQuadrant data={data} />
          : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;