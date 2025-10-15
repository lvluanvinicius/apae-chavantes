import { Head } from '@inertiajs/react';
import { MailIcon } from 'lucide-react';
import { ChangeTheme } from './change-theme';
import { SearchBox } from './search-box';

export const Header = ({ pageTitle }: { pageTitle?: string }) => {
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>

            <header className="w-full">
                <div className="w-full bg-apae-primary py-4 dark:bg-secondary">
                    <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-2 text-white">
                            <MailIcon />
                            <span className="text-sm">contato@apaechavantes.org.br</span>
                        </div>

                        <div className="flex w-full items-center justify-center gap-2 md:w-auto">
                            <SearchBox />
                            <ChangeTheme />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
