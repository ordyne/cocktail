import React, { useState, useEffect } from 'react';

// 컴포넌트가 받을 props 타입 정의
interface CocktailListProps {
  selectedTab: string; // 'All', 'Today', 'Weekly', 'Monthly' 중 하나
}

// 예시 칵테일 데이터 타입 (실제 데이터 구조에 맞게 수정 필요)
interface Cocktail {
  id: number;
  name: string;
  imageUrl: string;
}

const CocktailList: React.FC<CocktailListProps> = ({ selectedTab }) => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // selectedTab이 변경될 때마다 데이터를 다시 가져옴 (useEffect 사용)
  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      setError(null);
      console.log(`Fetching cocktails for tab: ${selectedTab}`); // 어떤 탭 데이터 요청하는지 확인

      try {
        // --- 실제 데이터 Fetching 로직 ---
        // 예시: selectedTab 값에 따라 다른 API 엔드포인트를 호출하거나
        //       가져온 전체 데이터에서 필터링할 수 있습니다.
        // const response = await fetch(`/api/cocktails?period=${selectedTab.toLowerCase()}`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch cocktails');
        // }
        // const data = await response.json();

        // --- 가상 데이터 예시 ---
        await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 시뮬레이션
        let mockData: Cocktail[] = [
          { id: 1, name: 'Mojito', imageUrl: '/images/placeholder.png' },
          { id: 2, name: 'Cosmopolitan', imageUrl: '/images/placeholder.png' },
          { id: 3, name: 'Old Fashioned', imageUrl: '/images/placeholder.png' },
        ];

        // selectedTab에 따라 데이터 필터링 (실제로는 API에서 처리하는 것이 더 효율적)
        if (selectedTab === 'Today') {
          mockData = mockData.slice(0, 1);
        } else if (selectedTab === 'Weekly') {
          mockData = mockData.slice(0, 2);
        } else if (selectedTab === 'Monthly') {
           mockData = mockData.slice(0, 3);
        }
        // 'All'은 모든 데이터

        setCocktails(mockData);
        // --- 데이터 Fetching 로직 끝 ---

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setCocktails([]); // 에러 발생 시 빈 배열로 설정
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, [selectedTab]); // selectedTab 값이 변경될 때만 useEffect 실행

  // 로딩 중 표시
  if (loading) {
    return <div className="text-center py-10">Loading cocktails...</div>;
  }

  // 에러 발생 시 표시
  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  // 데이터가 없을 때 표시
  if (cocktails.length === 0) {
    return <div className="text-center py-10">No cocktails found for {selectedTab}.</div>;
  }

  // 칵테일 목록 렌더링 (Grid 레이아웃 예시)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cocktails.map((cocktail) => (
        <div key={cocktail.id} className="border h-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 bg-white p-3.5">
          <div className="w-full h-40 bg-[#ee6f6f] rounded-lg"></div>
          <div className="flex items-center mt-4">
            <div className="w-15 h-15 bg-[#ee6f6f] rounded-full"></div>
            <div className="flex flex-col ml-4">
              <p className="text-[#171717] font-semibold text-xl">이승탈출넘버원</p>
              <p className="text-[#171717bf]">Created by 이승환</p>
            </div>
          </div>
          <div></div>
          {/* <img src={cocktail.imageUrl} alt={cocktail.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{cocktail.name}</h3>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default CocktailList;