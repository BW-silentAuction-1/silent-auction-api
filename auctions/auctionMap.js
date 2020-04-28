module.exports = {

    auctionsToBody,
    bidsToBody,
    getOwner,
    highestBidToBody
  };

  function auctionsToBody(auction) {
    const result = {
      ...auction,
    };

    return result;
  }
  
  function bidsToBody(bids) {
    return {
      ...bids,
    };
  }

  function highestBidToBody(highest) {
    return {
      ...highest,
    };
  }

  function getOwner(owner) {
    return {
      ...owner,
    };
  }

  