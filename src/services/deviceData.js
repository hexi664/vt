// 设备品牌数据
export const deviceBrands = [
  {
    id: 'lenovo',
    name: '联想 ThinkPad/IdeaPad',
    description: '包括ThinkPad、IdeaPad等系列笔记本',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'dell',
    name: '戴尔 Dell',
    description: '包括XPS、Inspiron、Latitude等系列',
    image: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'hp',
    name: '惠普 HP',
    description: '包括Spectre、Pavilion、EliteBook等系列',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'asus',
    name: '华硕 ASUS',
    description: '包括ZenBook、VivoBook、ROG等系列',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 'other',
    name: '其他品牌',
    description: '宏碁、微星、技嘉、神舟等其他品牌',
    image: 'https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
  }
];

// 设备型号数据（按品牌分组）
export const deviceModels = {
  lenovo: [
    { id: 'thinkpad-x1', name: 'ThinkPad X1 Carbon', description: '轻薄商务笔记本' },
    { id: 'thinkpad-t14', name: 'ThinkPad T14', description: '商务办公笔记本' },
    { id: 'ideapad-5', name: 'IdeaPad 5', description: '主流家用笔记本' },
    { id: 'legion-5', name: 'Legion 5', description: '游戏笔记本' },
    { id: 'yoga', name: 'Yoga系列', description: '二合一变形本' }
  ],
  dell: [
    { id: 'xps-13', name: 'XPS 13', description: '轻薄高端笔记本' },
    { id: 'xps-15', name: 'XPS 15', description: '高性能创作本' },
    { id: 'inspiron-15', name: 'Inspiron 15', description: '主流家用笔记本' },
    { id: 'g15', name: 'G15', description: '游戏笔记本' },
    { id: 'latitude', name: 'Latitude系列', description: '商务办公笔记本' }
  ],
  hp: [
    { id: 'spectre', name: 'Spectre x360', description: '高端二合一笔记本' },
    { id: 'envy', name: 'Envy系列', description: '高性能创作本' },
    { id: 'pavilion', name: 'Pavilion系列', description: '主流家用笔记本' },
    { id: 'omen', name: 'Omen系列', description: '游戏笔记本' },
    { id: 'elitebook', name: 'EliteBook系列', description: '商务办公笔记本' }
  ],
  asus: [
    { id: 'zenbook', name: 'ZenBook系列', description: '轻薄高端笔记本' },
    { id: 'vivobook', name: 'VivoBook系列', description: '主流家用笔记本' },
    { id: 'rog', name: 'ROG系列', description: '游戏笔记本' },
    { id: 'tuf', name: 'TUF Gaming系列', description: '入门游戏笔记本' },
    { id: 'proart', name: 'ProArt系列', description: '创作者笔记本' }
  ],
  other: [
    { id: 'acer', name: '宏碁 Acer', description: '各系列笔记本' },
    { id: 'msi', name: '微星 MSI', description: '各系列笔记本' },
    { id: 'gigabyte', name: '技嘉 GIGABYTE', description: '各系列笔记本' },
    { id: 'hasee', name: '神舟 Hasee', description: '各系列笔记本' },
    { id: 'huawei', name: '华为 HUAWEI', description: '各系列笔记本' }
  ]
};

// 主板类型数据
export const motherboardTypes = [
  { id: 'american-megatrends', name: 'American Megatrends (AMI)', description: '常见于华硕、微星等品牌' },
  { id: 'award', name: 'Award BIOS', description: '常见于技嘉等品牌' },
  { id: 'insyde', name: 'Insyde H2O', description: '常见于惠普、联想等品牌' },
  { id: 'phoenix', name: 'Phoenix BIOS', description: '常见于戴尔、联想等品牌' },
  { id: 'unknown', name: '不确定', description: '如果不确定主板类型，请选择此项' }
]; 