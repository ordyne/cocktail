"use client";

import Image from "next/image";
import { useState } from "react";
import CocktailList from "@/components/CocktailList";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('All'); // 기본값 'All'
  const tabs = ['All', 'Today', 'Weekly', 'Monthly'];

  return (
    <>
      <div className="flex justify-between items-center w-full mt-16 mb-16">
        <div>
        <p className="font-extrabold text-6xl bg-gradient-to-r from-[#ffb876] to-[#e81963] bg-clip-text text-transparent">Keep calm<br />and<br />Drink alcohol</p>
          <button className="bg-gradient-to-r from-[#ffb876] to-[#ee6f6f] rounded-full text-white text-xl mt-12 flex items-center w-[290px] h-[80px] justify-center cursor-pointer">
            <span className="text-xl">레시피 찾아보기</span>
            <Image src="/images/button_move.png" alt="arrow" width={48} height={48} className="ml-2 inline-block"/>
          </button>
        </div>
        <div>
          <Image src="/images/main_banner.png" alt="cocktail" width={500} height={500} priority/>
        </div>
      </div>
      <div className="mt-20 flex justify-between items-center">
        <p className="font-semibold text-[#EE6F6F] text-3xl">Most Popular Cocktails</p>
        <ul className="flex gap-4">
         {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out cursor-pointer
                  ${activeTab === tab
                    ? 'bg-white text-[#EE6F6F] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>
       {/* 하단 칵테일 목록 컴포넌트 렌더링 및 activeTab 전달 */}
       <div className="mt-8">
        <CocktailList selectedTab={activeTab} limit={3} />
      </div>
    </>
  );
}
