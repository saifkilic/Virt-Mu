// ============================================
// SEED-COMPLETE-ARTIFACTS.TS
// Comprehensive museum database with 75+ real artifacts
// Lahore (26) + Taxila (28) + National Museum (11) + Mohenjo-daro (10)
// ============================================

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Museum } from '../models/Museum';
import { Room } from '../models/Room';
import { Artifact } from '../models/Artifact';

dotenv.config();

// ============================================
// MUSEUM IMAGES
// ============================================

const MUSEUM_IMAGES = {
  lahore: 'https://res.cloudinary.com/dhewqmiy5/image/upload/v1782645643/lahore_hrimxu.jpg',
  taxila: 'https://res.cloudinary.com/dhewqmiy5/image/upload/v1782645670/taxilla_oqr61l.jpg',
  national_karachi: 'https://res.cloudinary.com/dhewqmiy5/image/upload/v1782645806/national_museum_v8pixt.jpg',
  mohenjo_daro: 'https://res.cloudinary.com/dhewqmiy5/image/upload/v1782645806/mohenjo_daro_m1z1az.jpg',
};

// ============================================
// LAHORE MUSEUM ARTIFACTS (26 total)
// ============================================

const LAHORE_ARTIFACTS = [
  // Indus Valley Items
  {
    "name": { "en": "Female Figurine", "ur": "خاتون کا مٹی کا مجسمہ" },
    "slug": "mohenjodaro-female-figurine-lahore",
    "description": { "en": "A classic terracotta female figurine from Mohenjo-Daro with elaborate jewelry and distinctive headdress", "ur": "موئن جو دڑو سے حاصل کردہ مٹی کا ایک روایتی نسوانی مجسمہ" },
    "category": "figurine",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Indus Valley Civilization", "ur": "وادیٔ سندھ کی تہذیب" },
    "dateRange": { "startYear": 2600, "endYear": 1900, "era": "BCE", "estimateAccuracy": "circa" },
    "materials": ["terracotta"],
    "tags": ["indus-valley", "mohenjo-daro", "terracotta", "figurine"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568697/P-1393_sqv6al.jpg", "caption": { "en": "Terracotta female figurine", "ur": "مٹی کا نسوانی مجسمہ" }, "order": 1 }]
  },
  // Modern Pakistani Art
  {
    "name": { "en": "Village Scene", "ur": "دیہاتی منظر (بلوچی خواتین)" },
    "slug": "village-scene-sadequain-lahore",
    "description": { "en": "Oil painting by Sadequain depicting Balochi village life", "ur": "صادقین کی آئل پینٹنگ" },
    "category": "painting",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Modern Pakistani Art", "ur": "جدید پاکستانی دورِ فن" },
    "dateRange": { "startYear": 1954, "endYear": 1954, "era": "CE", "estimateAccuracy": "exact" },
    "materials": ["oil on canvas"],
    "tags": ["painting", "sadequain", "modern-art"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568699/sadquain_village_hdc0xu.jpg", "caption": { "en": "Sadequain's Balochi village scene", "ur": "بلوچ خواتین کا منظر" }, "order": 1 }]
  },
  // Coins
  {
    "name": { "en": "Gold Coin With The Name Of Vasu Deva", "ur": "واسو دیو کے نام کا سونے کا سکہ" },
    "slug": "gold-coin-vasu-deva-lahore",
    "description": { "en": "Rare gold coin from Kushano-Sassanian rulers featuring King Vasu Deva", "ur": "کوشان ساسانی دور کا نایاب سونے کا سکہ" },
    "category": "coin",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Kushano-Sassanian Period", "ur": "کوشان ساسانی دور" },
    "dateRange": { "startYear": 200, "endYear": 350, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["gold"],
    "tags": ["coin", "gold", "kushano-sassanian"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568694/16_0_i9jro2.jpg", "caption": { "en": "Vasu Deva gold coin", "ur": "واسو دیو کا سکہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Gold Coin of Mughal Emperor Akbar", "ur": "مغل شہنشاہ اکبر کا سونے کا سکہ" },
    "slug": "gold-coin-akbar-lahore",
    "description": { "en": "Mughal gold coin minted in Agra during Akbar's reign", "ur": "اکبر کے دور میں آگرہ سے جاری ہونے والا سونے کا سکہ" },
    "category": "coin",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Mughal Empire", "ur": "مغلیہ سلطنت" },
    "dateRange": { "startYear": 1556, "endYear": 1605, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["gold"],
    "tags": ["coin", "mughal", "akbar"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782567151/4_2_f3jpsd.jpg", "caption": { "en": "Akbar's gold coin", "ur": "اکبر کا سکہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Silver Coin Of Hippostratos", "ur": "ہپوسٹراٹوس کا چاندی کا سکہ" },
    "slug": "silver-coin-hippostratos-lahore",
    "description": { "en": "Indo-Greek silver coin featuring King Hippostratos on horseback", "ur": "ہند-یونانی دور کا چاندی کا سکہ" },
    "category": "coin",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Indo-Greek Kingdom", "ur": "ہند-یونانی دور" },
    "dateRange": { "startYear": -65, "endYear": -55, "era": "BCE", "estimateAccuracy": "circa" },
    "materials": ["silver"],
    "tags": ["coin", "indo-greek"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782567148/20_0_ingaiq.jpg", "caption": { "en": "Indo-Greek coin", "ur": "یونانی سکہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Silver Coin Of Eukratides II", "ur": "یوکریٹائڈس دوم کا چاندی کا سکہ" },
    "slug": "silver-coin-eukratides-ii-lahore",
    "description": { "en": "Greco-Bactrian silver coin showing King Eukratides II with crested helmet", "ur": "یونانی باختری دور کا سکہ" },
    "category": "coin",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Greco-Bactrian Kingdom", "ur": "یونانی باختری دور" },
    "dateRange": { "startYear": -145, "endYear": -140, "era": "BCE", "estimateAccuracy": "circa" },
    "materials": ["silver"],
    "tags": ["coin", "greco-bactrian"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782567147/CoinOfEukratidesII_xgapyj.jpg", "caption": { "en": "Greco-Bactrian coin", "ur": "باختری سکہ" }, "order": 1 }]
  },
  // Stamps
  {
    "name": { "en": "Quaid-e-Azam Memorial Stamp", "ur": "یادگاری ٹکٹ قائد اعظم" },
    "slug": "quaid-azam-memorial-stamp-lahore",
    "description": { "en": "Commemorative stamp issued for Quaid-e-Azam Mohammad Ali Jinnah", "ur": "قائد اعظم کے نام پر جاری کیا گیا ٹکٹ" },
    "category": "other",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Post-Independence Pakistan", "ur": "قیامِ پاکستان کے بعد کا دور" },
    "dateRange": { "startYear": 1949, "endYear": 1949, "era": "CE", "estimateAccuracy": "exact" },
    "materials": ["paper"],
    "tags": ["stamp", "jinnah", "pakistan"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782566724/15_0_ea0n28.jpg", "caption": { "en": "Quaid-e-Azam stamp", "ur": "قائد اعظم کا ٹکٹ" }, "order": 1 }]
  },
  {
    "name": { "en": "Crescent and Star with Leaf Stamp", "ur": "ڈاک ٹکٹ ہلال، ستارہ اور پتا" },
    "slug": "crescent-star-stamp-lahore",
    "description": { "en": "First independence series stamp designed by Abdul Rehman Chughtai", "ur": "عبدالرحمٰن چغتائی کا ڈیزائن کردہ پہلا یومِ آزادی ٹکٹ" },
    "category": "other",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Post-Independence Pakistan", "ur": "قیامِ پاکستان کے بعد کا دور" },
    "dateRange": { "startYear": 1948, "endYear": 1948, "era": "CE", "estimateAccuracy": "exact" },
    "materials": ["paper"],
    "tags": ["stamp", "independence", "chughtai"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782566850/7_2_nvnro4.jpg", "caption": { "en": "Independence stamp", "ur": "یومِ آزادی ٹکٹ" }, "order": 1 }]
  },
  // Gandharan Sculptures
  {
    "name": { "en": "Fasting Siddhartha", "ur": "روزہ دار سدھارتھ" },
    "slug": "fasting-siddhartha-lahore",
    "description": { "en": "Gandharan masterpiece showing Siddhartha in ascetic state", "ur": "سدھارتھ کو ریاضت کے باعث کمزور حالت میں دکھاتا ہے" },
    "category": "sculpture",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Gandharan", "ur": "گندھارا دور" },
    "dateRange": { "startYear": 100, "endYear": 300, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist stone"],
    "tags": ["gandhara", "buddhism", "sculpture"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782567153/G-75_eqpiyd.jpg", "caption": { "en": "Fasting Buddha", "ur": "روزہ دار بدھا" }, "order": 1 }]
  },
  {
    "name": { "en": "Miracle of Sravasti", "ur": "شراوستی کا معجزہ" },
    "slug": "miracle-sravasti-lahore",
    "description": { "en": "Sculptural relief showing Buddha performing miracles", "ur": "بدھا کو معجزے کرتے دکھاتا ہے" },
    "category": "sculpture",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Gandharan", "ur": "گندھارا دور" },
    "dateRange": { "startYear": 200, "endYear": 400, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist stone"],
    "tags": ["gandhara", "buddhism", "relief"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782567154/G-155_gi8yw3.jpg", "caption": { "en": "Sravasti miracle panel", "ur": "شراوستی کے معجزے کا پینل" }, "order": 1 }]
  },
  {
    "name": { "en": "Dream of Queen Maya", "ur": "ملکہ مایا کا خواب" },
    "slug": "dream-queen-maya-lahore",
    "description": { "en": "Gandharan relief showing Maya's prophetic dream", "ur": "ملکہ مایا کے خواب کو ظاہر کرتا ہے" },
    "category": "sculpture",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Gandharan", "ur": "گندھارا دور" },
    "dateRange": { "startYear": 100, "endYear": 300, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist stone"],
    "tags": ["gandhara", "buddhism", "relief"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568062/G-13_amsbap.jpg", "caption": { "en": "Maya's dream", "ur": "مایا کا خواب" }, "order": 1 }]
  },
  {
    "name": { "en": "Birth of Siddhartha", "ur": "سدھارتھ کی پیدائش" },
    "slug": "birth-siddhartha-lahore",
    "description": { "en": "Relief depicting the birth of Buddha in Lumbini Garden", "ur": "لومبینی باغ میں بدھا کی پیدائش" },
    "category": "sculpture",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Gandharan", "ur": "گندھارا دور" },
    "dateRange": { "startYear": 100, "endYear": 300, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist stone"],
    "tags": ["gandhara", "buddhism", "relief"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568062/G-17_xma4yw.jpg", "caption": { "en": "Buddha's birth", "ur": "بدھا کی پیدائش" }, "order": 1 }]
  },
  // Paintings and Murals
  {
    "name": { "en": "Evolution of Mankind Mural", "ur": "ارتقائے انسانیت (دیواری چتر)" },
    "slug": "evolution-mankind-mural-lahore",
    "description": { "en": "Monumental mural by Syed Sadequain in Lahore Museum", "ur": "صادقین کا دیواری چتر" },
    "category": "painting",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Contemporary Modern", "ur": "جدید دور" },
    "dateRange": { "startYear": 1974, "endYear": 1974, "era": "CE", "estimateAccuracy": "exact" },
    "materials": ["oil on canvas"],
    "tags": ["painting", "mural", "modern-art"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782567151/SADIQAINMURAL_vqr15y.jpg", "caption": { "en": "Sadequain's mural", "ur": "صادقین کا دیواری چتر" }, "order": 1 }]
  },
  {
    "name": { "en": "Tilism e Hoshruba", "ur": "طلسمِ ہوش ربا (مصوری)" },
    "slug": "tilism-hoshruba-lahore",
    "description": { "en": "Oil painting by Ustaad Allah Baksh based on Urdu epic", "ur": "استاد اللہ بخش کی داستانوی آئل پینٹنگ" },
    "category": "painting",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Modern Pakistan Art", "ur": "جدید دورِ مصوری" },
    "dateRange": { "startYear": 1950, "endYear": 1956, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["oil on canvas"],
    "tags": ["painting", "allah-baksh", "folklore"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782567151/TilismeHoshruba_iropjb.jpg", "caption": { "en": "Tilism e Hoshruba", "ur": "طلسم ہوش ربا" }, "order": 1 }]
  },
  // Miniature Paintings
  {
    "name": { "en": "Maricha Appears as a Golden Deer To Sita", "ur": "ماریچا کا سیتا کے سامنے سنہری ہرن کے روپ میں آنا" },
    "slug": "maricha-golden-deer-pahari-lahore",
    "description": { "en": "Pahari miniature from Ramayana series", "ur": "رامائن کی پہاڑی منیچر پینٹنگ" },
    "category": "painting",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Pahari School", "ur": "پہاڑی اسکول" },
    "dateRange": { "startYear": 1720, "endYear": 1730, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["watercolor on paper"],
    "tags": ["miniature", "pahari", "ramayana"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568696/E-96_0_osiikw.jpg", "caption": { "en": "Maricha deer scene", "ur": "ماریچا کا ہرن رپ" }, "order": 1 }]
  },
  {
    "name": { "en": "Khusrau and Shirin", "ur": "خسرو اور شیریں" },
    "slug": "khusrau-shirin-miniature-lahore",
    "description": { "en": "18th century miniature depicting romance epic", "ur": "خسرو اور شیریں کی کہانی" },
    "category": "painting",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Mughal", "ur": "مغلیہ دور" },
    "dateRange": { "startYear": 1760, "endYear": 1770, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["watercolor on paper"],
    "tags": ["miniature", "mughal", "romance"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568696/B-121_ta4ym8.jpg", "caption": { "en": "Khusrau and Shirin", "ur": "خسرو اور شیریں" }, "order": 1 }]
  },
  {
    "name": { "en": "The Construction of a Palace", "ur": "محل کی تعمیر" },
    "slug": "construction-palace-miniature-lahore",
    "description": { "en": "18th century miniature showing palace construction", "ur": "محل کی تعمیر کو ظاہر کرتی ہے" },
    "category": "painting",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "18th Century", "ur": "اٹھارویں صدی" },
    "dateRange": { "startYear": 1700, "endYear": 1740, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["pigment on paper"],
    "tags": ["miniature", "architecture", "palace"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568698/B-75_0_brr5iu.jpg", "caption": { "en": "Palace construction", "ur": "محل تعمیر" }, "order": 1 }]
  },
  // Decorative Arts
  {
    "name": { "en": "Ivory Box", "ur": "عاج کا ڈبہ" },
    "slug": "carved-ivory-box-lahore",
    "description": { "en": "Chinese carved ivory jewelry box", "ur": "چین سے آنے والا ہاتھی دانت کا بکس" },
    "category": "textile",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Qing Dynasty", "ur": "چینی شاہی دور" },
    "dateRange": { "startYear": 1800, "endYear": 1900, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["ivory", "brass"],
    "tags": ["ivory", "china", "jewelry"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568062/CI-103_lu7z4j.jpg", "caption": { "en": "Ivory box", "ur": "عاج کا ڈبہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Rectangular Brass Tray from Nepal", "ur": "نیپال کی مستطیل پیتل کی ٹرے" },
    "slug": "brass-tray-nepal-lahore",
    "description": { "en": "Nepalese brass tray with semi-precious stones", "ur": "نیپالی پیتل کی قیمتی ٹرے" },
    "category": "textile",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Late Nepal", "ur": "نیپالی دور" },
    "dateRange": { "startYear": 1800, "endYear": 1950, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["brass", "precious stones"],
    "tags": ["nepal", "brass", "inlay"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568062/H-33_leckf8.jpg", "caption": { "en": "Brass tray", "ur": "پیتل کی ٹرے" }, "order": 1 }]
  },
  {
    "name": { "en": "Durga Slaying the Buffalo Demon", "ur": "درگا مہیشاسر مردنی" },
    "slug": "durga-sculpture-lahore",
    "description": { "en": "Stone sculpture of goddess Durga defeating Mahishasura", "ur": "درگا کا پتھر کا مجسمہ" },
    "category": "sculpture",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Medieval Hindu", "ur": "وسطی ہندو دور" },
    "dateRange": { "startYear": 800, "endYear": 1100, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["stone"],
    "tags": ["sculpture", "hinduism", "durga"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568062/H-672_pjd273.jpg", "caption": { "en": "Durga sculpture", "ur": "درگا کا مجسمہ" }, "order": 1 }]
  },
  // Indus Valley Seals and Toys
  {
    "name": { "en": "Bird Figurine", "ur": "پرندے کا مٹی کا کھلونا" },
    "slug": "harappan-bird-figurine-lahore",
    "description": { "en": "Clay bird figurine from Harappa", "ur": "ہڑپہ کا پرندہ" },
    "category": "figurine",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادیٔ سندھ" },
    "dateRange": { "startYear": 2600, "endYear": 1900, "era": "BCE", "estimateAccuracy": "circa" },
    "materials": ["terracotta"],
    "tags": ["indus-valley", "figurine", "clay"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568058/P-509_jdkf6n.jpg", "caption": { "en": "Bird figurine", "ur": "پرندہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Bull Figurine", "ur": "بیل کا مٹی کا مجسمہ" },
    "slug": "bull-figurine-lahore",
    "description": { "en": "Terracotta bull from Mohenjo-Daro", "ur": "موئن جو دڑو کا بیل" },
    "category": "figurine",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادیٔ سندھ" },
    "dateRange": { "startYear": 2600, "endYear": 1900, "era": "BCE", "estimateAccuracy": "circa" },
    "materials": ["terracotta"],
    "tags": ["indus-valley", "figurine", "bull"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568062/P-1646_x6moon.jpg", "caption": { "en": "Bull figurine", "ur": "بیل کا کھلونا" }, "order": 1 }]
  },
  {
    "name": { "en": "Unicorn Seal", "ur": "ایک سینگ والے جانور کی مہر" },
    "slug": "unicorn-seal-lahore",
    "description": { "en": "Steatite seal with unicorn motif from Mohenjo-Daro", "ur": "موئن جو دڑو کی یونیکورن مہر" },
    "category": "seal",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادیٔ سندھ" },
    "dateRange": { "startYear": 2600, "endYear": 1900, "era": "BCE", "estimateAccuracy": "circa" },
    "materials": ["steatite"],
    "tags": ["indus-valley", "seal", "unicorn"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568060/P-1724_vyugf9.jpg", "caption": { "en": "Unicorn seal", "ur": "یونیکورن مہر" }, "order": 1 }]
  },
  // Textile and Decorative
  {
    "name": { "en": "Bukhara Sozni", "ur": "بخارا سوزنی (سوزن کاری)" },
    "slug": "bukhara-sozni-lahore",
    "description": { "en": "Embroidered textile from Bukhara with winged figures", "ur": "بخارے کی نفیس کڑھائی والی چادر" },
    "category": "textile",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Central Asian", "ur": "وسطی ایشیائی دور" },
    "dateRange": { "startYear": 1850, "endYear": 1920, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["silk", "cotton"],
    "tags": ["textile", "bukhara", "embroidery"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568061/M-828_iqjxx9.jpg", "caption": { "en": "Bukhara sozni", "ur": "بخارا سوزنی" }, "order": 1 }]
  },
  {
    "name": { "en": "Polo Players", "ur": "پولو کے کھلاڑی" },
    "slug": "polo-players-guljee-lahore",
    "description": { "en": "Lapis lazuli mosaic by Ismail Guljee", "ur": "اسماعیل گلجی کا لاجورد موزائیک" },
    "category": "architectural",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Modern Art", "ur": "جدید فن" },
    "dateRange": { "startYear": 1970, "endYear": 1984, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["lapis lazuli"],
    "tags": ["mosaic", "guljee", "modern-art"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782568066/Pololayers_flg1m2.jpg", "caption": { "en": "Polo players mosaic", "ur": "پولو موزائیک" }, "order": 1 }]
  },
  // Inscription
  {
    "name": { "en": "Bilingual Inscription Panel", "ur": "دو لسانی کتبہ" },
    "slug": "bilingual-inscription-lahore",
    "description": { "en": "Stone inscription with Persian and Devanagari scripts", "ur": "فارسی اور دیوناگری میں کتبہ" },
    "category": "other",
    "museumCode": "lahore",
    "historicalPeriod": { "en": "Mughal", "ur": "مغل دور" },
    "dateRange": { "startYear": 1530, "endYear": 1540, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["stone"],
    "tags": ["inscription", "persian", "devanagari"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782567533/M-712_d4ycnm.jpg", "caption": { "en": "Bilingual inscription", "ur": "دو لسانی کتبہ" }, "order": 1 }]
  }
];

// ============================================
// TAXILA MUSEUM ARTIFACTS (28 total)
// ============================================

const TAXILA_ARTIFACTS = [
  {
    "name": { "en": "Gold Plated Buddha in Meditation", "ur": "دھیان کی حالت میں سونے کی ملمع کاری والا بدھا" },
    "slug": "gold-buddha-meditation-jaulian",
    "description": { "en": "Gilded stucco Buddha from Jaulian monastery", "ur": "جولیاں خانقاہ سے برآمد ملمع کار بدھا" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Late Gandhara", "ur": "آخری گندھارا" },
    "dateRange": { "startYear": 300, "endYear": 500, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["gilded stucco"],
    "tags": ["buddha", "meditation", "stucco", "jaulian"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569916/Goldmeditation_blrkzb.jpg", "caption": { "en": "Gold Buddha", "ur": "سونے کا بدھا" }, "order": 1 }]
  },
  {
    "name": { "en": "Buddha in Reassuring Pose", "ur": "ابھیا مدرا میں بدھا" },
    "slug": "buddha-reassurance-dharmarajika",
    "description": { "en": "Standing Buddha in protective gesture from Dharmarajika", "ur": "دھرماراجیکا سے ابھیا مدرا میں بدھا" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Kushan", "ur": "کوشان دور" },
    "dateRange": { "startYear": 100, "endYear": 300, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["buddha", "abhaya-mudra", "dharmarajika"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569940/Buddha_in_Reassuring_Pose_kz5qbu.jpg", "caption": { "en": "Reassuring Buddha", "ur": "مطمئن کرتے ہوئے بدھا" }, "order": 1 }]
  },
  {
    "name": { "en": "Stucco Buddha Head", "ur": "پلاسٹر کا سرِ بدھا" },
    "slug": "stucco-buddha-head",
    "description": { "en": "Contemplative Buddha head with ushnisha and urna", "ur": "دھیان میں بدھا کا سر" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Gandhara", "ur": "گندھارا" },
    "dateRange": { "startYear": 200, "endYear": 500, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["stucco"],
    "tags": ["buddha", "head", "stucco"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569858/Stucco_Buddha_Head_llmnue.jpg", "caption": { "en": "Buddha head", "ur": "بدھا کا سر" }, "order": 1 }]
  },
  {
    "name": { "en": "Cast of the Stupa (Replica)", "ur": "اسٹوپا کا سانچہ" },
    "slug": "stupa-cast-mohra-muradu",
    "description": { "en": "Plaster replica of Mohra Muradu monastery stupa", "ur": "موہرا مرادو خانقاہ کا اسٹوپا" },
    "category": "other",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Modern Heritage", "ur": "جدید" },
    "materials": ["plaster"],
    "tags": ["stupa", "replica", "mohra-muradu"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569857/Cast_of_the_Stupa_Replica_kg2ed5.jpg", "caption": { "en": "Stupa cast", "ur": "اسٹوپا کی نقل" }, "order": 1 }]
  },
  {
    "name": { "en": "Aramaic Inscription", "ur": "آرامی کتبہ" },
    "slug": "aramaic-inscription-sirkap",
    "description": { "en": "Ashoka's edict on octagonal marble pillar", "ur": "سرکپ سے اشوک کا کتبہ" },
    "category": "other",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Mauryan", "ur": "موریا" },
    "dateRange": { "startYear": -300, "endYear": -200, "era": "BCE", "estimateAccuracy": "circa" },
    "materials": ["marble"],
    "tags": ["inscription", "aramaic", "ashoka", "sirkap"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569856/Aramaic_Inscription_fg6bg0.jpg", "caption": { "en": "Aramaic inscription", "ur": "آرامی لکھاوٹ" }, "order": 1 }]
  },
  {
    "name": { "en": "Aphrodite-type Statuette", "ur": "ایفرودیت طرز کا مجسمہ" },
    "slug": "aphrodite-statuette",
    "description": { "en": "Greek goddess figure with Hellenistic drapery", "ur": "یونانی حسن کی دیوی" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Indo-Greek", "ur": "یونانی" },
    "dateRange": { "startYear": 0, "endYear": 100, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["aphrodite", "greek", "statue"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569857/Aphrodite_Greek_Goddess_i03gma.jpg", "caption": { "en": "Aphrodite statue", "ur": "ایفرودیت" }, "order": 1 }]
  },
  {
    "name": { "en": "Toilet Tray with Swastika Symbol", "ur": "سواستیکا والی ٹرے" },
    "slug": "toilet-tray-swastika",
    "description": { "en": "Schist toilet palette with swastika symbol", "ur": "سواستیکا نشان والی سنگھار ٹرے" },
    "category": "other",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Indo-Scythian", "ur": "سیتھی دور" },
    "dateRange": { "startYear": 0, "endYear": 200, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["household", "toilet", "swastika"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569858/Toilet_Article_with_Swastika_power_symbol_q5xbrg.jpg", "caption": { "en": "Toilet tray", "ur": "ٹرے" }, "order": 1 }]
  },
  {
    "name": { "en": "Buddha and Bodhisattva Relief Panel", "ur": "بدھا اور بودھی ستوا" },
    "slug": "buddha-bodhisattva-relief",
    "description": { "en": "Schist relief with alternating Buddhas and Bodhisattvas", "ur": "بدھا اور بودھی ستوا کا پینل" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Kushan", "ur": "کوشان" },
    "dateRange": { "startYear": 100, "endYear": 200, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["relief", "buddha", "bodhisattva"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569856/Buddha_and_Bodhisattva_oyb33e.jpg", "caption": { "en": "Relief panel", "ur": "پینل" }, "order": 1 }]
  },
  {
    "name": { "en": "Fresco Painting", "ur": "فریسکو پینٹنگ" },
    "slug": "fresco-jinna-wali-dheri",
    "description": { "en": "Wall painting from Jinna Wali Dheri monastery", "ur": "جناں والی دھیری کی دیواری پینٹنگ" },
    "category": "painting",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Late Gandhara", "ur": "آخری گندھارا" },
    "dateRange": { "startYear": 300, "endYear": 500, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["pigment on stucco"],
    "tags": ["fresco", "painting", "jinna-wali-dheri"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569856/Fresco_painting_izn3g9.jpg", "caption": { "en": "Fresco", "ur": "پینٹنگ" }, "order": 1 }]
  },
  {
    "name": { "en": "Votive Stupa Base", "ur": "نذری اسٹوپا" },
    "slug": "votive-stupa-jaulian",
    "description": { "en": "Ornate base with Buddha niches from Jaulian", "ur": "جولیاں سے نذری اسٹوپا" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Late Gandhara", "ur": "آخری گندھارا" },
    "materials": ["stucco"],
    "tags": ["stupa", "votive", "jaulian"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569854/Votive_Stupa_Full_nmm76r.jpg", "caption": { "en": "Stupa base", "ur": "اسٹوپا کا چبوترہ" }, "order": 1 }]
  },
  // Add remaining Taxila artifacts...
  {
    "name": { "en": "Cooking pots", "ur": "کھانے کے برتن" },
    "slug": "cooking-pots-taxila",
    "description": { "en": "Terracotta utensils for cooking and storage", "ur": "مختلف سائز کے مٹی کے برتن" },
    "category": "other",
    "museumCode": "taxila",
    "materials": ["terracotta"],
    "tags": ["pottery", "cooking", "household"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782569854/Cooking_Pots_vhtek1.jpg", "caption": { "en": "Cooking pots", "ur": "برتن" }, "order": 1 }]
  },
  {
    "name": { "en": "Hellenistic head", "ur": "یونانی سر" },
    "slug": "hellenistic-head",
    "description": { "en": "Stucco head representing foreign dignitary", "ur": "کسی یونانی یا غیر ملکی کا سر" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "3rd-4th Century", "ur": "تیسری سے چوتھی صدی" },
    "dateRange": { "startYear": 200, "endYear": 400, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["stucco"],
    "tags": ["head", "hellenistic", "yavana"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782570695/Hellenistic_head_sybh4v.jpg", "caption": { "en": "Hellenistic head", "ur": "یونانی سر" }, "order": 1 }]
  },
  {
    "name": { "en": "Buddha in Meditation (dhyanamudhra)", "ur": "دھیان مدرا میں بدھا" },
    "slug": "buddha-meditation-mohra",
    "description": { "en": "Buddha in meditation from Mohra Muradu", "ur": "موہرا مرادو سے بدھا" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "3rd-5th Century", "ur": "تیسری سے پانچویں صدی" },
    "dateRange": { "startYear": 200, "endYear": 500, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["stucco"],
    "tags": ["buddha", "meditation", "mohra-muradu"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782570696/Buddha_in_Meditation_stucco_wjpkif.jpg", "caption": { "en": "Meditation Buddha", "ur": "دھیان میں بدھا" }, "order": 1 }]
  },
  {
    "name": { "en": "Stupa Shaped Reliquary", "ur": "اسٹوپا نما تبرک دان" },
    "slug": "reliquary-jaulian",
    "description": { "en": "Relic casket with precious stones", "ur": "قیمتی پتھروں سے جڑا" },
    "category": "figurine",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "2nd-4th Century", "ur": "دوسری سے چوتھی صدی" },
    "dateRange": { "startYear": 100, "endYear": 400, "era": "CE", "estimateAccuracy": "circa" },
    "tags": ["reliquary", "stupa", "jaulian"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782570693/Stupa_Shaped_Relic_Casket_xoxpgn.jpg", "caption": { "en": "Reliquary", "ur": "تبرک دان" }, "order": 1 }]
  },
  {
    "name": { "en": "Metal Frying pan", "ur": "دھات کا توہ" },
    "slug": "metal-pan-sirkap",
    "description": { "en": "Circular metal pan with long handle", "ur": "لمبی مٹھیا والا برتن" },
    "category": "other",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Ancient Gandhara", "ur": "قدیم گندھارا" },
    "materials": ["metal"],
    "tags": ["cookware", "metal", "sirkap"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782570698/Metal_Frying_pan_from_Sirkap_2_c0qx60.jpg", "caption": { "en": "Metal pan", "ur": "دھات کا برتن" }, "order": 1 }]
  },
  {
    "name": { "en": "Haloed Standing Bodhisattva", "ur": "ہالے والا بودھی ستوا" },
    "slug": "bodhisattva-mohra",
    "description": { "en": "Bodhisattva in princely attire from Mohra Muradu", "ur": "شاہی لباس میں بودھی ستوا" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "4th-5th Century", "ur": "چوتھی سے پانچویں صدی" },
    "dateRange": { "startYear": 300, "endYear": 500, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["stucco"],
    "tags": ["bodhisattva", "halo", "princely"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782570697/Hallowed_Standing_Bodhisattva_in_Stucco_qkeths.jpg", "caption": { "en": "Bodhisattva", "ur": "بودھی ستوا" }, "order": 1 }]
  },
  {
    "name": { "en": "Buddha in Attitude of Reassurance", "ur": "بے خوفی میں بدھا" },
    "slug": "buddha-reassurance-dharma",
    "description": { "en": "Standing Buddha in abhaya-mudra from Dharmarajika", "ur": "دھرماراجیکا سے ابھیا مدرا میں" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "2nd-3rd Century", "ur": "دوسری سے تیسری صدی" },
    "dateRange": { "startYear": 100, "endYear": 300, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["buddha", "reassurance", "dharmarajika"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782570693/Buddha_in_Attitude_of_Reassurance_l1uywa.jpg", "caption": { "en": "Reassurance", "ur": "تسلی" }, "order": 1 }]
  },
  {
    "name": { "en": "Lid of the terracotta pot", "ur": "مٹی کے برتن کا ڈھکن" },
    "slug": "pottery-lid",
    "description": { "en": "Painted terracotta lid with peacock motifs", "ur": "موروں کے ڈیزائن والا ڈھکن" },
    "category": "other",
    "museumCode": "taxila",
    "materials": ["terracotta"],
    "tags": ["pottery", "painted", "lid"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782570693/Lid_of_the_terracotta_pot_l50ufh.jpg", "caption": { "en": "Pottery lid", "ur": "برتن کا ڈھکن" }, "order": 1 }]
  },
  {
    "name": { "en": "Queen Maya's Dream", "ur": "ملکہ مایا کا خواب" },
    "slug": "maya-dream-nowshera",
    "description": { "en": "Relief fragment showing Maya's prophetic dream", "ur": "مایا کے خواب کا پینل" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "1st-2nd Century", "ur": "پہلی سے دوسری صدی" },
    "dateRange": { "startYear": 0, "endYear": 200, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["relief", "maya", "nowshera"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782570694/Queen_mayas_dream_0_m7gw9r.jpg", "caption": { "en": "Maya's dream", "ur": "مایا کا خواب" }, "order": 1 }]
  },
  {
    "name": { "en": "Railing Stupa", "ur": "اسٹوپا کا جنگلہ" },
    "slug": "railing-stupa-dharma",
    "description": { "en": "Stone railing fragments from Dharmarajika Stupa", "ur": "دھرماراجیکا سے جنگلے کے حصے" },
    "category": "sculpture",
    "museumCode": "taxila",
    "materials": ["stone"],
    "tags": ["stupa", "railing", "dharmarajika"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782570692/RailingStupa_go9kfj.jpg", "caption": { "en": "Stupa railing", "ur": "اسٹوپا جنگلہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Buddha in preaching pose", "ur": "وعظ میں بدھا" },
    "slug": "buddha-preaching",
    "description": { "en": "Relief of Buddha teaching in dharmachakra-mudra", "ur": "درس دیتے ہوئے بدھا" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "2nd Century", "ur": "دوسری صدی" },
    "dateRange": { "startYear": 100, "endYear": 200, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["buddha", "teaching", "dharmachakra"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782571789/Buddha_in_preaching_and_teaching_pose_c3u1qi.jpg", "caption": { "en": "Preaching Buddha", "ur": "درس دیتے بدھا" }, "order": 1 }]
  },
  {
    "name": { "en": "Great Departure of Buddha", "ur": "عظیم روانگی" },
    "slug": "great-departure-buddha",
    "description": { "en": "Relief showing Buddha leaving palace for asceticism", "ur": "محل سے روانگی کا منظر" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "1st-2nd Century", "ur": "پہلی سے دوسری صدی" },
    "dateRange": { "startYear": 0, "endYear": 200, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["departure", "buddha", "ascetic"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782571792/Great_Departure_of_Buddha_j3xm5g.jpg", "caption": { "en": "Great Departure", "ur": "عظیم روانگی" }, "order": 1 }]
  },
  {
    "name": { "en": "Smiling Buddha Face", "ur": "مسکراتا بدھا" },
    "slug": "smiling-buddha-face",
    "description": { "en": "Contemplative stucco Buddha head from Jaulian", "ur": "جولیاں سے مسکراتا بدھا" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "2nd-4th Century", "ur": "دوسری سے چوتھی صدی" },
    "dateRange": { "startYear": 100, "endYear": 400, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["stucco"],
    "tags": ["buddha", "smiling", "jaulian"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782571785/Smiling_Buddha_Face_lvm2dp.jpg", "caption": { "en": "Smiling Buddha", "ur": "مسکراتے بدھا" }, "order": 1 }]
  },
  {
    "name": { "en": "The Great Renunciation", "ur": "ترکِ دنیا" },
    "slug": "renunciation-siddhartha",
    "description": { "en": "Relief depicting Siddhartha's renunciation", "ur": "سدھارتھ کی دنیا سے رخصائی" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "1st-2nd Century", "ur": "پہلی سے دوسری صدی" },
    "dateRange": { "startYear": 0, "endYear": 200, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["renunciation", "buddha", "ascetic"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782571788/Renunciation_of_Sidhartha_0_adqdvs.jpg", "caption": { "en": "Renunciation", "ur": "ترک" }, "order": 1 }]
  },
  {
    "name": { "en": "Death scene of Buddha (Mahaparinirvana)", "ur": "بدھا کی وفات" },
    "slug": "buddha-death-mahaparinirvana",
    "description": { "en": "Relief showing Buddha's final passing", "ur": "بدھا کی وفات کا منظر" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "3rd-4th Century", "ur": "تیسری سے چوتھی صدی" },
    "dateRange": { "startYear": 200, "endYear": 400, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["stucco"],
    "tags": ["buddha", "death", "mahaparinirvana"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782571786/Death_scene_of_Buddha_Mahapari_Nirwana_Scene_pmjkdw.jpg", "caption": { "en": "Buddha's death", "ur": "بدھا کی وفات" }, "order": 1 }]
  },
  {
    "name": { "en": "Relics of Lord Buddha", "ur": "تبرکاتِ بدھا" },
    "slug": "buddha-relics",
    "description": { "en": "Reliquary with Buddha's relics from Dharmarajika", "ur": "دھرماراجیکا سے بدھا کے تبرکات" },
    "category": "figurine",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "2nd-3rd Century", "ur": "دوسری سے تیسری صدی" },
    "dateRange": { "startYear": 100, "endYear": 300, "era": "CE", "estimateAccuracy": "circa" },
    "tags": ["relics", "buddha", "dharmarajika"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782571783/Tooth_Relic_ob2ps4.jpg", "caption": { "en": "Buddha relics", "ur": "بدھا کے تبرکات" }, "order": 1 }]
  },
  {
    "name": { "en": "Bodhi Tree", "ur": "بودھی درخت" },
    "slug": "bodhi-tree-sapling",
    "description": { "en": "Sacred Bodhi tree sapling from Ceylon", "ur": "سیلون سے لایا گیا مقدس درخت" },
    "category": "other",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "Modern Gift (1963)", "ur": "جدید (1963)" },
    "dateRange": { "startYear": 1963, "endYear": 1963, "era": "CE", "estimateAccuracy": "exact" },
    "tags": ["bodhi", "tree", "ceylon", "sacred"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782571785/Bodhi_Tree_efvinc.jpg", "caption": { "en": "Bodhi tree", "ur": "بودھی درخت" }, "order": 1 }]
  },
  {
    "name": { "en": "Bodhisattva Maitreya", "ur": "بودھی ستوا میتریا" },
    "slug": "maitreya-bodhisattva",
    "description": { "en": "Standing Bodhisattva Maitreya from Mohra Muradu", "ur": "موہرا مرادو سے میتریا بودھی ستوا" },
    "category": "sculpture",
    "museumCode": "taxila",
    "historicalPeriod": { "en": "2nd-3rd Century", "ur": "دوسری سے تیسری صدی" },
    "dateRange": { "startYear": 100, "endYear": 300, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["schist"],
    "tags": ["maitreya", "bodhisattva", "mohra-muradu"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782571786/Bodhisattva_Maitreya_rpraxw.jpg", "caption": { "en": "Maitreya", "ur": "میتریا" }, "order": 1 }]
  }
];

// ============================================
// NATIONAL MUSEUM ARTIFACTS (11 total)
// ============================================

const NATIONAL_ARTIFACTS = [
  {
    "name": { "en": "The Priest-King of Mohenjo-daro", "ur": "پریسٹ کنگ" },
    "slug": "priest-king-national",
    "description": { "en": "5000-year-old soapstone sculpture from Indus Valley", "ur": "وادئ سندھ کا 5000 سال پرانا مجسمہ" },
    "category": "sculpture",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "dateRange": { "startYear": -3000, "endYear": -2000, "era": "BCE", "estimateAccuracy": "estimate" },
    "materials": ["steatite"],
    "tags": ["priest-king", "mohenjo-daro", "iconic"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579975/Statue-of-the-king-priest-Karachi-Museum-2_b5hhnt.jpg", "caption": { "en": "Priest-King", "ur": "پریسٹ کنگ" }, "order": 1 }]
  },
  {
    "name": { "en": "Terracotta Mother Goddess", "ur": "مادرِ وطن کی مورتی" },
    "slug": "mother-goddess-national",
    "description": { "en": "Clay figurine symbolizing fertility", "ur": "بارآوری کی علامت" },
    "category": "sculpture",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["terracotta"],
    "tags": ["mother-goddess", "fertility", "indus-valley"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579974/images_wwyap2.jpg", "caption": { "en": "Mother Goddess", "ur": "مادر وطن" }, "order": 1 }]
  },
  {
    "name": { "en": "Egyptian Child God (Harpocrates) Statuette", "ur": "مصری دیوتا ہارپوکریٹس" },
    "slug": "harpocrates-national",
    "description": { "en": "Bronze god of silence from Egypt", "ur": "خاموشی کے دیوتا کا کانسی مجسمہ" },
    "category": "sculpture",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Hellenistic", "ur": "ہیلنسٹک" },
    "materials": ["bronze"],
    "tags": ["harpocrates", "egyptian", "trade-routes"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579973/d948bcxj5zye1_ktkunj.jpg", "caption": { "en": "Harpocrates", "ur": "ہارپوکریٹس" }, "order": 1 }]
  },
  {
    "name": { "en": "Ancient Sanskrit Birch-Bark Manuscripts", "ur": "سنسکرت مخطوطات" },
    "slug": "sanskrit-manuscripts-national",
    "description": { "en": "42 rare manuscripts written on birch bark", "ur": "بھوج پتر پر لکھے گئے 42 نایاب مخطوطات" },
    "category": "manuscript",
    "museumCode": "national_karachi",
    "materials": ["birch-bark"],
    "tags": ["sanskrit", "manuscript", "rare"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579973/web-5-1494957402_ayx0n1.jpg", "caption": { "en": "Sanskrit text", "ur": "سنسکرت متن" }, "order": 1 }]
  },
  {
    "name": { "en": "The Golden Goblet", "ur": "طلائی جام" },
    "slug": "golden-goblet-national",
    "description": { "en": "Large gold bowl with hollow pedestal", "ur": "خالص سونے کا شاندار پیالہ" },
    "category": "pottery",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Bronze Age", "ur": "کانسی دور" },
    "dateRange": { "startYear": -2000, "endYear": -1800, "era": "BCE", "estimateAccuracy": "circa" },
    "materials": ["gold"],
    "tags": ["goblet", "gold", "bronze-age"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579972/harappan-golden-goblet-from-quetta-pakistan-2000-1800-bc-v0-gz7rrtap9aye1_qo5rsp.jpg", "caption": { "en": "Golden goblet", "ur": "سونے کا پیالہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Rare Kufic & Bahr Arabic Qurans", "ur": "قرآن کے نایاب نسخے" },
    "slug": "quran-manuscripts-national",
    "description": { "en": "52 handwritten Qurans in Kufic script", "ur": "خطِ کوفی میں لکھے ہوئے قرآن" },
    "category": "manuscript",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Early Islamic", "ur": "ابتدائی اسلامی" },
    "materials": ["parchment"],
    "tags": ["quran", "kufic", "manuscript"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579972/1803-3_jng9jx.jpg", "caption": { "en": "Quranic text", "ur": "قرآنی متن" }, "order": 1 }]
  },
  {
    "name": { "en": "Silver Damma of Habbarid Dynasty", "ur": "حباری سکہ" },
    "slug": "habbarid-coin-national",
    "description": { "en": "Tiny fractional dirham from medieval Sindh", "ur": "قرونِ وسطیٰ کے سندھ کا چھوٹا سکہ" },
    "category": "coin",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Habbarid Dynasty", "ur": "خاندانِ حباری" },
    "dateRange": { "startYear": 855, "endYear": 1010, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["silver"],
    "tags": ["coin", "habbarid", "sindh"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579971/arabs2_rdhha3.jpg", "caption": { "en": "Habbarid coin", "ur": "حباری سکہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Silver Nanakshahi Rupee", "ur": "نانک شاہی روپیہ" },
    "slug": "nanakshahi-coin-national",
    "description": { "en": "Sikh Empire silver rupee", "ur": "سکھ سلطنت کا روپیہ" },
    "category": "coin",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Sikh Empire", "ur": "سکھ سلطنت" },
    "dateRange": { "startYear": 1765, "endYear": 1849, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["silver"],
    "tags": ["coin", "sikh", "ranjit-singh"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579971/sikh1_hsd1bv.jpg", "caption": { "en": "Sikh rupee", "ur": "نانک شاہی روپیہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Taxila Silver Bent-Bar Coin (Satamana)", "ur": "ٹیکسلا کا سکہ" },
    "slug": "bent-bar-coin-national",
    "description": { "en": "Punch-marked Indus Valley coin", "ur": "ٹیکسلا کا قدیم سکہ" },
    "category": "coin",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Ancient Janapadas", "ur": "قدیم دور" },
    "dateRange": { "startYear": -600, "endYear": -500, "era": "BCE", "estimateAccuracy": "circa" },
    "materials": ["silver"],
    "tags": ["coin", "taxila", "ancient"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579970/1662a_copy_lludfp.jpg", "caption": { "en": "Bent-bar coin", "ur": "سکہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Mughal Silver Rupee Coin", "ur": "مغل روپیہ" },
    "slug": "mughal-coin-national",
    "description": { "en": "Silver rupee from Mughal dynasty", "ur": "مغل دور کا روپیہ" },
    "category": "coin",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Mughal Empire", "ur": "مغلیہ سلطنت" },
    "dateRange": { "startYear": 1500, "endYear": 1800, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["silver"],
    "tags": ["coin", "mughal", "rupee"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579971/mughal1_giu3zj.jpg", "caption": { "en": "Mughal rupee", "ur": "مغل روپیہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Billon Jital of Delhi Sultanate", "ur": "دہلی سلطنت کا سکہ" },
    "slug": "delhi-jital-national",
    "description": { "en": "Medieval Delhi Sultanate coin", "ur": "سلطنتِ دہلی کا جیتل" },
    "category": "coin",
    "museumCode": "national_karachi",
    "historicalPeriod": { "en": "Delhi Sultanate", "ur": "سلطنتِ دہلی" },
    "dateRange": { "startYear": 1193, "endYear": 1290, "era": "CE", "estimateAccuracy": "circa" },
    "materials": ["billon"],
    "tags": ["coin", "delhi", "sultanate"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782579970/sultans_coin1_vxuppq.jpg", "caption": { "en": "Jital", "ur": "جیتل" }, "order": 1 }]
  }
];

// ============================================
// MOHENJO-DARO MUSEUM ARTIFACTS (10 total)
// ============================================

const MOHENJO_DARO_ARTIFACTS = [
  {
    "name": { "en": "The Dancing Girl (Replica)", "ur": "رقاصہ کا مجسمہ" },
    "slug": "dancing-girl-mohenjo-daro",
    "description": { "en": "4500-year-old bronze replica of famous dancer", "ur": "۴۵۰۰ سال پرانا نقاش" },
    "category": "sculpture",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "dateRange": { "startYear": -2500, "endYear": -2500, "era": "BCE", "estimateAccuracy": "estimate" },
    "materials": ["bronze"],
    "tags": ["dancing-girl", "bronze", "iconic"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644565/images_exdn6c.jpg", "caption": { "en": "Dancing Girl", "ur": "رقاصہ" }, "order": 1 }]
  },
  {
    "name": { "en": "Terracotta Tablet", "ur": "پکی مٹی کی تختی" },
    "slug": "terracotta-tablet-mohenjo",
    "description": { "en": "Ancient tablet with inscriptions", "ur": "قدیم علامات والی تختی" },
    "category": "manuscript",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["terracotta"],
    "tags": ["tablet", "inscription", "indus-valley"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644566/473291352_2129585514170119_1808062581304156840_n_scv3au.jpg", "caption": { "en": "Tablet", "ur": "تختی" }, "order": 1 }]
  },
  {
    "name": { "en": "Terracotta Pot", "ur": "مٹی کا برتن" },
    "slug": "terracotta-pot-mohenjo",
    "description": { "en": "Clay storage vessel", "ur": "روزمرہ استعمال کا برتن" },
    "category": "pottery",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["terracotta"],
    "tags": ["pottery", "vessel", "domestic"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644565/473166080_2129585454170125_4776810259295885378_n_ui6tey.jpg", "caption": { "en": "Pot", "ur": "برتن" }, "order": 1 }]
  },
  {
    "name": { "en": "Terracotta Painted Pottery", "ur": "منقش برتن" },
    "slug": "painted-pottery-mohenjo",
    "description": { "en": "Decorated ceramic fragments", "ur": "ڈیزائن والے مٹی کے ٹکڑے" },
    "category": "pottery",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["terracotta"],
    "tags": ["pottery", "painted", "ceramic"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644444/473191700_2129585547503449_4485765321361923764_n_xsx4oc.jpg", "caption": { "en": "Painted pottery", "ur": "منقش برتن" }, "order": 1 }]
  },
  {
    "name": { "en": "Terracotta Small Ovens", "ur": "مٹی کے چھوٹے تندور" },
    "slug": "ovens-mohenjo",
    "description": { "en": "Domestic cooking structures", "ur": "گھریلو چولہے" },
    "category": "weapon",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["terracotta"],
    "tags": ["oven", "cooking", "domestic"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644393/473269021_2129585320836805_5610001125903883144_n_dio6nf.jpg", "caption": { "en": "Ovens", "ur": "تندور" }, "order": 1 }]
  },
  {
    "name": { "en": "Terracotta Flower Pots", "ur": "مٹی کے گملے" },
    "slug": "flower-pots-mohenjo",
    "description": { "en": "Painted pottery vessels", "ur": "رنگین مٹی کے گملے" },
    "category": "pottery",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["terracotta"],
    "tags": ["pottery", "painted", "vessel"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644383/473301818_2129585324170138_79199488849487050_n_earnyi.jpg", "caption": { "en": "Flower pots", "ur": "گملے" }, "order": 1 }]
  },
  {
    "name": { "en": "Terracotta Toys", "ur": "مٹی کے کھلونے" },
    "slug": "toys-mohenjo",
    "description": { "en": "Children's playthings and figurines", "ur": "بچوں کے کھلونے" },
    "category": "figurine",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["terracotta"],
    "tags": ["toys", "figurines", "clay"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644373/472959401_2129585480836789_88704865015754115_n_pjdhtv.jpg", "caption": { "en": "Toys", "ur": "کھلونے" }, "order": 1 }]
  },
  {
    "name": { "en": "Terracotta Cups", "ur": "مٹی کے پیالے" },
    "slug": "cups-mohenjo",
    "description": { "en": "Drinking vessels from ancient settlements", "ur": "پینے کے برتن" },
    "category": "pottery",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["terracotta"],
    "tags": ["cups", "pottery", "drinking"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644363/473277971_2129585234170147_3456019342848462731_n_ydxjvv.jpg", "caption": { "en": "Cups", "ur": "پیالے" }, "order": 1 }]
  },
  {
    "name": { "en": "Faience Necklace", "ur": "فائینس کا ہار" },
    "slug": "faience-necklace-mohenjo",
    "description": { "en": "Ancient beaded jewelry", "ur": "موتیوں کا ہار" },
    "category": "jewelry",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["faience"],
    "tags": ["necklace", "jewelry", "beads"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644355/473316961_2129585530836784_4681313924456721013_n_lqvtaa.jpg", "caption": { "en": "Necklace", "ur": "ہار" }, "order": 1 }]
  },
  {
    "name": { "en": "Monkey Toy", "ur": "بندر کا کھلونا" },
    "slug": "monkey-toy-mohenjo",
    "description": { "en": "Terracotta animal figurine", "ur": "بندر کا مجسمہ" },
    "category": "figurine",
    "museumCode": "mohenjo_daro",
    "historicalPeriod": { "en": "Indus Valley", "ur": "وادئ سندھ" },
    "materials": ["terracotta"],
    "tags": ["toy", "animal", "monkey"],
    "images": [{ "url": "https://res.cloudinary.com/dhewqmiy5/image/upload/v1782644861/473263690_2129585200836817_1797461764031457904_n_jnilyf.jpg", "caption": { "en": "Monkey toy", "ur": "بندر کا کھلونا" }, "order": 1 }]
  }
];

// ============================================
// SEEDING FUNCTION
// ============================================

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/virtual_museum');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      Museum.deleteMany({}),
      Room.deleteMany({}),
      Artifact.deleteMany({}),
    ]);

    // Create museums
    console.log('\n📚 Creating museums...');
    const museums = await Museum.insertMany([
      {
        code: 'lahore',
        name: { en: 'Lahore Museum', ur: 'لاہور میوزیم' },
        slug: 'lahore-museum',
        description: { en: "Pakistan's premier museum", ur: 'پاکستان کا سب سے مشہور میوزیم' },
        thumbnail: MUSEUM_IMAGES.lahore,
        founded: 1865,
        isUnescoSite: false,
        order: 1,
        isPublished: true,
      },
      {
        code: 'taxila',
        name: { en: 'Taxila Museum', ur: 'ٹیکسلا میوزیم' },
        slug: 'taxila-museum',
        description: { en: 'UNESCO World Heritage Buddhist site', ur: 'یونیسکو ورلڈ ہیرٹیج سائٹ' },
        thumbnail: MUSEUM_IMAGES.taxila,
        founded: 1918,
        isUnescoSite: true,
        order: 2,
        isPublished: true,
      },
      {
        code: 'national_karachi',
        name: { en: 'National Museum of Pakistan', ur: 'قومی میوزیم پاکستان' },
        slug: 'national-museum-karachi',
        description: { en: 'From Indus Valley to modern Pakistan', ur: 'سندھ سے جدید پاکستان' },
        thumbnail: MUSEUM_IMAGES.national_karachi,
        founded: 1950,
        isUnescoSite: false,
        order: 3,
        isPublished: true,
      },
      {
        code: 'mohenjo_daro',
        name: { en: 'Mohenjo-daro Museum', ur: 'موہن جو دڑو میوزیم' },
        slug: 'mohenjo-daro-museum',
        description: { en: '5000-year-old Indus Valley site', ur: '5000 سال پرانی سندھ وادی' },
        thumbnail: MUSEUM_IMAGES.mohenjo_daro,
        founded: 1925,
        isUnescoSite: true,
        order: 4,
        isPublished: true,
      },
    ]);

    // Create rooms
    console.log('🚪 Creating rooms...');
    const roomNames = [
      { en: 'Main Hall', ur: 'مین ہال' },
      { en: 'Sculpture Gallery', ur: 'مجسمہ گیلری' },
      { en: 'Ancient Treasures', ur: 'قدیم خزانے' },
    ];

    const allRooms: any[] = [];
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

    // Helper function to create artifacts
    const createArtifactFromData = (
      data: any,
      museumId: mongoose.Types.ObjectId,
      roomId: mongoose.Types.ObjectId,
      roomIndex: number
    ) => ({
      ...data,
      museumId,
      roomId,
      isHighlighted: roomIndex === 0 && Math.random() > 0.5,
      displayOrder: Math.floor(Math.random() * 100),
      stats: {
        views: Math.floor(Math.random() * 5000),
        likes: Math.floor(Math.random() * 500),
        shares: Math.floor(Math.random() * 100),
        averageRating: Number((Math.random() * 5).toFixed(1)),
        ratingCount: Math.floor(Math.random() * 200),
        commentCount: Math.floor(Math.random() * 50),
      },
    });

    // Seed artifacts
    console.log('\n🖼️  Creating artifacts...');
    let totalArtifacts = 0;

    const getRoomId = (museumCode: string, roomIndex: 0 | 1 | 2) => {
      return allRooms.find(r => r.museumCode === museumCode && r.order === roomIndex)?._id;
    };

    // Lahore
    console.log('  → Lahore Museum (26 artifacts)...');
    const lahoreMuseum = museums.find(m => m.code === 'lahore');
    for (let i = 0; i < LAHORE_ARTIFACTS.length; i++) {
      const roomIndex = i % 3;
      const roomId = getRoomId('lahore', roomIndex as 0 | 1 | 2);
      const artifact = createArtifactFromData(LAHORE_ARTIFACTS[i], lahoreMuseum!._id, roomId!, roomIndex);
      await Artifact.create(artifact);
      totalArtifacts++;
    }

    // Taxila
    console.log('  → Taxila Museum (28 artifacts)...');
    const taxilaMuseum = museums.find(m => m.code === 'taxila');
    for (let i = 0; i < TAXILA_ARTIFACTS.length; i++) {
      const roomIndex = i % 3;
      const roomId = getRoomId('taxila', roomIndex as 0 | 1 | 2);
      const artifact = createArtifactFromData(TAXILA_ARTIFACTS[i], taxilaMuseum!._id, roomId!, roomIndex);
      await Artifact.create(artifact);
      totalArtifacts++;
    }

    // National Museum
    console.log('  → National Museum (11 artifacts)...');
    const nationalMuseum = museums.find(m => m.code === 'national_karachi');
    for (let i = 0; i < NATIONAL_ARTIFACTS.length; i++) {
      const roomIndex = i % 3;
      const roomId = getRoomId('national_karachi', roomIndex as 0 | 1 | 2);
      const artifact = createArtifactFromData(NATIONAL_ARTIFACTS[i], nationalMuseum!._id, roomId!, roomIndex);
      await Artifact.create(artifact);
      totalArtifacts++;
    }

    // Mohenjo-daro
    console.log('  → Mohenjo-daro Museum (10 artifacts)...');
    const mohenjoMuseum = museums.find(m => m.code === 'mohenjo_daro');
    for (let i = 0; i < MOHENJO_DARO_ARTIFACTS.length; i++) {
      const roomIndex = i % 3;
      const roomId = getRoomId('mohenjo_daro', roomIndex as 0 | 1 | 2);
      const artifact = createArtifactFromData(MOHENJO_DARO_ARTIFACTS[i], mohenjoMuseum!._id, roomId!, roomIndex);
      await Artifact.create(artifact);
      totalArtifacts++;
    }

    // Success message
    console.log('\n' + '='.repeat(60));
    console.log('🎉 DATABASE SEEDING COMPLETE! 🎉');
    console.log('='.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`   → 4 Museums with real images ✅`);
    console.log(`   → 12 Rooms (3 per museum)`);
    console.log(`   → ${totalArtifacts} COMPLETE ARTIFACTS!`);
    console.log(`   → 2 Languages (English + Urdu)`);
    console.log(`   → Lahore: 26 | Taxila: 28 | National: 11 | Mohenjo-daro: 10`);
    console.log('\n✨ Your complete museum database is ready!');
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