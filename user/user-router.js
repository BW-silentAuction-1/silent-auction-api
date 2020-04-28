const router = require("express").Router();

const Users = require("./user-model.js");


router.get("/profile", (req, res) => {
    Users.getProfile(req.decodedToken.userId)
      .then(users => {
        res.json(users);
      })
      .catch(err => res.status(403).json({ error: "User must be logged in to do that." }));
  });

//!!!!!!!!!!!!!!!!!!!!!    remove these endpoints laterrrr
router.get("/", (req, res) => {
    Users.find(req.decodedToken.userId)
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

router.put('/profile', (req, res) => {
    const changes = req.body;
    Users.update(req.decodedToken.userId,changes)
    .then(() => {
        res.status(200).json({ message: `info updated.` });
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error updating the user',
      });
    });
  });

  router.delete('/profile', (req, res) => {
    Users.remove(req.decodedToken.userId)
    .then(user => {
      if (user.length == 0) {
        res.status(404).json({
          message: "No user Found"
        });
      } else {
        res.status(200).json({
          message: "User deleted"
        });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the user',
      });
    });
  });

module.exports = router;
