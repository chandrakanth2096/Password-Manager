import './index.css'

const PasswordItem = props => {
  const {eachPassword, onDeletePassword, isChecked} = props
  const {id, website, username, password, randomClassName} = eachPassword
  const first = website[0].toUpperCase()
  const starsImg =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

  const onDelete = () => {
    onDeletePassword(id)
  }

  return (
    <li className="password-item">
      <div className="details">
        <div className={`name-icon ${randomClassName}`}>{first}</div>
        <div className="names">
          <p>{website}</p>
          <p>{username}</p>
          {isChecked && <p>{password}</p>}
          {!isChecked && <img className="stars" src={starsImg} alt="stars" />}
        </div>
      </div>
      <button
        type="button"
        testid="delete"
        className="del-btn"
        onClick={onDelete}
      >
        <img
          className="del-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
