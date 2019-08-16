import React, { Component } from "react";

class SidePanel extends Component {
  render() {
    //power OFF/ON styles for display and onoff button
    const style = !this.props.power
      ? { background: "#778899", boxShadow: "none" }
      : { background: "#483d8b" };

    return (
      <div className="side-panel col-sm-5">
        <div className="label">Akai MPC60</div>
        <div style={this.props.colorStyle} className="display" id="display">
          {this.props.activeSound}
        </div>
        <div>
          <p>OFF / ON</p>
          <button style={style} onClick={this.props.togglePower} />
        </div>
        <div>
          <p>Volume</p>
          <input
            value={this.props.volumeInput}
            type="range"
            min="1"
            max="100"
            onChange={this.props.changeVolume}
            onInput={this.value}
          />
        </div>
      </div>
    );
  }
}

export default SidePanel;
