import { NavItemWithIcon } from '@app/common/interfaces/nav-item';

export const NAVIGATION_LINKS: NavItemWithIcon[] = [
  {
    path: '',
    placeholder: 'Inicio',
    icon: 'house-door-fill',
  },
  {
    path: '/quotations',
    placeholder: 'Cotizaciones',
    icon: 'wallet-fill',
    children: [
      {
        path: 'schools',
        placeholder: 'Centros Educativos',
      },
      {
        path: 'school-grades',
        placeholder: 'Grados Académicos',
      },
    ],
  },
  {
    path: '/products',
    placeholder: 'Productos',
    icon: 'bag-fill',
    children: [
      {
        path: 'categories',
        placeholder: 'Categorías',
      },
    ],
  },
  {
    path: '/categories',
    placeholder: 'Categorías',
    icon: 'tags-fill',
  },
  {
    path: '/schools',
    placeholder: 'Centros Educativos',
    icon: 'bank2',
  },
  {
    path: '/school-grades',
    placeholder: 'Grados Académicos',
    icon: 'bar-chart-fill',
  },
];
