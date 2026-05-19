import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div className="main-content">
    <h2>主要產品</h2>
    <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:15}}>
      <div className="category-card"><img src="/sample.png" alt="" style={{width:'100%', height:140, objectFit:'cover'}} /><h3>辦公電腦</h3></div>
      <div className="category-card"><img src="/sample.png" alt="" style={{width:'100%', height:140, objectFit:'cover'}} /><h3>伺服器</h3></div>
    </div>
  </div>
);

export default Home;
