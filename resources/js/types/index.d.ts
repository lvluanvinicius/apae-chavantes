import { breadcrumbs } from '@/data/pt-br';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type LocaleType = 'en' | 'pt-BR';
export type TranslateBreadcrumbType = keyof typeof breadcrumbs;

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface NavSidebarItem {
    title: string;
    href: string;
    icon: LucideIcon;
    isActive: boolean;
}

export interface ImageLinkSrc {
    src: string;
    alt: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    uuid: string;
    name: string;
    email: string;
    permissions: string | null;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    translate: LocaleType;
    [key: string]: unknown; // This allows for additional properties...
}

export type Appearance = 'light' | 'dark' | 'system';

export interface ApiResponse<T> {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        active: boolean;
        label: string;
        url: string;
    }[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
    data: T;
}

export interface ActionsResponse<T> {
    message: string;
    status: boolean;
    type: string;
    data: T;
    errors?: {
        [key: string]: string;
    };
}

export interface PermissionInterface {
    id: number;
    description: string;
    permission: string;
    created_at: null | string;
    updated_at: null | string;
}

export interface PermissionSectionInterface {
    id: number;
    title: string;
    created_at: null | string;
    updated_at: null | string;
    permissions?: PermissionInterface[];
}

export interface GalleryFileInterface {
    id: number;
    uuid: string;
    photo_gallery_id: number;
    width: number;
    height: number;
    filename: string;
    path: string;
    hash: string;
    type_file: string;
    size_file: string;
    created_at: null | string;
    updated_at: null | string;
}

export interface PhotoGalleryInterface {
    id: number;
    uuid: string;
    gallery_name: string;
    gallery_description: string;
    gallery_hash: string;
    gallery_size: string;
    gallery_image: string;
    gallery_format: string;
    created_at: string | null;
    updated_at: string | null;
    files?: GalleryFileInterface[];
}

export type TrashDstType =
    | 'gallery'
    | 'gallery-images'
    | 'transparency'
    | 'transparency-years'
    | 'transparency-folders'
    | 'partners'
    | 'news'
    | 'news_comments'
    | 'contacts'
    | 'complaints';

export interface DataTrashInterface {
    id: number;
    dst_type: TrashDstType;
    content: string;
    deletion_date: Date;
    created_at: string | null;
    updated_at: string | null;
}

export interface SliderInterface {
    id: number;
    uuid: string;
    slider_hash: string;
    slider_images: SliderImageMap;
    slider_active: boolean;
    created_at: string | null;
    updated_at: string | null;
}

export interface SliderImageMap {
    original: string;
    [size: string]: string; // ex: '1920x600', 'mobile-768x'
}

export interface SliderCampaignInterface {
    id: number;
    uuid: string;
    description: string;
    is_running: boolean;
    start_date: string;
    end_date: string;
    created_at: string | null;
    updated_at: string | null;
    sliders: number[] | null;
}
