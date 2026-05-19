import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../src/data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  if (!product) return <div className="main-content">找不到產品</div>;

  return (
    <div className="main-content">
      <div className="breadcrumb">首頁 / 辦公電腦 / {product.title}</div>
      <div style={{display:'flex', gap:40, background:'white', padding:25, border:'1px solid #ddd'}}>
        <div style={{width:380, height:380, background:'#f0f0f0', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <img src={product.img} alt={product.title} style={{maxWidth:'100%', maxHeight:'100%'}} />
        </div>
        <div style={{flex:1}}>
          <h1 style={{color:'#003087'}}>{product.title} ({product.model})</h1>
          <div style={{marginTop:12}}>
            <p><strong>規格：</strong>{product.specs}</p>
            <button style={{marginTop:20, background:'#2ea3f2', color:'white', padding:'12px 24px', border:'none'}}>加入報價 / Add to Quote</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
