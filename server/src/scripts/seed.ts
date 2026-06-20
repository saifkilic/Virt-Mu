import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Museum } from '../models/Museum';
import { Room } from '../models/Room';
import { Artifact } from '../models/Artifact';

dotenv.config();

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/virtual_museum';
    await mongoose.connect(mongoURI);
    
    await Museum.deleteMany({});
    await Room.deleteMany({});
    await Artifact.deleteMany({});

    const lahoreMuseum = await Museum.create({
      code: 'lahore',
      name: {
        en: 'Lahore Museum',
        ur: 'لاہور عجائب گھر'
      },
      slug: 'lahore-museum',
      isUnescoSite: false,
      isPublished: true,
      totalRooms: 2,
      totalArtifacts: 2
    });

    const taxilaMuseum = await Museum.create({
      code: 'taxila',
      name: {
        en: 'Taxila Museum',
        ur: 'ٹیکسلا عجائب گھر'
      },
      slug: 'taxila-museum',
      isUnescoSite: true,
      isPublished: true,
      totalRooms: 1,
      totalArtifacts: 1
    });

    await Museum.create({
      code: 'national_karachi',
      name: {
        en: 'National Museum of Pakistan',
        ur: 'قومی عجائب گھر پاکستان'
      },
      slug: 'national-museum-karachi',
      isUnescoSite: false,
      isPublished: true
    });

    await Museum.create({
      code: 'mohenjo_daro',
      name: {
        en: 'Mohenjo-daro Archaeological Museum',
        ur: 'موہنجودڑو آثار قدیمہ عجائب گھر'
      },
      slug: 'mohenjo-daro-museum',
      isUnescoSite: true,
      isPublished: true
    });

    const islamicGallery = await Room.create({
      museumId: lahoreMuseum._id,
      museumCode: 'lahore',
      name: {
        en: 'Islamic Gallery',
        ur: 'اسلامک گیلری'
      },
      slug: 'islamic-gallery',
      type: 'gallery',
      sceneData: {
        modelUrl: '/models/islamic_gallery.glb',
        lighting: {
          ambientColor: '#F5F1E8',
          ambientIntensity: 0.7
        },
        camera: {
          initialPosition: { x: 0, y: 1.6, z: 4 },
          lookAt: { x: 0, y: 1.6, z: 0 },
          fov: 65
        }
      }
    });

    const gandharaGallery = await Room.create({
      museumId: lahoreMuseum._id,
      museumCode: 'lahore',
      name: {
        en: 'Gandhara Masterpieces Chamber',
        ur: 'گندھارا شاہکار چیمبر'
      },
      slug: 'gandhara-chamber',
      type: 'chamber',
      sceneData: {
        modelUrl: '/models/gandhara_gallery.glb',
        lighting: {
          ambientColor: '#D4AF37',
          ambientIntensity: 0.5
        },
        camera: {
          initialPosition: { x: 2, y: 1.6, z: 5 },
          lookAt: { x: 0, y: 1.2, z: 0 },
          fov: 60
        }
      }
    });

    const taxilaMainHall = await Room.create({
      museumId: taxilaMuseum._id,
      museumCode: 'taxila',
      name: {
        en: 'Stupa Sculptures Main Hall',
        ur: 'اسٹوپا مجسمے مین ہال'
      },
      slug: 'stupa-main-hall',
      type: 'hall',
      sceneData: {
        modelUrl: '/models/taxila_main.glb'
      }
    });

    await Room.findByIdAndUpdate(islamicGallery._id, {
      $push: {
        connections: {
          roomId: gandharaGallery._id,
          direction: 'north',
          doorName: {
            en: 'Passage to Gandhara Chamber',
            ur: 'گندھارا چیمبر کا راستہ'
          },
          doorPosition: { x: 0, y: 0, z: -8 }
        }
      }
    });

    await Room.findByIdAndUpdate(gandharaGallery._id, {
      $push: {
        connections: {
          roomId: islamicGallery._id,
          direction: 'south',
          doorName: {
            en: 'Return to Islamic Gallery',
            ur: 'اسلامک گیلری میں واپسی'
          },
          doorPosition: { x: 0, y: 0, z: 8 }
        }
      }
    });

    await Artifact.create({
      roomId: islamicGallery._id,
      museumId: lahoreMuseum._id,
      museumCode: 'lahore',
      name: {
        en: 'Mughal Illuminated Manuscript',
        ur: 'مغلیہ روشن مخطوطہ'
      },
      slug: 'mughal-illuminated-manuscript',
      description: {
        en: 'An intricately detailed 17th-century manuscript featuring gold-leaf borders and classical Persian calligraphy.',
        ur: 'سترہویں صدی کا ایک باریک بینی سے تیار کردہ مخطوطہ جس میں سونے کے ورق کے حاشیے اور کلاسیکی فارسی خطاطی شامل ہے۔'
      },
      category: 'manuscript',
      tags: ['mughal', 'calligraphy', 'gold', 'lahore'],
      isHighlighted: true,
      displayOrder: 1
    });

    await Artifact.create({
      roomId: gandharaGallery._id,
      museumId: lahoreMuseum._id,
      museumCode: 'lahore',
      name: {
        en: 'Fasting Buddha',
        ur: 'فاسٹنگ بدھا'
      },
      slug: 'fasting-buddha-lahore',
      description: {
        en: 'A world-renowned ancient Gandharan schist sculpture depicting Siddhartha Gautama during his intense ascetic phase.',
        ur: 'گندھارا آرٹ کا ایک عالمی شہرت یافتہ مجسمہ جو سدھارتھ گوتم کے شدید زہد کے دور کی عکاسی کرتا ہے۔'
      },
      category: 'sculpture',
      tags: ['buddha', 'gandhara', 'schist', 'ancient'],
      isHighlighted: true,
      displayOrder: 2
    });

    await Artifact.create({
      roomId: taxilaMainHall._id,
      museumId: taxilaMuseum._id,
      museumCode: 'taxila',
      name: {
        en: 'Gandharan Bodhisattva Head',
        ur: 'گندھارا بودھی ستوا سر'
      },
      slug: 'gandharan-bodhisattva-head',
      description: {
        en: 'Stucco sculptural head displaying a blend of Hellenistic Greek facial structures and traditional South Asian spiritual expressions.',
        ur: 'اسٹوکو کا مجسمہ سر جو ہیلنسٹک یونانی چہرے کی ساخت اور روایتی جنوبی ایشیائی روحانی تاثرات کا امتزاج ظاہر کرتا ہے۔'
      },
      category: 'sculpture',
      tags: ['taxila', 'bodhisattva', 'stucco', 'hellenistic'],
      isHighlighted: true,
      displayOrder: 1
    });

    console.log('Seeding execution successfully completed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failure caught:', error);
    process.exit(1);
  }
};

seedDatabase();




