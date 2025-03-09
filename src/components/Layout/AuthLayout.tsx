
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  backLink?: {
    label: string;
    to: string;
  };
}

const AuthLayout = ({ children, title, subtitle, backLink }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-moneywise-600">
              MoneyWise
            </h1>
          </Link>
        </div>
        
        <div className="glass-effect rounded-xl p-8 w-full">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
          
          {children}
          
          {backLink && (
            <div className="mt-6 text-center">
              <Link to={backLink.to} className="text-sm text-muted-foreground hover:text-primary link-underline">
                {backLink.label}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
