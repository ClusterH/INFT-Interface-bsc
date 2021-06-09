import { useState, useEffect } from 'react';
import { useLocation } from 'umi';

function useCollectPros() {
  const { query }: any = useLocation();
  const [propsObj, setPropsObj] = useState<any>({});
  const [pros, setPros] = useState('');

  useEffect(() => {
    initPros();
  }, [propsObj]);

  useEffect(() => {
    console.log('change contract');
    setPropsObj({});
    setPros('');
  }, [query.contract]);

  const initPros = () => {
    const keys = Object.keys(propsObj);
    let props = '';
    for (const key of keys) {
      if (!props) {
        props =
          propsObj[key] && propsObj[key].length
            ? `${key}=${propsObj[key].join(',')}`
            : '';
      } else {
        props =
          propsObj[key] && propsObj[key].length
            ? props + `|${key}=` + propsObj[key].join(',')
            : props;
      }
    }

    console.log('initPros', props);
    setPros(props);
  };

  return {
    pros,
    propsObj,
    setPropsObj,
  };
}

export default useCollectPros;
