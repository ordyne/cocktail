"use client";

import { useState } from 'react';
import CocktailList from '@/components/CocktailList';

export default function RecipesList() {
  const [activeCategory, setActiveCategory] = useState<string>('famous'); // 기본값 'All'
  const [activeTab, setActiveTab] = useState<string>('All'); // 기본값 'All'
  const tabs = ['All', 'Today', 'Weekly', 'Monthly'];

  return (
    <>
      <div className="flex justify-between items-center w-full h-16">
        <div>
          <button className={`font-bold text-white cursor-pointer ${activeCategory === 'famous' ? 'bg-[#EB5757]' : 'bg-[#EE6F6F]'}`} onClick={() => setActiveCategory('famous')}>Famous</button>
          <button className={`font-bold text-white cursor-pointer ${activeCategory === 'personal' ? 'bg-[#EB5757]' : 'bg-[#EE6F6F]'}`} onClick={ () => setActiveCategory('personal')}>Personal</button>
        </div>
        <div className="flex items-center gap-4">
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
          <button>작성하기</button>
        </div>
      </div>
      <CocktailList selectedTab={activeTab} limit={3} />
    </>
  );
}