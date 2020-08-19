import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../../utils/User';
// import e from "express";

// class Login extends Component {
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("you clicked submit");
    axios
      .post('/api/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.config);
        user.handleLogin(response.data.data.token, response.data.data._id);
        // redirect to account page
        // window.location.href="/account";
        props.history.push(`/account/${response.data.data._id}`);
      })
      .catch((err) => {
        console.log(err);
        alert('400 error message- invalid email or password');
      });
  };

  // render() {
  return (
    <div className="section">
      <form className="container is-dark formcontainer" onSubmit={handleSubmit}>
        <div className="field">
        <label className="label is-large">Welcome back</label>
          <div className="control has-icons-left has-icons-right">
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </div>
        </div>
        <div className="field">
          <div className="control has-icons-left">
            <input
              className="input"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
        <div className="buttons is-centered">
          <button className="button is-success" type="submit">
            Login
          </button>
          <a className="button is-success is-outlined is-inverted" href="/">
            Home
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
