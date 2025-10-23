import { useState } from "react";
import { Button } from "./ui/button";
import { ReviewForm } from "./ReviewForm";

export function ReviewFormContainer(){
    const [showForm, setShowForm] = useState(false);


    return (
        {showForm  (
            <>
              <Button onClick={() => setShowForm(!showForm)}>
                {" "}
                סגור ביקורת -
              </Button>
              {userReview ? (
                <p className="text-muted-foreground leading-relaxed">
                  כבר הוספת ביקורת לקורס זה
                </p>
              ) : (
                <ReviewForm setReviews={setReviews} courseId={course._id} />
              )}
            </>
          ) : (
            <Button onClick={() => setShowForm(!showForm)}>
              {" "}
              הוסף ביקורת +
            </Button>
          )}
    )
}