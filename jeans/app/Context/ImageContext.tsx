import React, { createContext, useState, useContext } from 'react';

// 선택한 이미지 데이터를 저장할 Context 타입 정의
interface ImageContextType {
  selectedImages: string[];
  setSelectedImages: (images: string[]) => void;
}

// Context 생성
const ImageContext = createContext<ImageContextType | undefined>(undefined);

// Provider 생성 (앱 전체에서 이미지 상태 공유)
export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  return (
    <ImageContext.Provider value={{ selectedImages, setSelectedImages }}>
      {children}
    </ImageContext.Provider>
  );
};

// Context를 사용하기 위한 커스텀 훅
export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};
