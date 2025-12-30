/**
 * 模拟数据
 */

// 商品数据
export const mockProducts = [
  {
    id: 1,
    name: 'HUAWEI Mate 40 Pro',
    description: '5nm麒麟9000旗舰芯片 | 超感光徕卡电影影像',
    price: 6488,
    originalPrice: 6999,
    image: 'https://via.placeholder.com/300x300/96CEB4/FFFFFF?text=Mate40',
    images: [
      'https://via.placeholder.com/375x375/96CEB4/FFFFFF?text=Mate40+1',
      'https://via.placeholder.com/375x375/4ECDC4/FFFFFF?text=Mate40+2',
      'https://via.placeholder.com/375x375/45B7D1/FFFFFF?text=Mate40+3'
    ],
    categoryId: 3,
    isNew: true,
    isHot: true,
    isFeatured: true,
    discount: null,
    sales: 1289,
    stock: 100,
    specs: {
      '品牌': '华为',
      '型号': 'Mate 40 Pro',
      '颜色': '亮黑色',
      '内存': '8GB+256GB',
      '网络': '5G全网通',
      '屏幕': '6.76英寸 OLED',
      '摄像头': '5000万像素'
    }
  },
  {
    id: 2,
    name: 'iPhone 12',
    description: '5G手机 全网通 超视网膜XDR显示屏',
    price: 5999,
    originalPrice: 6299,
    image: 'https://via.placeholder.com/300x300/FFEEAD/000000?text=iPhone12',
    images: [
      'https://via.placeholder.com/375x375/FFEEAD/000000?text=iPhone12+1',
      'https://via.placeholder.com/375x375/DDA0DD/FFFFFF?text=iPhone12+2'
    ],
    categoryId: 3,
    isNew: false,
    isHot: true,
    isFeatured: true,
    discount: 0.95,
    sales: 3567,
    stock: 200,
    specs: {
      '品牌': '苹果',
      '型号': 'iPhone 12',
      '颜色': '蓝色',
      '内存': '128GB',
      '网络': '5G全网通',
      '屏幕': '6.1英寸 Super Retina XDR',
      '摄像头': '1200万像素双摄'
    }
  },
  {
    id: 3,
    name: 'HUAWEI P40 冰霜银',
    description: '全网通5G手机 麒麟990 5G SoC芯片',
    price: 4299,
    originalPrice: 4488,
    image: 'https://via.placeholder.com/300x300/DDA0DD/FFFFFF?text=P40',
    images: [
      'https://via.placeholder.com/375x375/DDA0DD/FFFFFF?text=P40+1',
      'https://via.placeholder.com/375x375/98D8C8/FFFFFF?text=P40+2'
    ],
    categoryId: 3,
    isNew: true,
    isHot: false,
    isFeatured: true,
    discount: null,
    sales: 892,
    stock: 150,
    specs: {
      '品牌': '华为',
      '型号': 'P40',
      '颜色': '冰霜银',
      '内存': '8GB+128GB',
      '网络': '5G全网通',
      '屏幕': '6.1英寸 OLED',
      '摄像头': '5000万像素三摄'
    }
  },
  {
    id: 4,
    name: 'Apple iPhone XR',
    description: 'A12仿生芯片 全面屏 面容ID',
    price: 5099,
    originalPrice: 6499,
    image: 'https://via.placeholder.com/300x300/98D8C8/FFFFFF?text=iPhoneXR',
    images: [
      'https://via.placeholder.com/375x375/98D8C8/FFFFFF?text=iPhoneXR+1'
    ],
    categoryId: 3,
    isNew: false,
    isHot: true,
    isFeatured: false,
    discount: 0.78,
    sales: 4123,
    stock: 80,
    specs: {
      '品牌': '苹果',
      '型号': 'iPhone XR',
      '颜色': '白色',
      '内存': '128GB',
      '网络': '4G全网通',
      '屏幕': '6.1英寸 Liquid 视网膜',
      '摄像头': '1200万像素'
    }
  },
  {
    id: 5,
    name: '小米10 至尊纪念版',
    description: '骁龙865 120倍超远变焦 120W快充',
    price: 5299,
    originalPrice: 5299,
    image: 'https://via.placeholder.com/300x300/F7CAC9/FFFFFF?text=Mi10',
    images: [
      'https://via.placeholder.com/375x375/F7CAC9/FFFFFF?text=Mi10+1',
      'https://via.placeholder.com/375x375/92A8D1/FFFFFF?text=Mi10+2'
    ],
    categoryId: 3,
    isNew: true,
    isHot: true,
    isFeatured: true,
    discount: null,
    sales: 1567,
    stock: 120,
    specs: {
      '品牌': '小米',
      '型号': '10 至尊纪念版',
      '颜色': '透明版',
      '内存': '12GB+256GB',
      '网络': '5G全网通',
      '屏幕': '6.67英寸 AMOLED',
      '摄像头': '4800万像素四摄'
    }
  },
  {
    id: 6,
    name: 'OPPO Find X2',
    description: '超感屏 65W超级闪充 骁龙865',
    price: 4999,
    originalPrice: 5499,
    image: 'https://via.placeholder.com/300x300/92A8D1/FFFFFF?text=OPPO',
    images: [
      'https://via.placeholder.com/375x375/92A8D1/FFFFFF?text=OPPO+1'
    ],
    categoryId: 3,
    isNew: false,
    isHot: true,
    isFeatured: false,
    discount: 0.91,
    sales: 987,
    stock: 90,
    specs: {
      '品牌': 'OPPO',
      '型号': 'Find X2',
      '颜色': '碧波蓝',
      '内存': '8GB+128GB',
      '网络': '5G全网通',
      '屏幕': '6.7英寸 AMOLED',
      '摄像头': '4800万像素三摄'
    }
  },
  {
    id: 7,
    name: 'MacBook Air M1',
    description: '苹果自研M1芯片 超长续航',
    price: 8499,
    originalPrice: 8999,
    image: 'https://via.placeholder.com/300x300/FFEAA7/000000?text=MacBook',
    categoryId: 12,
    isNew: true,
    isHot: true,
    isFeatured: true,
    discount: null,
    sales: 756,
    stock: 50
  },
  {
    id: 8,
    name: '索尼WH-1000XM4耳机',
    description: '降噪蓝牙耳机 智能降噪',
    price: 2599,
    originalPrice: 2899,
    image: 'https://via.placeholder.com/300x300/6A89CC/FFFFFF?text=Sony',
    categoryId: 11,
    isNew: false,
    isHot: true,
    isFeatured: false,
    discount: 0.9,
    sales: 1234,
    stock: 150
  },
  {
    id: 9,
    name: '无印良品 女式T恤',
    description: '纯棉舒适 简约设计',
    price: 70,
    originalPrice: 70,
    image: 'https://via.placeholder.com/300x300/B8E994/000000?text=MUJI',
    categoryId: 2,
    isNew: false,
    isHot: false,
    isFeatured: false,
    discount: null,
    sales: 2345,
    stock: 300
  },
  {
    id: 10,
    name: '豆浆机',
    description: '破壁无渣 多功能豆浆机',
    price: 299,
    originalPrice: 399,
    image: 'https://via.placeholder.com/300x300/78E08F/000000?text=Soymilk',
    categoryId: 13,
    isNew: true,
    isHot: false,
    isFeatured: true,
    discount: 0.75,
    sales: 567,
    stock: 80
  }
]

// 分类数据
export const mockCategories = [
  { id: 1, name: '超市', icon: 'shop-o', parentId: null },
  { id: 2, name: '服饰', icon: 'gem-o', parentId: null },
  { id: 3, name: '手机', icon: 'phone-o', parentId: null },
  { id: 4, name: '国际', icon: 'global-o', parentId: null },
  { id: 5, name: '生鲜', icon: 'flower-o', parentId: null },
  { id: 6, name: '到家', icon: 'home-o', parentId: null },
  { id: 7, name: '充值缴费', icon: 'balance-o', parentId: null },
  { id: 8, name: '9.9元拼', icon: 'discount', parentId: null },
  { id: 9, name: '领券', icon: 'coupon-o', parentId: null },
  { id: 10, name: '省钱', icon: 'gold-coin-o', parentId: null },
  { id: 11, name: '数码电器', icon: 'tv-o', parentId: null },
  { id: 12, name: '电脑办公', icon: 'laptop-o', parentId: null },
  { id: 13, name: '家居家装', icon: 'home-o', parentId: null },
  { id: 14, name: '美妆护肤', icon: 'smile-o', parentId: null },
  { id: 15, name: '母婴用品', icon: 'child-o', parentId: null },
  { id: 16, name: '运动户外', icon: 'fire-o', parentId: null },
  { id: 17, name: '食品饮料', icon: 'smile-comment-o', parentId: null },
  { id: 18, name: '图书音像', icon: 'description', parentId: null }
]

// 轮播图数据
export const mockBanners = [
  {
    id: 1,
    image: 'https://via.placeholder.com/750x375/667eea/FFFFFF?text=新品上市',
    link: '/product/1'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/750x375/764ba2/FFFFFF?text=限时特惠',
    link: '/product/2'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/750x375/f093fb/FFFFFF?text=热销爆款',
    link: '/product/5'
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/750x375/f5576c/FFFFFF?text=品牌精选',
    link: '/category'
  }
]

// 首页导航图标
export const mockNavIcons = [
  { id: 1, name: '超市', icon: 'shop-o', color: '#ff6b6b' },
  { id: 2, name: '服饰', icon: 'gem-o', color: '#feca57' },
  { id: 3, name: '手机', icon: 'phone-o', color: '#48dbfb' },
  { id: 4, name: '国际', icon: 'global-o', color: '#1dd1a1' },
  { id: 5, name: '生鲜', icon: 'flower-o', color: '#54a0ff' },
  { id: 6, name: '到家', icon: 'home-o', color: '#5f27cd' },
  { id: 7, name: '充值缴费', icon: 'balance-o', color: '#ff9ff3' },
  { id: 8, name: '9.9元拼', icon: 'discount', color: '#f368e0' },
  { id: 9, name: '领券', icon: 'coupon-o', color: '#ff9f43' },
  { id: 10, name: '省钱', icon: 'gold-coin-o', color: '#ee5a24' }
]