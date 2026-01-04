export type BreadcrumbItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: string | React.ReactElement;
};
