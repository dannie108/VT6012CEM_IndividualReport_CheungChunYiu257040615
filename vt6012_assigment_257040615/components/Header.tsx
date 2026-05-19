// src/components/Header.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../src/data/products'; // 調整路徑到你的 products 檔案

const QUOTE_KEY = 'quoteItems';

function getQuoteCountFromStorage(): number {
  try {
    const raw = localStorage.getItem(QUOTE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.length : 0;
  } catch {
    return 0;
  }
}

const MAX_SUGGESTIONS = 6;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [quoteCount, setQuoteCount] = useState<number>(getQuoteCountFromStorage());
  const [suggestions, setSuggestions] = useState<typeof products>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (detail && typeof detail.count === 'number') {
        setQuoteCount(detail.count);
      } else {
        setQuoteCount(getQuoteCountFromStorage());
      }
    };
    window.addEventListener('quoteCountChanged', handler);
    const storageHandler = (ev: StorageEvent) => {
      if (ev.key === QUOTE_KEY) {
        setQuoteCount(getQuoteCountFromStorage());
      }
    };
    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener('quoteCountChanged', handler);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  // 建議：根據 query 過濾 products 的 title 或 model
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
      return;
    }
    const matched = products.filter((p) => {
      return (
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.model && p.model.toLowerCase().includes(q))
      );
    }).slice(0, MAX_SUGGESTIONS);
    setSuggestions(matched);
    setShowSuggestions(matched.length > 0);
    setActiveIndex(-1);
  }, [query]);

  // 點選建議或按 Enter 導到 listing 或 product
  const goToSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    navigate(`/listing?q=${encodeURIComponent(trimmed)}`);
    setShowSuggestions(false);
  };

  const goToProduct = (id: string) => {
    navigate(`/product/${encodeURIComponent(id)}`);
    setShowSuggestions(false);
  };

  // 鍵盤操作：上下選擇、Enter 選取、Esc 關閉
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        goToSearch(query);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        // 若選到建議，直接進 product detail
        goToProduct(suggestions[activeIndex].id);
      } else {
        goToSearch(query);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  // 點擊外部關閉建議
  useEffect(() => {
    const onDocClick = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(ev.target as Node)) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <header className="top-header" style={{ background: '#003087', padding: 12 }}>
      <div className="header-inner" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, position: 'relative' }} ref={containerRef}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="搜尋型號或產品名稱..."
            aria-label="搜尋型號或產品名稱"
            style={{ width: '100%', padding: '8px 12px', borderRadius: 4, border: 'none' }}
            onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
          />

          {/* 搜尋按鈕（放在右側） */}
          <button
            onClick={() => goToSearch(query)}
            aria-label="搜尋"
            style={{
              position: 'absolute',
              right: 6,
              top: 6,
              bottom: 6,
              padding: '0 10px',
              border: 'none',
              background: '#2ea3f2',
              color: '#000',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            🔍
          </button>

          {/* 建議下拉 */}
          {showSuggestions && suggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="搜尋建議"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                marginTop: 8,
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: 6,
                maxHeight: 260,
                overflow: 'auto',
                zIndex: 2000,
                padding: 8,
                listStyle: 'none',
              }}
            >
              {suggestions.map((s, idx) => (
                <li
                  key={s.id}
                  role="option"
                  aria-selected={activeIndex === idx}
                  onMouseDown={(e) => {
                    // use onMouseDown to avoid input blur before click
                    e.preventDefault();
                    goToProduct(s.id);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  style={{
                    padding: '8px 10px',
                    background: activeIndex === idx ? '#f0f8ff' : 'transparent',
                    cursor: 'pointer',
                    borderRadius: 4,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: '#666' }}>{s.model} • {s.specs}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="right-group" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="contact-info" style={{ color: 'white', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span>☎ +852 2130 9227</span>
            <a href="mailto:info@ceoshop.com.hk" style={{ color: 'white' }}>
              ✉ info@ceoshop.com.hk
            </a>
          </div>

          <nav className="main-nav">
            <ul style={{ display: 'flex', gap: 12, margin: 0, padding: 0, listStyle: 'none' }}>
              <li>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                  主頁
                </Link>
              </li>
            </ul>
          </nav>

          <div className="cart" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'white' }}>
            <Link to="/quote" style={{ color: 'white', textDecoration: 'none' }}>
              🛒
            </Link>
            <span style={{ fontWeight: 600 }}>{quoteCount} Items</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
