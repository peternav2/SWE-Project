import React from 'react';

//TODO: Make a review box component where someone can 
//1. input a text review and 
//2. the data can be displayed on a button press to another part of the JSX file - reactive uploading

class StudentReviewBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      universityName: '',
      isStudent: true,
      //TODO: In my experience auth is kind of tricky since there are so many security edge cases
      //      if you want to do it right... will be anonymous users for early version of these components
      //      for now
      password: 'default_password',
      username: 'default_username',
      selectedStars: '1 star'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log("You've hit handleSubmit!!!");
    event.preventDefault();
  }

  //TODO: COLLECT ALL OF THE STATE VALUES FROM FORM AND THEN POST TO DATABASE WITH SUBMIT BUTTON
  //      AT THE END OF THE FORM..... THIS WILL THEN BE PULLED FROM THE DATABSE ON ANOTHER COMPONENT
  //      AND OR APPLCATION PAGE.

  render() {
    return (
      <>
        <div style={{ border: "2px solid black" }}>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    {/* BEGIN SECTION FOR ASKING PERSON'S NAME */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
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
                              onChange={this.handleOptionChange} />
                            1
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="2 star"
                              checked={this.state.selectedStars === '2 star'}
                              onChange={this.handleOptionChange} />
                            2
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="3 star"
                              checked={this.state.selectedStars === '3 star'}
                              onChange={this.handleOptionChange} />
                            3
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="3 star"
                              checked={this.state.selectedStars === '4 star'}
                              onChange={this.handleOptionChange} />
                            4
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="3 star"
                              checked={this.state.selectedStars === '5 star'}
                              onChange={this.handleOptionChange} />
                            5
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      SUBMIT REVIEW
                    </button>
                  </div>
                </div>
              </form>
            </div>
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

export default StudentReviewBox
