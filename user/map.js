module.exports = {
    auctionsToBody,
    bidsToBody
  };
  
  function auctionsToBody(auctions) {
    return {
      ...auctions,
    };
  }



  function bidsToBody(bids) {
    return {
      ...bids,
    };
  }

  