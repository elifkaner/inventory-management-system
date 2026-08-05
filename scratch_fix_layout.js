const fs = require('fs');

// 1. Audit Logs Fix
const auditPath = 'frontend/app/(dashboard)/audit-logs/audit-logs-client.tsx';
let auditContent = fs.readFileSync(auditPath, 'utf8');

// Center TH
auditContent = auditContent.replace(
    '<th className="p-4 pl-6 whitespace-nowrap min-w-[150px]">Tarih / Saat</th>',
    '<th className="p-4 pl-6 whitespace-nowrap min-w-[150px] text-center">Tarih / Saat</th>'
);
auditContent = auditContent.replace(
    '<th className="p-4 whitespace-nowrap min-w-[200px]">İşlem Yapan (User ID)</th>',
    '<th className="p-4 whitespace-nowrap min-w-[200px] text-center">İşlem Yapan (User ID)</th>'
);
auditContent = auditContent.replace(
    '<th className="p-4 whitespace-nowrap min-w-[180px]">Tablo / Kayıt</th>',
    '<th className="p-4 whitespace-nowrap min-w-[180px] text-center">Tablo / Kayıt</th>'
);

// Center TD
auditContent = auditContent.replace(
    '<td className="p-4 pl-6 whitespace-nowrap">',
    '<td className="p-4 pl-6 whitespace-nowrap text-center">'
);
auditContent = auditContent.replace(
    '<td className="p-4 whitespace-nowrap">',
    '<td className="p-4 whitespace-nowrap text-center">'
);
auditContent = auditContent.replace(
    '<td className="p-4 whitespace-nowrap">',
    '<td className="p-4 whitespace-nowrap text-center">'
);

fs.writeFileSync(auditPath, auditContent, 'utf8');


// 2. Reports Fix
const reportsPath = 'frontend/app/(dashboard)/reports/page.tsx';
let reportsContent = fs.readFileSync(reportsPath, 'utf8');

const customLegendCode = `
const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', listStyle: 'none', padding: 0, margin: 0, marginTop: '20px' }}>
        {payload.map((entry: any, index: number) => (
          <li key={\`item-\${index}\`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontWeight: 600, fontSize: '13px' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: entry.color }}></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
};
`;

// Insert custom legend function
reportsContent = reportsContent.replace(
    'export default function AnalizVeRaporlamaSayfasi() {',
    customLegendCode + '\nexport default function AnalizVeRaporlamaSayfasi() {'
);

// Replace the AreaChart legend
reportsContent = reportsContent.replace(
    '<Legend iconType="circle" />',
    '<Legend content={renderCustomLegend} />'
);

fs.writeFileSync(reportsPath, reportsContent, 'utf8');

console.log('Fixed audit logs and reports layout!');
