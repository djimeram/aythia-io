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
    privacyPolicy: string;
  };
  privacy: {
    title: string;
    updated: string;
    intro: string;
    sections: { title: string; body: string }[];
    back: string;
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
      privacyPolicy: 'Privacy Policy',
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: April 16, 2026',
      intro: 'At Aythia, your privacy is fundamental to the trust you place in us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use the Aythia ride-hailing application, website, and related services across Africa.',
      sections: [
        { title: '1. Information We Collect', body: 'We collect information you provide directly (name, phone number, email, profile photo, payment details, emergency contacts), information generated when you use Aythia (pickup and drop-off locations, routes, ride history, ratings, in-app messages, device identifiers), and information from third parties (mobile money providers, identity verification partners, and background check services for drivers).' },
        { title: '2. Location Data', body: 'Aythia is a location-based service. We collect precise GPS location from riders and drivers before, during, and in some cases after a trip to match you with nearby drivers, provide turn-by-turn navigation, calculate fares, enable live trip sharing, and improve safety. You can disable background location at any time from your device settings, though some features will stop working.' },
        { title: '3. How We Use Your Information', body: 'We use your information to connect riders and drivers, process payments, provide customer support, prevent fraud, verify identities, ensure safety, send service and trip notifications, comply with legal obligations, and improve our products. We never sell your personal data.' },
        { title: '4. Payments and Mobile Money', body: 'When you pay with mobile money, card, or cash, we share the minimum information necessary with payment processors (for example Orange Money, MTN MoMo, Wave, Moov, Visa, Mastercard) to complete the transaction. Full card numbers are never stored on our servers.' },
        { title: '5. Sharing Your Information', body: 'We share limited information with the driver or rider you are matched with (first name, rating, photo, vehicle details, pickup location). We may share information with trusted service providers, law enforcement when legally required, and insurance partners in case of an incident. We may share anonymized, aggregated data with city authorities to improve urban mobility.' },
        { title: '6. Safety Features', body: 'Trip details (route, driver, ETA) can be shared with your trusted contacts through our Share Trip feature. In case of an emergency, relevant trip data may be provided to local emergency services or authorities.' },
        { title: '7. Data Retention', body: 'We retain account and trip data for as long as your account is active and for a reasonable period afterwards to comply with legal, tax, accounting, and safety obligations. You may request deletion of your account at any time.' },
        { title: '8. Your Rights', body: 'Subject to applicable laws (including GDPR where relevant), you have the right to access, correct, delete, or export your personal data, object to certain processing, and withdraw consent. To exercise these rights, contact us at privacy@aythia.app.' },
        { title: '9. Children', body: 'Aythia is not intended for users under the age of 18. Minors must be accompanied by a consenting adult. We do not knowingly collect data from children.' },
        { title: '10. Security', body: 'We use industry-standard encryption in transit (TLS) and at rest, secure data centers, strict access controls, and continuous monitoring to protect your information. No system is perfectly secure, but we work hard to keep your data safe.' },
        { title: '11. International Transfers', body: 'Aythia operates across multiple African countries. Your data may be processed in countries other than your own, always with safeguards that meet applicable data protection laws.' },
        { title: '12. Changes to This Policy', body: 'We may update this Privacy Policy as our services evolve. We will notify you of significant changes through the app or by email. Continued use of Aythia after changes means you accept the updated policy.' },
        { title: '13. Contact Us', body: 'Questions about this policy or your data? Email privacy@aythia.app or write to the Aythia Data Protection Officer at our registered address. We reply within 30 days.' },
      ],
      back: 'Back to home',
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
      privacyPolicy: 'Politique de confidentialite',
    },
    privacy: {
      title: 'Politique de confidentialite',
      updated: 'Derniere mise a jour : 16 avril 2026',
      intro: "Chez Aythia, votre vie privee est au coeur de la confiance que vous nous accordez. Cette Politique de confidentialite explique comment nous collectons, utilisons, partageons et protegeons vos donnees personnelles lorsque vous utilisez l'application Aythia, notre site web et nos services de VTC a travers l'Afrique.",
      sections: [
        { title: '1. Informations que nous collectons', body: "Nous collectons les informations que vous fournissez directement (nom, numero de telephone, email, photo de profil, coordonnees de paiement, contacts d'urgence), les informations generees lors de l'utilisation d'Aythia (lieux de prise en charge et de depose, itineraires, historique des courses, evaluations, messages in-app, identifiants d'appareil), et les informations provenant de tiers (operateurs mobile money, partenaires de verification d'identite, verifications d'antecedents pour les chauffeurs)." },
        { title: '2. Donnees de localisation', body: "Aythia est un service base sur la localisation. Nous collectons votre position GPS precise (passagers et chauffeurs) avant, pendant et parfois apres un trajet afin de vous mettre en relation avec les chauffeurs proches, fournir la navigation, calculer les tarifs, activer le partage de trajet en direct et ameliorer la securite. Vous pouvez desactiver la localisation en arriere-plan a tout moment dans les parametres de votre appareil." },
        { title: '3. Utilisation de vos informations', body: 'Nous utilisons vos donnees pour connecter passagers et chauffeurs, traiter les paiements, assurer le support client, prevenir la fraude, verifier les identites, garantir la securite, envoyer des notifications liees au service et au trajet, respecter nos obligations legales et ameliorer nos produits. Nous ne vendons jamais vos donnees personnelles.' },
        { title: '4. Paiements et mobile money', body: 'Lorsque vous payez par mobile money, carte ou especes, nous partageons le minimum d\'informations necessaires avec les prestataires de paiement (par exemple Orange Money, MTN MoMo, Wave, Moov, Visa, Mastercard) pour finaliser la transaction. Les numeros de carte complets ne sont jamais stockes sur nos serveurs.' },
        { title: '5. Partage de vos informations', body: 'Nous partageons des informations limitees avec le chauffeur ou le passager qui vous est assigne (prenom, note, photo, details du vehicule, lieu de prise en charge). Nous pouvons partager des donnees avec des prestataires de confiance, les autorites lorsque la loi l\'exige, et nos partenaires d\'assurance en cas d\'incident. Nous pouvons partager des donnees anonymisees et agregees avec les autorites urbaines pour ameliorer la mobilite.' },
        { title: '6. Fonctionnalites de securite', body: "Les details du trajet (itineraire, chauffeur, heure d'arrivee) peuvent etre partages avec vos contacts de confiance via la fonction Partager le trajet. En cas d'urgence, les donnees pertinentes du trajet peuvent etre transmises aux services d'urgence ou aux autorites locales." },
        { title: '7. Conservation des donnees', body: 'Nous conservons vos donnees de compte et de trajet aussi longtemps que votre compte est actif et pendant une periode raisonnable par la suite afin de respecter nos obligations legales, fiscales, comptables et de securite. Vous pouvez demander la suppression de votre compte a tout moment.' },
        { title: '8. Vos droits', body: "Conformement aux lois applicables (notamment le RGPD le cas echeant), vous disposez d'un droit d'acces, de rectification, de suppression, de portabilite de vos donnees, d'opposition a certains traitements et de retrait du consentement. Pour exercer ces droits, contactez-nous a privacy@aythia.app." },
        { title: '9. Enfants', body: "Aythia n'est pas destine aux utilisateurs de moins de 18 ans. Les mineurs doivent etre accompagnes d'un adulte consentant. Nous ne collectons pas sciemment de donnees d'enfants." },
        { title: '10. Securite', body: 'Nous utilisons un chiffrement standard en transit (TLS) et au repos, des centres de donnees securises, des controles d\'acces stricts et une surveillance continue pour proteger vos informations. Aucun systeme n\'est parfaitement sur, mais nous travaillons dur pour proteger vos donnees.' },
        { title: '11. Transferts internationaux', body: 'Aythia opere dans plusieurs pays africains. Vos donnees peuvent etre traitees dans des pays autres que le votre, toujours avec des garanties conformes aux lois applicables en matiere de protection des donnees.' },
        { title: '12. Modifications de cette politique', body: "Nous pouvons mettre a jour cette politique au fur et a mesure de l'evolution de nos services. Nous vous informerons des changements importants via l'application ou par email. L'utilisation continue d'Aythia apres modification vaut acceptation." },
        { title: '13. Nous contacter', body: "Des questions sur cette politique ou vos donnees ? Ecrivez a privacy@aythia.app ou contactez le Delegue a la protection des donnees d'Aythia a notre adresse officielle. Nous repondons sous 30 jours." },
      ],
      back: "Retour a l'accueil",
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
      privacyPolicy: 'سياسة الخصوصية',
    },
    privacy: {
      title: 'سياسة الخصوصية',
      updated: 'آخر تحديث: 16 أبريل 2026',
      intro: 'في أيثيا، خصوصيتك أساس الثقة التي تمنحنا إياها. توضح هذه السياسة كيف نجمع معلوماتك الشخصية ونستخدمها ونشاركها ونحميها عند استخدامك لتطبيق أيثيا وموقعه الإلكتروني والخدمات المرتبطة به في أنحاء أفريقيا.',
      sections: [
        { title: '1. المعلومات التي نجمعها', body: 'نجمع المعلومات التي تقدمها مباشرة (الاسم، رقم الهاتف، البريد الإلكتروني، صورة الملف الشخصي، تفاصيل الدفع، جهات الاتصال في حالات الطوارئ)، والمعلومات الناتجة عن استخدامك لأيثيا (أماكن الانطلاق والوصول، المسارات، سجل الرحلات، التقييمات، الرسائل داخل التطبيق، معرّفات الجهاز)، والمعلومات من جهات خارجية (مشغلو المحفظة الإلكترونية، شركاء التحقق من الهوية، فحوصات السجلات للسائقين).' },
        { title: '2. بيانات الموقع', body: 'أيثيا خدمة تعتمد على الموقع. نجمع موقع GPS الدقيق من الركاب والسائقين قبل الرحلة وأثناءها وأحياناً بعدها لربطك بأقرب سائق، وتوفير الملاحة، وحساب الأجرة، وتفعيل مشاركة الرحلة المباشرة، وتعزيز السلامة. يمكنك تعطيل الموقع في الخلفية في أي وقت من إعدادات جهازك.' },
        { title: '3. كيف نستخدم معلوماتك', body: 'نستخدم معلوماتك لربط الركاب بالسائقين، ومعالجة المدفوعات، وتقديم الدعم، ومنع الاحتيال، والتحقق من الهويات، وضمان السلامة، وإرسال إشعارات الخدمة والرحلة، والامتثال للالتزامات القانونية، وتحسين منتجاتنا. لا نبيع بياناتك الشخصية أبداً.' },
        { title: '4. المدفوعات والمحفظة الإلكترونية', body: 'عند الدفع عبر المحفظة الإلكترونية أو البطاقة أو نقداً، نشارك الحد الأدنى من المعلومات مع معالجي الدفع (مثل Orange Money وMTN MoMo وWave وMoov وVisa وMastercard) لإتمام المعاملة. لا يتم تخزين أرقام البطاقات كاملةً على خوادمنا.' },
        { title: '5. مشاركة معلوماتك', body: 'نشارك معلومات محدودة مع السائق أو الراكب الذي تمت مطابقتك معه (الاسم الأول، التقييم، الصورة، تفاصيل المركبة، مكان الانطلاق). قد نشارك بيانات مع مزودي خدمات موثوقين، أو مع جهات إنفاذ القانون عند الاقتضاء، أو مع شركاء التأمين في حال وقوع حادث. وقد نشارك بيانات مجهولة الهوية ومجمّعة مع السلطات لتحسين التنقل الحضري.' },
        { title: '6. ميزات السلامة', body: 'يمكن مشاركة تفاصيل الرحلة (المسار، السائق، وقت الوصول) مع جهات اتصالك الموثوقة عبر ميزة مشاركة الرحلة. في حالات الطوارئ، قد تُقدَّم بيانات الرحلة ذات الصلة لخدمات الطوارئ أو السلطات المحلية.' },
        { title: '7. الاحتفاظ بالبيانات', body: 'نحتفظ ببيانات الحساب والرحلات طالما أن حسابك نشط ولفترة معقولة بعد ذلك للامتثال للالتزامات القانونية والضريبية والمحاسبية وسلامة المستخدمين. يمكنك طلب حذف حسابك في أي وقت.' },
        { title: '8. حقوقك', body: 'وفقاً للقوانين المعمول بها (بما في ذلك GDPR عند الاقتضاء)، لديك الحق في الوصول إلى بياناتك وتصحيحها وحذفها ونقلها، والاعتراض على بعض المعالجة، وسحب الموافقة. لممارسة هذه الحقوق تواصل معنا على privacy@aythia.app.' },
        { title: '9. الأطفال', body: 'أيثيا غير مخصص للمستخدمين دون 18 عاماً. يجب أن يكون القاصرون برفقة بالغ موافق. نحن لا نجمع بيانات الأطفال عن علم.' },
        { title: '10. الأمان', body: 'نستخدم التشفير وفق المعايير الصناعية أثناء النقل (TLS) وأثناء التخزين، ومراكز بيانات آمنة، وضوابط وصول صارمة، ومراقبة مستمرة لحماية معلوماتك. لا يوجد نظام آمن تماماً، لكننا نعمل جاهدين لحماية بياناتك.' },
        { title: '11. النقل الدولي للبيانات', body: 'تعمل أيثيا في عدة دول أفريقية. قد تتم معالجة بياناتك في دول أخرى غير بلدك، دائماً بضمانات تلبي قوانين حماية البيانات المعمول بها.' },
        { title: '12. التغييرات على هذه السياسة', body: 'قد نحدّث هذه السياسة مع تطور خدماتنا. سنعلمك بالتغييرات الجوهرية عبر التطبيق أو بالبريد الإلكتروني. يُعدّ استمرار استخدامك لأيثيا بعد التحديث قبولاً للسياسة المحدّثة.' },
        { title: '13. تواصل معنا', body: 'أسئلة حول هذه السياسة أو بياناتك؟ راسلنا على privacy@aythia.app أو اتصل بمسؤول حماية البيانات في أيثيا على عنواننا الرسمي. نرد خلال 30 يوماً.' },
      ],
      back: 'العودة إلى الصفحة الرئيسية',
    },
  },
};
