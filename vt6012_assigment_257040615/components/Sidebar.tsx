import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo"><Link to="/">CEO SHOP</Link></div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <span className="item-label"><Link to="">網頁寄存</Link></span>
        </li>

        <li className="sidebar-item">
          <span className="item-label"><Link to="">學校會計服務</Link></span>
        </li>

        <li className="sidebar-item has-flyout">
          <span className="item-label">會計理財服務</span>
          <div className="flyout">
            <ul>
              <li><Link to="">會計理財服務 A</Link></li>
              <li><Link to="">會計理財服務 B</Link></li>
            </ul>
          </div>
        </li>

        <li className="sidebar-item has-flyout">
          <span className="item-label">電腦支援服務</span>
          <div className="flyout">
            <ul>
              <li><Link to="">上門支援(套票)</Link></li>
              <li><Link to="">上門支援(月票)</Link></li>
            </ul>
          </div>
        </li>

        <li className="sidebar-item has-flyout">
          <span className="item-label">表格 Forms</span>
          <div className="flyout">
            <ul>
              <li><Link to="">Kaspersky / 卡巴斯基</Link></li>
              <li><Link to="">ESET / NOD 32</Link></li>
              <li><Link to="">中學、小學、幼稚園會記服務套餐</Link></li>
              <li><Link to="">Acronis 產品</Link></li>
              <li><Link to="">Adobe 產品</Link></li>
              <li><Link to="">Synology 產品</Link></li>
              <li><Link to="">Microsoft 產品 (Microsoft CSP Perpetual)</Link></li>
            </ul>
          </div>
        </li>

        <li className="sidebar-item">
          <span className="item-label"><Link to="">聯絡我們</Link></span>
        </li>

        <li className="sidebar-item">
          <span className="item-label"><Link to="">付款方法</Link></span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
