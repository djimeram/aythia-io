import { Language } from '@/constants/translations';

interface ImageSet {
  hero: string;
  stepRequest: string;
  stepAccept: string;
  stepPickup: string;
  stepJourney: string;
  stepArrival: string;
}

const subSaharanImages: ImageSet = {
  hero: 'https://r2-pub.rork.com/generated-images/807062cd-cf2f-4345-abe9-ffd56279b48f.png',
  stepRequest: 'https://r2-pub.rork.com/generated-images/15a0d991-6600-487d-b8e2-4db94b535a52.png',
  stepAccept: 'https://r2-pub.rork.com/generated-images/11e88c6d-0fe0-4c80-a555-461868b4ab7c.png',
  stepPickup: 'https://r2-pub.rork.com/generated-images/a20f80c9-649b-49f8-83ca-a7e9cd5e7079.png',
  stepJourney: 'https://r2-pub.rork.com/generated-images/29c666cc-b222-4a9a-bef7-14ffdfa3a9bb.png',
  stepArrival: 'https://r2-pub.rork.com/generated-images/0b80d564-98e3-48c3-aba6-f2271c4818be.png',
};

const northAfricanImages: ImageSet = {
  hero: 'https://r2-pub.rork.com/generated-images/efbc6412-7c0b-4318-9649-7b9311f4e153.png',
  stepRequest: 'https://r2-pub.rork.com/generated-images/952ff115-46e5-4fd5-b93c-280f9d22d580.png',
  stepAccept: 'https://r2-pub.rork.com/generated-images/7c45595c-9caa-405a-b96e-96055ea5b2f8.png',
  stepPickup: 'https://r2-pub.rork.com/generated-images/197820f4-9703-446b-8f31-f3cf46c65eba.png',
  stepJourney: 'https://r2-pub.rork.com/generated-images/018db037-e7bc-4f3d-b9bc-40e1cb55df3c.png',
  stepArrival: 'https://r2-pub.rork.com/generated-images/8c7c9c92-4f5e-4aa9-b077-1bde234e4a08.png',
};

const imagesByLanguage: Record<Language, ImageSet> = {
  en: subSaharanImages,
  fr: subSaharanImages,
  ar: northAfricanImages,
};

export function getImages(language: Language): ImageSet {
  return imagesByLanguage[language];
}

export type { ImageSet };
