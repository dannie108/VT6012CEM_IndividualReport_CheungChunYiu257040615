// src/components/Header.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../src/data/products';

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

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
      return;
    }
    const matched = products
      .filter((p) => {
        return (
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.model && p.model.toLowerCase().includes(q))
        );
      })
      .slice(0, MAX_SUGGESTIONS);
    setSuggestions(matched);
    setShowSuggestions(matched.length > 0);
    setActiveIndex(-1);
  }, [query]);

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
        goToProduct(suggestions[activeIndex].id);
      } else {
        goToSearch(query);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

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
    <header className="top-header">
      <div className="header-inner">
        {/* 搜尋區塊（縮短寬度由 CSS 控制） */}
        <div className="header-search" ref={containerRef} style={{ flex: '0 0 auto' }}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="搜尋產品名稱 / search product name..."
            onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
            className="header-search-input"
            style={{
              padding: '8px 10px',
              borderRadius: 4,
              border: 'none',
              boxSizing: 'border-box',
              width: '500px', // 預設寬度（可由 CSS 調整）
              maxWidth: '40vw',
            }}
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul
              role="listbox"
              aria-label="搜尋建議"
              className="search-suggestions"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                marginTop: 290,
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: 6,
                maxHeight: 260,
                overflow: 'auto',
                zIndex: 2000,
                padding: 8,
                listStyle: 'none',
                color: '#111',
              }}
            >
              {suggestions.map((s, idx) => (
                <li
                  key={s.id}
                  role="option"
                  aria-selected={activeIndex === idx}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    goToProduct(s.id);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="search-suggestion-item"
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

        <div className="right-group">
          <div className="contact-info" aria-hidden>
            <span>☎ +852 2130 9227</span>
            <a href="mailto:info@ceoshop.com.hk">✉ info@ceoshop.com.hk</a>
          </div>

          <nav className="main-nav" aria-label="主選單">
            <ul>
              <li>
                <Link to="/">主頁</Link>
              </li>
            </ul>
          </nav>

          <div className="cart" role="group" aria-label="報價清單">
            <Link to="/quote" aria-label="報價清單">🛒</Link>
            <span style={{ fontWeight: 600 }}>{quoteCount} Items</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
