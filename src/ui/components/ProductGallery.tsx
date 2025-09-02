'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs, Zoom } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper'; // Import the core Swiper type
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

type ImageItem = { url: string; alt?: string };

export function ProductGallery({ images }: { images: ImageItem[] }) {
	// store thumbs swiper instance
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

	return (
		<div>
			<style>
				{` .swiper-slide-thumb-active {
						border: thin solid #999999;
						border-radius: 8px
					} 
					.swiper-slide-thumb-active img {
						border-radius: 8px
					} 
					 
					 `}
			</style>
			<Swiper
				navigation
				spaceBetween={5}
				slidesPerView={1}
				thumbs={{ swiper: swiperInstance }}
				modules={[FreeMode, Navigation, Thumbs, Zoom]}
				//				zoom={{ limitToOriginalSize: true, panOnMouseMove: true }}
			>
				{images.map((img, i) => (
					<SwiperSlide key={i}>
						{/* <div className='swiper-zoom-container'> */}
						<Image
							priority={true}
							src={img.url}
							width={1024}
							height={1024}
							alt={img.alt ?? `Product image ${i + 1}`}
						/>
						{/* </div> */}
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				modules={[FreeMode, Navigation, Thumbs]}
				watchSlidesProgress
				onSwiper={setSwiperInstance}
				spaceBetween={5}
				slidesPerView={7}
				freeMode={true}
				navigation
			>
				{images.map((img, i) => (
					<SwiperSlide key={i}>
						<Image src={img.url} alt={img.alt ?? `Product image ${i + 1}`} width={100} height={100} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
