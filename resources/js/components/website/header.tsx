import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Head, Link } from '@inertiajs/react';
import { MailIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { SearchBox } from './search-box';

const MENU_DEFAULT_ITENS = [
    {
        id: 1,
        href: route('website.home.index'),
        title: 'Início',
    },
    {
        id: 2,
        href: route('website.transparencia.index'),
        title: 'Transparência',
    },
    {
        id: 3,
        href: route('website.photo-gallery.index'),
        title: 'Galeria de Fotos',
    },
    {
        id: 4,
        href: route('website.home.index'),
        title: 'Ouvidoria',
    },
    {
        id: 5,
        href: route('website.home.index'),
        title: 'Contato',
    },
];

export const Header = ({ pageTitle }: { pageTitle?: string }) => {
    const { appearance, updateAppearance } = useAppearance();
    const [logo, setLogo] = useState(appearance === 'dark' ? 'setting/logo-branca.webp' : 'setting/logo-preta.webp');

    const toggleTheme = () => {
        if (appearance === 'dark') {
            setLogo('setting/logo-preta.webp');
            updateAppearance('light');

            return;
        }

        if (appearance === 'light') {
            updateAppearance('dark');
            setLogo('setting/logo-branca.webp');
            return;
        }

        if (appearance === 'system') {
            setLogo('setting/logo-preta.webp');
            updateAppearance('light');
            return;
        }

        updateAppearance('system');
    };

    useEffect(() => {
        if (appearance === 'dark') {
            setLogo('setting/logo-branca.webp');
        } else {
            setLogo('setting/logo-preta.webp');
        }
    }, [appearance]);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <header className="w-full">
                <div className="w-full bg-apae-primary py-4 dark:bg-sidebar">
                    <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2 text-white">
                            <MailIcon />
                            <span className="text-sm">contato@apaechavantes.org.br</span>
                        </div>

                        <div className="flex w-full items-center justify-center gap-2 sm:justify-end md:w-auto">
                            <SearchBox />
                            {/* <ChangeTheme /> */}

                            <Button size={'icon'} className="cursor-pointer border bg-transparent dark:bg-background" onClick={toggleTheme}>
                                {appearance === 'dark' ? <SunIcon /> : <MoonIcon />}
                            </Button>
                        </div>
                    </div>
                </div>

                <nav className="h-[6rem] w-full bg-white px-4 sm:px-0 dark:bg-secondary">
                    <div className="container mx-auto flex h-full items-center">
                        <div className="h-[4rem] w-[9rem] md:h-[4.62rem] md:w-[10rem]">
                            <img src={route('storage.local', [logo])} className="h-full w-full" />
                        </div>

                        <nav className="flex h-full flex-1 items-center justify-end gap-4">
                            <ul className="hidden h-full items-center text-sm lg:flex lg:text-[1rem]">
                                {MENU_DEFAULT_ITENS.map((item) => (
                                    <Link href={item.href} key={item.id} className="h-full">
                                        <li
                                            className={cn(
                                                'flex h-full items-center border-b-4 border-transparent px-4',
                                                'hover:border-apae-variant',
                                                'font-semibold transition-all duration-700',
                                            )}
                                        >
                                            {item.title}
                                        </li>
                                    </Link>
                                ))}
                            </ul>

                            <Button className="h-11 cursor-pointer bg-apae-variant" size={'lg'}>
                                Doar Agora
                            </Button>
                        </nav>
                    </div>
                </nav>
            </header>
        </>
    );
};
