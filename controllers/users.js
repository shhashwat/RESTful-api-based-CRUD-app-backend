const User = require('../models/user');

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);  
}

async function handlegetUserById(req,res){
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
}

async function handleUpdateUserById(req,res){

    const updates = req.body;
    const allowedUpdates = ['firstName', 'lastName', 'email', 'gender', 'jobTitle'];
    const updateFields = Object.keys(updates);

    const isValidOperation = updateFields.every(field => allowedUpdates.includes(field));
    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ status: 'success', user });
    } catch (e) {
        return res.status(400).json({ error: e.message });
    }
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
}
async function handleCreateNewUser(req,res){
    const body = req.body; 
    if(!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle){
      return res.status(400).json({message: "All fields are required"});
    }

    const result = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      gender: body.gender,
      jobTitle: body.jobTitle,
    })
    return res.status(201).json({msg: 'Success',id: result._id})
}


module.exports = {
    handleGetAllUsers,
    handleUpdateUserById,
    handlegetUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}

/*
          -------------------------------------------------
          Old method using only JSON and Node.js
          
          const id = Number(req.params.id);
          const updatedInfo = req.body;
          const userIndex = users.findIndex(user => user.id === id);
          
          // Update the user with the new data
          users[userIndex] = { ...users[userIndex], ...updatedInfo };
        
          // Write the updated users array back to the file
          fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
            return res.json({ status: "success", user: users[userIndex] });
          });*/

  
      /*
      //getting ID number
      const id = Number(req.params.id);
      //finding index
      const userIndex = users.findIndex(user => user.id === id);
      //deleting 1 user from index and adding an object to indicate previous user is deleted
      /*
          splice() method works like this:
          splice(startIndex, deleteCount, item1, item2, item3, ...)
          item1,item2,item3 are optional items that we can ADD to the array
           users.splice(userIndex,1,{deleted: true});
          fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
              return res.json({ status: "success" });
            });
      */