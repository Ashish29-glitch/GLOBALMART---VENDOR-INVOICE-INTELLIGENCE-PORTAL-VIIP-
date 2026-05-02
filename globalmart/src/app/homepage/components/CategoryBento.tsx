'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

// BENTO GRID AUDIT
// Array has 4 cards: [Electronics, Luxury Goods, Daily Essentials, Deals & Offers]
// Row 1: [col-1-2: Electronics cs-2 rs-1] [col-3: Luxury cs-1 rs-2]
// Row 2: [col-1: Essentials cs-1 rs-1] [col-2: Deals cs-1 rs-1] [col-3: OCCUPIED by Luxury]
// Placed 4/4 cards ✓

const categories = [
{
  id: 'electronics',
  label: 'Electronics',
  subtitle: 'Mobiles, cameras, drones, laptops & more',
  count: '1,000+',
  icon: '⚡',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b53525af-1774619173049.png",
  imageAlt: 'Array of premium electronics on dark surface, dramatic studio lighting, deep shadows, low-key atmosphere',
  accent: '#C9A84C',
  colSpan: 'md:col-span-2',
  rowSpan: '',
  textSize: 'text-4xl md:text-5xl'
},
{
  id: 'luxury',
  label: 'Luxury Goods',
  subtitle: 'Watches, bags, jewelry & fashion',
  count: '1,000+',
  icon: '💎',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1910bb8c2-1772636030800.png",
  imageAlt: 'Luxury watch and leather goods on dark velvet, dim atmospheric lighting, deep shadows, moody low-key',
  accent: '#A8A9AD',
  colSpan: 'md:col-span-1',
  rowSpan: 'md:row-span-2',
  textSize: 'text-3xl md:text-4xl'
},
{
  id: 'essentials',
  label: 'Daily Essentials',
  subtitle: 'Kitchen, clothing, health & home',
  count: '1,000+',
  icon: '🛒',
  image: "https://images.unsplash.com/photo-1575004775353-ba99ddd4d53e",
  imageAlt: 'Everyday household products on dark background, dim studio lighting, shadowy atmosphere',
  accent: '#C9A84C',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  textSize: 'text-3xl'
},
{
  id: 'deals',
  label: 'Deals & Offers',
  subtitle: 'Up to 40% off — limited time',
  count: '1,000+',
  icon: '🏷️',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cb6b7c0c-1776022491521.png",
  imageAlt: 'Shopping bags and sale tags on dark surface, dramatic shadows, low-key moody lighting',
  accent: '#E8C96A',
  colSpan: 'md:col-span-1',
  rowSpan: '',
  textSize: 'text-3xl'
}];


export default function CategoryBento() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {if (e.isIntersecting) e.target.classList.add('active');}),
      { threshold: 0.1 }
    );
    sectionRef?.current?.querySelectorAll('.reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-4 md:px-8 max-w-[1800px] mx-auto">
      <div className="reveal mb-8">
        <div className="text-xs font-black text-[#C9A84C] uppercase tracking-widest mb-2">Shop by Category</div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground">
          Everything, <span className="gold-text">Everywhere</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:grid-rows-2">
        {/* Card 1: Electronics — col-span-2 */}
        <Link
          href="/products?category=electronics"
          className={`reveal ${categories?.[0]?.colSpan} ${categories?.[0]?.rowSpan} relative overflow-hidden rounded-2xl group cursor-pointer min-h-[260px]`}>

          <AppImage
            src={categories?.[0]?.image}
            alt={categories?.[0]?.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="text-2xl mb-2">{categories?.[0]?.icon}</div>
            <div className={`${categories?.[0]?.textSize} font-black text-white tracking-tighter mb-1`}>{categories?.[0]?.label}</div>
            <div className="text-sm text-white/70 mb-3">{categories?.[0]?.subtitle}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#C9A84C]">{categories?.[0]?.count} items</span>
              <span className="flex items-center gap-1 text-xs font-bold text-white/80 group-hover:text-[#C9A84C] transition-colors">
                Shop Now <Icon name="ArrowRightIcon" size={12} />
              </span>
            </div>
          </div>
        </Link>

        {/* Card 2: Luxury — row-span-2 */}
        <Link
          href="/products?category=luxury"
          className={`reveal delay-100 ${categories?.[1]?.colSpan} ${categories?.[1]?.rowSpan} relative overflow-hidden rounded-2xl group cursor-pointer min-h-[260px] md:min-h-0`}>

          <AppImage
            src={categories?.[1]?.image}
            alt={categories?.[1]?.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="text-2xl mb-2">{categories?.[1]?.icon}</div>
            <div className={`${categories?.[1]?.textSize} font-black text-white tracking-tighter mb-1`}>{categories?.[1]?.label}</div>
            <div className="text-sm text-white/70 mb-3">{categories?.[1]?.subtitle}</div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#A8A9AD]">{categories?.[1]?.count} items</span>
              <span className="flex items-center gap-1 text-xs font-bold text-white/80 group-hover:text-[#A8A9AD] transition-colors">
                Shop Now <Icon name="ArrowRightIcon" size={12} />
              </span>
            </div>
          </div>
        </Link>

        {/* Card 3: Essentials */}
        <Link
          href="/products?category=essentials"
          className={`reveal delay-200 ${categories?.[2]?.colSpan} ${categories?.[2]?.rowSpan} relative overflow-hidden rounded-2xl group cursor-pointer min-h-[200px]`}>

          <AppImage
            src={categories?.[2]?.image}
            alt={categories?.[2]?.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <div className="text-xl mb-1.5">{categories?.[2]?.icon}</div>
            <div className={`${categories?.[2]?.textSize} font-black text-white tracking-tighter mb-1`}>{categories?.[2]?.label}</div>
            <div className="text-xs text-white/70 mb-2">{categories?.[2]?.subtitle}</div>
            <span className="text-xs font-bold text-[#C9A84C]">{categories?.[2]?.count} items</span>
          </div>
        </Link>

        {/* Card 4: Deals */}
        <Link
          href="/products?category=deals"
          className={`reveal delay-300 ${categories?.[3]?.colSpan} ${categories?.[3]?.rowSpan} relative overflow-hidden rounded-2xl group cursor-pointer min-h-[200px]`}>

          <AppImage
            src={categories?.[3]?.image}
            alt={categories?.[3]?.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent" />
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <div className="text-xl mb-1.5">{categories?.[3]?.icon}</div>
            <div className={`${categories?.[3]?.textSize} font-black text-white tracking-tighter mb-1`}>{categories?.[3]?.label}</div>
            <div className="text-xs text-white/70 mb-2">{categories?.[3]?.subtitle}</div>
            <span className="text-xs font-bold text-[#E8C96A]">{categories?.[3]?.count} items</span>
          </div>
        </Link>
      </div>
    </section>);

}