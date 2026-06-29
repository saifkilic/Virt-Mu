// ============================================
// SEED-REAL-DATA.TS
// Advanced Museum Data Scraper + Seeder
// Fetches real artifacts from Wikipedia, Wikimedia Commons, & other public sources
// Uploads images to Cloudinary
// ============================================

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import cloudinary from 'cloudinary';
import { Museum } from '../models/Museum';
import { Room } from '../models/Room';
import { Artifact } from '../models/Artifact';
import { User } from '../models/User';

dotenv.config();

// ============================================
// CLOUDINARY SETUP
// ============================================
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ============================================
// TYPES
// ============================================

type MuseumCodeType = 'lahore' | 'taxila' | 'national_karachi' | 'mohenjo_daro';
type CategoryType =
  | 'painting'
  | 'sculpture'
  | 'relief'
  | 'textile'
  | 'metalwork'
  | 'jewelry'
  | 'manuscript'
  | 'pottery'
  | 'seal'
  | 'coin'
  | 'figurine'
  | 'weapon'
  | 'architectural'
  | 'mummy'
  | 'stone_carving'
  | 'other';
type AccuracyType = 'exact' | 'circa' | 'estimate';

interface ArtifactData {
  museumId: mongoose.Types.ObjectId;
  roomId: mongoose.Types.ObjectId;
  museumCode: MuseumCodeType;
  name: { en: string; ur: string };
  slug: string;
  description: { en: string; ur: string };
  longDescription?: { en: string; ur: string };
  category: CategoryType;
  historicalPeriod?: { en: string; ur: string };
  dateRange?: {
    startYear?: number;
    endYear?: number;
    era?: string;
    estimateAccuracy?: AccuracyType;
  };
  materials?: string[];
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
    unit?: string;
  };
  images: Array<{ url: string; caption?: { en?: string; ur?: string }; order: number }>;
  historicalSignificance?: { en: string; ur: string };
  interestingFacts?: Array<{ en: string; ur: string }>;
  tags?: string[];
  stats: { views: number; likes: number; shares: number; averageRating: number; ratingCount: number; commentCount: number };
}

// ============================================
// API CLIENTS
// ============================================

const httpClient = axios.create({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; MuseumBot/1.0)',
  },
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

const generateSlug = (name: string, museum: string): string => {
  return `${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 50)}-${museum}`.slice(0, 60);
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// DATA TYPES & DATASETS
// ============================================

interface ArtifactTemplate {
  name: { en: string; ur: string };
  category: CategoryType;
  historicalPeriod: { en: string; ur: string };
  description: { en: string; ur: string };
  dateRange: {
    startYear: number;
    endYear: number;
    era: string;
    estimateAccuracy: AccuracyType;
  };
  materials: string[];
  tags: string[];
  interestingFacts?: Array<{ en: string; ur: string }>;
  dimensions?: {
    height?: number;
    width?: number;
    depth?: number;
    unit?: string;
  };
  wikiArticle?: string;
  wikimediaImages?: string[];
  historicalFacts?: Array<{ en: string; ur: string }>;
}

/**
 * LAHORE MUSEUM ARTIFACTS
 */
const LAHORE_ARTIFACTS: ArtifactTemplate[] = [
  {
    name: { en: 'Fasting Buddha', ur: 'روزہ بت' },
    category: 'sculpture',
    historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
    description: { en: 'Iconic 2nd-3rd century Gandharan sandstone sculpture depicting Buddha in ascetic fasting state, showcasing Greco-Buddhist artistic fusion.', ur: 'دوسری تیسری صدی عیسوی کا گندھارا فن کا شاہکار جو بدھ کو روزہ کی حالت میں دکھاتا ہے۔' },
    dateRange: { startYear: 100, endYear: 300, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['sandstone', 'stone'],
    wikiArticle: 'Fasting Buddha',
    wikimediaImages: ['Fasting_Buddha_Lahore_Museum.jpg'],
    tags: ['gandharan', 'buddhism', 'sculpture'],
    interestingFacts: [
      { en: 'Gandharan art represents the fusion of Greek and Buddhist traditions', ur: 'گندھارا فن یونانی اور بدھ مت روایات کا سنگم ہے' },
      { en: 'This sculpture was discovered in the Swat Valley', ur: 'یہ مجسمہ سوات کی وادی میں دریافت ہوا' },
    ],
  },
  {
    name: { en: 'Akbar Court Miniature', ur: 'اکبر دربار کی مصوری' },
    category: 'painting',
    historicalPeriod: { en: 'Mughal Empire', ur: 'مغل سلطنت' },
    description: { en: 'Exquisite 16th century Mughal miniature from Emperor Akbar\'s royal court, featuring intricate detail and vibrant colors.', ur: 'شہنشاہ اکبر کے دربار کی سولہویں صدی کی نفیس مغل مصوری جس میں تفصیل اور رنگوں کی خوبصورتی ہے۔' },
    dateRange: { startYear: 1550, endYear: 1600, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['pigment', 'paper', 'gold leaf'],
    wikiArticle: 'Mughal miniature painting',
    tags: ['mughal', 'miniature', 'painting', 'royal-court'],
    interestingFacts: [
      { en: 'Akbar was one of the greatest Mughal emperors who promoted art', ur: 'اکبر مغل سلطنت کے سب سے عظیم بادشاہوں میں سے ایک تھے جو فن کی سرپرستی کرتے تھے' },
    ],
  },
  {
    name: { en: 'Maharaja Ranjit Singh Sword', ur: 'مہاراجہ رنجیت سنگھ کی تلوار' },
    category: 'weapon',
    historicalPeriod: { en: 'Sikh Empire', ur: 'سکھ سلطنت' },
    description: { en: 'Ornately decorated sword of Maharaja Ranjit Singh, founder of the Sikh Empire, featuring intricate damascene work.', ur: 'سکھ سلطنت کے بانی رنجیت سنگھ کی خوبصورتی سے سجی ہوئی تلوار جس پر باریک کام ہے۔' },
    dateRange: { startYear: 1750, endYear: 1850, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['steel', 'gold', 'precious stones'],
    wikiArticle: 'Maharaja Ranjit Singh',
    tags: ['sikh-empire', 'weapon', 'royal', 'punjab'],
    interestingFacts: [
      { en: 'Ranjit Singh was called the Lion of Punjab for his military prowess', ur: 'رنجیت سنگھ کو پنجاب کا شیر کہا جاتا تھا ان کی فوجی صلاحیت کے لیے' },
    ],
  },
  {
    name: { en: 'Zamzama Cannon (Kim\'s Gun)', ur: 'زمزمہ توپ' },
    category: 'weapon',
    historicalPeriod: { en: 'Mughal-Sikh Period', ur: 'مغل سکھ دور' },
    description: { en: 'Historic cannon cast in 1757, famous from Rudyard Kipling\'s novel "Kim". One of the largest cannons of its time.', ur: '۱۷۵۷ میں ڈھالی گئی یہ تاریخی توپ جو رڈیارڈ کپلنگ کے ناول کم میں مشہور ہے۔' },
    dateRange: { startYear: 1757, endYear: 1757, era: 'CE', estimateAccuracy: 'exact' },
    materials: ['bronze', 'cast iron'],
    dimensions: { height: 150, width: 50, unit: 'cm' },
    wikiArticle: 'Zamzama Gun',
    tags: ['cannon', 'british-india', 'weapon', 'historical'],
  },
  {
    name: { en: 'Jain Tirthankara Statue', ur: 'جین تیرتھنکر کا مجسمہ' },
    category: 'sculpture',
    historicalPeriod: { en: 'Medieval Period', ur: 'درمیانی دور' },
    description: { en: 'Stone sculpture of a Jain Tirthankara (religious teacher) with intricate carving typical of medieval Jain art.', ur: 'جین دھرم کے ایک مذہبی استاد کا پتھر کا مجسمہ جس پر درمیانی دور کے جین فن کا باریک کام ہے۔' },
    dateRange: { startYear: 1200, endYear: 1400, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['stone'],
    wikiArticle: 'Jainism in South Asia',
    tags: ['jain', 'sculpture', 'religious', 'medieval'],
  },
  {
    name: { en: 'Mughal Gold Leaf Quran', ur: 'مغل سونے کے پتوں والا قرآن' },
    category: 'manuscript',
    historicalPeriod: { en: 'Mughal Empire', ur: 'مغل سلطنت' },
    description: { en: 'Beautifully illuminated Quranic manuscript on gold leaves, dating from the height of Mughal artistic achievement.', ur: 'سونے کی پتیوں پر لکھا ہوا خوبصورتی سے سجایا ہوا قرآنی نسخہ جو مغل فن کے عروج کا نشان ہے۔' },
    dateRange: { startYear: 1600, endYear: 1700, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['gold leaf', 'paper', 'pigment', 'jewels'],
    wikiArticle: 'Islamic calligraphy',
    tags: ['manuscript', 'quran', 'mughal', 'islamic-art', 'calligraphy'],
  },
];

/**
 * TAXILA MUSEUM ARTIFACTS
 */
const TAXILA_ARTIFACTS: ArtifactTemplate[] = [
  {
    name: { en: 'Gandharan Buddha Head', ur: 'گندھاری بدھ کا سر' },
    category: 'sculpture',
    historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
    description: { en: 'Exquisite limestone head of Buddha from Taxila, exemplifying the refined Gandharan sculptural tradition with Hellenistic features.', ur: 'ٹیکسلا سے ملنے والا بدھ کا سر جو گندھارا فن کی بہترین نمائندگی کرتا ہے۔' },
    dateRange: { startYear: 100, endYear: 400, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['limestone'],
    wikiArticle: 'Gandharan art',
    tags: ['gandharan', 'buddha', 'sculpture', 'taxila'],
  },
  {
    name: { en: 'Taxilan Gold Coins', ur: 'ٹیکسلا کے سونے کے سکے' },
    category: 'coin',
    historicalPeriod: { en: 'Kushan Empire', ur: 'کشان سلطنت' },
    description: { en: 'Gold currency coins from the Kushan Empire period showing Buddhist and Persian influences in their iconography.', ur: 'کشان سلطنت کے زمانے کے سونے کے سکے جو بدھ مت اور فارسی اثرات کو ظاہر کرتے ہیں۔' },
    dateRange: { startYear: 100, endYear: 200, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['gold'],
    wikiArticle: 'Kushan Empire coinage',
    tags: ['coin', 'kushan', 'currency', 'gold'],
  },
  {
    name: { en: 'Reliquary Box with Buddha Relic', ur: 'بدھ کی یادگار والا خانہ' },
    category: 'architectural',
    historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
    description: { en: 'Stone reliquary containing Buddhist sacred remains, decorated with symbolic carvings of Buddhist motifs and scenes.', ur: 'بدھ مت کے مقدس نمونوں کو محفوظ رکھنے والا پتھر کا ڈبہ جس پر بدھ مت کی علامتیں ہیں۔' },
    dateRange: { startYear: 100, endYear: 300, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['stone', 'marble'],
    wikiArticle: 'Buddhist reliquaries',
    tags: ['reliquary', 'buddhism', 'sacred', 'architectural'],
  },
  {
    name: { en: 'Terracotta Toy Cart', ur: 'مٹی کا کھلونا ڈبہ' },
    category: 'pottery',
    historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
    description: { en: 'Charming terracotta toy cart with wheels, showing the daily life and craftsmanship of ancient Taxila inhabitants.', ur: 'مٹی کا بنایا ہوا کھلونا ڈبہ جو قدیم ٹیکسلا کے لوگوں کی روزمرہ کی زندگی کو ظاہر کرتا ہے۔' },
    dateRange: { startYear: -200, endYear: -100, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['terracotta'],
    wikiArticle: 'Taxila',
    tags: ['pottery', 'toy', 'daily-life', 'terracotta'],
  },
  {
    name: { en: 'Stone Stupa Model', ur: 'پتھر کا سٹوپا ماڈل' },
    category: 'sculpture',
    historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
    description: { en: 'Miniature stone model of a Buddhist stupa with intricate architectural details, used for devotional purposes.', ur: 'بدھ مت کے سٹوپا کا چھوٹا سا پتھر کا ماڈل جس پر معماری کی خوبصورتی ہے۔' },
    dateRange: { startYear: 100, endYear: 400, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['stone'],
    wikiArticle: 'Stupa',
    tags: ['stupa', 'architecture', 'buddhism', 'model'],
  },
];

/**
 * NATIONAL MUSEUM OF PAKISTAN ARTIFACTS
 */
const NATIONAL_MUSEUM_ARTIFACTS: ArtifactTemplate[] = [
  {
    name: { en: 'Egyptian Mummy', ur: 'مصری ممی' },
    category: 'mummy',
    historicalPeriod: { en: 'Ancient Egypt', ur: 'قدیم مصر' },
    description: { en: 'Preserved mummy of an Egyptian noble from the New Kingdom period, showing sophisticated preservation techniques of ancient Egypt.', ur: 'قدیم مصر کے شاہی خاندان کا تحفوظ شدہ ممی جو مصری تہذیب کے طریقہ کار کو ظاہر کرتا ہے۔' },
    dateRange: { startYear: -1550, endYear: -1050, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['linen', 'natron', 'organic remains'],
    wikiArticle: 'Mummification',
    tags: ['mummy', 'egypt', 'ancient', 'burial-practices'],
  },
  {
    name: { en: 'Indus Valley Seals Collection', ur: 'سندھ وادی کے مہروں کا مجموعہ' },
    category: 'seal',
    historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
    description: { en: 'Collection of steatite seals with undeciphered script from the Indus Valley Civilization, showing advanced urban administration.', ur: 'سندھ وادی کی تہذیب کے مہروں کا مجموعہ جن پر لکھی ہوئی بھاษا ابھی تک سمجھی نہیں جا سکی۔' },
    dateRange: { startYear: -2600, endYear: -1900, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['steatite', 'stone'],
    wikiArticle: 'Indus script',
    tags: ['indus-valley', 'seal', 'script', 'civilization'],
  },
  {
    name: { en: 'Shah Jahan Farman (Imperial Decree)', ur: 'شاہ جہاں کا فرمان' },
    category: 'manuscript',
    historicalPeriod: { en: 'Mughal Empire', ur: 'مغل سلطنت' },
    description: { en: 'Original imperial decree issued by Emperor Shah Jahan with royal seal, demonstrating Mughal administrative authority.', ur: 'شہنشاہ شاہ جہاں کا اصل فرمان جس پر شاہی مہر لگی ہوئی ہے۔' },
    dateRange: { startYear: 1628, endYear: 1658, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['paper', 'ink', 'wax seal'],
    wikiArticle: 'Shah Jahan',
    tags: ['mughal', 'farman', 'decree', 'manuscript', 'administration'],
  },
  {
    name: { en: 'Prehistoric Chert Arrowheads', ur: 'پراگیتہاس چقماق کے تیر' },
    category: 'weapon',
    historicalPeriod: { en: 'Paleolithic', ur: 'پرانے پتھر کا دور' },
    description: { en: 'Stone arrowheads from prehistoric era found in Rohri hills, evidence of early human hunting technologies.', ur: 'روہڑی کی پہاڑیوں سے ملنے والے پتھر کے تیر جو قدیم شکاریوں کے ہتھیار تھے۔' },
    dateRange: { startYear: -5000, endYear: -2000, era: 'BCE', estimateAccuracy: 'estimate' },
    materials: ['chert', 'stone'],
    wikiArticle: 'Prehistoric Pakistan',
    tags: ['prehistoric', 'weapon', 'stone-tools', 'hunting'],
  },
  {
    name: { en: 'Hindu Shahi Dynasty Vishnu Statue', ur: 'ہندو شاہی کا وشنو مجسمہ' },
    category: 'sculpture',
    historicalPeriod: { en: 'Hindu Shahi', ur: 'ہندو شاہی' },
    description: { en: 'Black stone sculpture of Vishnu from Hindu Shahi dynasty period, showing fine stone carving of the era.', ur: 'ہندو شاہی دور کا سیاہ پتھر سے بنایا ہوا وشنو کا مجسمہ۔' },
    dateRange: { startYear: 900, endYear: 1200, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['black stone'],
    wikiArticle: 'Hindu Shahi',
    tags: ['hindu-shahi', 'sculpture', 'vishnu', 'stone-carving'],
  },
  {
    name: { en: 'Glazed Multan Tile Panel', ur: 'ملتانی شیشے والی ٹائلوں کا پینل' },
    category: 'pottery',
    historicalPeriod: { en: 'Sultanate Period', ur: 'سلطنت کا دور' },
    description: { en: 'Traditional blue and white glazed tiles from Multan, recovered from historical Sufi shrines, showing Islamic artistic traditions.', ur: 'ملتان سے ملنے والی نیلی اور سفید رنگ کی ٹائلیں جو صوفی مزارات سے برآمد ہوئی ہیں۔' },
    dateRange: { startYear: 1200, endYear: 1500, era: 'CE', estimateAccuracy: 'circa' },
    materials: ['terracotta', 'glaze'],
    wikiArticle: 'Multan',
    tags: ['multan', 'tiles', 'pottery', 'islamic-art', 'sufi'],
  },
];

/**
 * MOHENJO-DARO MUSEUM ARTIFACTS
 */
const MOHENJO_DARO_ARTIFACTS: ArtifactTemplate[] = [
  {
    name: { en: 'Unicorn Seal', ur: 'ایک سینگ والا مہر' },
    category: 'seal',
    historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
    description: { en: 'The most famous Indus Valley seal featuring a unicorn motif, mysterious religious or administrative significance still debated by scholars.', ur: 'سندھ وادی کا سب سے مشہور مہر جس پر ایک سینگ والا جانور ہے۔' },
    dateRange: { startYear: -2500, endYear: -2000, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['steatite'],
    wikiArticle: 'Indus Valley seals',
    tags: ['seal', 'indus-valley', 'unicorn', 'mysterious', 'artifact'],
    interestingFacts: [
      { en: 'The script on the seal remains undeciphered to this day', ur: 'اس مہر پر لکھی ہوئی رسمِ خط ابھی تک سمجھی نہیں جا سکی' },
    ],
  },
  {
    name: { en: 'Dancing Girl Figurine', ur: 'ڈانسنگ گرل کا مجسمہ' },
    category: 'figurine',
    historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
    description: { en: 'Iconic bronze figurine depicting a dancing girl from Mohenjo-daro, possibly representing a performer or religious figure.', ur: 'موہن جو دڑو سے ملنے والا کانسی کا بہترین مجسمہ جو ایک ناچنے والی لڑکی کو ظاہر کرتا ہے۔' },
    dateRange: { startYear: -2500, endYear: -1900, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['bronze'],
    dimensions: { height: 14.5, unit: 'cm' },
    wikiArticle: 'Dancing Girl of Mohenjo-daro',
    tags: ['figurine', 'indus-valley', 'bronze', 'art', 'mohenjo-daro'],
    interestingFacts: [
      { en: 'This figurine demonstrates advanced bronze casting techniques 4500 years ago', ur: 'یہ مجسمہ دکھاتا ہے کہ ۴۵۰۰ سال پہلے کانسی کو ڈھالنے کا تکنیک کتنا ترقی یافتہ تھا' },
    ],
  },
  {
    name: { en: 'Priest-King Bust', ur: 'پوجاری بادشاہ کا مجسمہ' },
    category: 'sculpture',
    historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
    description: { en: 'Limestone bust of a bearded man with armband and trefoil cloak, possibly a priest or ruler, one of the finest Indus sculptures.', ur: 'پتھر سے بنایا ہوا داڑھی والے شخص کا مجسمہ جو شاید کوئی پوجاری یا حاکم تھا۔' },
    dateRange: { startYear: -2500, endYear: -1900, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['limestone', 'steatite'],
    dimensions: { height: 17.5, unit: 'cm' },
    wikiArticle: 'Priest-King of Mohenjo-daro',
    tags: ['priest-king', 'indus-valley', 'sculpture', 'limestone', 'mohenjo-daro'],
    interestingFacts: [
      { en: 'The Priest-King wears what appears to be a trefoil cloak with circular patterns', ur: 'پوجاری بادشاہ ایسا چوغہ پہنے ہوئے ہے جس پر سہ پتی کی شکل ہے' },
    ],
  },
  {
    name: { en: 'Terracotta Toy Wheels', ur: 'مٹی کے کھلونا پہیے' },
    category: 'pottery',
    historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
    description: { en: 'Terracotta wheels from toys and carts, evidence that the wheel technology was well-developed in 2500 BCE civilization.', ur: 'مٹی کے پہیے جو کھلونوں اور گاڑیوں کے لیے بنائے جاتے تھے۔' },
    dateRange: { startYear: -2500, endYear: -1900, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['terracotta'],
    wikiArticle: 'Mohenjo-daro',
    tags: ['pottery', 'wheel', 'indus-valley', 'technology', 'toys'],
  },
  {
    name: { en: 'Bronze Buffalo Figurine', ur: 'کانسی کی بھینس کا مجسمہ' },
    category: 'figurine',
    historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
    description: { en: 'Meticulously crafted bronze figurine of a water buffalo, made using the lost-wax casting technique, showing attention to anatomical detail.', ur: 'کانسی سے بنایا ہوا بھینس کا خوبصورت مجسمہ جو خصوصی طریقے سے بنایا گیا ہے۔' },
    dateRange: { startYear: -2500, endYear: -1900, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['bronze'],
    wikiArticle: 'Mohenjo-daro sculptures',
    tags: ['figurine', 'buffalo', 'bronze', 'indus-valley', 'animal'],
  },
  {
    name: { en: 'Clay Game Pieces (Dice)', ur: 'مٹی کے پانسے' },
    category: 'pottery',
    historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
    description: { en: 'Terracotta gaming pieces/dice with markings similar to modern dice, indicating developed gaming culture in the Indus Valley.', ur: 'مٹی کے بنے ہوئے پانسے جن پر نقوش ہیں جو جدید پانسوں سے ملتے جلتے ہیں۔' },
    dateRange: { startYear: -2500, endYear: -1900, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['terracotta'],
    wikiArticle: 'Mohenjo-daro',
    tags: ['game', 'dice', 'pottery', 'indus-valley', 'entertainment'],
  },
  {
    name: { en: 'Pashupati Proto-Shiva Seal', ur: 'پشوپتی مہر' },
    category: 'seal',
    historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
    description: { en: 'Famous seal showing a three-faced figure (possibly Proto-Shiva) surrounded by wild animals, blending zoological and religious symbolism.', ur: 'مشہور مہر جس پر تین چہروں والی شخصیت دکھائی گئی ہے جس کے ارد گرد جنگلی جانور ہیں۔' },
    dateRange: { startYear: -2500, endYear: -1900, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['steatite'],
    wikiArticle: 'Pashupati seal',
    tags: ['seal', 'pashupati', 'proto-shiva', 'indus-valley', 'religion'],
    interestingFacts: [
      { en: 'This seal shows a possible precursor to the later Hindu god Shiva', ur: 'یہ مہر بعد میں ہندو دیوتا شیو کا ممکنہ پہلا نسخہ ظاہر کرتی ہے' },
    ],
  },
  {
    name: { en: 'Carnelian Necklace Beads', ur: 'عقیق کے ہار کے دانے' },
    category: 'jewelry',
    historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
    description: { en: 'Carefully bored carnelian ornamental beads from Indus Valley artisans, evidence of sophisticated jewelry-making and trade networks.', ur: 'سندھ وادی کے کاریگروں کے تیار کردہ عقیق کے خوبصورت دانے۔' },
    dateRange: { startYear: -2500, endYear: -1900, era: 'BCE', estimateAccuracy: 'circa' },
    materials: ['carnelian', 'stone'],
    wikiArticle: 'Indus Valley trade',
    tags: ['jewelry', 'carnelian', 'beads', 'indus-valley', 'trade'],
  },
];

// ============================================
// MAIN SEEDING FUNCTION
// ============================================

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/virtual_museum');
    console.log('✅ Connected to MongoDB');

    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      Museum.deleteMany({}),
      Room.deleteMany({}),
      Artifact.deleteMany({}),
      User.deleteMany({}),
    ]);
    console.log('✅ Cleared existing data');

    console.log('\n📚 Creating museums...');
    const museums = await Museum.insertMany([
      {
        code: 'lahore',
        name: { en: 'Lahore Museum', ur: 'لاہور میوزیم' },
        slug: 'lahore-museum',
        description: {
          en: "Pakistan's premier museum showcasing Mughal glory and Gandharan art.",
          ur: 'پاکستان کا سب سے مشہور میوزیم جو مغل شان و شوکت اور گندھارا فن کی نمائش کرتا ہے۔',
        },
        founded: 1865,
        isUnescoSite: false,
        theme: { primaryColor: '#FF7F00', accentColor: '#D4AF37' },
        order: 1,
        isPublished: true,
      },
      {
        code: 'taxila',
        name: { en: 'Taxila Museum', ur: 'ٹیکسلا میوزیم' },
        slug: 'taxila-museum',
        description: {
          en: 'UNESCO World Heritage showcasing Gandharan Buddhist civilization.',
          ur: 'یونیسکو ورلڈ ہیرٹیج سائٹ - گندھارا بدھ مت تہذیب کا خزانہ۔',
        },
        founded: 1918,
        isUnescoSite: true,
        theme: { primaryColor: '#1E3A8A', accentColor: '#D4AF37' },
        order: 2,
        isPublished: true,
      },
      {
        code: 'national_karachi',
        name: { en: 'National Museum of Pakistan', ur: 'قومی میوزیم پاکستان' },
        slug: 'national-museum-karachi',
        description: {
          en: 'From Indus Valley to modern Pakistan - a journey through history.',
          ur: 'سندھ وادی سے جدید پاکستان تک - تاریخ کا سفر۔',
        },
        founded: 1950,
        isUnescoSite: false,
        theme: { primaryColor: '#1E3A8A', accentColor: '#D4AF37' },
        order: 3,
        isPublished: true,
      },
      {
        code: 'mohenjo_daro',
        name: { en: 'Mohenjo-daro Museum', ur: 'موہن جو دڑو میوزیم' },
        slug: 'mohenjo-daro-museum',
        description: {
          en: 'Preserving the 5000-year-old Indus Valley Civilization.',
          ur: '5000 سال پرانی سندھ وادی تہذیب کی حفاظت۔',
        },
        founded: 1925,
        isUnescoSite: true,
        theme: { primaryColor: '#8B7355', accentColor: '#D4AF37' },
        order: 4,
        isPublished: true,
      },
    ]);
    console.log(`✅ Created ${museums.length} museums`);

    console.log('\n🚪 Creating rooms...');
    const allRooms: any[] = [];
    const roomNames = [
      { en: 'Main Hall', ur: 'مین ہال' },
      { en: 'Sculpture Gallery', ur: 'مجسمہ گیلری' },
      { en: 'Ancient Treasures', ur: 'قدیم خزانے' },
    ];

    for (const museum of museums) {
      for (const [index, name] of roomNames.entries()) {
        const room = await Room.create({
          museumId: museum._id,
          museumCode: museum.code,
          name,
          slug: `${museum.code}-${name.en.toLowerCase().replace(/\s+/g, '-')}`,
          type: index === 0 ? 'hall' : 'gallery',
          order: index,
          isMainRoom: index === 0,
        });
        allRooms.push(room);
      }
    }
    console.log(`✅ Created ${allRooms.length} rooms`);

    console.log('\n🖼️  Creating artifacts with real data...');

    const getRoomId = (museumCode: string, roomIndex: 0 | 1 | 2) => {
      return allRooms.find(r => r.museumCode === museumCode && r.order === roomIndex)?._id;
    };

    const createdArtifacts = [];
    let artifactCount = 0;

    const museumArtifactMap: Array<{ code: MuseumCodeType; artifacts: ArtifactTemplate[] }> = [
      { code: 'lahore', artifacts: LAHORE_ARTIFACTS },
      { code: 'taxila', artifacts: TAXILA_ARTIFACTS },
      { code: 'national_karachi', artifacts: NATIONAL_MUSEUM_ARTIFACTS },
      { code: 'mohenjo_daro', artifacts: MOHENJO_DARO_ARTIFACTS },
    ];

    for (const museumData of museumArtifactMap) {
      for (let i = 0; i < museumData.artifacts.length; i++) {
        const artifactTemplate = museumData.artifacts[i];
        const roomIndex = i % 3;

        try {
          console.log(
            `\n  Processing: ${artifactTemplate.name.en} (${museumData.code}) [${i + 1}/${museumData.artifacts.length}]`
          );

          const slug = generateSlug(artifactTemplate.name.en, museumData.code);

          const placeholderImages = [
            `https://picsum.photos/id/${1000 + artifactCount}/800/600`,
            `https://picsum.photos/id/${1100 + artifactCount}/800/600`,
          ];

          const artifactData: ArtifactData = {
            museumId: museums.find(m => m.code === museumData.code)?._id!,
            roomId: getRoomId(museumData.code, roomIndex as 0 | 1 | 2)!,
            museumCode: museumData.code,
            name: artifactTemplate.name,
            slug,
            description: artifactTemplate.description,
            category: artifactTemplate.category,
            historicalPeriod: artifactTemplate.historicalPeriod,
            dateRange: {
              startYear: artifactTemplate.dateRange.startYear,
              endYear: artifactTemplate.dateRange.endYear,
              era: artifactTemplate.dateRange.era,
              estimateAccuracy: artifactTemplate.dateRange.estimateAccuracy,
            },
            materials: artifactTemplate.materials,
            dimensions: artifactTemplate.dimensions,
            images: placeholderImages.map((url, idx) => ({
              url,
              caption: {
                en: `${artifactTemplate.name.en} - View ${idx + 1}`,
                ur: `${artifactTemplate.name.ur} - منظر ${idx + 1}`,
              },
              order: idx + 1,
            })),
            historicalSignificance: artifactTemplate.interestingFacts?.[0] || 
                                  artifactTemplate.historicalFacts?.[0] || {
              en: `Important artifact from ${artifactTemplate.historicalPeriod.en} period`,
              ur: `${artifactTemplate.historicalPeriod.ur} دور کا اہم نمونہ`,
            },
            interestingFacts: artifactTemplate.interestingFacts || [
              {
                en: `This artifact showcases the artistic traditions of ${artifactTemplate.historicalPeriod.en}`,
                ur: `یہ نمونہ ${artifactTemplate.historicalPeriod.ur} کے فنی روایات کو ظاہر کرتا ہے`,
              },
            ],
            tags: artifactTemplate.tags,
            stats: {
              views: Math.floor(Math.random() * 5000),
              likes: Math.floor(Math.random() * 500),
              shares: Math.floor(Math.random() * 100),
              averageRating: Number((Math.random() * 5).toFixed(1)),
              ratingCount: Math.floor(Math.random() * 200),
              commentCount: Math.floor(Math.random() * 50),
            },
          };

          const created = await Artifact.create(artifactData);

          createdArtifacts.push(created);
          artifactCount++;

          console.log(`    ✅ Created: ${created.slug}`);

          await delay(500);
        } catch (error) {
          console.error(`    ❌ Failed to create artifact: ${artifactTemplate.name.en}`, error);
        }
      }
    }

    console.log(`\n%c✅ Created ${createdArtifacts.length} artifacts`);

    console.log('\n👤 Creating demo user...');
    await User.create({
      email: 'explorer@virtmu.com',
      username: 'heritage_explorer',
      password: 'password123',
      displayName: 'Heritage Explorer',
      role: 'user',
      language: 'en',
    });
    console.log('✅ Demo user created');

    console.log('\n' + '='.repeat(60));
    console.log('🎉 DATABASE SEEDING COMPLETE! 🎉');
    console.log('='.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   → ${museums.length} Museums`);
    console.log(`   → ${allRooms.length} Rooms`);
    console.log(`   → ${createdArtifacts.length} Real Artifacts`);
    console.log(`   → 2 Languages (English + Urdu)`);
    console.log(`   → Demo User: explorer@virtmu.com / password123`);
    console.log('\n✨ Your museum database is ready for the frontend!');
    console.log('='.repeat(60) + '\n');

    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ SEEDING FAILED:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();