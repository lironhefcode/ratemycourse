import { Navbar } from "@/components/Navbar";
import { CourseCard } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { ShieldCheck, Users, Star, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { authService } from "@/services/auth.service";
import { useLogin } from "@/hooks/use-login";
import { mockCourses } from "@/data/mockData";
const Index = () => {
  const featuredCourses = mockCourses.slice(0, 3);
  const login = useLogin();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full mb-6">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm font-medium">
                ביקורות אמיתיות ממשתמשים אמיתיים
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              הפלטפורמה המהימנה
              <br />
              לביקורות קורסים
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              קרא ביקורות אמיתיות ממשתמשים שרכשו את הקורסים. כל ביקורת נבדקת
              ומאומתת על ידי הצוות שלנו.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg" asChild>
                <Link to="/courses">
                  <Search className="ml-2 h-5 w-5" />
                  עיין בקורסים
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <Link to="/profile">כתוב ביקורת</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                {mockCourses.length}+
              </div>
              <div className="text-muted-foreground">קורסים נסקרו</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">600+</div>
              <div className="text-muted-foreground">ביקורות מאומתות</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-muted-foreground">שביעות רצון</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              למה לבחור בנו?
            </h2>
            <p className="text-muted-foreground text-lg">
              הפלטפורמה המובילה לביקורות קורסים מקצועיות
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="bg-success/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">ביקורות מאומתות</h3>
                <p className="text-muted-foreground">
                  כל ביקורת נבדקת על ידי הצוות שלנו כדי להבטיח אותנטיות
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">קהילה פעילה</h3>
                <p className="text-muted-foreground">
                  הצטרף לאלפי משתמשים שמשתפים את החוויות שלהם
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="bg-warning/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-warning" />
                </div>
                <h3 className="text-xl font-bold mb-2">דירוגים אמינים</h3>
                <p className="text-muted-foreground">
                  מערכת דירוגים שקופה ואובייקטיבית לכל קורס
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-muted/50" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">קורסים מומלצים</h2>
              <p className="text-muted-foreground">
                הקורסים המדורגים ביותר שלנו
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/courses">צפה בכל הקורסים</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" dir="rtl">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                מוכן להצטרף?
              </h2>
              <p className="text-lg mb-8 opacity-90">
                התחבר עם Google ותתחיל לכתוב ביקורות כבר היום
              </p>
              <Button
                onClick={() => login()}
                size="lg"
                variant="secondary"
                className="text-lg"
              >
                <Users className="ml-2 h-5 w-5" />
                התחבר עם Google
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
