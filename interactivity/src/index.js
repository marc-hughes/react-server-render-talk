import React from 'react';
import ReactDOM from 'react-dom';


class Message extends React.Component {
  constructor() {
   super();
   this.state = {clickCount: 0};

  }

  onClick(event) {
    this.setState({clickCount: this.state.clickCount + 1});
  }

  render() {
    return <div>
      <b>{this.props.message}</b>
      <br/>
      <button onClick={this.onClick.bind(this)} >Click Me</button>
      <br/>
      {this.state.clickCount}
    </div>
  }
}


const App = (props) => <div>This is my app <Message message='Hello' /></div>

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.hydrate(<App />, document.getElementById('root'));
