module.exports = {

    auctionsToBody,
    bidsToBody,
    getOwner
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

  function getOwner(owner) {
    return {
      ...owner,
    };
  }

  