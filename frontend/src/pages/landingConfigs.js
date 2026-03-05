const FAQ_ACHETER = [
  {
    q: "Quels sont les frais d'achat immobilier au Maroc ?",
    a: "En plus du prix d'achat, comptez environ 6 à 7 % de frais : droits d'enregistrement (4 %), frais de notaire (1 %), taxe de conservation foncière (1,5 %) et divers frais administratifs. Notre équipe vous accompagne pour estimer le coût total de votre acquisition.",
  },
  {
    q: "Combien de temps dure une transaction immobilière au Maroc ?",
    a: "En moyenne, une vente prend entre 1 et 3 mois, selon la disponibilité des documents (titre foncier, certificat de propriété) et les délais bancaires si un crédit est impliqué. Mecalus vous guide à chaque étape pour accélérer le processus.",
  },
  {
    q: "Les étrangers peuvent-ils acheter un bien immobilier au Maroc ?",
    a: "Oui, les étrangers peuvent acheter librement de l'immobilier au Maroc, que ce soit en leur nom propre ou via une société. Il n'existe pas de restriction particulière, mais le transfert des fonds doit être documenté pour faciliter une éventuelle revente.",
  },
  {
    q: "Comment choisir entre acheter neuf ou ancien au Maroc ?",
    a: "Le neuf offre des garanties constructeur, la TVA réduite à 0 % sur la première habitation principale et des prestations modernes. L'ancien permet souvent de négocier le prix et d'obtenir un bien dans des quartiers établis. Nos conseillers vous aident à peser le pour et le contre selon votre projet.",
  },
]
const FAQ_LOUER = [
  {
    q: "Quels documents faut-il fournir pour louer un appartement au Maroc ?",
    a: "En général : une pièce d'identité (CIN ou passeport), un justificatif de revenus (bulletin de salaire ou relevé bancaire des 3 derniers mois) et parfois un garant. Pour les entreprises, un extrait du registre de commerce est demandé.",
  },
  {
    q: "Quel est le montant habituel de la caution locative au Maroc ?",
    a: "La caution correspond généralement à 1 à 2 mois de loyer. Elle est restituée à la fin du bail, déduction faite d'éventuels dégâts constatés lors de l'état des lieux de sortie.",
  },
  {
    q: "Comment se déroule la résiliation d'un bail au Maroc ?",
    a: "Le locataire doit en principe respecter un préavis d'un mois (parfois 3 mois selon le contrat). La résiliation se fait par lettre recommandée avec accusé de réception. En cas de litige, le juge des référés peut intervenir rapidement.",
  },
  {
    q: "Puis-je négocier le loyer avec le propriétaire ?",
    a: "Oui, surtout si le bien est vacant depuis un certain temps ou si vous proposez un bail long terme. Nos agents connaissent les prix du marché et peuvent vous aider à négocier les meilleures conditions.",
  },
]

export const LANDING_PAGES = [
  {
    path: "/acheter-appartement-casablanca",
    seo: {
      title: "Appartement à vendre Casablanca — Mecalus Immobilier",
      description: "Trouvez votre appartement à vendre à Casablanca : Maarif, Anfa, Gauthier, CIL... Annonces vérifiées, prix transparents. Contactez Mecalus.",
      canonical: "https://mecalus.org/acheter-appartement-casablanca",
      keywords: "appartement à vendre casablanca, achat appartement casablanca, immobilier casablanca",
    },
    hero: {
      title: "Appartements à vendre à Casablanca",
      subtitle: "Maarif, Anfa, Gauthier, CIL, Racine et plus — trouvez votre futur chez-vous",
    },
    intro: "Vous recherchez un appartement à vendre à Casablanca ? Mecalus vous propose une sélection exclusive de biens dans les quartiers les plus prisés : Maarif, Anfa, Gauthier, CIL, Racine, Californie et bien d'autres. Que vous soyez primo-accédant ou investisseur, nos conseillers locaux vous accompagnent de la visite jusqu'à la signature chez le notaire.",
    defaultFilters: { category: "apartment", transactionType: "sale", city: "Casablanca" },
    faq: FAQ_ACHETER,
  },
  {
    path: "/acheter-villa-marrakech",
    seo: {
      title: "Villa à vendre Marrakech — Mecalus Immobilier",
      description: "Villas à vendre à Marrakech : Palmeraie, Hivernage, Agdal, Route de Fès... Découvrez nos offres exclusives. Mecalus, votre agence de confiance.",
      canonical: "https://mecalus.org/acheter-villa-marrakech",
      keywords: "villa à vendre marrakech, achat villa marrakech, immobilier marrakech",
    },
    hero: {
      title: "Villas à vendre à Marrakech",
      subtitle: "Palmeraie, Hivernage, Agdal, Route de Fès — luxe et authenticité",
    },
    intro: "Marrakech attire chaque année de nombreux acquéreurs en quête d'une villa alliant architecture marocaine et confort moderne. Mecalus sélectionne pour vous les meilleures villas à vendre à Marrakech, de la Palmeraie à l'Hivernage en passant par l'Agdal et la Route de Fès. Piscine, jardin paysager, vue sur l'Atlas : nos biens répondent aux exigences les plus hautes.",
    defaultFilters: { category: "villa", transactionType: "sale", city: "Marrakech" },
    faq: FAQ_ACHETER,
  },
  {
    path: "/acheter-appartement-marrakech",
    seo: {
      title: "Appartement à vendre Marrakech — Mecalus Immobilier",
      description: "Appartements à vendre à Marrakech : Guéliz, Agdal, Médina, Massira... Annonces vérifiées, accompagnement personnalisé. Mecalus Immobilier.",
      canonical: "https://mecalus.org/acheter-appartement-marrakech",
      keywords: "appartement à vendre marrakech, achat appartement marrakech, immobilier marrakech",
    },
    hero: {
      title: "Appartements à vendre à Marrakech",
      subtitle: "Guéliz, Agdal, Médina, Massira — investissez dans la ville ocre",
    },
    intro: "Guéliz, Agdal, Médina ou Massira : chaque quartier de Marrakech a son caractère. Mecalus vous aide à trouver l'appartement à vendre à Marrakech qui correspond à votre budget et à votre style de vie. Nos agents présents sur place connaissent le marché local et vous évitent les mauvaises surprises.",
    defaultFilters: { category: "apartment", transactionType: "sale", city: "Marrakech" },
    faq: FAQ_ACHETER,
  },
  {
    path: "/louer-appartement-casablanca",
    seo: {
      title: "Appartement à louer Casablanca — Mecalus Immobilier",
      description: "Location appartement Casablanca : Maarif, Anfa, Gauthier, Racine... Biens vérifiés, loyers transparents. Trouvez votre logement avec Mecalus.",
      canonical: "https://mecalus.org/louer-appartement-casablanca",
      keywords: "appartement à louer casablanca, location appartement casablanca, louer casablanca",
    },
    hero: {
      title: "Appartements à louer à Casablanca",
      subtitle: "Maarif, Gauthier, Racine, CIL — trouvez votre location idéale",
    },
    intro: "Vous cherchez un appartement à louer à Casablanca ? Mecalus met à votre disposition des annonces de location vérifiées dans tous les grands quartiers : Maarif, Gauthier, Racine, CIL, Hay Hassani et plus encore. Logement meublé ou vide, courte ou longue durée : nous adaptons notre offre à vos besoins.",
    defaultFilters: { category: "apartment", transactionType: "rent", city: "Casablanca" },
    faq: FAQ_LOUER,
  },
  {
    path: "/louer-appartement-marrakech",
    seo: {
      title: "Appartement à louer Marrakech — Mecalus Immobilier",
      description: "Location appartement Marrakech : Guéliz, Agdal, Médina, Hivernage... Annonces fiables, accompagnement complet. Mecalus Immobilier.",
      canonical: "https://mecalus.org/louer-appartement-marrakech",
      keywords: "appartement à louer marrakech, location appartement marrakech, louer marrakech",
    },
    hero: {
      title: "Appartements à louer à Marrakech",
      subtitle: "Guéliz, Agdal, Hivernage, Médina — votre location dans la ville ocre",
    },
    intro: "Expatrié, étudiant ou touriste longue durée, trouvez votre appartement à louer à Marrakech avec Mecalus. Nous proposons des biens dans les secteurs les plus recherchés : Guéliz pour la modernité, Agdal pour la tranquillité, Hivernage pour le prestige et la Médina pour le charme authentique.",
    defaultFilters: { category: "apartment", transactionType: "rent", city: "Marrakech" },
    faq: FAQ_LOUER,
  },
  {
    path: "/louer-villa-marrakech",
    seo: {
      title: "Villa à louer Marrakech — Mecalus Immobilier",
      description: "Villas à louer à Marrakech : Palmeraie, Hivernage, Route de Fès... Locations saisonnières et longue durée. Mecalus, votre agence locale.",
      canonical: "https://mecalus.org/louer-villa-marrakech",
      keywords: "villa à louer marrakech, location villa marrakech, villa marrakech",
    },
    hero: {
      title: "Villas à louer à Marrakech",
      subtitle: "Palmeraie, Hivernage, Route de Fès — prestige et dépaysement garantis",
    },
    intro: "Pour un séjour d'exception ou une location longue durée, Mecalus vous propose les plus belles villas à louer à Marrakech. Piscines privées, jardins arborés, architectures traditionnelles ou contemporaines : nos villas en location à la Palmeraie, à l'Hivernage ou sur la Route de Fès correspondent à toutes les occasions.",
    defaultFilters: { category: "villa", transactionType: "rent", city: "Marrakech" },
    faq: FAQ_LOUER,
  },
]
