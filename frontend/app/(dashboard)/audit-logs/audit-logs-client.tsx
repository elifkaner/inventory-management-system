'use client';

import { useState, useEffect } from 'react';
import { authFetch, API_BASE_URL } from '@/app/lib/api';

export default function AuditLogsClient() {
  const [logs, setLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const res = await authFetch(`${API_BASE_URL}/api/AuditLog`);
        if (res.ok) {
          const data = await res.json();
          const rawLogs = Array.isArray(data) ? data : data.items || [];
          
          // Senior backend yöneticisinin talebi üzerine "System" işlemlerini (otomatik token yenileme vb.) listeden gizle
          const filteredLogs = rawLogs.filter((log: any) => {
            const userStr = log.userName || log.userId;
            if (!userStr) return false; // Eğer boşsa sistem işlemidir, gizle
            return userStr.toString().toLowerCase() !== 'system' && userStr.toString().toLowerCase() !== 'sistem';
          });
          
          setLogs(filteredLogs);
        } else {
          setError('Sistem günlükleri yüklenemedi.');
        }
      } catch (err) {
        setError('Sunucu bağlantı hatası.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getActionBadge = (action: string) => {
    switch (action.toUpperCase()) {
      case 'CREATE':
      case 'INSERT':
        return <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md text-xs font-bold">EKLEME</span>;
      case 'UPDATE':
        return <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-xs font-bold">GÜNCELLEME</span>;
      case 'DELETE':
        return <span className="px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-100 rounded-md text-xs font-bold">SİLME</span>;
      default:
        return <span className="px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-xs font-bold">{action}</span>;
    }
  };

  const formatLogValues = (val: string) => {
    if (!val || val === "{}") return null;
    try {
      const parsed = JSON.parse(val);
      return Object.entries(parsed)
        .filter(([k]) => k !== 'xmin') // Entity Framework iç değişkenini gizle
        .map(([k, v]) => `${k}: ${v}`)
        .join(' | ');
    } catch {
      return val.replace(/\\u[\dA-F]{4}/gi, (match) => 
        String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
      );
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sistem Günlükleri (Audit Logs)</h1>
          <p className="text-slate-500 mt-1 text-sm">Sistemde yapılan tüm kritik değişikliklerin (ekleme, güncelleme, silme) tarihçesi.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider">
              <th className="p-4 pl-6">Tarih / Saat</th>
              <th className="p-4">İşlem Yapan (User ID)</th>
              <th className="p-4">Tablo / Kayıt</th>
              <th className="p-4 text-center">Aksiyon</th>
              <th className="p-4 pr-6">Detaylar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
            {isLoading ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500 animate-pulse">Günlükler Yükleniyor...</td></tr>
            ) : error ? (
              <tr><td colSpan={5} className="p-8 text-center text-rose-500">{error}</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">Henüz hiçbir sistem günlüğü bulunmuyor.</td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="font-bold text-slate-900">{new Date(log.timestamp).toLocaleDateString('tr-TR')}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{new Date(log.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-100 px-2 py-1 rounded text-slate-600 font-mono text-xs">Kullanıcı: {log.userName || log.userId || 'Sistem'}</span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{log.entityName}</div>
                    <div className="text-xs text-slate-500 font-mono">ID: {log.entityId || '-'}</div>
                  </td>
                  <td className="p-4 text-center">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="p-4 pr-6">
                    <div className="max-w-2xl overflow-x-auto whitespace-pre-wrap break-words text-slate-600 text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200 shadow-sm" title={log.changedColumns}>
                      {log.action === 'UPDATE' && log.changedColumns && (
                         <div className="mb-2 text-blue-600 font-semibold border-b border-blue-100 pb-1">Değişen Alanlar: {log.changedColumns}</div>
                      )}
                      {log.oldValues && log.oldValues !== "{}" && (
                        <div className="text-rose-600 mb-1.5 leading-relaxed"><span className="font-bold">Eski:</span> {formatLogValues(log.oldValues)}</div>
                      )}
                      {log.newValues && log.newValues !== "{}" && (
                        <div className="text-emerald-600 leading-relaxed"><span className="font-bold">Yeni:</span> {formatLogValues(log.newValues)}</div>
                      )}
                      {(!log.oldValues || log.oldValues === "{}") && (!log.newValues || log.newValues === "{}") && (
                        <span>Detay yok</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
