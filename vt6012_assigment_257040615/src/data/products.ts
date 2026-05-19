// src/data/products.ts
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
  category: string;
  subcategory: string;
  highlights?: string[]; // 主要重點，例如 CPU / GPU / RAM
  details?: Record<string, string>; // 更詳細的規格
};

export const categories: Category[] = [
  {
    key: 'pc',
    title: '個人電腦',
    desc: '桌機、手提、平板、顯示器',
    img: '/desktop.png',
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
    img: '/server.png',
    subcategories: [{ key: 'server-unit', title: '伺服器' }],
  },
  {
    key: 'network',
    title: '網絡設備',
    desc: '交換器、路由器、網線',
    img: '/switch.png',
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
    img: '/antivirus.png',
    subcategories: [
      { key: 'antivirus', title: '防毒軟件' },
      { key: 'office-suite', title: '辦公室軟件' },
    ],
  },
];

export const products: Product[] = [
  // 個人電腦 - 桌上電腦 (3)
  {
    id: 'PC-D-001',
    title: 'Lenovo Desktop V50',
    model: 'V50',
    specs: 'i5 • 8GB • 256GB',
    img: '/desktop.png',
    category: 'pc',
    subcategory: 'desktop',
    highlights: ['CPU: Intel Core i5-10400', 'RAM: 8GB DDR4', 'Storage: 256GB NVMe SSD'],
    details: {
      '電源供應': '65W AC Adapter',
      '風扇數量': '1 x 系統風扇',
      '網路': 'Gigabit Ethernet',
      '保固': '3 Years On-site',
    },
  },
  {
    id: 'PC-D-002',
    title: 'HP ProDesk 400',
    model: '400G6',
    specs: 'i5 • 8GB • 512GB',
    img: '/desktop.png',
    category: 'pc',
    subcategory: 'desktop',
    highlights: ['CPU: Intel Core i5-10500', 'RAM: 8GB DDR4', 'Storage: 512GB SSD'],
    details: {
      '電源供應': '180W PSU',
      '風扇數量': '2 x 系統風扇',
      '網路': 'Intel Gigabit LAN',
      '保固': '3 Years On-site',
    },
  },
  {
    id: 'PC-D-003',
    title: 'Acer Veriton X',
    model: 'VX',
    specs: 'i7 • 16GB • 1TB',
    img: '/desktop.png',
    category: 'pc',
    subcategory: 'desktop',
    highlights: ['CPU: Intel Core i7-10700', 'RAM: 16GB DDR4', 'Storage: 1TB HDD + 256GB SSD'],
    details: {
      '電源供應': '300W PSU',
      '風扇數量': '2 x 系統風扇',
      '網路': 'Dual LAN',
      '保固': '3 Years Depot',
    },
  },

  // 個人電腦 - 手提電腦 (2)
  {
    id: 'PC-L-001',
    title: 'Dell Inspiron 14',
    model: 'IN14',
    specs: 'i5 • 8GB • 256GB',
    img: '/laptop.png',
    category: 'pc',
    subcategory: 'laptop',
    highlights: ['CPU: Intel Core i5-1135G7', 'RAM: 8GB LPDDR4', 'GPU: Intel Iris Xe'],
    details: {
      '電池容量': '52Wh',
      '重量': '1.4kg',
      '螢幕': '14" FHD',
      '保固': '1 Year Carry-in',
    },
  },
  {
    id: 'PC-L-002',
    title: 'ASUS VivoBook 15',
    model: 'V15',
    specs: 'i5 • 8GB • 512GB',
    img: '/laptop.png',
    category: 'pc',
    subcategory: 'laptop',
    highlights: ['CPU: Intel Core i5-1135G7', 'RAM: 8GB', 'Storage: 512GB SSD'],
    details: {
      '電池容量': '42Wh',
      '重量': '1.6kg',
      '螢幕': '15.6" FHD',
      '保固': '1 Year Carry-in',
    },
  },

  // 個人電腦 - 平板電腦 (4)
  {
    id: 'PC-T-001',
    title: 'Apple iPad 10',
    model: 'iPad10',
    specs: '64GB',
    img: '/tablet.png',
    category: 'pc',
    subcategory: 'tablet',
    highlights: ['SoC: Apple A14', 'Storage: 64GB', 'Display: 10.2" Retina'],
    details: {
      '電池續航': '約10小時',
      '重量': '487g',
      '連接': 'Wi‑Fi / LTE 選項',
      '保固': '1 Year',
    },
  },
  {
    id: 'PC-T-002',
    title: 'Samsung Galaxy Tab',
    model: 'TabS7',
    specs: '128GB',
    img: '/tablet.png',
    category: 'pc',
    subcategory: 'tablet',
    highlights: ['SoC: Snapdragon 865+', 'RAM: 6GB', 'Storage: 128GB'],
    details: {
      '電池續航': '約15小時',
      '重量': '498g',
      '連接': 'Wi‑Fi / LTE',
      '保固': '1 Year',
    },
  },
  {
    id: 'PC-T-003',
    title: 'Lenovo Tab P11',
    model: 'P11',
    specs: '64GB',
    img: '/tablet.png',
    category: 'pc',
    subcategory: 'tablet',
    highlights: ['CPU: Snapdragon 662', 'RAM: 4GB', 'Storage: 64GB'],
    details: {
      '電池續航': '約12小時',
      '重量': '490g',
      '連接': 'Wi‑Fi',
      '保固': '1 Year',
    },
  },
  {
    id: 'PC-T-004',
    title: 'Huawei MatePad',
    model: 'MP10',
    specs: '128GB',
    img: '/tablet.png',
    category: 'pc',
    subcategory: 'tablet',
    highlights: ['SoC: Kirin 810', 'RAM: 6GB', 'Storage: 128GB'],
    details: {
      '電池續航': '約11小時',
      '重量': '460g',
      '連接': 'Wi‑Fi',
      '保固': '1 Year',
    },
  },

  // 個人電腦 - 顯示器 (2)
  {
    id: 'PC-M-001',
    title: 'Dell 24" Monitor',
    model: 'U2419H',
    specs: '24" IPS',
    img: '/monitor.png',
    category: 'pc',
    subcategory: 'monitor',
    highlights: ['Panel: 24" IPS', 'Resolution: 1920x1080', 'Ports: DP + HDMI'],
    details: {
      '亮度': '250 cd/m²',
      '對比': '1000:1',
      '保固': '3 Years',
    },
  },
  {
    id: 'PC-M-002',
    title: 'LG 27" 4K',
    model: '27UL500',
    specs: '27" 4K',
    img: '/monitor.png',
    category: 'pc',
    subcategory: 'monitor',
    highlights: ['Panel: 27" 4K', 'Resolution: 3840x2160', 'HDR10 支援'],
    details: {
      '亮度': '300 cd/m²',
      '對比': '1000:1',
      '保固': '3 Years',
    },
  },

  // 伺服器系列 - 伺服器 (3)
  {
    id: 'SV-001',
    title: 'HPE ProLiant DL380',
    model: 'DL380',
    specs: 'Xeon • 32GB • 1TB',
    img: '/server.png',
    category: 'server',
    subcategory: 'server-unit',
    highlights: ['CPU: 2 x Intel Xeon Silver', 'RAM: 32GB ECC', 'Storage: 1TB RAID'],
    details: {
      '電源供應': '800W Redundant PSU',
      '風扇數量': '4 x Hot-swap Fans',
      '網路': 'Dual 10GbE',
      '保固': '3 Years On-site',
    },
  },
  {
    id: 'SV-002',
    title: 'Dell PowerEdge R740',
    model: 'R740',
    specs: 'Xeon • 64GB • 2TB',
    img: '/server.png',
    category: 'server',
    subcategory: 'server-unit',
    highlights: ['CPU: 2 x Intel Xeon Gold', 'RAM: 64GB ECC', 'Storage: 2TB RAID'],
    details: {
      '電源供應': '1100W Redundant PSU',
      '風扇數量': '6 x Hot-swap Fans',
      '網路': 'Dual 10GbE',
      '保固': '3 Years On-site',
    },
  },
  {
    id: 'SV-003',
    title: 'Lenovo ThinkSystem SR650',
    model: 'SR650',
    specs: 'Xeon • 64GB • 2TB',
    img: '/server.png',
    category: 'server',
    subcategory: 'server-unit',
    highlights: ['CPU: 2 x Intel Xeon', 'RAM: 64GB ECC', 'Storage: 2TB'],
    details: {
      '電源供應': '750W Redundant PSU',
      '風扇數量': '5 x Hot-swap Fans',
      '網路': 'Dual 10GbE',
      '保固': '3 Years On-site',
    },
  },

  // 網絡設備 - 交換器 (4)
  {
    id: 'NW-SW-001',
    title: 'Cisco Catalyst 9200',
    model: 'C9200',
    specs: '24-port',
    img: '/switch.png',
    category: 'network',
    subcategory: 'switch',
    highlights: ['Ports: 24 x Gigabit', 'PoE: 支援', 'Layer: 3'],
    details: {
      '電源供應': 'Internal PSU',
      '風扇數量': '1 x Fan',
      '保固': '3 Years',
    },
  },
  {
    id: 'NW-SW-002',
    title: 'Netgear ProSwitch',
    model: 'GS728TP',
    specs: '28-port PoE',
    img: '/switch.png',
    category: 'network',
    subcategory: 'switch',
    highlights: ['Ports: 24 PoE+', 'Managed: Yes', 'Layer: 2'],
    details: {
      '電源供應': 'Internal PSU',
      '風扇數量': '1 x Fan',
      '保固': '3 Years',
    },
  },
  {
    id: 'NW-SW-003',
    title: 'HPE Aruba 2930F',
    model: '2930F',
    specs: '24-port',
    img: '/switch.png',
    category: 'network',
    subcategory: 'switch',
    highlights: ['Ports: 24 x Gigabit', 'PoE: Optional', 'Managed: Yes'],
    details: {
      '電源供應': 'Internal PSU',
      '風扇數量': '1 x Fan',
      '保固': '3 Years',
    },
  },
  {
    id: 'NW-SW-004',
    title: 'TP-Link JetStream',
    model: 'T1600',
    specs: '48-port',
    img: '/switch.png',
    category: 'network',
    subcategory: 'switch',
    highlights: ['Ports: 48 x Gigabit', 'Managed: Yes', 'Layer: 2'],
    details: {
      '電源供應': 'Internal PSU',
      '風扇數量': '1 x Fan',
      '保固': '3 Years',
    },
  },

  // 網絡設備 - 路由器 (2)
  {
    id: 'NW-RT-001',
    title: 'Cisco ISR 1000',
    model: 'ISR1001',
    specs: 'WAN Router',
    img: '/router.png',
    category: 'network',
    subcategory: 'router',
    highlights: ['Throughput: 100Mbps', 'WAN: 1 x Gigabit', 'VPN: 支援'],
    details: {
      '電源供應': 'External Adapter',
      '風扇數量': '被動散熱',
      '保固': '3 Years',
    },
  },
  {
    id: 'NW-RT-002',
    title: 'MikroTik RB4011',
    model: 'RB4011',
    specs: '10GbE',
    img: '/router.png',
    category: 'network',
    subcategory: 'router',
    highlights: ['Ports: 10 x Gigabit', 'SFP+: 1 x 10GbE', 'CPU: Quad-core'],
    details: {
      '電源供應': 'PoE / Adapter',
      '風扇數量': '被動散熱',
      '保固': '1 Year',
    },
  },

  // 網絡設備 - 網絡線 (5)
  {
    id: 'NW-CB-001',
    title: 'Cat6 Patch Cable 1m',
    model: 'CAT6-1M',
    specs: '1m',
    img: '/cable.png',
    category: 'network',
    subcategory: 'cable',
    highlights: ['Type: Cat6', 'Length: 1m', 'Connector: RJ45'],
    details: {
      '材質': 'PVC',
      '顏色': '藍色',
      '保固': '1 Year',
    },
  },
  {
    id: 'NW-CB-002',
    title: 'Cat6a Patch Cable 2m',
    model: 'CAT6A-2M',
    specs: '2m',
    img: '/cable.png',
    category: 'network',
    subcategory: 'cable',
    highlights: ['Type: Cat6a', 'Length: 2m', 'Shielded: Yes'],
    details: {
      '材質': 'PVC',
      '顏色': '黑色',
      '保固': '1 Year',
    },
  },
  {
    id: 'NW-CB-003',
    title: 'Cat7 Patch Cable 3m',
    model: 'CAT7-3M',
    specs: '3m',
    img: '/cable.png',
    category: 'network',
    subcategory: 'cable',
    highlights: ['Type: Cat7', 'Length: 3m', 'Shielded: Yes'],
    details: {
      '材質': 'PVC',
      '顏色': '灰色',
      '保固': '1 Year',
    },
  },
  {
    id: 'NW-CB-004',
    title: 'Fiber Patch 1m',
    model: 'FIB-1M',
    specs: '1m',
    img: '/cable.png',
    category: 'network',
    subcategory: 'cable',
    highlights: ['Type: Fiber', 'Length: 1m', 'Connector: LC'],
    details: {
      '材質': 'Fiber',
      '顏色': '黃色',
      '保固': '1 Year',
    },
  },
  {
    id: 'NW-CB-005',
    title: 'Flat Ethernet 2m',
    model: 'FLAT-2M',
    specs: '2m',
    img: '/cable.png',
    category: 'network',
    subcategory: 'cable',
    highlights: ['Type: Flat Cat6', 'Length: 2m', 'Connector: RJ45'],
    details: {
      '材質': 'Flat PVC',
      '顏色': '白色',
      '保固': '1 Year',
    },
  },

  // 企業軟件 - 防毒軟件 (3)
  {
    id: 'SW-AV-001',
    title: 'Symantec Endpoint',
    model: 'SEP',
    specs: '企業版',
    img: '/antivirus.png',
    category: 'software',
    subcategory: 'antivirus',
    highlights: ['License: Per Device', 'Platform: Windows/Mac', 'Support: 24/7'],
    details: {
      '版本': '企業版',
      '授權方式': '年付',
      '保固': '技術支援',
    },
  },
  {
    id: 'SW-AV-002',
    title: 'Trend Micro Apex',
    model: 'Apex',
    specs: '企業版',
    img: '/antivirus.png',
    category: 'software',
    subcategory: 'antivirus',
    highlights: ['License: Per User', 'Platform: Windows/Mac', 'Cloud Management'],
    details: {
      '版本': '企業版',
      '授權方式': '年付',
      '保固': '技術支援',
    },
  },
  {
    id: 'SW-AV-003',
    title: 'Kaspersky Endpoint',
    model: 'KEP',
    specs: '企業版',
    img: '/antivirus.png',
    category: 'software',
    subcategory: 'antivirus',
    highlights: ['License: Per Device', 'Platform: Windows', 'Management: Centralized'],
    details: {
      '版本': '企業版',
      '授權方式': '年付',
      '保固': '技術支援',
    },
  },

  // 企業軟件 - 辦公室軟件 (2)
  {
    id: 'SW-OF-001',
    title: 'Microsoft 365 Business',
    model: 'M365',
    specs: '年付',
    img: '/office.png',
    category: 'software',
    subcategory: 'office-suite',
    highlights: ['Apps: Word/Excel/PowerPoint', 'Cloud: OneDrive 1TB', 'License: Per User'],
    details: {
      '版本': 'Business Standard',
      '授權方式': '年付',
      '支援': '線上支援',
    },
  },
  {
    id: 'SW-OF-002',
    title: 'LibreOffice Enterprise',
    model: 'LibreEnt',
    specs: '授權',
    img: '/office.png',
    category: 'software',
    subcategory: 'office-suite',
    highlights: ['Apps: Writer/Calc/Impress', 'License: Per Seat', 'Open Source'],
    details: {
      '版本': 'Enterprise',
      '授權方式': '永久授權',
      '支援': '付費支援',
    },
  },
];
