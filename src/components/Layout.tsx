import React from "react";
import { SocialSidebar } from "./SocialSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <main className="relative flex flex-col min-h-screen">
        {children}
        <SocialSidebar />
      </main>
    </div>
  );
};
