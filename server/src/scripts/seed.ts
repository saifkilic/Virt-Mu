import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Museum } from '../models/Museum';
import { Room } from '../models/Room';
import { Artifact } from '../models/Artifact';
import { User } from '../models/User';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/virtual_museum');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Museum.deleteMany({}),
      Room.deleteMany({}),
      Artifact.deleteMany({}),
      User.deleteMany({}),
    ]);
    console.log('🗑️ Cleared existing data');

    // ==================== MUSEUMS ====================
    const museums = await Museum.insertMany([
      {
        code: 'lahore',
        name: { en: 'Lahore Museum', ur: 'لاہور میوزیم' },
        slug: 'lahore-museum',
        description: { en: 'Pakistan’s premier museum showcasing Mughal glory and Gandharan art.', ur: 'پاکستان کا سب سے مشہور میوزیم جو مغل شان و شوکت اور گندھارا فن کی نمائش کرتا ہے۔' },
        thumbnail: 'https://picsum.photos/id/1015/600/400',
        heroImage: 'https://picsum.photos/id/1015/1920/1080',
        founded: 1865,
        totalArtifacts: 128,
        totalRooms: 12,
        isUnescoSite: false,
        theme: { primaryColor: '#FF7F00', accentColor: '#D4AF37' },
        order: 1,
        isPublished: true,
      },
      {
        code: 'taxila',
        name: { en: 'Taxila Museum', ur: 'ٹیکسلا میوزیم' },
        slug: 'taxila-museum',
        description: { en: 'UNESCO World Heritage showcasing Gandharan Buddhist civilization.', ur: 'یونیسکو ورلڈ ہیرٹیج سائٹ - گندھارا بدھ مت تہذیب کا خزانہ۔' },
        thumbnail: 'https://picsum.photos/id/133/600/400',
        heroImage: 'https://picsum.photos/id/133/1920/1080',
        founded: 1918,
        totalArtifacts: 95,
        totalRooms: 8,
        isUnescoSite: true,
        theme: { primaryColor: '#1E3A8A', accentColor: '#D4AF37' },
        order: 2,
        isPublished: true,
      },
      {
        code: 'national_karachi',
        name: { en: 'National Museum of Pakistan', ur: 'قومی میوزیم پاکستان' },
        slug: 'national-museum-karachi',
        description: { en: 'From Indus Valley to modern Pakistan - a journey through history.', ur: 'سندھ وادی سے جدید پاکستان تک - تاریخ کا سفر۔' },
        thumbnail: 'https://picsum.photos/id/201/600/400',
        heroImage: 'https://picsum.photos/id/201/1920/1080',
        founded: 1950,
        totalArtifacts: 110,
        totalRooms: 10,
        isUnescoSite: false,
        theme: { primaryColor: '#1E3A8A', accentColor: '#D4AF37' },
        order: 3,
        isPublished: true,
      },
      {
        code: 'mohenjo_daro',
        name: { en: 'Mohenjo-daro Museum', ur: 'موہن جو دڑو میوزیم' },
        slug: 'mohenjo-daro-museum',
        description: { en: 'Preserving the 5000-year-old Indus Valley Civilization.', ur: '5000 سال پرانی سندھ وادی تہذیب کی حفاظت۔' },
        thumbnail: 'https://picsum.photos/id/251/600/400',
        heroImage: 'https://picsum.photos/id/251/1920/1080',
        founded: 1925,
        totalArtifacts: 85,
        totalRooms: 6,
        isUnescoSite: true,
        theme: { primaryColor: '#8B7355', accentColor: '#D4AF37' },
        order: 4,
        isPublished: true,
      },
    ]);
    console.log(`✅ Created ${museums.length} museums`);

    // ==================== ROOMS ====================
    const allRooms: any[] = [];
    for (const museum of museums) {
      const museumRooms = [
        { museumId: museum._id, museumCode: museum.code, name: { en: 'Main Hall', ur: 'مین ہال' }, slug: `${museum.code}-main-hall`, type: 'hall', order: 1, isMainRoom: true },
        { museumId: museum._id, museumCode: museum.code, name: { en: 'Sculpture Gallery', ur: 'مجسمہ گیلری' }, slug: `${museum.code}-sculpture-gallery`, type: 'gallery', order: 2 },
        { museumId: museum._id, museumCode: museum.code, name: { en: 'Ancient Treasures', ur: 'قدیم خزانے' }, slug: `${museum.code}-ancient-treasures`, type: 'gallery', order: 3 },
      ];
      const created = await Room.insertMany(museumRooms);
      allRooms.push(...created);
    }
    console.log(`✅ Created ${allRooms.length} rooms`);

    const getRoomId = (museumCode: string, roomIndex: 0 | 1 | 2) => {
      const filtered = allRooms.filter(r => r.museumCode === museumCode);
      return filtered[roomIndex]._id;
    };

    // ==================== 32+ REALISTIC ARTIFACTS ====================
    const artifactsData = [
      // === LAHORE MUSEUM (10 artifacts) ===
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 0), museumCode: 'lahore',
        name: { en: 'Fasting Buddha', ur: 'روزہ بت' }, slug: 'fasting-buddha-lahore',
        description: { en: 'Iconic 2nd-3rd century Gandharan sculpture depicting Buddha fasting.', ur: 'گندھارا فن کا شاہکار، روزہ بت کے طور پر مشہور مجسمہ۔' },
        category: 'sculpture', historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
        images: [{ url: 'https://picsum.photos/id/1015/800/600', order: 1 }],
        modelUrl: '/models/fasting-buddha.glb',
        stats: { views: 2450, likes: 142 }
      },
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 1), museumCode: 'lahore',
        name: { en: 'Akbar Court Miniature', ur: 'اکبر دربار مصوری' }, slug: 'akbar-court-miniature',
        description: { en: 'Exquisite Mughal miniature from Emperor Akbar’s royal court.', ur: 'شہنشاہ اکبر کے دربار کی نفیس مغل مصوری۔' },
        category: 'painting', historicalPeriod: { en: 'Mughal Empire', ur: 'مغل سلطنت' },
        images: [{ url: 'https://picsum.photos/id/133/800/600', order: 1 }],
        stats: { views: 1680, likes: 98 }
      },
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 1), museumCode: 'lahore',
        name: { en: 'Maharaja Ranjit Singh Sword', ur: 'مہاراجہ رنجیت سنگھ کی تلوار' }, slug: 'ranjit-singh-sword',
        description: { en: 'Ornately decorated sword of the Sikh Empire founder.', ur: 'سکھ سلطنت کے بانی کی خوبصورت تلوار۔' },
        category: 'weapon', historicalPeriod: { en: 'Sikh Empire', ur: 'سکھ سلطنت' },
        images: [{ url: 'https://picsum.photos/id/180/800/600', order: 1 }],
        stats: { views: 920, likes: 65 }
      },
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 0), museumCode: 'lahore',
        name: { en: 'Zamzama Cannon', ur: 'زمزمہ توپ' }, slug: 'zamzama-cannon',
        description: { en: 'Huge historical cannon, also known as Kim’s Gun, cast in 1757.', ur: 'ایک تاریخی بڑی توپ جسے کمز گن بھی کہا جاتا ہے، اسے ۱۷۵۷ میں ڈھالا گیا تھا۔' },
        category: 'weapon', historicalPeriod: { en: 'Durrani Empire', ur: 'درانی سلطنت' },
        images: [{ url: 'https://picsum.photos/id/191/800/600', order: 1 }],
        stats: { views: 3100, likes: 210 }
      },
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 2), museumCode: 'lahore',
        name: { en: 'Mughal Royal Silk Portrait', ur: 'مغل شاہی ریشمی تمثیل' }, slug: 'mughal-silk-portrait',
        description: { en: 'A rare 17th-century silk textile depicting court scenes from the Lahore royal workshop.', ur: 'لاہور کے شاہی کارخانے سے ۱۷ویں صدی کا ریشم کا نایاب ٹکڑا جس میں درباری مناظر دکھائے گئے ہیں۔' },
        category: 'painting', historicalPeriod: { en: 'Mughal Empire', ur: 'مغل سلطنت' },
        images: [{ url: 'https://picsum.photos/id/212/800/600', order: 1 }],
        stats: { views: 540, likes: 32 }
      },
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 2), museumCode: 'lahore',
        name: { en: 'Jain Temple Stone Relief', ur: 'جین مندر کا پتھر کا ریلیف' }, slug: 'jain-stone-relief',
        description: { en: 'Intricately carved stone relief panel from an ancient Punjab Jain shrine.', ur: 'پنجاب کے قدیم جین مندر کا ایک پیچیدہ نقش و نگار والا پتھر کا پینل۔' },
        category: 'sculpture', historicalPeriod: { en: 'Medieval Period', ur: 'قرون وسطی کا دور' },
        images: [{ url: 'https://picsum.photos/id/220/800/600', order: 1 }],
        stats: { views: 670, likes: 45 }
      },
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 1), museumCode: 'lahore',
        name: { en: 'Calligraphy Portrait of Shah Jahan', ur: 'شاہ جہاں کا خطاطی پورٹریٹ' }, slug: 'shah-jahan-portrait',
        description: { en: 'Miniature painting of Shah Jahan holding a jewel, surrounded by Persian verse.', ur: 'شاہ جہاں کی ایک منی ایچر پینٹنگ جس میں انہوں نے جوہر اٹھایا ہوا ہے اور اردگرد فارسی اشعار درج ہیں۔' },
        category: 'painting', historicalPeriod: { en: 'Mughal Empire', ur: 'مغل سلطنت' },
        images: [{ url: 'https://picsum.photos/id/230/800/600', order: 1 }],
        stats: { views: 1100, likes: 78 }
      },
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 0), museumCode: 'lahore',
        name: { en: 'Athena Statue Fragment', ur: 'ایتھینا کے مجسمے کا ٹکڑا' }, slug: 'athena-statue-fragment',
        description: { en: 'A stunning classic Greco-Roman inspired figurine discovered in Charsadda.', ur: 'چارلسدہ سے دریافت ہونے والا یونانی و رومی آرٹ سے متاثر ایک شاندار مجسمہ۔' },
        category: 'sculpture', historicalPeriod: { en: 'Indo-Greek Period', ur: 'ہند یونانی دور' },
        images: [{ url: 'https://picsum.photos/id/240/800/600', order: 1 }],
        stats: { views: 1290, likes: 88 }
      },
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 2), museumCode: 'lahore',
        name: { en: 'Mughal Golden Dagger', ur: 'مغل سنہری خنجر' }, slug: 'mughal-golden-dagger',
        description: { en: 'Ornamental steel dagger with gold inlay work from the late Mughal phase.', ur: 'مغل دور کے آخری حصے کا فولادی خنجر جس پر سونے کا خوبصورت کام کیا گیا ہے۔' },
        category: 'weapon', historicalPeriod: { en: 'Mughal Empire', ur: 'مغل سلطنت' },
        images: [{ url: 'https://picsum.photos/id/244/800/600', order: 1 }],
        stats: { views: 890, likes: 51 }
      },
      {
        museumId: museums[0]._id, roomId: getRoomId('lahore', 0), museumCode: 'lahore',
        name: { en: 'Gilded Bodhisattva Statue', ur: 'سونے کا پانی چڑھا ہوا بودھی ستوا مجسمہ' }, slug: 'gilded-bodhisattva',
        description: { en: 'A rare brass-alloy gilded statue displaying intricate drapery details.', ur: 'پیتل کے بھرت سے بنا سونے کا پانی چڑھا ہوا مجسمہ جو لباس کی باریک تفصیلات کو ظاہر کرتا ہے۔' },
        category: 'sculpture', historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
        images: [{ url: 'https://picsum.photos/id/248/800/600', order: 1 }],
        stats: { views: 1400, likes: 92 }
      },

      // === TAXILA MUSEUM (8 artifacts) ===
      {
        museumId: museums[1]._id, roomId: getRoomId('taxila', 0), museumCode: 'taxila',
        name: { en: 'Gandharan Buddha Head', ur: 'گندھاری بدھ کا سر' }, slug: 'buddha-head-taxila',
        description: { en: 'Classic Greco-Buddhist fusion art piece.', ur: 'یونانی-بدھ فن کے امتزاج کی بہترین مثال۔' },
        category: 'sculpture', historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
        images: [{ url: 'https://picsum.photos/id/201/800/600', order: 1 }],
        modelUrl: '/models/buddha-head.glb',
        stats: { views: 1320, likes: 87 }
      },
      {
        museumId: museums[1]._id, roomId: getRoomId('taxila', 1), museumCode: 'taxila',
        name: { en: 'Stucco Bodhisattva', ur: 'سٹوکو بودھستوا' }, slug: 'stucco-bodhisattva',
        description: { en: 'Beautiful stucco relief from Taxila ruins.', ur: 'ٹیکسلا کے کھنڈرات سے ملنے والا خوبصورت سٹوکو ریلیف۔' },
        category: 'sculpture', historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
        images: [{ url: 'https://picsum.photos/id/210/800/600', order: 1 }],
        stats: { views: 780, likes: 54 }
      },
      {
        museumId: museums[1]._id, roomId: getRoomId('taxila', 2), museumCode: 'taxila',
        name: { en: 'Ancient Iron Scale Blades', ur: 'قدیم لوہے کے ترازو کے بلیڈ' }, slug: 'iron-blades-taxila',
        description: { en: 'Iron tools showcasing advanced civic systems of ancient Taxila University.', ur: 'ٹیکسلا یونیورسٹی کے جدید تمدنی نظام کو ظاہر کرنے والے لوہے کے قدیم آلات۔' },
        category: 'weapon', historicalPeriod: { en: 'Scytho-Parthian', ur: 'سائیتھو پارتھیائی' },
        images: [{ url: 'https://picsum.photos/id/260/800/600', order: 1 }],
        stats: { views: 1040, likes: 62 }
      },
      {
        museumId: museums[1]._id, roomId: getRoomId('taxila', 0), museumCode: 'taxila',
        name: { en: 'Terracotta Wine Pot', ur: 'مٹی کا مٹکا' }, slug: 'terracotta-wine-pot',
        description: { en: 'Dionysian themed terracotta vessel showing heavy Hellenistic greek influence.', ur: 'یونانی طرز کا مٹی کا برتن جو ہیلنسٹک اثرات کی عکاسی کرتا ہے۔' },
        category: 'pottery', historicalPeriod: { en: 'Indo-Greek Period', ur: 'ہند یونانی دور' },
        images: [{ url: 'https://picsum.photos/id/270/800/600', order: 1 }],
        stats: { views: 820, likes: 41 }
      },
      {
        museumId: museums[1]._id, roomId: getRoomId('taxila', 1), museumCode: 'taxila',
        name: { en: 'Footprints of Buddha Slab', ur: 'بدھ کے پاؤں کے نشانات کا بلاک' }, slug: 'buddha-footprints',
        description: { en: 'Stone carved footprints with auspicious symbols like the Wheel of Law.', ur: 'قانون کے پہیے جیسے مبارک نشانات کے ساتھ پتھر پر تراشے گئے بدھ کے پاؤں کے نشانات۔' },
        category: 'sculpture', historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
        images: [{ url: 'https://picsum.photos/id/280/800/600', order: 1 }],
        stats: { views: 1150, likes: 90 }
      },
      {
        museumId: museums[1]._id, roomId: getRoomId('taxila', 2), museumCode: 'taxila',
        name: { en: 'Gold Jewelry Hoard', ur: 'سونے کے زیورات کا خزانہ' }, slug: 'gold-jewelry-hoard',
        description: { en: 'Intricately designed gold earrings and necklaces recovered from Sirkap site.', ur: 'سرکپ کی سائٹ سے برآمد ہونے والے باریک بینی سے تیار کردہ سونے کے جھمکے اور ہار۔' },
        category: 'jewelry', historicalPeriod: { en: 'Scytho-Parthian', ur: 'سائیتھو پارتھیائی' },
        images: [{ url: 'https://picsum.photos/id/290/800/600', order: 1 }],
        stats: { views: 1480, likes: 110 }
      },
      {
        museumId: museums[1]._id, roomId: getRoomId('taxila', 0), museumCode: 'taxila',
        name: { en: 'Seated Maitreya', ur: 'بیٹھا ہوا میتریا' }, slug: 'seated-maitreya',
        description: { en: 'Schist stone statue depicting the future Buddha in a thoughtful state.', ur: 'شسٹ پتھر کا مجسمہ جس میں مستقبل کے بدھ کو سوچ بچار کی حالت میں دکھایا گیا ہے۔' },
        category: 'sculpture', historicalPeriod: { en: 'Gandharan', ur: 'گندھاری' },
        images: [{ url: 'https://picsum.photos/id/301/800/600', order: 1 }],
        stats: { views: 960, likes: 73 }
      },
      {
        museumId: museums[1]._id, roomId: getRoomId('taxila', 1), museumCode: 'taxila',
        name: { en: 'Aramaic Inscription Block', ur: 'آرامی کتبہ بلاک' }, slug: 'aramaic-inscription',
        description: { en: 'Ashokan era marble slab inscribed with ancient Aramaic script letters.', ur: 'اشوک کے دور کا سنگ مرمر کا ٹکڑا جس پر قدیم آرامی رسم الخط کندہ ہے۔' },
        category: 'sculpture', historicalPeriod: { en: 'Mauryan Empire', ur: 'موریہ سلطنت' },
        images: [{ url: 'https://picsum.photos/id/310/800/600', order: 1 }],
        stats: { views: 630, likes: 29 }
      },

      // === NATIONAL MUSEUM KARACHI (8 artifacts) ===
      {
        museumId: museums[2]._id, roomId: getRoomId('national_karachi', 0), museumCode: 'national_karachi',
        name: { en: 'Prehistoric Painted Box', ur: 'تاریخ سے پہلے کا پینٹ شدہ باکس' }, slug: 'prehistoric-painted-box',
        description: { en: 'Rare decorative painted box fragment preserved cleanly.', ur: 'باکس کا نایاب پینٹ شدہ ٹکڑا جو صاف حالت میں محفوظ کیا گیا ہے۔' },
        category: 'pottery', historicalPeriod: { en: 'Ancient Civilizations', ur: 'قدیم تہذیبیں' },
        images: [{ url: 'https://picsum.photos/id/251/800/600', order: 1 }],
        stats: { views: 2150, likes: 134 }
      },
      {
        museumId: museums[2]._id, roomId: getRoomId('national_karachi', 1), museumCode: 'national_karachi',
        name: { en: 'Islamic Calligraphy Quran', ur: 'اسلامی خطاطی قرآن' }, slug: 'islamic-calligraphy-quran',
        description: { en: 'Handwritten Quran with exquisite calligraphy.', ur: 'خطاطی کے ساتھ ہاتھ سے لکھا گیا قرآن مجید۔' },
        category: 'manuscript', historicalPeriod: { en: 'Islamic Golden Age', ur: 'اسلامی سنہری دور' },
        images: [{ url: 'https://picsum.photos/id/180/800/600', order: 1 }],
        stats: { views: 1450, likes: 92 }
      },
      {
        museumId: museums[2]._id, roomId: getRoomId('national_karachi', 2), museumCode: 'national_karachi',
        name: { en: 'Indus Valley Pottery Pot', ur: 'وادی سندھ کا مٹی کا برتن' }, slug: 'indus-pottery-pot',
        description: { en: 'Red terracotta pottery painted with black geometric and animal motifs.', ur: 'سرخ مٹی کا برتن جس پر سیاہ ہندسی اور جانوروں کے ڈیزائن پینٹ ہیں۔' },
        category: 'pottery', historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
        images: [{ url: 'https://picsum.photos/id/320/800/600', order: 1 }],
        stats: { views: 1120, likes: 66 }
      },
      {
        museumId: museums[2]._id, roomId: getRoomId('national_karachi', 0), museumCode: 'national_karachi',
        name: { en: 'Emperor Shah Jahan Farman', ur: 'شہنشاہ شاہ جہاں کا فرمان' }, slug: 'shah-jahan-farman',
        description: { en: 'An authentic imperial decree issued with the official royal seal of Shah Jahan.', ur: 'شاہ جہاں کی سرکاری شاہی مہر کے ساتھ جاری کردہ ایک مستند شاہی فرمان۔' },
        category: 'manuscript', historicalPeriod: { en: 'Mughal Empire', ur: 'مغل سلطنت' },
        images: [{ url: 'https://picsum.photos/id/330/800/600', order: 1 }],
        stats: { views: 1350, likes: 84 }
      },
      {
        museumId: museums[2]._id, roomId: getRoomId('national_karachi', 1), museumCode: 'national_karachi',
        name: { en: 'Prehistoric Chert Arrowheads', ur: 'پراگیتہاسک چقماق تیر کے نشانات' }, slug: 'chert-arrowheads',
        description: { en: 'Stone arrowheads used by ancient hunter gatherers found in Rohri hills.', ur: 'روہڑی کی پہاڑیوں سے ملنے والے قدیم شکاریوں کے استعمال کردہ پتھر کے تیر کے نشانات۔' },
        category: 'weapon', historicalPeriod: { en: 'Paleolithic', ur: 'قدیم پتھر کا دور' },
        images: [{ url: 'https://picsum.photos/id/340/800/600', order: 1 }],
        stats: { views: 420, likes: 18 }
      },
      {
        museumId: museums[2]._id, roomId: getRoomId('national_karachi', 2), museumCode: 'national_karachi',
        name: { en: 'Ancient Hindu Sculpture of Vishnu', ur: 'وشنو کا قدیم ہندو مجسمہ' }, slug: 'vishnu-sculpture',
        description: { en: 'Beautifully sculpted black stone deity fragment from the Hindu Shahi dynamic rule.', ur: 'ہندو شاہی دور حکومت کا سیاہ پتھر سے بنا دیوتا کا خوبصورت مجسمہ۔' },
        category: 'sculpture', historicalPeriod: { en: 'Hindu Shahi', ur: 'ہندو شاہی دور' },
        images: [{ url: 'https://picsum.photos/id/350/800/600', order: 1 }],
        stats: { views: 790, likes: 44 }
      },
      {
        museumId: museums[2]._id, roomId: getRoomId('national_karachi', 0), museumCode: 'national_karachi',
        name: { en: 'Glazed Multan Tile Panel', ur: 'ملتانی شیشے والی ٹائلوں کا پینل' }, slug: 'multan-glazed-tiles',
        description: { en: 'Traditional blue and white pottery tile work safely recovered from historical Sufi shrines.', ur: 'تاریخی صوفی مزارات سے برآمد ہونے والی روایتی نیلی اور سفید مٹی کی ٹائلوں کا مجموعہ۔' },
        category: 'pottery', historicalPeriod: { en: 'Sultanate Period', ur: 'سلطنت کا دور' },
        images: [{ url: 'https://picsum.photos/id/360/800/600', order: 1 }],
        stats: { views: 940, likes: 58 }
      },
      {
        museumId: museums[2]._id, roomId: getRoomId('national_karachi', 1), museumCode: 'national_karachi',
        name: { en: 'Balochistan Anthropomorphic Figurine', ur: 'بلوچستان کا انسانی مجسمہ' }, slug: 'balochistan-figurine',
        description: { en: 'Terracotta female figurine originating from Mehrgarh culture roots.', ur: 'مہر گڑھ ثقافت کی جڑوں سے نکلنے والا مٹی کا مادہ مجسمہ۔' },
        category: 'figurine', historicalPeriod: { en: 'Mehrgarh Period', ur: 'مہر گڑھ دور' },
        images: [{ url: 'https://picsum.photos/id/370/800/600', order: 1 }],
        stats: { views: 1250, likes: 79 }
      },

      // === MOHENJO-DARO (8 artifacts) ===
      {
        museumId: museums[3]._id, roomId: getRoomId('mohenjo_daro', 0), museumCode: 'mohenjo_daro',
        name: { en: 'Unicorn Seal', ur: 'ایک سینگ والا مہر' }, slug: 'unicorn-seal',
        description: { en: 'Famous Indus Valley seal with unicorn motif.', ur: 'سندھ وادی کی مشہور مہر جس پر ایک سینگ والا جانور ہے۔' },
        category: 'seal', historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
        images: [{ url: 'https://picsum.photos/id/180/800/600', order: 1 }],
        stats: { views: 980, likes: 76 }
      },
      {
        museumId: museums[3]._id, roomId: getRoomId('mohenjo_daro', 1), museumCode: 'mohenjo_daro',
        name: { en: 'Dancing Girl Figurine', ur: 'ڈانسنگ گرل مجسمہ' }, slug: 'dancing-girl',
        description: { en: 'Iconic bronze figurine from Mohenjo-daro.', ur: 'موہن جو دڑو کی مشہور برانز فگرین۔' },
        category: 'figurine', historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
        images: [{ url: 'https://picsum.photos/id/251/800/600', order: 1 }],
        stats: { views: 1650, likes: 105 }
      },
      {
        museumId: museums[3]._id, roomId: getRoomId('mohenjo_daro', 2), museumCode: 'mohenjo_daro',
        name: { en: 'Priest-King Bust', ur: 'پوجاری بادشاہ کا مجسمہ' }, slug: 'priest-king',
        description: { en: 'Famous steatite stone sculpture of a bearded man wearing an armband and trefoil cloak.', ur: 'داڑھی والے آدمی کا مشہور صابن کے پتھر کا مجسمہ جس نے بازو بند اور تین پتیوں والا چوغہ پہنا ہوا ہے۔' },
        category: 'sculpture', historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
        images: [{ url: 'https://picsum.photos/id/380/800/600', order: 1 }],
        modelUrl: '/models/priest-king.glb',
        stats: { views: 4100, likes: 320 }
      },
      {
        museumId: museums[3]._id, roomId: getRoomId('mohenjo_daro', 0), museumCode: 'mohenjo_daro',
        name: { en: 'Terracotta Toy Wheels', ur: 'مٹی کے کھلونا پہیے' }, slug: 'terracotta-toy-wheels',
        description: { en: 'An early children\'s play part showing the usage of wheel technology in 2500 BCE.', ur: 'بچوں کے کھیلنے کے مٹی کے پہیے جو ۲۵۰۰ قبل مسیح میں پہیے کی ٹیکنالوجی کے استعمال کو ظاہر کرتے ہیں۔' },
        category: 'pottery', historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
        images: [{ url: 'https://picsum.photos/id/390/800/600', order: 1 }],
        stats: { views: 890, likes: 54 }
      },
      {
        museumId: museums[3]._id, roomId: getRoomId('mohenjo_daro', 1), museumCode: 'mohenjo_daro',
        name: { en: 'Bronze Buffalo Figurine', ur: 'کانسی کا بھینس کا مجسمہ' }, slug: 'bronze-buffalo',
        description: { en: 'Cast metal depiction of an expressive water buffalo made using cire perdue method.', ur: 'موم پگھلانے والے طریقہ کار کے ذریعے بنائی گئی دھات کی ایک خوبصورت بھینس۔' },
        category: 'figurine', historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
        images: [{ url: 'https://picsum.photos/id/400/800/600', order: 1 }],
        stats: { views: 760, likes: 41 }
      },
      {
        museumId: museums[3]._id, roomId: getRoomId('mohenjo_daro', 2), museumCode: 'mohenjo_daro',
        name: { en: 'Clay Game Pieces', ur: 'مٹی کے پانسے' }, slug: 'clay-game-pieces',
        description: { en: 'Terracotta gaming objects discovered with markings very similar to modern board gaming components.', ur: 'مٹی کے پانسے جن پر موجود نشانات جدید پانسوں سے کافی مماثلت رکھتے ہیں۔' },
        category: 'pottery', historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
        images: [{ url: 'https://picsum.photos/id/410/800/600', order: 1 }],
        stats: { views: 610, likes: 35 }
      },
      {
        museumId: museums[3]._id, roomId: getRoomId('mohenjo_daro', 0), museumCode: 'mohenjo_daro',
        name: { en: 'Pashupati Proto-Shiva Seal', ur: 'پشوپتی مہر' }, slug: 'pashupati-seal',
        description: { en: 'Steatite seal showing a seated three-faced figure surrounded by wild animals.', ur: 'صابن کے پتھر کی مہر جس پر تین چہروں والی ایک بیٹھی ہوئی شخصیت دکھائی گئی ہے جس کے اردگرد جنگلی جانور موجود ہیں۔' },
        category: 'seal', historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
        images: [{ url: 'https://picsum.photos/id/420/800/600', order: 1 }],
        stats: { views: 1980, likes: 145 }
      },
      {
        museumId: museums[3]._id, roomId: getRoomId('mohenjo_daro', 1), museumCode: 'mohenjo_daro',
        name: { en: 'Carnelian Necklace Beads', ur: 'عقیق کے ہار کے دانے' }, slug: 'carnelian-necklace-beads',
        description: { en: 'Carefully bored carnelian ornament beads from ancient Indus Valley artisans.', ur: 'قدیم وادی سندھ کے کاریگروں کے تیار کردہ عقیق کے خوبصورت دانے۔' },
        category: 'jewelry', historicalPeriod: { en: 'Indus Valley', ur: 'سندھ وادی' },
        images: [{ url: 'https://picsum.photos/id/430/800/600', order: 1 }],
        stats: { views: 820, likes: 49 }
      }
    ];

    const createdArtifacts = await Artifact.insertMany(artifactsData);
    console.log(`✅ Created ${createdArtifacts.length} realistic artifacts`);

    // Demo User
    await User.create({
      email: 'explorer@virtmu.com',
      username: 'heritage_explorer',
      password: 'password123',
      displayName: 'Heritage Explorer',
      role: 'user',
      language: 'en'
    });

    console.log('\n🎉 FULL DATABASE SEEDED SUCCESSFULLY!');
    console.log(`→ ${museums.length} Museums`);
    console.log(`→ ${allRooms.length} Rooms Assigned`);
    console.log(`→ ${createdArtifacts.length} Rich Bilingual Artifacts`);
    console.log('→ Demo User ready');
    process.exit(0);

  } catch (error: any) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();