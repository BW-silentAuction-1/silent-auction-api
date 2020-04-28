const express = require('express');

const Auctions = require('./auctions-model');
const Bids = require('../bids/bids-model')
const router = express.Router();

router.get('/', (req,res) => {
    Auctions.getAll()
      .then(async auctions => {
        res.status(200).json(auctions);
      })
      .catch(err => res.status(500).json({message: "Error retrieving from database."}));
  })

  router.get('/:id', (req,res) => {
    Auctions.getAuction(req.params.id)
      .then(auction => {
        if (auction) {
              res.status(200).json(auction);
        } else {
          res.status(400).json({message: "No auction ID"})
        }}
      )
      .catch(err => res.status(500).json({message: "Error receiving auction"}));
  });

  router.post("/", [item_price, validateAuction] , (req,res) => {
    Auctions.add(req.auction).then(id => res.status(201).json(id[0]))
      .catch(err => res.status(500).json({message: "Error receiving auction"}))
  });

  router.put("/:id", [authOwner, validDate], (req,res) => {
    const {user_id, id, ...rest} = req.body;
    req.body = rest;
    Bids.getBidsByAuction(req.params.id)
      .then(bids => {
       
        if (bids.length) {
          const {starting_price, name, date_starting, ...rest} = req.body;
          req.body = rest;
        }
        Auctions.edit(req.params.id, req.body)
        .then(records => res.status(201).json({records}))
        .catch(err => res.status(500).json({message: "Error updating auction"}));
      })
      .catch(err => res.status(500).json({message: "Error receiving auction"}));
  });

  router.delete("/:id", [authOwner, validDate], (req,res) => {
    Bids.getBidsByAuction(req.auction.id)
    Auctions.remove(req.params.id)
    .then(records => res.status(201).json({records}))
    .catch(err => res.status(500).json({message: "Error deleting auction"}))
  });

  function item_price(req,res,next) {
    if (req.decoded.seller) {
      next();    
    } else {
      res.status(403).json({message: "You are unauthorized to perform this action."})
    }
  }

  function authOwner(req,res,next) {
    Auctions.getAuction(req.params.id)
      .then(auction => {
        if (auction) {
          if (auction.user_id === req.decoded.subject) {
            req.auction = auction;
            next();
          } else {
            res.status(403).json({message: "You are unauthorized to perform this action."});
          }
        } else {
          res.status(400).json({message: "Auction ID does not exist."})
        }
      })
  }

  function validateAuction(req, res, next) {
    const auction = req.body;
    if (auction) {
      if (!auction.name || !auction.starting_price || !auction.date_ending || !auction.image || !auction.date_starting) {
        res.status(400).json({message: "Name, starting price, end date, start date, and image URL is required."})
      } else {
        req.auction = {...auction, user_id: req.decoded.subject}
        next();
      }
    } else {
      res.status(400).json({message: "Body is required."})
    }
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
  module.exports = router;