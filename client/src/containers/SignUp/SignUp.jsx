import React, { useState } from 'react';
import axios from 'axios';
import './SignUp.css';
// import UserContext from "../../utils/User";

const SignUp = (props) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  // const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('you clicked submit');
    axios
      .post('/api/users', {
        username: username,
        email: email,
        zipCode: zipCode,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        // window.location.href="/account";
        props.history.push(`/account/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
        alert('This is a 400 error- this email is already being used');
      });
  };

  // class SignUp (props) extends Component {
  //   render() {
  return (
    <div className="section">
      <form onSubmit={handleSubmit} className="container formcontainer">
        <div className="field">
          <label className="label is-medium">Username</label>
          <div className="control has-icons-left">
            <input
              className="input"
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Text input"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>
        <label className="label is-medium">Email</label>
        <div className="field">
          <div className="control has-icons-left">
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
          </div>
        </div>
        <label className="label is-medium">Password</label>
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
        <div className="field">
          <label className="label is-medium">Zip Code</label>
          <div className="control has-icons-left">
            <input
              className="input"
              id="zipCode"
              type="text"
              name="zipCode"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
              placeholder="Zip Code"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-home"></i>
            </span>
          </div>
        </div>
        <div className="buttons is-centered">
            <button className="button is-success is-medium" type="submit">Sign Up</button>
            <a className="button is-success is-inverted is-outlined is-medium" href="/">Back</a>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
