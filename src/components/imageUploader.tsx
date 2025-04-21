import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Image from "next/image";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [ingredient, setIngredient] = useState(""); // JSON 문자열로 입력받음
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !name || !ingredient) {
      alert("모든 필드를 입력하세요.");
      return;
    }
    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("cocktail")
      .upload(fileName, file);

    if (uploadError) {
      alert("업로드 실패: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("cocktail")
      .getPublicUrl(fileName);
    setUrl(publicUrlData.publicUrl);

    // ingredient를 JSON으로 파싱
    let ingredientJson;
    try {
      ingredientJson = JSON.parse(ingredient);
    } catch {
      alert("ingredient는 올바른 JSON 형식이어야 합니다.");
      setUploading(false);
      return;
    }

    // DB에 저장
    const { error: dbError } = await supabase
    .from("cocktail")
    .insert([
      {
        name,
        ingredient: ingredientJson,
        image: publicUrlData.publicUrl, // ← 여기!
      },
    ]);
    if (dbError) {
      alert("DB 저장 실패: " + dbError.message);
    } else {
      alert("DB에 이미지와 정보가 저장되었습니다!");
    }
    setUploading(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-1 mr-2"
      />
      <input
        type="text"
        placeholder='ingredient (예: {"vodka":50,"juice":100})'
        value={ingredient}
        onChange={e => setIngredient(e.target.value)}
        className="border p-1 mr-2"
      />
      <input type="file" accept="image/*" onChange={handleFileChange} className="mr-2" />
      <button onClick={handleUpload} disabled={uploading || !file || !name || !ingredient}>
        {uploading ? "업로드 중..." : "이미지 업로드"}
      </button>
      {url && (
        <div>
          <p>업로드된 이미지:</p>
          <Image src={url} alt="uploaded" width={80} height={80} className="w-40" />
        </div>
      )}
    </div>
  );
}