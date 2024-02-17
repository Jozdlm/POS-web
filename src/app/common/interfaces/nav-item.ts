export interface NavItem {
  path: string;
  placeholder: string;
  children?: NavItem[];
}

export interface NavItemWithIcon extends NavItem {
  icon: string;
}
