const fs = require('fs');
const path = 'frontend/app/(dashboard)/reports/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add groupData helper function outside component
const groupDataCode = `
const groupData = (data: any[], nameKey: string, valueKey: string, maxItems = 6) => {
    if (!data || data.length <= maxItems) return data;
    const sorted = [...data].sort((a, b) => b[valueKey] - a[valueKey]);
    const top = sorted.slice(0, maxItems);
    const others = sorted.slice(maxItems);
    if (others.length > 0) {
        const othersValue = others.reduce((sum, item) => sum + item[valueKey], 0);
        top.push({
            [nameKey]: 'Diğer',
            [valueKey]: othersValue
        });
    }
    return top;
};
`;

// Insert the helper right after imports
content = content.replace(
    "export default function AnalizVeRaporlamaSayfasi() {",
    groupDataCode + "\nexport default function AnalizVeRaporlamaSayfasi() {"
);

// Apply grouping
content = content.replace(
    "// Harita: trendData => month name",
    `const groupedCategoryData = groupData(categoryData, 'categoryName', 'totalStock', 6);
    const groupedSupplierData = groupData(supplierData, 'supplierName', 'totalProducts', 6);

    // Harita: trendData => month name`
);

// Replace categoryData with groupedCategoryData in PieChart
content = content.replace(/data={categoryData}/g, 'data={groupedCategoryData}');
content = content.replace(/categoryData\.map/g, 'groupedCategoryData.map');

// Replace supplierData with groupedSupplierData in PieChart
content = content.replace(/data={supplierData}/g, 'data={groupedSupplierData}');
content = content.replace(/supplierData\.map/g, 'groupedSupplierData.map');

// Fix PieChart Legends to have a smaller font size and better layout
content = content.replace(
    /<Legend verticalAlign="bottom" height={36}\/>/g,
    '<Legend verticalAlign="bottom" wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />'
);

// Fix YAxis in BarChart to truncate long names
content = content.replace(
    /<YAxis dataKey="productName" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={150} \/>/,
    `<YAxis dataKey="productName" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} width={130} tickFormatter={(val) => val.length > 18 ? val.substring(0, 18) + '...' : val} />`
);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed reports layout!');
