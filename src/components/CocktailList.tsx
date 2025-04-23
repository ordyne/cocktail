import React, { useState, useEffect } from 'react';
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";

interface CocktailListProps {
  selectedTab: string;
  limit?: number; // optional prop to limit the number of cocktails displayed
}

interface Cocktail {
  id: number;
  name: string;
  image: string;
}

const CocktailList: React.FC<CocktailListProps> = ({ selectedTab, limit }) => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Supabase에서 칵테일 데이터 가져오기
        let query = supabase.from("cocktail").select("id, name, image");

        // selectedTab에 따라 필터링 (예시, 실제 DB에 맞게 수정)
        // 예: created_at 컬럼이 있다면 기간별로 필터 가능
        // if (selectedTab === "Today") { ... }

        const { data, error } = await query;

        if (error) throw error;

        setCocktails(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setCocktails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, [selectedTab]);

  if (loading) {
    return <div className="text-center py-10">Loading cocktails...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (cocktails.length === 0) {
    return <div className="text-center py-10">No cocktails found for {selectedTab}.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {(limit ? cocktails.slice(0, limit) : cocktails).map((cocktail) => (
        <div key={cocktail.id} className="border h-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white p-3.5">
          {cocktail.image ? (
            <Image src={cocktail.image} alt={cocktail.name} width={20} height={20} className="w-full h-40 object-cover rounded-lg" />
          ) : (
              <div className="w-full h-40 bg-[#ee6f6f] rounded-lg">{ cocktail.image}</div>
          )}
          <div className="flex items-center mt-4">
            <div className="w-15 h-15 bg-[#ee6f6f] rounded-full"></div>
            <div className="flex flex-col ml-4">
              <p className="text-[#171717] font-semibold text-xl">{cocktail.name}</p>
              <p className="text-[#171717bf]">Created by 이승환</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CocktailList;