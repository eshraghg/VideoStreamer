import React from "react";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
        window.gapi.client.init({
            clientId: '1084997908212-b8dtp8n31i73aldld0v7vgohbvk3pm29.apps.googleusercontent.com',
            scope: 'email'
        });
    });
  }

  render() {
    return <div>GoogleAuth</div>;
  }
}

export default GoogleAuth;
