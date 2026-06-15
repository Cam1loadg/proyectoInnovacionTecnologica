import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../context/AuthContext';

export default function BuyerHome() {
  const navigate = useNavigate();
  const [tab, setTab]           = useState('new');
  const [orderInput, setOrderInput] = useState('');
  const [trackInput, setTrackInput] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  async function handleOrderSearch(e) {
    e.preventDefault();
    const num = orderInput.trim().toUpperCase();
    if (!num) return;
    setLoading(true);
    setError('');
    const res = await api(`/api/buyer/order/${encodeURIComponent(num)}`);
    setLoading(false);
    if (res.success) {
      navigate(`/buyer/order/${encodeURIComponent(num)}`);
    } else {
      setError(res.error || 'Pedido no encontrado');
    }
  }

  async function handleTrack(e) {
    e.preventDefault();
    const code = trackInput.trim().toUpperCase();
    if (!code) return;
    setLoading(true);
    setError('');
    const res = await api(`/api/buyer/returns/${encodeURIComponent(code)}`);
    setLoading(false);
    if (res.success) {
      navigate(`/buyer/track/${encodeURIComponent(code)}`);
    } else {
      setError(res.error || 'Código no encontrado');
    }
  }

  function switchTab(t) {
    setTab(t);
    setError('');
  }

  return (
    <div className="login-screen">
      <div className="login-card" style={{ maxWidth: '400px' }}>

        <div className="login-logo-wrap">
          <div className="login-logo">Return<span>IQ</span></div>
          <div className="login-tagline">Portal del comprador</div>
        </div>

        <div className="buyer-tab-toggle">
          <button
            className={`buyer-tab-btn${tab === 'new' ? ' active' : ''}`}
            onClick={() => switchTab('new')}
            type="button"
          >
            Nueva devolución
          </button>
          <button
            className={`buyer-tab-btn${tab === 'track' ? ' active' : ''}`}
            onClick={() => switchTab('track')}
            type="button"
          >
            Rastrear
          </button>
        </div>

        {error && <div className="err-box" style={{ marginTop: '12px' }}>{error}</div>}

        {tab === 'new' ? (
          <form onSubmit={handleOrderSearch}>
            <div className="form-group">
              <label className="form-label">Número de pedido</label>
              <input
                className="form-input"
                placeholder="RIQ-2024-001"
                value={orderInput}
                onChange={e => setOrderInput(e.target.value)}
                autoFocus
              />
            </div>
            <button className="btn btn-primary" disabled={loading || !orderInput.trim()}>
              {loading ? 'Buscando...' : 'Buscar pedido'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleTrack}>
            <div className="form-group">
              <label className="form-label">Código de devolución</label>
              <input
                className="form-input"
                placeholder="RIQ-XXXXXX"
                value={trackInput}
                onChange={e => setTrackInput(e.target.value)}
                autoFocus
              />
            </div>
            <button className="btn btn-primary" disabled={loading || !trackInput.trim()}>
              {loading ? 'Buscando...' : 'Ver estado'}
            </button>
          </form>
        )}

        <div className="login-demo-box" style={{ marginTop: '20px' }}>
          <strong>Demo &mdash; pedidos sin devolución:</strong><br />
          ORD-2025-00001 &middot; ORD-2025-00002<br />
          <span style={{ fontSize: '11px' }}>Rastrear existente: RET-4729 &middot; RET-4732</span>
        </div>

      </div>
    </div>
  );
}
