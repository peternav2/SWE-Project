import React from 'react'


const UniversityLookup = () => {
    const [state, setState] = React.useState({
        university: '',
    });

    const handleChange = (event:any) => {
        setState({
          ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(state);
    };

    return (
        <div>
            <h1>University</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="university"></label>
                <input
                    type="text"
                    name="university"
                    value={state.university}
                    onChange={handleChange}
                    placeholder="Look up your university."
                    className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="submit">Search</button>
            </form>
        </div>
    );
}

const CreateAccount = () => {
  const [form, setForm] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
    universityName: '',
    isStudent: true,
  });

  const handleChange = (event : any) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event : any) => {
    event.preventDefault();

    alert('Username: ' + form.username + '\nPassword: ' + form.password);
  };

  return (
    <div className="text-center">
      <div className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
        <h1 className="text-5xl">RateMyDiningHall</h1>
        <h3 className="text-2xl px-8 pt-4">Create your account.</h3>
      </div>
      <div className="flex flex-col justify-center items-center border-b border-blue-500 py-2">
        <form className="md:w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
              <input
              id="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="**********"
              className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="**********"
              className = "shadow appearance-none border border-black-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="block text-gray-700 text-sm font-bold mb-2"><UniversityLookup></UniversityLookup></div>

          <div className="mt-5 items-center justify-between">
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create your account.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount