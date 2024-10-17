import User from "../models/userModel.js"

export const getUser = async (req, res) => {
    try {
        const id = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const id = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(({ _id, firstname, lastname, location, occupation, picturePath }) => { return { _id, firstname, lastname, location, occupation, picturePath } })
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

export const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId)

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const formattedFriends = friends.map(({ _id, firstname, lastname, location, occupation, picturePath }) => { return { _id, firstname, lastname, location, occupation, picturePath } })
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

