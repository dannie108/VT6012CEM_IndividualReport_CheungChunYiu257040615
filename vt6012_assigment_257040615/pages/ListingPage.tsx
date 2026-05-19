// src/pages/ListingPage.tsx
import React, { useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { categories, products } from '../src/data/products';
import type { Product } from '../src/data/products';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ListingPage: React.FC = () => {
  const query = useQuery();
  const initialCategory = query.get('category') || '';
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');

  React.useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
      setActiveSubcategory('');
    }
  }, [initialCategory]);

  // 計算每個 subcategory 的數量（基於全部 products）
  const subcategoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.subcategory] = (map[p.subcategory] || 0) + 1;
    });
    return map;
  }, []);

  // 根據 activeSubcategory / activeCategory 過濾
  const filteredProducts = useMemo(() => {
    if (activeSubcategory) {
      return products.filter((p) => p.subcategory === activeSubcategory);
    }
    if (activeCategory) {
      return products.filter((p) => p.category === activeCategory);
    }
    return products;
  }, [activeCategory, activeSubcategory]);

  return (
    <div className="main-content" style={{ display: 'flex', gap: 24 }}>
      {/* 左側分類欄 */}
      <aside style={{ width: 280 }}>
        <h3>商品分類</h3>

        <div>
          {categories.map((cat) => {
            const isOpen = cat.key === activeCategory;
            return (
              <div key={cat.key} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '6px 4px',
                  }}
                  onClick={() => {
                    setActiveCategory((prev) => (prev === cat.key ? '' : cat.key));
                    setActiveSubcategory('');
                  }}
                >
                  <strong>{cat.title}</strong>
                  <span style={{ fontSize: 12, color: '#666' }}>{isOpen ? '▾' : '▸'}</span>
                </div>

                {/* 小分類列表（展開時顯示） */}
                {isOpen && (
                  <ul style={{ listStyle: 'none', paddingLeft: 12, marginTop: 8 }}>
                    {cat.subcategories.map((sub) => {
                      const count = subcategoryCounts[sub.key] || 0;
                      const isActive = activeSubcategory === sub.key;
                      return (
                        <li key={sub.key} style={{ marginBottom: 6 }}>
                          <button
                            onClick={() => setActiveSubcategory((prev) => (prev === sub.key ? '' : sub.key))}
                            style={{
                              background: isActive ? '#003087' : 'transparent',
                              color: isActive ? '#fff' : '#000',
                              border: 'none',
                              padding: '6px 8px',
                              textAlign: 'left',
                              width: '100%',
                              cursor: 'pointer',
                            }}
                          >
                            {sub.title} <span style={{ color: '#666' }}>({count})</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      {/* 右側產品列表 */}
      <section style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>
            {activeCategory
              ? `${categories.find((c) => c.key === activeCategory)?.title || ''}`
              : '全部商品'}
            {activeSubcategory ? ` / ${categories
              .flatMap((c) => c.subcategories)
              .find((s) => s.key === activeSubcategory)?.title || activeSubcategory}` : ''}
          </h2>

          {/* 清除篩選 */}
          <div>
            {(activeCategory || activeSubcategory) && (
              <button
                onClick={() => {
                  setActiveCategory('');
                  setActiveSubcategory('');
                }}
                style={{ padding: '6px 10px', cursor: 'pointer' }}
              >
                清除篩選
              </button>
            )}
          </div>
        </div>

        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {filteredProducts.map((p: Product) => (
            <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
              <h4 style={{ margin: '6px 0' }}>{p.title}</h4>
              <img src={p.img} alt={p.title} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
              <p style={{ margin: '8px 0' }}>{p.model}</p>
              <p style={{ marginBottom: 8 }}>{p.specs}</p>
              <Link to={`/product/${encodeURIComponent(p.id)}`}>
                <button style={{ padding: '6px 10px', cursor: 'pointer' }}>查看詳情</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ListingPage;
