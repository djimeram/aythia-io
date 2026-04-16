export type Language = 'en' | 'fr' | 'ar';

export interface Translations {
  nav: {
    features: string;
    howItWorks: string;
    testimonials: string;
    download: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    statRides: string;
    statDrivers: string;
    statCities: string;
  };
  features: {
    eyebrow: string;
    heading: string;
    subheading: string;
    safetyTitle: string;
    safetyDesc: string;
    matchingTitle: string;
    matchingDesc: string;
    trackingTitle: string;
    trackingDesc: string;
    paymentTitle: string;
    paymentDesc: string;
    ratedTitle: string;
    ratedDesc: string;
    scheduleTitle: string;
    scheduleDesc: string;
  };
  rideFlow: {
    eyebrow: string;
    heading: string;
    subheading: string;
    step: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    t1Text: string;
    t1Name: string;
    t1Location: string;
    t2Text: string;
    t2Name: string;
    t2Location: string;
    t3Text: string;
    t3Name: string;
    t3Location: string;
    t4Text: string;
    t4Name: string;
    t4Location: string;
  };
  download: {
    heading: string;
    headingAccent: string;
    subtext: string;
    downloadOn: string;
    appStore: string;
    getItOn: string;
    googlePlay: string;
    projectLink: string;
    madeWith: string;
    forAfrica: string;
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      features: 'Features',
      howItWorks: 'How it works',
      testimonials: 'Testimonials',
      download: 'Download',
    },
    hero: {
      badge: "Africa's Ride-Hailing App",
      titleLine1: 'Your journey',
      titleLine2: 'starts with',
      titleAccent: 'Aythia',
      subtitle: 'Safe, affordable, and reliable rides across the continent. Every trip is a celebration of African roads.',
      ctaPrimary: 'Get the App',
      ctaSecondary: 'Discover More',
      statRides: 'Rides',
      statDrivers: 'Drivers',
      statCities: 'Cities',
    },
    features: {
      eyebrow: 'WHY AYTHIA',
      heading: 'Built for\nAfrican roads',
      subheading: 'Every feature is designed with the realities of African cities in mind.',
      safetyTitle: 'Safety First',
      safetyDesc: 'Real-time trip sharing, verified drivers, and 24/7 emergency support.',
      matchingTitle: 'Instant Matching',
      matchingDesc: 'Get matched with the nearest driver in seconds, not minutes.',
      trackingTitle: 'Live Tracking',
      trackingDesc: 'Follow your ride in real-time from request to destination.',
      paymentTitle: 'Flexible Payment',
      paymentDesc: 'Mobile money, card, or cash — pay the way that suits you.',
      ratedTitle: 'Rated Drivers',
      ratedDesc: 'Community-rated drivers ensure quality every single ride.',
      scheduleTitle: 'Schedule Rides',
      scheduleDesc: 'Book ahead for airport runs, meetings, or early mornings.',
    },
    rideFlow: {
      eyebrow: 'THE AYTHIA EXPERIENCE',
      heading: 'Every ride,\na story',
      subheading: 'From tap to destination — see how Aythia transforms every journey into a seamless experience across vibrant African cities.',
      step: 'Step',
      step1Title: 'Request Your Ride',
      step1Desc: 'Open Aythia, enter your destination, and choose your ride type. See upfront pricing before you confirm.',
      step2Title: 'Driver Accepts',
      step2Desc: 'A verified driver nearby accepts your request. See their name, rating, vehicle, and estimated arrival.',
      step3Title: 'Pickup',
      step3Desc: 'Track your driver in real-time as they navigate to your location. A notification alerts you when they arrive.',
      step4Title: 'Enjoy the Journey',
      step4Desc: 'Sit back, relax, and enjoy the ride. Share your trip with loved ones for peace of mind.',
      step5Title: 'Arrive & Rate',
      step5Desc: 'Arrive safely at your destination. Rate your driver and pay seamlessly through the app.',
    },
    testimonials: {
      eyebrow: 'VOICES OF AYTHIA',
      heading: 'Loved across\nthe continent',
      t1Text: "Aythia changed how I move around the city. It's fast, safe, and the drivers are always professional.",
      t1Name: 'Aminata D.',
      t1Location: 'Dakar, Senegal',
      t2Text: "As a driver, Aythia gives me consistent income and treats me with respect. The app is simple and powerful.",
      t2Name: 'Kwame A.',
      t2Location: 'Accra, Ghana',
      t3Text: "I schedule my morning rides the night before. Never been late to work since I started using Aythia!",
      t3Name: 'Fatou S.',
      t3Location: "Abidjan, Cote d'Ivoire",
      t4Text: "Mobile money integration is a game-changer. No cash needed, everything is seamless and transparent.",
      t4Name: 'Ousmane B.',
      t4Location: 'Bamako, Mali',
    },
    download: {
      heading: 'Ready to',
      headingAccent: 'ride with Aythia?',
      subtext: 'Join millions of riders and drivers transforming mobility across Africa. Your next journey is just a tap away.',
      downloadOn: 'Download on the',
      appStore: 'App Store',
      getItOn: 'Get it on',
      googlePlay: 'Google Play',
      projectLink: 'View the Aythia project on Rork',
      madeWith: 'Made with',
      forAfrica: 'for Africa',
      copyright: '2026 Aythia. Connecting African communities, one ride at a time.',
    },
  },
  fr: {
    nav: {
      features: 'Fonctionnalites',
      howItWorks: 'Comment ca marche',
      testimonials: 'Temoignages',
      download: 'Telecharger',
    },
    hero: {
      badge: "L'appli VTC de l'Afrique",
      titleLine1: 'Votre voyage',
      titleLine2: 'commence avec',
      titleAccent: 'Aythia',
      subtitle: 'Des trajets surs, abordables et fiables a travers le continent. Chaque course est une celebration des routes africaines.',
      ctaPrimary: "Telecharger l'appli",
      ctaSecondary: 'En savoir plus',
      statRides: 'Courses',
      statDrivers: 'Chauffeurs',
      statCities: 'Villes',
    },
    features: {
      eyebrow: 'POURQUOI AYTHIA',
      heading: 'Concu pour\nles routes africaines',
      subheading: 'Chaque fonctionnalite est pensee pour les realites des villes africaines.',
      safetyTitle: 'Securite avant tout',
      safetyDesc: "Partage de trajet en temps reel, chauffeurs verifies et assistance d'urgence 24h/24.",
      matchingTitle: 'Mise en relation instantanee',
      matchingDesc: 'Trouvez le chauffeur le plus proche en secondes, pas en minutes.',
      trackingTitle: 'Suivi en direct',
      trackingDesc: 'Suivez votre course en temps reel de la demande a la destination.',
      paymentTitle: 'Paiement flexible',
      paymentDesc: 'Mobile money, carte ou especes — payez comme bon vous semble.',
      ratedTitle: 'Chauffeurs notes',
      ratedDesc: 'Des chauffeurs notes par la communaute garantissent la qualite a chaque course.',
      scheduleTitle: "Reservation a l'avance",
      scheduleDesc: "Reservez a l'avance pour l'aeroport, les reunions ou les matinees.",
    },
    rideFlow: {
      eyebrow: "L'EXPERIENCE AYTHIA",
      heading: 'Chaque course,\nune histoire',
      subheading: 'Du premier clic a la destination — decouvrez comment Aythia transforme chaque trajet en une experience fluide a travers les villes africaines.',
      step: 'Etape',
      step1Title: 'Demandez votre course',
      step1Desc: 'Ouvrez Aythia, entrez votre destination et choisissez votre type de course. Consultez le tarif avant de confirmer.',
      step2Title: 'Le chauffeur accepte',
      step2Desc: "Un chauffeur verifie a proximite accepte votre demande. Consultez son nom, sa note, son vehicule et son heure d'arrivee.",
      step3Title: 'Prise en charge',
      step3Desc: "Suivez votre chauffeur en temps reel jusqu'a votre position. Une notification vous previent de son arrivee.",
      step4Title: 'Profitez du trajet',
      step4Desc: 'Detendez-vous et profitez de la course. Partagez votre trajet avec vos proches pour plus de serenite.',
      step5Title: 'Arrivee & Evaluation',
      step5Desc: "Arrivez en toute securite a destination. Notez votre chauffeur et payez facilement via l'application.",
    },
    testimonials: {
      eyebrow: "LES VOIX D'AYTHIA",
      heading: 'Apprecie a travers\nle continent',
      t1Text: "Aythia a change ma facon de me deplacer en ville. C'est rapide, sur et les chauffeurs sont toujours professionnels.",
      t1Name: 'Aminata D.',
      t1Location: 'Dakar, Senegal',
      t2Text: "En tant que chauffeur, Aythia me garantit un revenu regulier et me traite avec respect. L'appli est simple et puissante.",
      t2Name: 'Kwame A.',
      t2Location: 'Accra, Ghana',
      t3Text: "Je reserve mes courses du matin la veille. Je n'ai plus jamais ete en retard au travail depuis que j'utilise Aythia !",
      t3Name: 'Fatou S.',
      t3Location: "Abidjan, Cote d'Ivoire",
      t4Text: "L'integration du mobile money est revolutionnaire. Plus besoin d'especes, tout est fluide et transparent.",
      t4Name: 'Ousmane B.',
      t4Location: 'Bamako, Mali',
    },
    download: {
      heading: 'Pret a',
      headingAccent: 'rouler avec Aythia ?',
      subtext: 'Rejoignez des millions de passagers et chauffeurs qui transforment la mobilite en Afrique. Votre prochain trajet est a portee de main.',
      downloadOn: "Telecharger sur l'",
      appStore: 'App Store',
      getItOn: 'Disponible sur',
      googlePlay: 'Google Play',
      projectLink: 'Voir le projet Aythia sur Rork',
      madeWith: 'Fait avec',
      forAfrica: "pour l'Afrique",
      copyright: "2026 Aythia. Connecter les communautes africaines, une course a la fois.",
    },
  },
  ar: {
    nav: {
      features: 'المميزات',
      howItWorks: 'كيف يعمل',
      testimonials: 'الآراء',
      download: 'تحميل',
    },
    hero: {
      badge: 'تطبيق النقل في أفريقيا',
      titleLine1: 'رحلتك',
      titleLine2: 'تبدأ مع',
      titleAccent: 'أيثيا',
      subtitle: 'رحلات آمنة وبأسعار معقولة وموثوقة عبر القارة. كل رحلة هي احتفال بطرق أفريقيا.',
      ctaPrimary: 'حمّل التطبيق',
      ctaSecondary: 'اكتشف المزيد',
      statRides: 'رحلات',
      statDrivers: 'سائقون',
      statCities: 'مدن',
    },
    features: {
      eyebrow: 'لماذا أيثيا',
      heading: 'مصمّم\nللطرق الأفريقية',
      subheading: 'كل ميزة مصممة مع مراعاة واقع المدن الأفريقية.',
      safetyTitle: 'السلامة أولاً',
      safetyDesc: 'مشاركة الرحلة في الوقت الفعلي، سائقون موثّقون، ودعم طوارئ على مدار الساعة.',
      matchingTitle: 'مطابقة فورية',
      matchingDesc: 'احصل على أقرب سائق في ثوانٍ، وليس دقائق.',
      trackingTitle: 'تتبّع مباشر',
      trackingDesc: 'تابع رحلتك في الوقت الفعلي من الطلب حتى الوصول.',
      paymentTitle: 'دفع مرن',
      paymentDesc: 'أموال الهاتف، بطاقة، أو نقداً — ادفع بالطريقة التي تناسبك.',
      ratedTitle: 'سائقون مقيّمون',
      ratedDesc: 'سائقون مقيّمون من المجتمع يضمنون الجودة في كل رحلة.',
      scheduleTitle: 'جدولة الرحلات',
      scheduleDesc: 'احجز مسبقاً لرحلات المطار أو الاجتماعات أو الصباح الباكر.',
    },
    rideFlow: {
      eyebrow: 'تجربة أيثيا',
      heading: 'كل رحلة،\nقصة',
      subheading: 'من النقرة إلى الوجهة — شاهد كيف تحوّل أيثيا كل رحلة إلى تجربة سلسة عبر المدن الأفريقية النابضة بالحياة.',
      step: 'خطوة',
      step1Title: 'اطلب رحلتك',
      step1Desc: 'افتح أيثيا، أدخل وجهتك، واختر نوع رحلتك. شاهد السعر مسبقاً قبل التأكيد.',
      step2Title: 'السائق يقبل',
      step2Desc: 'سائق موثّق قريب يقبل طلبك. شاهد اسمه وتقييمه ومركبته ووقت وصوله المقدّر.',
      step3Title: 'الاستلام',
      step3Desc: 'تابع سائقك في الوقت الفعلي أثناء توجهه إلى موقعك. إشعار ينبهك عند وصوله.',
      step4Title: 'استمتع بالرحلة',
      step4Desc: 'استرخِ واستمتع بالرحلة. شارك رحلتك مع أحبائك لراحة البال.',
      step5Title: 'الوصول والتقييم',
      step5Desc: 'اصل بأمان إلى وجهتك. قيّم سائقك وادفع بسلاسة عبر التطبيق.',
    },
    testimonials: {
      eyebrow: 'أصوات أيثيا',
      heading: 'محبوب عبر\nالقارة',
      t1Text: 'أيثيا غيّرت طريقة تنقلي في المدينة. سريعة وآمنة والسائقون دائماً محترفون.',
      t1Name: 'سارة م.',
      t1Location: 'الدار البيضاء، المغرب',
      t2Text: 'كسائق، أيثيا تمنحني دخلاً ثابتاً وتعاملني باحترام. التطبيق بسيط وقوي.',
      t2Name: 'يوسف ب.',
      t2Location: 'الجزائر، الجزائر',
      t3Text: 'أحجز رحلاتي الصباحية في الليلة السابقة. لم أتأخر عن العمل أبداً منذ أن بدأت استخدام أيثيا!',
      t3Name: 'ليلى ع.',
      t3Location: 'تونس، تونس',
      t4Text: 'تكامل أموال الهاتف ثوري. لا حاجة للنقود، كل شيء سلس وشفاف.',
      t4Name: 'أحمد ك.',
      t4Location: 'الرباط، المغرب',
    },
    download: {
      heading: 'مستعد',
      headingAccent: 'للركوب مع أيثيا؟',
      subtext: 'انضم إلى ملايين الركاب والسائقين الذين يحوّلون التنقل عبر أفريقيا. رحلتك القادمة على بُعد نقرة.',
      downloadOn: 'حمّل من',
      appStore: 'آب ستور',
      getItOn: 'احصل عليه من',
      googlePlay: 'جوجل بلاي',
      projectLink: 'عرض مشروع أيثيا على روركّ',
      madeWith: 'صُنع بـ',
      forAfrica: 'لأفريقيا',
      copyright: '2026 أيثيا. ربط المجتمعات الأفريقية، رحلة تلو الأخرى.',
    },
  },
};
