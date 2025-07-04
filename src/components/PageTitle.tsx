import React from "react";
import { Link } from "react-router-dom";

interface Breadcrumb {
  label: string;
  to?: string;
}

interface ActionButton {
  label: string;
  to: string;
  icon?: React.ReactNode;
}

interface PageTitleProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  actionButton?: ActionButton;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumbs = [], actionButton }) => {
  const renderBreadcrumbs = () => {
    if (!breadcrumbs.length) return null;

    return (
      <nav aria-label="breadcrumb" className="text-sm text-label dark:text-labelDark mt-1">
        <ol className="list-none p-0 inline-flex space-x-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={index} className="flex items-center">
              {breadcrumb.to ? (
                <Link
                  to={breadcrumb.to}
                  className="text-primary dark:text-primaryDark hover:underline"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    );
  };

  return (
    <div className="flex items-center justify-between mb-12">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {renderBreadcrumbs()}
      </div>
      {actionButton && (
        <Link
          to={actionButton.to}
          className="flex items-center gap-2 px-4 py-2w-full py-2 bg-primary dark:bg-primaryDark text-white font-medium rounded-md hover:bg-primaryHover dark:hover:bg-primaryDarkHover transition"
        >
          {actionButton.icon}
          {actionButton.label}
        </Link>
      )}
    </div>
  );
};

export default PageTitle;
