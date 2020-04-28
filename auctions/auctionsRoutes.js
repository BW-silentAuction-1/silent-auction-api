const express = require('express');

const Auctions = require('./auctions-model');
const Bids = require('../bids/bids-model')
const router = express.Router();
const moment = require("moment");

router.get('/', (req,res) => {
    Auctions.getAll()
      .then(async auctions => {
        res.status(200).json(auctions);
      })
      .catch(err => res.status(500).json({message: "Error retrieving from database."}));
  })

  router.get('/:id', (req,res) => {
    Auctions.getAuction(req.params.id,req.decodedToken.userId)
      .then(auction => {
        if (auction) {
              res.status(200).json(auction);
        } else {
          res.status(400).json({message: "No auction with that ID"})
        }}
      )
      .catch(err => res.status(500).json({message: "Error receiving auction"}));
  });

  router.post("/",  validateAuction , (req,res) => {
    Auctions.add(req.auction).then(id => res.status(201).json(id[0]))
      .catch(err => res.status(500).json({message: "Error receiving auction"}))
  });

  router.put("/:id", authOwner, (req,res) => {
        const auction = req.body;
        if(auction.date_started || auction.item_price || auction.date_ending){
          res.status(403).json({message: "You cannot modify that after auction starts"});
        }
        else{
        Auctions.edit(req.params.id, req.body)
        .then(records => res.status(201).json({records}))
      .catch(err => res.status(500).json({message: "Error receiving auction"}));
        }
  });

  router.delete("/:id", authOwner, (req,res) => {
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
    Auctions.checkAuction(req.params.id)
      .then(auction => {
        if (auction) {
          if (auction[0].user_id === req.decodedToken.userId) {
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
      if (!auction.name || !auction.item_price || !auction.date_ending || !auction.image || auction.date_started) {
        res.status(400).json({message: "name, item_price, date_ending, no date_started, and image URL is required."})
      } else {
        req.auction = {...auction,date_started:moment.utc().format('YYYY-MM-DD HH:mm:ss'), user_id: req.decodedToken.userId}
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