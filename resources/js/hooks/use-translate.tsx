import { breadcrumbs } from '@/data/pt-br';
import { LocaleType } from '@/types';

export function useTranslate({ locale }: { locale: LocaleType }) {
    switch (locale) {
        case 'pt-BR':
            return {
                breadcrumbs: breadcrumbs,
            };

        default:
            return {
                breadcrumbs: breadcrumbs,
            };
    }
}
