const express = require("express");
const router = express.Router();
const friendsController = require('../controllers/friendsController');

router.get('/', friendsController.getAllFriends);

router.get('/filter', friendsController.filterFriends);

router.get('/info', friendsController.getRequestInfo);

router.get('/:id', friendsController.getFriendById);

router.post('/', friendsController.addFriend);

router.put('/:id', friendsController.updateFriend);

module.exports = router;