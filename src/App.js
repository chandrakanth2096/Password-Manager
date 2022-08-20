import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from './Component/PasswordItem'

import './App.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const stateItems = {
  searchInput: '',
  website: '',
  username: '',
  password: '',
  passwordList: [],
  isChecked: false,
}

class App extends Component {
  state = stateItems

  onSubmitPasswords = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initialContainerBackgroundClassName = `${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newPasswordList = {
      id: v4(),
      website,
      username,
      password,
      randomClassName: initialContainerBackgroundClassName,
    }
    if ((website !== '' && username !== '', password !== '')) {
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newPasswordList],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    const filteredPasswordList = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: filteredPasswordList})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onCheckbox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  renderShowPasswords = () => {
    const {passwordList, searchInput, isChecked} = this.state
    const searchedPasswordList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const isListEmpty = searchedPasswordList.length === 0
    return (
      <div className="show-passwords-container">
        <div className="top">
          <div className="count-section">
            <h1 className="heading2">Your Passwords</h1>
            <p className="count">{passwordList.length}</p>
          </div>

          <div className="search-input">
            <img
              className="input-img"
              alt="search"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
            />
            <input
              type="search"
              className="search"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
            />
          </div>
        </div>

        <hr className="line" />

        <div className="checkbox-section">
          <input
            className="checkbox"
            id="checkbox"
            type="checkbox"
            onChange={this.onCheckbox}
          />
          <label className="show" htmlFor="checkbox">
            Show Passwords
          </label>
        </div>

        <ul className="show-passwords-section">
          {searchedPasswordList.map(eachPassword => (
            <PasswordItem
              eachPassword={eachPassword}
              key={eachPassword.id}
              onDeletePassword={this.onDeletePassword}
              isChecked={isChecked}
            />
          ))}
        </ul>

        {isListEmpty && (
          <div className="no-section">
            <img
              className="img2"
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
            />
            <p className="no">No Passwords</p>
          </div>
        )}
      </div>
    )
  }

  render() {
    const {website, username, password} = this.state
    return (
      <div className="bg-password">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password-cards-container">
          <div className="password-inputs">
            <form className="form-container" onSubmit={this.onSubmitPasswords}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-container">
                <img
                  className="input-img"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  className="input-img"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <input
                  className="input"
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  className="input-img"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add">
                  Add
                </button>
              </div>
            </form>
            <img
              className="img1"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>
          {this.renderShowPasswords()}
        </div>
      </div>
    )
  }
}

export default App
