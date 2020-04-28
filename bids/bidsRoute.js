const express = require("express");
const moment = require("moment");
const Auctions = require("../auctions/auctions-model");
const Bids = require("../bids/bids-model");
const router = express.Router();




// router.get("/:id", (req,res) => {
//   Bids.getBid(req.params.id)
//     .then(bid => {
//       if (bid) {
//         bid.created_at = new Date(bid.created_at);
//         res.status(201).json(bid);
//       } else {
//         res.status(404).json({message: "Cannot find bid with specified ID."});
//       }
//     })
//     .catch(err => res.status(500).json({message: "Error receiving auction"}));
// });

router.post("/auctions/:auction_id", [ isOwner,validateBid, findAuction, validDate, validPrice] , (req,res) => {
  req.bid = {...req.bid,price:req.bid.price, user_id: req.decodedToken.userId, auction_id: req.params.auction_id, date_listed: moment.utc().format('YYYY-MM-DD HH:mm:ss')}
  Bids.add(req.bid)
    .then(id => res.status(201).json(id[0]))
    .catch(err => res.status(500).json({message: "Error adding to auction"}))
});

router.put("/:id", [authOwner, isLastBid, validateBid, findAuction, validDate, validPrice], (req,res) => {
  const {id, auction_id, user_id, ...rest} = req.body;
  req.body = rest;
  req.body.created_at = new Date();
  Bids.edit(req.params.id, req.body)
    .then(records => res.status(201).json({records}))
    .catch(err => res.status(500).json({message: "Error updating auction"}))
});

router.delete("/:id", [authOwner, findAuction, validDate], (req,res) => {
  Bids.remove(req.params.id)
  .then(records => res.status(201).json({records}))
  .catch(err => res.status(500).json({message: "Error deleting bid"}))
});

function isBuyer(req,res,next) {
  if (!req.decoded.seller) {
    next();    
  } else {
    res.status(403).json({message: "Action not allowed."})
  }
}

function authOwner(req,res,next) {
  Bids.getBid(req.params.id)
    .then(bid => {
      if (bid) {
        if (bid.user_id === req.decodedToken.userId) {
          req.bid = bid;
          next();
        } else {
          res.status(403).json({message: "Action not allowed."});
        }
      } else {
        res.status(400).json({message: "Bid ID error."})
      }
    })
}

function validateBid(req, res, next) {
  const bid = req.body;
  if (bid) {
    if (bid.price) {
      req.bid = {...req.bid, ...bid};
      next();
    } else {
      res.status(400).json({message: "Price is required."})
    }
  } else {
    res.status(400).json({message: "Price is required."})
  }
}

function findAuction(req, res, next) {
  Auctions.getAuction(req.params.auction_id || req.bid.auction_id)
    .then(auction => {
      if (auction) {
        req.auction = auction;
        next();
      } else {
        res.status(404).json({message: "Auction ID not found."});
      }
    })
}

function validDate(req, res, next) {
  let date = new Date().getTime();
  let date_ending = new Date(req.auction.date_ending).getTime();
  if (date < date_ending) {
    next();
  } else {
      res.status(400).json({message: "Auction has ended."})
  }
}

function validPrice(req, res, next) {
  Auctions.getHighestBid(req.auction.id)
    .then(auction => {
      if (auction.price < req.bid.price || !auction.price) {
        next();
      } else {
        res.status(400).json({message: "The bid is too low."})
      }
    })
    .catch(err => res.status(500).json({message: "Error receiving bid."}))
}

function isLastBid(req,res,next) {
  Bids.getLastBid(req.bid.auction_id)
    .then(lastBid => {
      if (lastBid.id == req.params.id) {
        next();
      } else {
        res.status(403).json({message: "Bids are final."})
      }
    })
}

function isOwner(req,res,next) {
  Auctions.getAuction(req.params.auction_id)
    .then(auction => {
      if (auction.user_id !== req.decodedToken.userId) {
        next();
      } else {
        res.status(403).json({message: "Can't bid on your own auction"})
      }
    })
}

module.exports = router;