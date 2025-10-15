// Importe os componentes e módulos do Swiper
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Importe os estilos essenciais do Swiper
import { SliderInterface } from '@/types';
import { usePage } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Carousel = () => {
    const { sliders } = usePage<{ sliders: SliderInterface[] }>().props;

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
                            src={route('admin.photo-gallery.image', [slider.slider_images['1920x600']])}
                            alt={slider.slider_hash}
                            className="hero-banner-image h-full w-full"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
