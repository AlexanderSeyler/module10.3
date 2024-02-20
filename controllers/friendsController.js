const friends = require('../models/friends');

function getAllFriends(req, res) {
    res.json(friends);
}

function filterFriends(req, res) {
    let filterGender = req.query.gender;
    let filterLetter = req.query.letter;

    let matchingFriends = [...friends];

    if (filterGender) {
        matchingFriends = matchingFriends.filter(friend => friend.gender === filterGender);
    }

    if (filterLetter) {
        matchingFriends = matchingFriends.filter(friend => friend.name.toUpperCase().startsWith(filterLetter.toUpperCase()));
    }

    if (matchingFriends.length > 0) {
        res.status(200).json(matchingFriends);
    } else {
        res.status(404).json({ error: `No friends matching gender ${filterGender} and starting letter ${filterLetter}` });
    }
}

function getRequestInfo(req, res) {
    res.json({
        'user-agent': req.headers['user-agent'],
        'content-type': req.headers['content-type'],
        accept: req.headers.accept
    });
}

function getFriendById(req, res) {
    let friendId = req.params.id;
    let matchedFriend = friends.find(friend => friend.id == friendId);
    matchedFriend ? res.status(200).json({ result: `Friend #${friendId} found`, data: matchedFriend }) : res.status(404).json({ result: `Friend #${friendId} not found` });
}

function addFriend(req, res) {
    let newFriend = req.body;

    if (!newFriend.name || !newFriend.gender) {
        res.status(500).json({ error: 'Friend object must contain a name and gender' });
        return;
    } else if (!newFriend.id) {
        newFriend.id = friends.length + 1;
    }

    friends.push(newFriend);
    res.status(200).json(newFriend);
}

function updateFriend(req, res) {
    let friendId = req.params.id;
    let updatedFriend = req.body;

    let oldFriend = friends.find(friend => friend.id == friendId);

    if (oldFriend) {
        let oldFriendIndex = friends.indexOf(oldFriend);
        updatedFriend = { ...oldFriend, ...updatedFriend };
        friends[oldFriendIndex] = updatedFriend;
        res.status(200).json({ result: 'Updated friend with ID ' + friendId, data: updatedFriend });
    } else {
        res.status(404).json({ result: 'No friend with ID ' + friendId });
    }
}

module.exports = {
    getAllFriends,
    filterFriends,
    getRequestInfo,
    getFriendById,
    addFriend,
    updateFriend
};