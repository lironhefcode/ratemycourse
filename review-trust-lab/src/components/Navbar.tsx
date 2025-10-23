import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, User, LogOut } from "lucide-react";
import { useLogin } from "@/hooks/use-login";
import { useAuth } from "@/providers/auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const Navbar = () => {
  const location = useLocation();
  const login = useLogin();
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="border-b bg-card sticky top-0 z-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <ShieldCheck className="h-6 w-6 text-success" />
            <span>ביקורות אמיתיות</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/courses"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/courses") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              הקורסים שלנו
            </Link>
            <Link
              to="/profile"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/profile") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              הפרופיל שלי
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/admin") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              ניהול
            </Link>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                  מנהל
                </span>
              )}
              <Button onClick={logout} variant="secondary" className="gap-2">
                <LogOut className="h-4 w-4" />
                יציאה
              </Button>
            </div>
          ) : (
            <Button onClick={() => login()} variant="default" className="gap-2">
              <User className="h-4 w-4" />
              התחבר עם Google
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
