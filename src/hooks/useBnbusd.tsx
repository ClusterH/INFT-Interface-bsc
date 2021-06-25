import { useState, useEffect } from 'react';
import { bnbusdContract } from '@/contracts';

function useBnbusd() {
  const [lastPrice, setPrice] = useState(-1);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    try {
      const latestAnswer = await bnbusdContract.methods.latestAnswer().call();
      const price = latestAnswer / 1e8;
      setPrice(price);
    } catch (error) {
      console.error(error);
    }
  };

  return lastPrice;
}

export default useBnbusd;
