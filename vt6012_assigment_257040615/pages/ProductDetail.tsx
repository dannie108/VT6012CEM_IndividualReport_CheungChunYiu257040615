// src/pages/ProductDetail.tsx
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { products, categories } from '../src/data/products'; // 確認 categories 有 export

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

function findCategoryTitle(key?: string) {
  if (!key) return null;
  const c = categories.find((x) => x.key === key);
  return c ? c.title : key;
}

function findSubcategoryTitle(catKey?: string, subKey?: string) {
  if (!subKey) return null;
  const c = categories.find((x) => x.key === catKey) || categories.find((x) => x.subcategories.some(s => s.key === subKey));
  if (!c) return subKey;
  const s = c.subcategories.find((ss) => ss.key === subKey);
  return s ? s.title : subKey;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const location = useLocation();

  // state from ListingPage (if present)
  const state = (location.state as any) || {};
  const from = state.from || null; // e.g. "/listing" or "/listing?..."
  const fromCategory = state.category || null;
  const fromSubcategory = state.subcategory || null;
  

  if (!product) return <div className="main-content">找不到產品</div>;

  const handleAddToQuote = () => {
    const items = getQuoteItems();
    if (!items.includes(product.id)) {
      const next = [...items, product.id];
      setQuoteItems(next);
    } else {
      setQuoteItems(items);
    }
  };


  // 中文顯示名稱（優先使用 state 的 key，再 fallback 到 product 的 category）
  const displayCategoryKey = fromCategory || product.category;
  const displaySubKey = fromSubcategory || product.subcategory;
  const displayCategoryTitle = findCategoryTitle(displayCategoryKey);
  const displaySubTitle = findSubcategoryTitle(displayCategoryKey, displaySubKey);

  // Link state helper（當沒有完整 from 時，使用 state 傳回 listing）
  const linkStateForListing = (categoryKey?: string, subKey?: string) => {
    return {
      state: {
        category: categoryKey || null,
        subcategory: subKey || null,
        q: null,
      },
    };
  };

  return (
    <div className="main-content">
      <div className="breadcrumb" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link to="/">首頁</Link>
        <span>/</span>

        {from ? (
          // 若有完整 from（包含 search），直接 link 回 from（保留 query）
          <Link to={from}>{displayCategoryTitle || '商品列表'}</Link>
        ) : (
          // 沒有 from，導到 /listing 並帶 state（不改 URL）
          <Link to="/listing" {...linkStateForListing(displayCategoryKey, displaySubKey)}>
            {displayCategoryTitle || '商品列表'}
          </Link>
        )}

        {displaySubTitle && (
          <>
            <span>/</span>
            {from ? (
              <Link to={from}>{displaySubTitle}</Link>
            ) : (
              <Link to="/listing" {...linkStateForListing(displayCategoryKey, displaySubKey)}>
                {displaySubTitle}
              </Link>
            )}
          </>
        )}

        <span>/</span>
        <span>{product.title}</span>

    
      </div>

      <div style={{ display: 'flex', gap: 40, background: 'white', padding: 25, border: '1px solid #ddd' }}>
        <div style={{ width: 380, height: 380, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.img} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ color: '#003087' }}>{product.title} ({product.model})</h1>

          {product.highlights && product.highlights.length > 0 && (
            <ul style={{ marginTop: 12, paddingLeft: 18 }}>
              {product.highlights.slice(0, 3).map((h, idx) => (
                <li key={idx} style={{ marginBottom: 6 }}>
                  <strong>{h.split(':')[0]}:</strong> {h.split(':').slice(1).join(':').trim()}
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: 18 }}>
            <button
              onClick={handleAddToQuote}
              style={{ marginTop: 0, background: '#2ea3f2', color: 'white', padding: '12px 24px', border: 'none', cursor: 'pointer' }}
            >
              加入報價 / Add to Quote
            </button>
          </div>
        </div>
      </div>

      {product.details && (
        <div style={{ marginTop: 24 }}>
          <h3>詳細資料</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
            <tbody>
              {Object.entries(product.details).map(([k, v]) => (
                <tr key={k} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '8px 6px', width: 180, fontWeight: 600 }}>{k}</td>
                  <td style={{ padding: '8px 6px' }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
