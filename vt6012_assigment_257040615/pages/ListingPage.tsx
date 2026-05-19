import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../src/data/products';

const ListingPage: React.FC = () => {
  return (
    <div className="main-content">
      <div className="breadcrumb">首頁 / 辦公電腦</div>
      <h2 className="page-title">辦公電腦</h2>

      <div style={{display:'flex', gap:30, alignItems:'stretch'}}>
        <div style={{width:240, background:'white', padding:20, border:'1px solid #ddd'}}>
          <h3>細節分類</h3>
          <ul style={{listStyle:'none'}}>
            <li>辦公電腦</li>
            <li>迷你電腦</li>
            <li>All-in-One 一體機</li>
          </ul>
          <h3>品牌</h3>
          <ul style={{listStyle:'none'}}>
            <li><label><input type="checkbox" defaultChecked /> Lenovo</label></li>
            <li><label><input type="checkbox" /> HP</label></li>
          </ul>
        </div>

        <div style={{flex:1, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:20}}>
          {products.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.img} alt={p.title} style={{width:'100%', height:160, objectFit:'cover'}} />
              <h4>{p.title}</h4>
              <p className="model-code">{p.model}</p>
              <p>{p.specs}</p>
              <Link to={`/product/${p.id}`}><button style={{width:'100%', background:'#2ea3f2', color:'white', border:'none', padding:10}}>Detail</button></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
