export interface Course {
  _id: string;
  title: string;
  courseCreator: string;
  category: string;
  description: string;
  imgUrl: string;
  reviewAvg: number;
  reviewCount: number;
  price: string;
}

export interface Review {
  _id: string;
  courseId: string;
  byUser: string;
  rating: number;
  description: string;
  proofUrl?: string;
  isVerified: boolean;
  createdAt: string;
}

export const mockCourses: Course[] = [
  {
    _id: "1",
    title: "קורס Python המלא - מתחיל ועד מתקדם",
    courseCreator: "ד״ר יוסי כהן",
    category: "תכנות",
    description:
      "למד Python מאפס ועד רמה מקצועית. כולל פרויקטים מעשיים ותרגול מעמיק.",
    imgUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
    reviewAvg: 4.7,
    reviewCount: 156,
    price: "₪349",
  },
  {
    _id: "2",
    title: "עיצוב UI/UX - המדריך המקיף",
    courseCreator: "שרה לוי",
    category: "עיצוב",
    description:
      "קורס מעמיק בעיצוב ממשקים וחוויית משתמש. למד את העקרונות והכלים המובילים.",
    imgUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    reviewAvg: 4.9,
    reviewCount: 203,
    price: "₪499",
  },
  {
    _id: "3",
    title: "שיווק דיגיטלי 2024",
    courseCreator: "מיכאל דהן",
    category: "שיווק",
    description:
      "אסטרטגיות שיווק דיגיטלי מתקדמות. SEO, תוכן, רשתות חברתיות ופרסום ממומן.",
    imgUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    reviewAvg: 4.5,
    reviewCount: 89,
    price: "₪399",
  },
  {
    _id: "4",
    title: "React & Next.js - פיתוח Full Stack",
    courseCreator: "רועי אברהם",
    category: "פיתוח Web",
    description:
      "בנה אפליקציות web מודרניות עם React, Next.js, TypeScript ו-Tailwind CSS.",
    imgUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    reviewAvg: 4.8,
    reviewCount: 178,
    price: "₪449",
  },
  {
    _id: "5",
    title: "ניהול פרויקטים Agile & Scrum",
    courseCreator: "דנה רוזנברג",
    category: "ניהול",
    description:
      "מתודולוגיות Agile, Scrum, ו-Kanban. הכנה לבחינה לתעודת Scrum Master.",
    imgUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    reviewAvg: 4.6,
    reviewCount: 124,
    price: "₪549",
  },
  {
    _id: "6",
    title: "Machine Learning עם TensorFlow",
    courseCreator: "פרופ׳ אבי גולדשטיין",
    category: "בינה מלאכותית",
    description:
      "למד Machine Learning ו-Deep Learning עם TensorFlow. פרויקטים מעשיים.",
    imgUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800",
    reviewAvg: 4.9,
    reviewCount: 267,
    price: "₪599",
  },
];
