const express = require('express');

const Auctions = require('./auctions-model');
const Bids = require('../bids/bids-model')
const router = express.Router();

router.get('/', (req,res) => {
    Auctions.getAll()
      .then(async auctions => {
        for (i = 0; i < auctions.length; i++) {
          const auction_id = auctions[i].id;
          const bids = await Bids.getBidsByAuction(auction_id);
          const bid_count = bids.length;
          auctions[i].date_ending = new Date(auctions[i].date_ending);
          auctions[i].date_starting = new Date(auctions[i].date_starting);
          auctions[i].bid_count = bid_count;
          auctions[i].current_price = (bid_count ? bids[bid_count - 1].price : auctions[i].starting_price)
          
          auctions[i].last_bid_date = ( bid_count ? new Date(bids[bid_count - 1].created_at) : auctions[i].date_starting);
        }
        res.status(200).json(auctions);
      })
      .catch(err => res.status(500).json({message: "Error retrieving from database."}));
  })

  router.get('/:id', (req,res) => {
    Auctions.getAuction(req.params.id)
      .then(auction => {
        if (auction) {
          auction.date_starting = new Date(auction.date_starting);
          auction.date_ending = new Date(auction.date_ending);
          Bids.getBidsByAuction(auction.id)
            .then(bids => {
              bids.forEach(bid => {
                bid.created_at = new Date(bid.created_at);
              })
              auction.bids = bids;
              res.status(200).json(auction);
            })
            .catch(err => res.status(500).json({message: "Error receiving auction"}));
        } else {
          res.status(400).json({message: "No auction ID"})
        } 
      })
      .catch(err => res.status(500).json({message: "Error receiving auction"}));
  });


module.exports.router;