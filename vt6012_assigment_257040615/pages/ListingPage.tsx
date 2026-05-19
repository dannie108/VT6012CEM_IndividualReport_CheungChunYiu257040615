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
  const [searchQ, setSearchQ] = useState<string>('');

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

  // 過濾邏輯：子分類優先，其次大分類，最後搜尋字串（可與分類結合）
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

  // 組成要傳給 ProductDetail 的 state（from 為目前路徑 + search，最精準）
  const from = location.pathname + location.search;
  const baseLinkState = {
    from,
    category: activeCategory || null,
    subcategory: activeSubcategory || null,
    q: searchQ || null,
  };

  // 卡片鍵盤導覽支援
  const handleCardKeyDown = (e: React.KeyboardEvent, p: Product) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/product/${encodeURIComponent(p.id)}`, { state: baseLinkState });
    }
  };

  // 卡片內加入報價（避免觸發卡片點擊）
  const handleAddToQuote = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const items = getQuoteItems();
    if (!items.includes(productId)) {
      const next = [...items, productId];
      setQuoteItems(next);
    } else {
      // 已存在：不移除，僅重新 set 以觸發事件（或可改為提示）
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

        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {filteredProducts.map((p: Product) => (
            <div
              key={p.id}
              role="link"
              tabIndex={0}
              aria-label={`查看 ${p.title} 詳情`}
              onKeyDown={(e) => handleCardKeyDown(e, p)}
              onClick={() => navigate(`/product/${encodeURIComponent(p.id)}`, { state: baseLinkState })}
              style={{
                border: '1px solid #ddd',
                padding: 12,
                borderRadius: 6,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <h4 style={{ margin: '6px 0' }}>{p.title}</h4>
              <img src={p.img} alt={p.title} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
              <p style={{ margin: '8px 0' }}>{p.model}</p>
              <p style={{ marginBottom: 8 }}>{p.specs}</p>

              <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
                {/* 查看詳情（Link）仍保留語意，但卡片點擊也會導頁 */}
                <Link
                  to={`/product/${encodeURIComponent(p.id)}`}
                  state={baseLinkState}
                  onClick={(e) => e.stopPropagation()} // 防止父容器 onClick 先觸發
                  style={{ textDecoration: 'none' }}
                >
                  <button style={{ padding: '6px 10px', cursor: 'pointer' }}>查看詳情</button>
                </Link>

                {/* 直接在卡片上加入 Add to Quote 按鈕 */}
                <button
                  onClick={(e) => handleAddToQuote(e, p.id)}
                  style={{ padding: '6px 10px', cursor: 'pointer', background: '#2ea3f2', color: '#fff', border: 'none', borderRadius: 4 }}
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
