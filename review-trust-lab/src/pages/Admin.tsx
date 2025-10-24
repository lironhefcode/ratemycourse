import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ReviewCard } from "@/components/ReviewCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";
import { AddCourseForm } from "@/components/AddCourseForm";

const Admin = () => {
  const [filter, setFilter] = useState<"all" | "pending" | "verified">("all");
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: reviewService.getUnVerified,
  });
  if (isLoading) {
    return <div>loading </div>;
  }
  if (isError) {
    return <div>errors </div>;
  }
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8" dir="rtl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">פאנל ניהול</h1>
          <p className="text-muted-foreground">נהל ואמת ביקורות משתמשים</p>
        </div>
        <AddCourseForm />
        <CardContent className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} showActions={true} />
          ))}
          {reviews.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              אין ביקורות להצגה
            </div>
          )}
        </CardContent>
      </main>
    </div>
  );
};

export default Admin;
