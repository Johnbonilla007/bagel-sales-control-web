import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import { AddShoppingCart } from '@material-ui/icons';

export const pages = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon />
  },
  {
    title: 'Registro de Ventas',
    href: '/sales/register',
    icon: <PeopleIcon />
  },
  {
    title: 'Ventas',
    href: '/sales',
    icon: <PeopleIcon />
  },
  {
    title: 'Productos',
    href: '/products',
    icon: <PeopleIcon />
  },
  {
    title: 'Registro de Producto',
    href: '/products/register',
    icon: <AddShoppingCart />
  }
];
