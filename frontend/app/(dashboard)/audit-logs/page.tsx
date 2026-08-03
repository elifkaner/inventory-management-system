import AuditLogsClient from './audit-logs-client';

export const metadata = {
  title: 'Sistem Günlükleri | StokPro',
  description: 'Sistemdeki kullanıcı ve veri hareketleri günlükleri.',
};

export default function AuditLogsPage() {
  return <AuditLogsClient />;
}
