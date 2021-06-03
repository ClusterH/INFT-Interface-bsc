/**
 * @desc 获取 i
 * @param {object} t orderData
 * @returns {object} {r,s,v}
 */
function getI(t: any) {
  const sig = JSON.parse(t.sig);
  return {
    r: sig.r,
    s: sig.s,
    v: sig.v,
  };
}

export default getI;
