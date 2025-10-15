import { useAppearance } from '@/hooks/use-appearance';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '../ui/button';

export const ChangeTheme = () => {
    const { appearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        if (appearance === 'dark') {
            updateAppearance('light');
            return;
        }

        if (appearance === 'light') {
            updateAppearance('dark');
            return;
        }

        if (appearance === 'system') {
            updateAppearance('light');
            return;
        }

        updateAppearance('system');
    };

    return (
        <Button size={'icon'} className="cursor-pointer border bg-transparent dark:bg-background" onClick={toggleTheme}>
            {appearance === 'dark' ? <SunIcon /> : <MoonIcon />}
        </Button>
    );
};
