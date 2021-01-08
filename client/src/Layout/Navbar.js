import React from 'react'
import "./Layout.css"
import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <div className="header">
          <div className="header-left">
              ETH Monster
          </div>
          <div className="header-right">
              <Link to="/mypage" className="link">Mypage</Link>
          </div>  
        </div>
    )
}

export default Navbar
