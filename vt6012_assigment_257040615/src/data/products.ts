// src/data/dummyData.ts
export type Category = {
  key: string;
  title: string;
  desc?: string;
  img?: string;
  subcategories: { key: string; title: string }[];
};

export type Product = {
  id: string;
  title: string;
  model?: string;
  specs?: string;
  img?: string;
  category: string;    // e.g. 'office' / 'server' / 'network' / 'software'
  subcategory: string; // e.g. 'desktop' / 'laptop' / 'switch' / 'antivirus'
};

export const categories: Category[] = [
  {
    key: 'pc',
    title: '個人電腦',
    desc: '桌機、手提、平板、顯示器',
    img: '/sample.png',
    subcategories: [
      { key: 'desktop', title: '桌上電腦' },
      { key: 'laptop', title: '手提電腦' },
      { key: 'tablet', title: '平板電腦' },
      { key: 'monitor', title: '顯示器' },
    ],
  },
  {
    key: 'server',
    title: '伺服器系列',
    desc: '企業伺服器',
    img: '/sample.png',
    subcategories: [{ key: 'server-unit', title: '伺服器' }],
  },
  {
    key: 'network',
    title: '網絡設備',
    desc: '交換器、路由器、網線',
    img: '/sample.png',
    subcategories: [
      { key: 'switch', title: '交換器' },
      { key: 'router', title: '路由器' },
      { key: 'cable', title: '網絡線' },
    ],
  },
  {
    key: 'software',
    title: '企業軟件',
    desc: '防毒、辦公室軟件',
    img: '/sample.png',
    subcategories: [
      { key: 'antivirus', title: '防毒軟件' },
      { key: 'office-suite', title: '辦公室軟件' },
    ],
  },
];

/* 每個小分類 2-5 筆隨機範例產品 */
export const products: Product[] = [
  // 個人電腦 - 桌上電腦 (3)
  { id: 'PC-D-001', title: 'Lenovo Desktop V50', model: 'V50', specs: 'i5 • 8GB • 256GB', img: '/sample.png', category: 'pc', subcategory: 'desktop' },
  { id: 'PC-D-002', title: 'HP ProDesk 400', model: '400G6', specs: 'i5 • 8GB • 512GB', img: '/sample.png', category: 'pc', subcategory: 'desktop' },
  { id: 'PC-D-003', title: 'Acer Veriton X', model: 'VX', specs: 'i7 • 16GB • 1TB', img: '/sample.png', category: 'pc', subcategory: 'desktop' },

  // 個人電腦 - 手提電腦 (2)
  { id: 'PC-L-001', title: 'Dell Inspiron 14', model: 'IN14', specs: 'i5 • 8GB • 256GB', img: '/sample.png', category: 'pc', subcategory: 'laptop' },
  { id: 'PC-L-002', title: 'ASUS VivoBook 15', model: 'V15', specs: 'i5 • 8GB • 512GB', img: '/sample.png', category: 'pc', subcategory: 'laptop' },

  // 個人電腦 - 平板電腦 (4)
  { id: 'PC-T-001', title: 'Apple iPad 10', model: 'iPad10', specs: '64GB', img: '/sample.png', category: 'pc', subcategory: 'tablet' },
  { id: 'PC-T-002', title: 'Samsung Galaxy Tab', model: 'TabS7', specs: '128GB', img: '/sample.png', category: 'pc', subcategory: 'tablet' },
  { id: 'PC-T-003', title: 'Lenovo Tab P11', model: 'P11', specs: '64GB', img: '/sample.png', category: 'pc', subcategory: 'tablet' },
  { id: 'PC-T-004', title: 'Huawei MatePad', model: 'MP10', specs: '128GB', img: '/sample.png', category: 'pc', subcategory: 'tablet' },

  // 個人電腦 - 顯示器 (2)
  { id: 'PC-M-001', title: 'Dell 24" Monitor', model: 'U2419H', specs: '24" IPS', img: '/sample.png', category: 'pc', subcategory: 'monitor' },
  { id: 'PC-M-002', title: 'LG 27" 4K', model: '27UL500', specs: '27" 4K', img: '/sample.png', category: 'pc', subcategory: 'monitor' },

  // 伺服器系列 - 伺服器 (3)
  { id: 'SV-001', title: 'HPE ProLiant DL380', model: 'DL380', specs: 'Xeon • 32GB • 1TB', img: '/sample.png', category: 'server', subcategory: 'server-unit' },
  { id: 'SV-002', title: 'Dell PowerEdge R740', model: 'R740', specs: 'Xeon • 64GB • 2TB', img: '/sample.png', category: 'server', subcategory: 'server-unit' },
  { id: 'SV-003', title: 'Lenovo ThinkSystem SR650', model: 'SR650', specs: 'Xeon • 64GB • 2TB', img: '/sample.png', category: 'server', subcategory: 'server-unit' },

  // 網絡設備 - 交換器 (4)
  { id: 'NW-SW-001', title: 'Cisco Catalyst 9200', model: 'C9200', specs: '24-port', img: '/sample.png', category: 'network', subcategory: 'switch' },
  { id: 'NW-SW-002', title: 'Netgear ProSwitch', model: 'GS728TP', specs: '28-port PoE', img: '/sample.png', category: 'network', subcategory: 'switch' },
  { id: 'NW-SW-003', title: 'HPE Aruba 2930F', model: '2930F', specs: '24-port', img: '/sample.png', category: 'network', subcategory: 'switch' },
  { id: 'NW-SW-004', title: 'TP-Link JetStream', model: 'T1600', specs: '48-port', img: '/sample.png', category: 'network', subcategory: 'switch' },

  // 網絡設備 - 路由器 (2)
  { id: 'NW-RT-001', title: 'Cisco ISR 1000', model: 'ISR1001', specs: 'WAN Router', img: '/sample.png', category: 'network', subcategory: 'router' },
  { id: 'NW-RT-002', title: 'MikroTik RB4011', model: 'RB4011', specs: '10GbE', img: '/sample.png', category: 'network', subcategory: 'router' },

  // 網絡設備 - 網絡線 (5)
  { id: 'NW-CB-001', title: 'Cat6 Patch Cable 1m', model: 'CAT6-1M', specs: '1m', img: '/sample.png', category: 'network', subcategory: 'cable' },
  { id: 'NW-CB-002', title: 'Cat6a Patch Cable 2m', model: 'CAT6A-2M', specs: '2m', img: '/sample.png', category: 'network', subcategory: 'cable' },
  { id: 'NW-CB-003', title: 'Cat7 Patch Cable 3m', model: 'CAT7-3M', specs: '3m', img: '/sample.png', category: 'network', subcategory: 'cable' },
  { id: 'NW-CB-004', title: 'Fiber Patch 1m', model: 'FIB-1M', specs: '1m', img: '/sample.png', category: 'network', subcategory: 'cable' },
  { id: 'NW-CB-005', title: 'Flat Ethernet 2m', model: 'FLAT-2M', specs: '2m', img: '/sample.png', category: 'network', subcategory: 'cable' },

  // 企業軟件 - 防毒軟件 (3)
  { id: 'SW-AV-001', title: 'Symantec Endpoint', model: 'SEP', specs: '企業版', img: '/sample.png', category: 'software', subcategory: 'antivirus' },
  { id: 'SW-AV-002', title: 'Trend Micro Apex', model: 'Apex', specs: '企業版', img: '/sample.png', category: 'software', subcategory: 'antivirus' },
  { id: 'SW-AV-003', title: 'Kaspersky Endpoint', model: 'KEP', specs: '企業版', img: '/sample.png', category: 'software', subcategory: 'antivirus' },

  // 企業軟件 - 辦公室軟件 (2)
  { id: 'SW-OF-001', title: 'Microsoft 365 Business', model: 'M365', specs: '年付', img: '/sample.png', category: 'software', subcategory: 'office-suite' },
  { id: 'SW-OF-002', title: 'LibreOffice Enterprise', model: 'LibreEnt', specs: '授權', img: '/sample.png', category: 'software', subcategory: 'office-suite' },
];
