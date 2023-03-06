import React from "react";

class FeedbackForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {feedback: 'Please write your dish feedback', rating: 'nothing'};

        this.handleChangeFeedback = this.handleChangeFeedback.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFeedback(event) {
        this.setState({feedback: event.target.value });
    }

    handleChangeRating(event) {
        this.setState({rating: event.target.value });
    }

    handleSubmit(event) {
        alert('Your feedback is: ' + this.state.feedback + '\nYour rating is: ' + this.state.rating);
        event.preventDefault();
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>

                    <label>Feedback:</label>
                    <br />

                    <textarea value={this.state.feedback} onChange={this.handleChangeFeedback} />
                    <br />

                    <label>Dish rating is:</label>
                    <br />
    
                    <select value={this.state.rating} onChange={this.handleChangeRating}>
                        <option value="1">Disatisfied</option>
                        <option value="2">Somewhat Disatisfaction</option>
                        <option value="3">Neutral</option>
                        <option value="4">Somewhat Satisfied</option>
                        <option value="5">Very Disatisfied</option>
                    </select>

                    <br />
                    
                    <input type="submit" value="Submit" />

                </form>
            </>
        );
    }
}

export default FeedbackForm;

