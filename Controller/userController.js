const { User, Thought} = require('../Models')

module.exports = {
    //gets all users
    async getUsers(req, res){
        try {
            const users = await User.find()
            .populate({ path: "thoughts", select: "-__v"})
            .populate({ path: "thoughts", select: "-__v"})

            return res.status(200).json(users)
        } catch (err){ 
            console.log(err)
            return res.status(500).json(err)
        }
    },
    //gets one user
    async getSingleUser(req, res){
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate({ path: "thoughts", select: "-__v"})
            .populate({ path: "thoughts", select: "-__v"})
            if (!user) {
                return res.status(404).json({ message: 'No user with this ID'})
            }
            return res.status(200).json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },
    //creates user
    async createUser(req, res) {
        try{
            const user = await User.create(req.body)
            res.json(user)
        } catch (err){
            res.status(500).json(err)
        }
    },
    //updates user
    async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: "No user with this id!" });
          }
    
          return res.status(200).json(user);
        } catch (err) {
          console.log(err);
          return res.status(500).json(err);
        }
      },
    //deletes user
    async deleteUser(req, res) {
        try {
            const userInfo = await User.findOneAndDelete({ _id: req.params.userId });
      
            if (!userInfo) {
              return res.status(404).json({ message: 'No such user exists' });
            }
            await Thought.deleteMany({ _id: { $in: user.thooughts }})
      
            return res.status(200).json({ message: 'User and their thoughts were successfully deleted' });
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },
      

// Add friend
async addFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      return res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Delete friend
  async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "Check user and friend ID" });
      }

      return res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
};