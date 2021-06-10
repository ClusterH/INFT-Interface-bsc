import { useEffect, useState } from 'react';

const formatAddress = (addr: string) => {
  if (!addr) return '';

  return addr.substr(0, 5) + '...' + addr.substr(-4);
};

function useShortAddress(addr: string) {
  const [shortAddress, setShortAddress] = useState(addr);

  useEffect(() => {
    setShortAddress(formatAddress(addr));
  }, []);

  return shortAddress;
}

export default useShortAddress;
