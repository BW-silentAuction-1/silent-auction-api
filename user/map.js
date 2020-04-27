module.exports = {
    userToBody,
    auctionsToBody,
    bidsToBody
  };

  function userToBody(user) {
    const result = {
      ...user,
    };

    return result;
  }
  
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

  