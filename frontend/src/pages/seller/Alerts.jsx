import React, { useEffect, useState } from 'react';
import { useAuth, api } from '../../context/AuthContext';
import AppLayout from '../../components/AppLayout';

const REASON_KEYS   = ['wrong_size', 'defective', 'not_as_described', 'other'];
const REASON_LABELS = {
  wrong_size:       'Talla incorrecta',
  defective:        'Producto defectuoso',
  not_as_described: 'No cumplio expectativas',
  other:            'Otro',
};
const REASON_COLORS = {
  wrong_size:       '#E24B4A',
  defective:        'var(--gold)',
  not_as_described: '#74C0FC',
  other:            'var(--text3)',
};

export default function Alerts() {
  const { token } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api('/api/returns/alerts', {}, token).then(res => {
      if (res.success) setAlerts(res.data);
      setLoading(false);
    });
  }, [token]);

  return (
    <AppLayout>
      <div className="page-header">
        <span className="header-title">Alertas de producto</span>
        {alerts.length > 0 && (
          <span className="badge badge-alert">{alerts.length} {alerts.length === 1 ? 'alerta' : 'alertas'}</span>
        )}
      </div>

      <div className="page-content">
        <div className="content-inner">
          <div className="p-16">
            {loading && <div className="loading">Cargando...</div>}

            {!loading && alerts.length === 0 && (
              <div className="info-box">
                Sin alertas activas. Ningun producto supera 5 devoluciones en los ultimos 30 dias.
              </div>
            )}

            {alerts.map(alert => {
              const total = parseInt(alert.total_returns);
              return (
                <div key={alert.id}>
                  <div className="alert-box">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <circle cx="8" cy="8" r="7" fill="#E24B4A"/>
                      <path d="M8 4v4M8 10.5v1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <div style={{ fontSize: '13px' }}>
                      <strong>{alert.emoji_icon} {alert.name}</strong> acumula{' '}
                      <strong>{total} devoluciones</strong> en los ultimos 30 dias.
                      Se recomienda revisar la descripcion o la guia de tallas.
                    </div>
                  </div>

                  <div className="alert-product-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ fontFamily: 'var(--font-h)', fontSize: '16px', fontWeight: '700' }}>
                        {alert.emoji_icon} {alert.name}
                      </div>
                      <span className="badge badge-alert">{total} devoluciones</span>
                    </div>

                    <span className="section-label">Motivos principales</span>

                    <div style={{ marginTop: '8px' }}>
                      {REASON_KEYS.map(key => {
                        const count = parseInt(alert[key]) || 0;
                        if (!count) return null;
                        const pct = Math.round((count / total) * 100);
                        return (
                          <div key={key} className="reason-bar-row">
                            <div className="reason-label-row">
                              <span>{REASON_LABELS[key]}</span>
                              <span className="reason-pct">{pct}%</span>
                            </div>
                            <div style={{ height: '5px', background: 'var(--surface3)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{
                                width: `${pct}%`,
                                height: '100%',
                                background: REASON_COLORS[key],
                                borderRadius: '3px',
                                transition: 'width 0.4s',
                              }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
