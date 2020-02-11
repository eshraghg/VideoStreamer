import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import flv from "flv.js";

class StreamShow extends React.Component {
  constructor() {
    super();
    this.videoRef = React.createRef();
  }

  //----------------------------HELPER METHOD ---------------------

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  //----------------------------COMPONENT DID MOUNT ---------------------
  componentDidMount() {
    this.buildPlayer();
    this.props.fetchStream(this.props.match.params.id);
  }

  //----------------------------COMPONENT DID UPDATE ---------------------
  componentDidUpdate() {
    this.buildPlayer();
  }

  //----------------------------RENDER ---------------------

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
        <h1>{this.props.stream.title}</h1>
        <h5>{this.props.stream.description}</h5>
      </div>
    );
  }

  //----------------------------UNMOUNT ---------------------

  componentWillUnmount() {
    this.player.destroy();
  }
}

//----------------------------REDUX CONNECT ---------------------

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
