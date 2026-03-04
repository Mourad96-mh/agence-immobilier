const mongoose = require('mongoose');
const Property = require('./models/Property');
const Lead = require('./models/Lead');
require('dotenv').config({ path: './config.env' });

let MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI && process.env.DATABASE) {
  MONGODB_URI = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD || '');
}
MONGODB_URI = MONGODB_URI || 'mongodb://localhost:27017/immobilier';

const properties = [
  {
    title: {
      fr: 'Appartement moderne au centre-ville',
      ar: 'شقة عصرية في وسط المدينة',
      en: 'Modern apartment downtown',
    },
    description: {
      fr: "Bel appartement lumineux de 120m² avec vue panoramique, entièrement rénové avec des matériaux de qualité. Cuisine équipée, 3 chambres, 2 salles de bain.",
      ar: "شقة جميلة ومضيئة 120 متر مربع مع إطلالة بانورامية، تم تجديدها بالكامل بمواد عالية الجودة. مطبخ مجهز، 3 غرف، 2 حمام.",
      en: "Beautiful 120m² apartment with panoramic view, fully renovated with quality materials. Fitted kitchen, 3 bedrooms, 2 bathrooms.",
    },
    category: 'apartment',
    transactionType: 'sale',
    city: 'Casablanca',
    price: 1850000,
    area: 120,
    rooms: 3,
    bathrooms: 2,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'],
    featured: true,
  },
  {
    title: {
      fr: 'Villa de luxe avec piscine — Vue mer',
      ar: 'فيلا فاخرة مع مسبح — إطلالة على البحر',
      en: 'Luxury villa with pool — Sea view',
    },
    description: {
      fr: "Superbe villa de 400m² avec piscine privée, jardin paysager et vue sur mer. Finitions haut de gamme, domotique intégrée.",
      ar: "فيلا رائعة 400 متر مربع مع مسبح خاص وحديقة منسقة وإطلالة على البحر. تشطيبات راقية ونظام منزل ذكي.",
      en: "Stunning 400m² villa with private pool, landscaped garden and sea view. High-end finishes, smart home system.",
    },
    category: 'villa',
    transactionType: 'sale',
    city: 'Agadir',
    price: 4500000,
    area: 400,
    rooms: 5,
    bathrooms: 3,
    images: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80'],
    featured: true,
  },
  {
    title: {
      fr: 'Appartement meublé à louer — Gueliz',
      ar: 'شقة مفروشة للإيجار — ڭيليز',
      en: 'Furnished apartment for rent — Gueliz',
    },
    description: {
      fr: "Appartement entièrement meublé de 80m² dans le quartier Gueliz, proche de toutes les commodités. Calme et lumineux.",
      ar: "شقة مفروشة بالكامل 80 متر مربع في حي ڭيليز، قريبة من جميع الخدمات. هادئة ومضيئة.",
      en: "Fully furnished 80m² apartment in Gueliz district, close to all amenities. Quiet and bright.",
    },
    category: 'apartment',
    transactionType: 'rent',
    city: 'Marrakech',
    price: 8500,
    area: 80,
    rooms: 2,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80'],
  },
  {
    title: {
      fr: 'Bureau moderne en centre d\'affaires',
      ar: 'مكتب عصري في مركز الأعمال',
      en: 'Modern office in business center',
    },
    description: {
      fr: "Plateau de bureau de 200m² entièrement aménagé en immeuble de prestige. Open space modulable, salle de réunion, parking.",
      ar: "مساحة مكتبية 200 متر مربع مجهزة بالكامل في مبنى راقٍ. فضاء مفتوح قابل للتعديل، قاعة اجتماعات، موقف سيارات.",
      en: "200m² fully fitted office in prestigious building. Modular open space, meeting room, parking.",
    },
    category: 'office',
    transactionType: 'rent',
    city: 'Casablanca',
    price: 35000,
    area: 200,
    rooms: null,
    bathrooms: 2,
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'],
  },
  {
    title: {
      fr: 'Terrain constructible — Zone résidentielle',
      ar: 'أرض قابلة للبناء — منطقة سكنية',
      en: 'Buildable land — Residential zone',
    },
    description: {
      fr: "Terrain viabilisé de 500m² en zone résidentielle calme, toutes autorisations disponibles. Proche école et commerces.",
      ar: "أرض مجهزة بالبنية التحتية 500 متر مربع في منطقة سكنية هادئة، جميع التصاريح متوفرة.",
      en: "Serviced 500m² plot in quiet residential zone, all permits available. Close to school and shops.",
    },
    category: 'land',
    transactionType: 'sale',
    city: 'Rabat',
    price: 1200000,
    area: 500,
    rooms: null,
    bathrooms: null,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'],
  },
  {
    title: {
      fr: 'Local commercial — Rue principale',
      ar: 'محل تجاري — الشارع الرئيسي',
      en: 'Commercial space — Main street',
    },
    description: {
      fr: "Local commercial de 120m² avec grande vitrine sur rue très passante. Ideal pour commerce, restauration ou services.",
      ar: "محل تجاري 120 متر مربع بواجهة زجاجية كبيرة على شارع مزدحم. مثالي للتجارة أو المطاعم أو الخدمات.",
      en: "120m² commercial space with large storefront on busy street. Ideal for retail, restaurant or services.",
    },
    category: 'commercial',
    transactionType: 'rent',
    city: 'Fès',
    price: 18000,
    area: 120,
    rooms: null,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'],
  },
  {
    title: {
      fr: 'Villa contemporaine — Hay Riad',
      ar: 'فيلا معاصرة — حي الرياض',
      en: 'Contemporary villa — Hay Riad',
    },
    description: {
      fr: "Villa moderne de 350m² avec architecture contemporaine, piscine chauffée et jardin paysager de 600m². Quartier résidentiel prisé.",
      ar: "فيلا حديثة 350 متر مربع بهندسة معمارية عصرية ومسبح مدفأ وحديقة 600 متر مربع. حي سكني راقٍ.",
      en: "Modern 350m² villa with contemporary architecture, heated pool and 600m² landscaped garden. Sought-after residential area.",
    },
    category: 'villa',
    transactionType: 'sale',
    city: 'Rabat',
    price: 6800000,
    area: 350,
    rooms: 6,
    bathrooms: 4,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    featured: true,
  },
  {
    title: {
      fr: 'Studio meublé — Centre de Tanger',
      ar: 'ستوديو مفروش — وسط طنجة',
      en: 'Furnished studio — Tangier center',
    },
    description: {
      fr: "Studio entièrement meublé et équipé de 40m², idéal pour étudiant ou jeune professionnel. Proche université et transports.",
      ar: "ستوديو مفروش ومجهز بالكامل 40 متر مربع، مثالي للطالب أو المهني الشاب. قريب من الجامعة والمواصلات.",
      en: "Fully furnished 40m² studio, ideal for student or young professional. Close to university and transport.",
    },
    category: 'apartment',
    transactionType: 'rent',
    city: 'Tanger',
    price: 3500,
    area: 40,
    rooms: 1,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80'],
  },
  {
    title: {
      fr: 'Appartement de standing — Anfa',
      ar: 'شقة راقية — عين الذياب',
      en: 'High-end apartment — Anfa',
    },
    description: {
      fr: "Appartement 3 chambres de 180m² dans résidence sécurisée avec piscine, salle de sport et gardiennage 24h.",
      ar: "شقة 3 غرف 180 متر مربع في إقامة مؤمنة مع مسبح وصالة رياضية وحراسة على مدار الساعة.",
      en: "3-bedroom 180m² apartment in secured residence with pool, gym and 24h security.",
    },
    category: 'apartment',
    transactionType: 'sale',
    city: 'Casablanca',
    price: 3200000,
    area: 180,
    rooms: 3,
    bathrooms: 2,
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'],
  },
  {
    title: {
      fr: 'Bureau direction — Immeuble prestige',
      ar: 'مكتب مدير — مبنى فاخر',
      en: 'Director office — Prestigious building',
    },
    description: {
      fr: "Bureau de direction de 80m² dans immeuble d'affaires de prestige en plein centre de Rabat. Finitions luxe, vue dégagée.",
      ar: "مكتب مدير 80 متر مربع في مبنى أعمال فاخر في قلب الرباط. تشطيبات فاخرة وإطلالة مفتوحة.",
      en: "80m² director office in prestigious business building in the heart of Rabat. Luxury finishes, open view.",
    },
    category: 'office',
    transactionType: 'rent',
    city: 'Rabat',
    price: 15000,
    area: 80,
    rooms: null,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1616587226157-48e49175ee20?w=800&q=80'],
  },
  {
    title: {
      fr: 'Terrain agricole — Zone péri-urbaine',
      ar: 'أرض زراعية — المنطقة شبه الحضرية',
      en: 'Agricultural land — Peri-urban zone',
    },
    description: {
      fr: "Grand terrain agricole de 2 hectares avec puits et accès route. Idéal pour projet agricole ou investissement foncier.",
      ar: "أرض زراعية كبيرة 2 هكتار مع بئر وممر طريق. مثالية لمشروع زراعي أو استثمار عقاري.",
      en: "Large 2-hectare agricultural land with well and road access. Ideal for agricultural project or land investment.",
    },
    category: 'land',
    transactionType: 'sale',
    city: 'Meknès',
    price: 800000,
    area: 20000,
    rooms: null,
    bathrooms: null,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80'],
  },
  {
    title: {
      fr: 'Villa à louer — Palmeraie de Marrakech',
      ar: 'فيلا للإيجار — واحة مراكش',
      en: 'Villa for rent — Marrakech Palmeraie',
    },
    description: {
      fr: "Villa de charme 4 chambres dans la palmeraie, terrain de 800m², piscine privée, personnel de maison inclus.",
      ar: "فيلا ساحرة 4 غرف في واحة مراكش، أرض 800 متر مربع، مسبح خاص، موظفو المنزل شاملون.",
      en: "Charming 4-bedroom villa in the palmeraie, 800m² plot, private pool, household staff included.",
    },
    category: 'villa',
    transactionType: 'rent',
    city: 'Marrakech',
    price: 45000,
    area: 300,
    rooms: 4,
    bathrooms: 3,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
  },
  {
    title: {
      fr: 'Appartement familial — Quartier calme',
      ar: 'شقة عائلية — حي هادئ',
      en: 'Family apartment — Quiet neighborhood',
    },
    description: {
      fr: "Grand appartement de 160m², 4 chambres, double séjour, terrasse de 30m² avec vue dégagée. Parking deux voitures.",
      ar: "شقة كبيرة 160 متر مربع، 4 غرف، صالة مزدوجة، شرفة 30 متر مربع بإطلالة مفتوحة. موقف سيارتين.",
      en: "Large 160m² apartment, 4 bedrooms, double living room, 30m² terrace with open view. Two-car parking.",
    },
    category: 'apartment',
    transactionType: 'sale',
    city: 'Kenitra',
    price: 1400000,
    area: 160,
    rooms: 4,
    bathrooms: 2,
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80'],
  },
  {
    title: {
      fr: 'Local commercial — Zone industrielle',
      ar: 'محل تجاري — المنطقة الصناعية',
      en: 'Commercial warehouse — Industrial zone',
    },
    description: {
      fr: "Hangar commercial de 500m² avec bureau intégré, quai de chargement et grand parking. Accès poids lourds.",
      ar: "مستودع تجاري 500 متر مربع مع مكتب مدمج ورصيف تحميل وموقف سيارات كبير. مدخل للشاحنات.",
      en: "500m² commercial warehouse with integrated office, loading dock and large parking. Truck access.",
    },
    category: 'commercial',
    transactionType: 'sale',
    city: 'Tanger',
    price: 3500000,
    area: 500,
    rooms: null,
    bathrooms: 2,
    images: ['https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80'],
  },
  {
    title: {
      fr: 'Appartement neuf — Résidence fermée',
      ar: 'شقة جديدة — إقامة مغلقة',
      en: 'New apartment — Gated residence',
    },
    description: {
      fr: "Appartement neuf jamais habité de 95m², 2 chambres, finitions soignées dans résidence fermée avec ascenseur.",
      ar: "شقة جديدة لم يسكنها أحد 95 متر مربع، غرفتان، تشطيبات عالية الجودة في إقامة مغلقة مع مصعد.",
      en: "Brand new 95m² apartment, 2 bedrooms, quality finishes in gated residence with elevator.",
    },
    category: 'apartment',
    transactionType: 'sale',
    city: 'Oujda',
    price: 950000,
    area: 95,
    rooms: 2,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80'],
  },
];

const testLeads = [
  { name: 'Karim Bennani', phone: '0661234567', email: 'karim@example.com', message: 'Je cherche un appartement 3 chambres à Casablanca.', source: 'contact', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
  { name: 'Fatima Zahra', phone: '0677891234', email: 'fatima@example.com', message: 'Intéressée par la villa à Agadir.', source: 'contact', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  { name: 'Youssef El Mansouri', phone: '0655443322', email: 'youssef@example.com', propertyType: 'apartment', city: 'Rabat', area: 120, message: 'Veux vendre mon appartement de 120m² à Rabat.', source: 'vendre', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
  { name: 'Nadia Cherkaoui', phone: '0699001122', email: 'nadia@example.com', propertyType: 'villa', city: 'Marrakech', area: 280, message: 'Villa avec piscine, cherche agence sérieuse.', source: 'vendre', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
  { name: 'Omar Tazi', phone: '0622334455', email: 'omar@example.com', propertyType: 'apartment', city: 'Casablanca', area: 90, message: 'Appartement à mettre en location longue durée.', source: 'location', createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
  { name: 'Salma Idrissi', phone: '0633221100', email: 'salma@example.com', propertyType: 'office', city: 'Rabat', area: 60, message: 'Bureau disponible immédiatement.', source: 'location', createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Property.deleteMany({});
    console.log('🗑️  Cleared existing properties');

    const inserted = await Property.insertMany(properties);
    console.log(`✅ Seeded ${inserted.length} properties`);

    await Lead.deleteMany({});
    console.log('🗑️  Cleared existing leads');

    const leads = await Lead.insertMany(testLeads);
    console.log(`✅ Seeded ${leads.length} test leads`);

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
