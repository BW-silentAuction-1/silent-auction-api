const router = require("express").Router();

const Users = require("./user-model.js");


router.get("/profile", (req, res) => {
    Users.getProfile(req.headers.authorization)
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(403).json({ error: "User must be logged in to do that." }));
  });

//!!!!!!!!!!!!!!!!!!!!!    remove these endpoints laterrrr
router.get("/", (req, res) => {
    Users.find(req.headers.authorization)
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(403).json({ error: "User must be logged in to do that." }));
  });


router.get("/:id", (req, res) => {
    Users.findById(req.params.id)
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(403).json({ error: "User must be logged in to do that." }));
  });
//!!!!!!!!!!!!!!!!!!!!!!!

module.exports = router;
