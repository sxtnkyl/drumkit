import React, { Component } from "react";

class Pad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state for pad style
      activepad: false
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  //if event keyCode(num) matches props keycode, playSound function
  //all pads render by map, so all pads are checked onkeypress
  handleKeyPress = e => {
    console.log("keypress called", e.keyCode, this.props.pad.keycode);
    if (e.keyCode === this.props.pad.keycode) {
      this.playSound();
    }
  };

  //finds pad.letter, which is the id for the pad html audio tag
  //and sets the attributes for the audio element
  playSound = () => {
    console.log("playsound called");
    //if power is ON
    if (this.props.power) {
      const sound = document.getElementById(this.props.pad.letter);
      //start at beginning of audio clip
      sound.currentTime = 0;
      //inherit volume
      sound.volume = this.props.volume;
      sound.play();
      //screen updated on sound play
      this.props.setScreen(this.props.pad.soundname);
      //this is the length to maintain pad style on play
      this.setState({ activepad: true });
      setTimeout(() => {
        this.setState({ activepad: false });
      }, 250);
    }
  };

  render() {
    const onStyle = {
      transform: "scale(0.95)",
      border: "3px solid black"
    };

    const offStyle = { transform: "scale(1)", boxShadow: "none" };

    //power OFF/ON styles for pads
    const style = !this.props.power
      ? { background: "#476b68" }
      : this.state.activepad
      ? onStyle
      : offStyle;

    return (
      <div style={style} className="outer-drum-pad">
        <div
          className="drum-pad"
          id={this.props.pad.soundname}
          onClick={this.playSound}
          onKeyDown={this.handleKeyPress}
        >
          <audio
            id={this.props.pad.letter}
            src={this.props.pad.url}
            className="clip"
          />
          {this.props.pad.letter}
        </div>
      </div>
    );
  }
}

export default Pad;
