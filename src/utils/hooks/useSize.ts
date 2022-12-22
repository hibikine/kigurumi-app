import { useState, useEffect } from 'react';
const sizes = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
type Size = keyof typeof sizes;
const useSize = () => {
  const [size, setSize] = useState<Size>('xs');
  const onResize = () => {
    const width = window.innerWidth;
    const newSize = (Object.keys(sizes).reverse() as Size[]).find(
      (key) => sizes[key] <= width
    );
    setSize(newSize || 'xs');
  };
  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return size;
};
export default useSize;
