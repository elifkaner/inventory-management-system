const fs = require('fs');
const path = 'frontend/app/(dashboard)/products/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove Export Button
const btnStart = content.indexOf('<button onClick={handleExportCsv}');
if(btnStart !== -1) {
    const btnEnd = content.indexOf('</button>', btnStart) + 9;
    content = content.substring(0, btnStart) + content.substring(btnEnd);
}

// 2. Widen columns
content = content.replace('<th className="px-3 py-3">SKU Kodu</th>', '<th className="px-3 py-3 whitespace-nowrap min-w-[120px]">SKU Kodu</th>');
content = content.replace('<th className="px-3 py-3">Barkod</th>', '<th className="px-3 py-3 whitespace-nowrap min-w-[140px]">Barkod</th>');

content = content.replace(
    '<td className="px-3 py-3 align-middle">\n                                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-brand-surfaceDark dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700/50 rounded px-2 py-1 break-all">\n                                            {prod.skuCode || \'-\'}\n                                        </span>\n                                    </td>',
    '<td className="px-3 py-3 align-middle whitespace-nowrap min-w-[120px]">\n                                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-brand-surfaceDark dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700/50 rounded px-2 py-1 break-all">\n                                            {prod.skuCode || \'-\'}\n                                        </span>\n                                    </td>'
);

content = content.replace(
    '<td className="px-3 py-3 align-middle">\n                                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-brand-surfaceDark dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700/50 rounded px-2 py-1 break-all">\n                                            {prod.barcode || \'-\'}\n                                        </span>\n                                    </td>',
    '<td className="px-3 py-3 align-middle whitespace-nowrap min-w-[140px]">\n                                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-brand-surfaceDark dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700/50 rounded px-2 py-1 break-all">\n                                            {prod.barcode || \'-\'}\n                                        </span>\n                                    </td>'
);

fs.writeFileSync(path, content, 'utf8');
console.log('done');
