import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const ws = new WebSocket("ws://0.0.0.0:3001");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.socket = ws;
    this.onNewPost = this.onNewPost.bind(this); 
  }
  
  componentDidMount() {
    this.socket.onopen = (e) => {
      console.log('Connected to server');
    };
    this.socket.onmessage = function(str) {
      console.log(str);
    }

    

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        loading: false,
        messages: messages})
    }, 3000);
  }

  onNewPost(content) {
    const id = this.state.messages.length + 1;
    const newMessage = {id: id, username: this.state.currentUser.name, content: content }
    console.log(newMessage);
    const messages = this.state.messages.concat(newMessage)
    console.log(messages)
    this.setState({
      messages: messages})
    
      function sendText() {
      // Construct a msg object containing the data the server needs to process the message from the chat client.
      var msg = {
        // type: "message",
        // text: document.getElementByClassName("chatbar-message").value,
        // id:   clientID,
        // date: Date.now()
      };
    this.socket.send(JSON.stringify(msg));
    
    // document.getElementByClassName("chatbar-message").value = "";
      
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar onNewPost={ this.onNewPost } currentUser = {this.state.currentUser.name}/>
        </div>
      );
    }
  }
}
export default App;
