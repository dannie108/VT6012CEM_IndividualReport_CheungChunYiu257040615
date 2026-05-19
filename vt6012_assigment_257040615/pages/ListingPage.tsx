// src/pages/ListingPage.tsx
import React, { useMemo, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { categories, products } from '../src/data/products';
import type { Product } from '../src/data/products';

const QUOTE_KEY = 'quoteItems';

function getQuoteItems(): string[] {
  try {
    const raw = localStorage.getItem(QUOTE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setQuoteItems(items: string[]) {
  try {
    localStorage.setItem(QUOTE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('quoteCountChanged', { detail: { count: items.length } }));
  } catch {
    // ignore
  }
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ListingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const initialCategory = query.get('category') || '';
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');
  const [searchQ] = useState<string>('');

  React.useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
      setActiveSubcategory('');
    }
  }, [initialCategory]);

  const subcategoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.subcategory] = (map[p.subcategory] || 0) + 1;
    });
    return map;
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQ.trim().toLowerCase();
    let list = products.slice();

    if (activeSubcategory) {
      list = list.filter((p) => p.subcategory === activeSubcategory);
    } else if (activeCategory) {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (q) {
      list = list.filter((p) => {
        return (
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.model && p.model.toLowerCase().includes(q)) ||
          (p.specs && p.specs.toLowerCase().includes(q))
        );
      });
    }

    return list;
  }, [activeCategory, activeSubcategory, searchQ]);

  const from = location.pathname + location.search;
  const baseLinkState = {
    from,
    category: activeCategory || null,
    subcategory: activeSubcategory || null,
    q: searchQ || null,
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, p: Product) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/product/${encodeURIComponent(p.id)}`, { state: baseLinkState });
    }
  };

  const handleAddToQuote = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const items = getQuoteItems();
    if (!items.includes(productId)) {
      const next = [...items, productId];
      setQuoteItems(next);
    } else {
      setQuoteItems(items);
    }
  };

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
          <div>
            <h2 style={{ margin: 0 }}>
              {activeCategory
                ? `${categories.find((c) => c.key === activeCategory)?.title || ''}`
                : '全部商品'}
              {activeSubcategory ? ` / ${categories
                .flatMap((c) => c.subcategories)
                .find((s) => s.key === activeSubcategory)?.title || activeSubcategory}` : ''}
            </h2>
          </div>
        </div>

        {/* 使用 className="listing-grid"，卡片使用 listing-item */}
        <div className="listing-grid" style={{ marginTop: 12 }}>
          {filteredProducts.map((p: Product) => (
            <div
              key={p.id}
              className="listing-item"
              role="link"
              tabIndex={0}
              aria-label={`查看 ${p.title} 詳情`}
              onKeyDown={(e) => handleCardKeyDown(e, p)}
              onClick={() => navigate(`/product/${encodeURIComponent(p.id)}`, { state: baseLinkState })}
            >
              <h4 style={{ margin: '6px 0' }}>{p.title}</h4>
              <img src={p.img} alt={p.title} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              <p style={{ margin: '8px 0' }}>{p.model}</p>
              <p style={{ marginBottom: 8 }}>{p.specs}</p>

              <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
                <Link
                  to={`/product/${encodeURIComponent(p.id)}`}
                  state={baseLinkState}
                  onClick={(e) => e.stopPropagation()}
                  style={{ textDecoration: 'none' }}
                >
                  <button style={{ padding: '8px 12px', cursor: 'pointer' }}>查看詳情</button>
                </Link>

                <button
                  onClick={(e) => handleAddToQuote(e, p.id)}
                  style={{ padding: '8px 12px', cursor: 'pointer', background: '#2ea3f2', color: '#fff', border: 'none', borderRadius: 4 }}
                  aria-label={`將 ${p.title} 加入報價`}
                >
                  加入報價 / Add to quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ListingPage;
