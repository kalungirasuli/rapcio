import React from "react";

interface FooterProps {
  className?: string; // Optional className for additional styles
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={`text-textColor dark:text-textColorDark text-xs ${className || ""}`}>
      &copy; {new Date().getFullYear()} RAPCIO. All rights reserved.
    </footer>
  );
};

export default Footer;
