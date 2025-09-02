/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs, Zoom } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper"; // Import the core Swiper type
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

type ImageItem = { url: string; alt?: string };

export function ProductGallery({ images }: { images: ImageItem[] }) {
	// store thumbs swiper instance
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

	return (
		<div>
			<Swiper
				navigation
				spaceBetween={4}
				slidesPerView={1}
				thumbs={{ swiper: swiperInstance }}
				modules={[FreeMode, Zoom, Navigation, Thumbs]}
				style={{ width: "100%", height: 560 }}
			>
				{images.map((img, i) => (
					<SwiperSlide key={i}>
						<div style={{ position: "relative", width: "100%", height: 560 }}>
							<Image
								src={img.url}
								alt={img.alt ?? `Product image ${i + 1}`}
								fill
								sizes="(max-width: 1024px) 100vw, 800px"
								style={{ objectFit: "contain" }}
							/>
						</div>
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
				className="mySwiper"
			>
				{images.map((img, i) => (
					<SwiperSlide key={i}>
						<div style={{ position: "relative", width: "100%", height: 110 }}>
							<Image
								src={img.url}
								alt={img.alt ?? `Product image ${i + 1}`}
								fill
								sizes="(max-width: 102px) 100vw, 80px"
								style={{ objectFit: "contain" }}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
