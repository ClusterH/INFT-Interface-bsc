import { useEffect, useState } from 'react';

const chainId = 56;
const catId = 0;
function useCollections(fetchCollections: any) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    const { items } = await fetchCollections(chainId, catId);
    setCollections(items);
  };

  return collections;
}

export default useCollections;
