import React, { useState } from 'react';
import Category from '@/components/category';

const collections = [
  {
    id: 25,
    name: 'Game',
    slug: '',
    status: 1,
    sort: 12,
    parent_id: 0,
    child: null,
  },
  {
    id: 14,
    name: 'Art',
    slug: '',
    status: 1,
    sort: 11,
    parent_id: 0,
    child: null,
  },
  {
    id: 21,
    name: 'Defi',
    slug: '',
    status: 1,
    sort: 8,
    parent_id: 0,
    child: null,
  },
  {
    id: 20,
    name: 'Utility',
    slug: '',
    status: 1,
    sort: 7,
    parent_id: 0,
    child: null,
  },
  {
    id: 19,
    name: 'Collectibles',
    slug: '',
    status: 1,
    sort: 6,
    parent_id: 0,
    child: null,
  },
  {
    id: 18,
    name: 'Trading Cards',
    slug: '',
    status: 1,
    sort: 5,
    parent_id: 0,
    child: null,
  },
  {
    id: 17,
    name: 'Virtual Worlds',
    slug: '',
    status: 1,
    sort: 4,
    parent_id: 0,
    child: null,
  },
  {
    id: 16,
    name: 'Domain Names',
    slug: '',
    status: 1,
    sort: 3,
    parent_id: 0,
    child: null,
  },
];

export default () => {
  return <Category.Market collections={collections} />;
};
