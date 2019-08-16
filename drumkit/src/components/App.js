import React, { Component } from "react";
import Pad from "./Pad";
import SidePanel from "./Sidepanel";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //string for what you played/what is displayed on the screen
      activeSound: "",
      //default ON
      power: true,
      //default volume display
      volumeInput: 50,
      //default volume value (between 0 and 1, min/max of sidepanel) for html audio element
      volume: 0.5
    };
  }

  //updates display, passed to Pad function onPlay
  setScreen = soundname => {
    this.setState({ activeSound: soundname });
    //pad clear after play
    setTimeout(() => {
      this.setState({ activeSound: "" });
    }, 2000);
  };

  //passed to SidePanel button
  togglePower = () => {
    //if power false, puts welcome
    const message = !this.state.power && "Welcome";
    this.setState({ power: !this.state.power, activeSound: message });
    //set timer delay for welcome display to go away after 5000
    setTimeout(() => {
      this.setState({ activeSound: "" });
    }, 2000);
  };

  //passed to SidePanel onChange
  changeVolume = e => {
    const volume = e.target.value / 100;
    const message = "Volume: " + e.target.value;
    this.setState({
      volume: volume,
      volumeInput: e.target.value,
      activeSound: message
    });
    setTimeout(() => {
      this.setState({ activeSound: "" });
    }, 3000);
  };

  render() {
    //conditional style for display, passed to SidePanel
    const colorStyle = this.state.power
      ? { background: "#483D8B" }
      : { background: "#476b68" };

    const pads = this.props.data.map((pad, x) => {
      return (
        <Pad
          key={x}
          pad={pad}
          setScreen={this.setScreen}
          power={this.state.power}
          volume={this.state.volume}
          style={colorStyle}
          activeSound={this.state.activeSound}
        />
      );
    });

    return (
      <div className="container-fluid">
        <div className="machine row">
          <div className="pads grid col-sm-7">{pads}</div>
          <SidePanel
            volumeInput={this.state.volumeInput}
            togglePower={this.togglePower}
            changeVolume={this.changeVolume}
            activeSound={this.state.activeSound}
            power={this.state.power}
            colorStyle={colorStyle}
          />
        </div>
      </div>
    );
  }
}

export default App;
