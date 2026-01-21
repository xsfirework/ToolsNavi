import { supabase } from './supabase';

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

function mapTopCategory(row: any): TopCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    order: row.order,
  };
}

function mapCategory(row: any): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    topCategoryId: row.top_category_id,
    order: row.order,
  };
}

function mapLink(row: any): Link {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description,
    url: row.url,
    categoryId: row.category_id,
    icon: row.icon,
    order: row.order,
    tutorialUrl: row.tutorial_url || undefined,
    applyUrl: row.apply_url || undefined,
  };
}

export async function getTopCategories(): Promise<TopCategory[]> {
  const { data, error } = await supabase
    .from('top_categories')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(mapTopCategory);
}

export async function getTopCategoryById(id: string): Promise<TopCategory | undefined> {
  const { data, error } = await supabase
    .from('top_categories')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapTopCategory(data) : undefined;
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(mapCategory);
}

export async function getCategoriesByTopCategory(topCategoryId: string): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('top_category_id', topCategoryId)
    .order('order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(mapCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapCategory(data) : undefined;
}

export async function getLinks(): Promise<Link[]> {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .order('order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(mapLink);
}

export async function getLinksByCategory(categoryId: string): Promise<Link[]> {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('category_id', categoryId)
    .order('order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(mapLink);
}

export async function getLinkBySlug(slug: string): Promise<Link | undefined> {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data ? mapLink(data) : undefined;
}

export async function searchLinks(query: string): Promise<Link[]> {
  const like = `%${query}%`;
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .or(`title.ilike.${like},description.ilike.${like}`)
    .order('order', { ascending: true });

  if (error) {
    throw error;
  }

  return (data || []).map(mapLink);
}

// ===== 写入：分类 =====

export async function insertCategory(category: Category): Promise<void> {
  const { error } = await supabase.from('categories').insert({
    id: category.id,
    name: category.name,
    slug: category.slug,
    top_category_id: category.topCategoryId,
    order: category.order,
  });
  if (error) throw error;
}

export async function updateCategory(category: Category): Promise<void> {
  const { error } = await supabase
    .from('categories')
    .update({
      name: category.name,
      slug: category.slug,
      top_category_id: category.topCategoryId,
      order: category.order,
    })
    .eq('id', category.id);

  if (error) throw error;
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
}

// ===== 写入：链接 =====

export async function insertLink(link: Link): Promise<void> {
  const { error } = await supabase.from('links').insert({
    id: link.id,
    title: link.title,
    slug: link.slug,
    description: link.description,
    url: link.url,
    category_id: link.categoryId,
    icon: link.icon,
    order: link.order,
    tutorial_url: link.tutorialUrl ?? null,
    apply_url: link.applyUrl ?? null,
  });
  if (error) throw error;
}

export async function updateLink(link: Link): Promise<void> {
  const { error } = await supabase
    .from('links')
    .update({
      title: link.title,
      slug: link.slug,
      description: link.description,
      url: link.url,
      category_id: link.categoryId,
      icon: link.icon,
      order: link.order,
      tutorial_url: link.tutorialUrl ?? null,
      apply_url: link.applyUrl ?? null,
    })
    .eq('id', link.id);

  if (error) throw error;
}

export async function deleteLink(id: string): Promise<void> {
  const { error } = await supabase.from('links').delete().eq('id', id);
  if (error) throw error;
}
