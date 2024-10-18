import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
    const navigate = useNavigate()

    return(
        <ul className='navbar'>
            <li className='navbar-item'>
                <Link to='/main-vault'>Main Vault</Link>
            </li>
            <li className='navbar-item'>
                <Link to='/personal-vault'>Personal Vault</Link>
            </li>
            {localStorage.getItem("user") ? (
            <li className="navbar-item navbar-logout">
            <Link
            className="navbar-link"
            to=""
            onClick={() => {
                localStorage.removeItem("user")
                navigate("/", { replace: true })
      }}
    >
      Logout
    </Link>
  </li>
) : (
  ""
)}
        </ul>
    )
}