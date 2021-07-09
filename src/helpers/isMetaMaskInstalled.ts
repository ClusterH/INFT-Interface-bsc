const isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window as any;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export default isMetaMaskInstalled;
