import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

declare module 'react-photo-album' {
    export interface Photo {
        id: number;
    }
}
