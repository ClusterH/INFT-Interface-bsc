export default (address: string) => {
  if (!address) return '';

  return `${address.substr(0, 3)}...${address.substr(-4)}`;
};
