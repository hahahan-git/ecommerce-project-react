import { NavLink } from 'react-router'
// NavLink special feature is it knows which page is loaded.==>> you're on the Order page, it adds a class called "active" to the order link (className="order-link ....active")
import './Header.css'
import logo from '../assets/images/logo-white.png'
import mobileLogo from '../assets/images/mobile-logo-white.png'

export function Header() {
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo"
              src={logo}/>
            <img className="mobile-logo"
              src={mobileLogo} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/order">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  )
}

/*NB:
<a></a> =>> will reload the page by default
we will use "<Link></Link>". provided by react-router
kita akan ganti "a" dengan "Link" (untuk pindah page)
"href" => "to"

sebenarnya kita pakai javascript. cuma udah dijadiin component aja(kayanya)
*/