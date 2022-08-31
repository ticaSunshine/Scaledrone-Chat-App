import React, { Component } from "react";
import "./App.css";
import RenderMessages from "./RenderMessages";
import Input from "./Input";
import RandomName from "./RandomName";
import RandomColor from "./RandomColor";

class App extends Component {
  state = {
    messages: [],
    member: {
      username: RandomName(),
      color: RandomColor()
    }
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("OoMfedwOpwkQ2A3c", {
      data: this.state.member
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>My Chat App</h1>
        </div>
        <RenderMessages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  };
}

export default App;

/*
const initialState = {
  messages: [],
  member: {
    username: RandomName(),
    color: RandomColor()
  }
};


export default function App() {
  const [state, setState] = useState(initialState);

  const drone = new window.Scaledrone("OoMfedwOpwkQ2A3c", {
    data: state.member
  });
  drone.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    const member = { ...state.member };
    member.id = drone.clientId;
    setState(member);
    console.log(state);
  });
  const room = drone.subscribe("observable-room");

  room.on("data", (data, member) => {
    const messages = state.messages;
    messages.push({ member, text: data });
    setState(messages);
  });

  function onSendMessage(message) {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
      </div>

      <RenderMessages messages={state.messages} currentMember={state.member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}
 */
