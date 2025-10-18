import { useEffect, useState } from 'react';

export const useChangeScreen = () => {
    const [screen, setScreen] = useState<{ width: number; height: number }>({ height: 0, width: 0 });

    useEffect(() => {
        if (window) {
            const windowChange = () => {
                setScreen({
                    height: window.innerHeight,
                    width: window.innerWidth,
                });
            };

            window.addEventListener('resize', windowChange);
        }
    }, []);

    return { screen };
};
