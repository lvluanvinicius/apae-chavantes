// Importe os componentes e módulos do Swiper
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Importe os estilos essenciais do Swiper
import { useChangeScreen } from '@/hooks/use-change-screen';
import { SliderInterface } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Carousel = () => {
    const { sliders } = usePage<{ sliders: SliderInterface[] }>().props;
    const { screen } = useChangeScreen();
    const [sliderScreen, setSliderScreen] = useState<string>('1920x600');

    useEffect(() => {
        if (screen.width <= 768) {
            setSliderScreen('mobile-768x');
        } else if (screen.width > 768 && screen.width <= 1024) {
            setSliderScreen('1024x300');
        } else if (screen.width > 1024) {
            setSliderScreen('1920x600');
        } else {
            setSliderScreen('original');
        }
    }, [screen]);

    return (
        <div className="h-[70vh]">
            <Swiper
                // Instala os módulos que vamos usar
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                // Configurações do carrossel
                spaceBetween={30}
                slidesPerView={1} // Apenas um slide visível por vez
                loop={true} // Habilita o loop infinito
                effect="fade" // Ativa o efeito de transição por fade
                // Configurações do Autoplay
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                // Habilita a navegação por setas
                navigation={true}
                // Habilita a paginação por "bolinhas"
                pagination={{ clickable: true }}
                className="hero-swiper h-full"
            >
                {sliders.map((slider) => (
                    <SwiperSlide key={slider.id}>
                        <img
                            src={route('admin.photo-gallery.image', [slider.slider_images[sliderScreen]])}
                            alt={slider.slider_hash}
                            className="hero-banner-image h-full w-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
