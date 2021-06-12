import { useEffect, useState } from 'react';

const chainId = 56;
function useCollections(fetchCollections: any, cateId: string | number) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    initCollections(cateId);
  }, []);

  const initCollections = async (id: string | number) => {
    try {
      const { items } = await fetchCollections(chainId, id || 0);
      setCollections(items);
    } catch (error) {
      console.log(error);
    }
  };

  return { collections, initCollections };
}

export default useCollections;
