import fs from 'fs';
import path from 'path';

export interface TopCategory {
  id: string;
  name: string;
  slug: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  topCategoryId: string;
  order: number;
}

export interface Link {
  id: string;
  title: string;
  slug: string;
  description: string;
  url: string;
  categoryId: string;
  icon: string;
  order: number;
  tutorialUrl?: string;
  applyUrl?: string;
}

const dataDirectory = path.join(process.cwd(), 'data');

export function getTopCategories(): TopCategory[] {
  const filePath = path.join(dataDirectory, 'topCategories.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const topCategories: TopCategory[] = JSON.parse(fileContents);
  return topCategories.sort((a, b) => a.order - b.order);
}

export function getTopCategoryById(id: string): TopCategory | undefined {
  const topCategories = getTopCategories();
  return topCategories.find(tc => tc.id === id);
}

export function getCategories(): Category[] {
  const filePath = path.join(dataDirectory, 'categories.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const categories: Category[] = JSON.parse(fileContents);
  return categories.sort((a, b) => a.order - b.order);
}

export function getCategoriesByTopCategory(topCategoryId: string): Category[] {
  const categories = getCategories();
  return categories.filter(cat => cat.topCategoryId === topCategoryId);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const categories = getCategories();
  return categories.find(cat => cat.slug === slug);
}

export function getLinks(): Link[] {
  const filePath = path.join(dataDirectory, 'links.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const links: Link[] = JSON.parse(fileContents);
  return links.sort((a, b) => a.order - b.order);
}

export function getLinksByCategory(categoryId: string): Link[] {
  const links = getLinks();
  return links.filter(link => link.categoryId === categoryId);
}

export function getLinkBySlug(slug: string): Link | undefined {
  const links = getLinks();
  return links.find(link => link.slug === slug);
}

export function searchLinks(query: string): Link[] {
  const links = getLinks();
  const lowerQuery = query.toLowerCase();
  return links.filter(link => 
    link.title.toLowerCase().includes(lowerQuery) ||
    link.description.toLowerCase().includes(lowerQuery)
  );
}

// 用于管理后台的数据写入函数
export function saveTopCategories(topCategories: TopCategory[]): void {
  const filePath = path.join(dataDirectory, 'topCategories.json');
  fs.writeFileSync(filePath, JSON.stringify(topCategories, null, 2), 'utf8');
}

export function saveCategories(categories: Category[]): void {
  const filePath = path.join(dataDirectory, 'categories.json');
  fs.writeFileSync(filePath, JSON.stringify(categories, null, 2), 'utf8');
}

export function saveLinks(links: Link[]): void {
  const filePath = path.join(dataDirectory, 'links.json');
  fs.writeFileSync(filePath, JSON.stringify(links, null, 2), 'utf8');
}
