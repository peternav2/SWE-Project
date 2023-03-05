import React from 'react';

class DishReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      universityName: '',
      studentName:'',
      isStudent: true,
      // Placeholder for when we add authentication system
      password: 'default_password',
      username: 'default_username',
      review:'',
      selectedStars: ''
    };

    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleUniversityNameInputChange = this.handleUniversityNameInputChange.bind(this);
    this.handleFoodReviewInputChange = this.handleFoodReviewInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleNameInputChange(event) {
    this.setState({ studentName: event.target.value });
  }

  handleUniversityNameInputChange(event){
    this.setState({ universityName: event.target.value });
  }

  handleFoodReviewInputChange(event){
    this.setState({ review: event.target.value });
  }

  handleSubmit(event) {
    console.log("You've hit handleSubmit!!!");
    event.preventDefault();
  }

  handleOptionChange(starValue){
    console.log("handleOptionChange() hit");
    this.setState({selectedStars:starValue + " star"});
    }

  //TODO: Function to push state data set to our MonogoDB database - this will be a function called on the submit button
  //      at the end of the form.

  render() {
    return (
      <>
        <div  style={{paddingLeft:"10%", paddingRight:"10%"}}>
            <div>
              <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    {/* BEGIN SECTION FOR ASKING PERSON'S NAME */}
                    <div>
                      <div className="col-span-3 sm:col-span-2">
                        <h1 className="text-center text-2xl">
                          Enter your University Dinning Hall Dish Review
                        </h1>
                        <label htmlFor="users-name" className="block text-sm font-medium text-gray-700">
                          What is your name?
                        </label>
                        <div className="">
                          <span className="inline-flex items-center border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          </span>
                          <input
                            type="text"
                            name="users-name"
                            id="users-name"
                            className="block w-full flex-1 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="What is your name?"
                            onChange = {this.handleNameInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    {/* BEGIN SECTION FOR ASKING NAME OF UNIVERSITY: */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label htmlFor="unviersity-name" className="block text-sm font-medium text-gray-700">
                          What is the name of your University?
                        </label>
                        <div className="">
                          <span className="inline-flex items-center border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                          </span>
                          <input
                            type="text"
                            name="unviersity-name"
                            id=""
                            className="block w-full flex-1 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="University Name Here"
                            onChange={this.handleUniversityNameInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    {/* BEGIN SECTION FOR FOOD REVIEW OF FORM */}
                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Your Food Review:
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder=""
                          defaultValue={''}
                          onChange={this.handleFoodReviewInputChange}
                        />
                      </div>
                    </div>

                    {/* BEGIN SECTION FOR STARS */}
                    {/* STARS ARE UPDATE TO STATE */}
                    <div>
                      <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Stars:
                      </label>
                      <div className="mt-1">
                        <div className="radio">
                          <label>
                            <input type="radio" value="1 star"
                              checked={this.state.selectedStars === '1 star'}
                              onClick={() => this.handleOptionChange(1)} />
                            1
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="2 star"
                              checked={this.state.selectedStars === '2 star'}
                              onClick={() => this.handleOptionChange(2)} />
                            2
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="3 star"
                              checked={this.state.selectedStars === '3 star'}
                              onClick={() => this.handleOptionChange(3)} />
                            3
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="4 star"
                              checked={this.state.selectedStars === '4 star'}
                              onClick={() => this.handleOptionChange(4)} />
                            4
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="5 star"
                              checked={this.state.selectedStars === '5 star'}
                              onClick={() => this.handleOptionChange(5)} />
                            5
                          </label>
                        </div>
                        <p>your star ranking: {this.state.selectedStars}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      SUBMIT DISH REVIEW
                    </button>
                  </div>
                </div>
              </form>
            </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </>
    );
  }
}

export default DishReviewForm
