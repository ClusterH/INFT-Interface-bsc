// a list for saving subscribed event instances
const subscribedEvents: any = {};
// Subscriber method

const subscribeLogEvent = (
  contract: any,
  eventName: any,
  web3: any,
  callback: (e: any) => void,
) => {
  const eventJsonInterface = web3.utils._.find(
    contract._jsonInterface,
    (o) => o.name === eventName && o.type === 'event',
  );
  //   console.log('eventJsonInterface', eventJsonInterface);
  const subscription = web3.eth.subscribe(
    'logs',
    {
      //   fromBlock: 9462366,
      address: contract.options.address,
      topics: [eventJsonInterface.signature],
    },
    (error: any, result: any) => {
      if (!error) {
        const eventObj = web3.eth.abi.decodeLog(
          eventJsonInterface.inputs,
          result.data,
          result.topics.slice(1),
        );
        console.log(`New ${eventName}!`, eventObj);
        callback(eventName, eventObj);
      }
    },
  );
  subscribedEvents[eventName] = subscription;
};

export default subscribeLogEvent;
