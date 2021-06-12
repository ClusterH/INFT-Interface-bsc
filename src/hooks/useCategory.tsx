import { queryCategories } from '@/servers';
import { useEffect, useState } from 'react';

function useCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    try {
      const data: any = await queryCategories();
      setCategories(data.items);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  return categories;
}

export default useCategory;
