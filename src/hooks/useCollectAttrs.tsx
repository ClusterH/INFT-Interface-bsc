import { useState, useEffect } from 'react';
import { useLocation } from 'umi';

function useCollectAttrs(fetchCollectAttrs: any) {
  const { query }: any = useLocation();
  const [attrs, setAttrs] = useState([]);

  useEffect(() => {
    if (query && query.contract) {
      initCollectAttrs();
    }
  }, [query]);

  const initCollectAttrs = async () => {
    const data = await fetchCollectAttrs({
      chainId: 56,
      contract: query.contract,
    });
    setAttrs(data || []);
  };

  return attrs;
}

export default useCollectAttrs;
