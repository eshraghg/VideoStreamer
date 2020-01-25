import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1084997908212-b8dtp8n31i73aldld0v7vgohbvk3pm29.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>Loading...</div>;
    } else if (this.state.isSignedIn) {
      return (
        <div>
          <button className="ui red google button">
            <i className="google icon" />
            Sign out
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="ui red google button">
            <i className="google icon" />
            Sign in with Google
          </button>
        </div>
      );
    }
  }

  render() {
    return <div> {this.renderAuthButton()} </div>;
  }
}

export default GoogleAuth;
