const express = require("express");
const {handleGetAllUsers,
      handlegetUserById,
      handleUpdateUserById,
      handleDeleteUserById,
      handleCreateNewUser} = require('../controllers/users')

const router = express.Router();
  
  //REST API
router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)
  
  router.route("/:id")
  .get(handlegetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById)

module.exports = router;