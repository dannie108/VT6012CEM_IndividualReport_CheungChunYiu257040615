
import React from 'react';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
  return (
    <header className="top-header">
      <div className="header-inner">
        <input type="text" placeholder="搜尋型號或產品名稱..." style={{width:400, padding:'8px 15px', border:'none', borderRadius:4}} />
        
        <div className="right-group">
          <div className="contact-info">
            <span>☎ +852 2130 9227</span>
            <a href="mailto:info@ceoshop.com.hk" style={{color:'white', marginLeft:12}}>✉ info@ceoshop.com.hk</a>
          </div>
          <nav className="main-nav">
            <ul >
              <li><Link to="/" style={{color:'white', textDecoration:'none'}}>主頁</Link></li>
            </ul>
          </nav>
          <div className="cart">🛒 0 Items</div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
