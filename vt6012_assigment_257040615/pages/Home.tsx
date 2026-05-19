// src/pages/Home.tsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { categories, products } from '../src/data/products';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hotProducts = products.slice(0, 3);

  // 組成要傳給 ProductDetail 的 state（from 為目前路徑 + search）
  const from = location.pathname + location.search;
  const baseLinkState = {
    from,
    category: null,
    subcategory: null,
    q: null,
  };

  const goToProduct = (id: string) => {
    navigate(`/product/${encodeURIComponent(id)}`, { state: baseLinkState });
  };

  const onCardKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToProduct(id);
    }
  };

  return (
    <div className="main-content">
      <div className="categories-bar" aria-label="主要產品分類">
        <h2>分類 Category</h2>
        <div className="categories-inner">
          
          {categories.map((c) => (
            <Link
              key={c.key}
              to={`/listing?category=${encodeURIComponent(c.key)}`}
              className="category-card"
              aria-label={`前往 ${c.title} 分類`}
            >
              <img src={c.img} alt={c.title} style={{ width: '100%', height: 250, objectFit: 'cover' }} />
              <div className="category-body">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 熱門產品 */}
      <section style={{ marginTop: 18 }}>
        <h2>熱門產品 Hot sale product</h2>

        <div
          className="product-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
            marginTop: 12,
          }}
        >
          {hotProducts.map((p) => (
            <div
              key={p.id}
              className="product-card"
              role="link"
              tabIndex={0}
              onClick={() => goToProduct(p.id)}
              onKeyDown={(e) => onCardKeyDown(e, p.id)}
              aria-label={`${p.title}，按 Enter 查看詳情`}
              style={{ cursor: 'pointer' }}
            >
              <h4 style={{ marginBottom: 8 }}>{p.title}</h4>
              <img src={p.img} alt={p.title} style={{ width: '100%', height: 400, objectFit: 'cover' }} />
              <p className="model-code" style={{ margin: '8px 0' }}>{p.model}</p>
              <p style={{ marginBottom: 5 }}>{p.specs}</p>

              
              <Link
                to={`/product/${encodeURIComponent(p.id)}`}
                state={baseLinkState}
                onClick={(e) => e.stopPropagation()}
                className="detail-cta"
                style={{
                  marginTop: 10,
                  padding: '8px 16px',
                  background: '#003087',
                  color: 'white',
                  borderRadius: 4,
                  display: 'inline-block',
                  textDecoration: 'none',
                }}
                aria-label={`查看 ${p.title} 詳情`}
              >
                Detail
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
