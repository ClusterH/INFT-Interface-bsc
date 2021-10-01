const transIpfsUrl = (uri = '') =>
  uri ? `https://inft.mypinata.cloud/ipfs/${uri.split('ipfs://').pop()}` : '';

export default transIpfsUrl;
