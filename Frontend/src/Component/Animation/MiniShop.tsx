"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import productsData from "../Ayumedical/medical/amazon_medical_products.json";

function MiniShop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData.slice(0, 14));
  }, []);

  // Card width should match SwiperSlide width (!w-56 → 224px)
  const cardWidth = 224;
  const containerWidth = typeof window !== "undefined" ? window.innerWidth : 1200;

  // Equal side padding (center balance)
  const sideOffset = (containerWidth - cardWidth) / 2;

  return (
    <div className="w-full max-w-7xl px-4 sm:px-6 mx-auto text-center overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-14 text-amber-900 font-['Georgia'] relative inline-block">
        <span>🌿 Featured Health Products</span>
        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-full"></span>
      </h2>

      <Swiper
        effect="coverflow"
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="miniShopSwiper w-full max-w-7xl mx-auto"
        grabCursor
        watchSlidesProgress
        centeredSlides
        loop
        speed={700}
        autoplay={{ delay: 2700, disableOnInteraction: false }}
        slidesPerView="auto"
        spaceBetween={15}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2.5,
          slideShadows: false,
        }}
        // navigation
      >
        {products.map((product, index) => (
          <SwiperSlide
            key={product.asin || index}
            className="!w-72 transition-transform duration-500"
          >
            <div className="rounded-2xl shadow-md p-4 bg-gradient-to-b from-white via-amber-50 to-white border border-amber-100 h-full flex flex-col">
              <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                  src={product.image_url || "/api/placeholder/250/150"}
                  alt={product.title}
                  className="h-60 w-full object-contain rounded-md mb-2"
                />
                <div className="absolute top-0 right-0 bg-amber-600 text-white text-xs px-2 py-1 rounded-bl-md shadow">
                  Featured
                </div>
              </div>

              <h3 className="text-sm font-semibold line-clamp-2 text-amber-900 font-['Georgia']">
                {product.title}
              </h3>

              <p className="text-amber-700 font-bold mt-1">
                {product.actual_price}
              </p>

              <a
                href={product.price_link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block w-full py-2 text-center bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm font-semibold font-['Georgia']"
              >
                View on Amazon
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MiniShop;
