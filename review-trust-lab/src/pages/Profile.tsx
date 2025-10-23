import { Navbar } from "@/components/Navbar";
import { ReviewCard } from "@/components/ReviewCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockReviews } from "@/data/mockData";
import { ShieldCheck, Star } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8" dir="rtl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alon" />
                    <AvatarFallback>א״מ</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">אלון מזרחי</h2>
                  <p className="text-muted-foreground">alon@example.com</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">ביקורות</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">מאומתות</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">דירוג ממוצע</span>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">סטטוס</span>
                    <Badge
                      variant="default"
                      className="gap-1 bg-success hover:bg-success/90"
                    >
                      <ShieldCheck className="h-3 w-3" />
                      מאומת
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>הביקורות שלי</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4"></CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
