import React from "react";

class FeedbackForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'Please write your dish feedback'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('Your feedback is: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>Feedback:</label>
          <br/>
          <textarea value={this.state.value} onChange={this.handleChange} />
          <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default FeedbackForm;

