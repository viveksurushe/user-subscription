const express = require("express");
const router = express.Router();
const UserService = require("./user.service");

router.get("/", async function (request, response) {
  try {
    const data = await UserService.getAll();
    return response.status(200).send({ status: "SUCCESS", data });
  } catch (error) {
    return response.status(500).send(error);
  }
});

router.get("/:username", async function (request, response) {
  try {
    if (!request.params.username) {
      return response
        .status(400)
        .send({ status: "Error", error: "username  is required" });
    }
    const data = await UserService.getByUsername(request.params.username);
    if (data && data.length) {
      return response.status(200).send({ status: "SUCCESS", data });
    } else {
      return response.status(400).send({
        status: "Error",
        message: "Invalid username, Please send valid username",
      });
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});

router.post("/", async function (request, response) {
  try {
    const { userName } = request.body;
    if (!userName.trim()) {
      return response
        .status(400)
        .send({ status: "Error", error: "userName is required" });
    }
    const user = await UserService.getByUsername(userName);
    if (user && user.length && user[0].userName.toLowerCase() == userName.toLowerCase()) {
      return response.status(400).send({
        status: "Error",
        message: "Username already available",
      });
    }

    const data = await UserService.create({ userName });
    return response.status(200).send({
      status: "Success",
      message: "User created successfully!",
      user: data._id,
    });
  } catch (error) {
    return response.status(500).send(error);
  }
});

router.put("/:id", async function (request, response) {
  try {
    const { userName } = request.body;
    if (!userName.trim()) {
      return response
        .status(400)
        .send({ status: "Error", error: "userName is required" });
    }
    if (!request.params.id) {
      return response
        .status(400)
        .send({ status: "Error", error: "user id is required" });
    }
    const updatedData = { userName };
    const data = await UserService.update(request.params.id, updatedData);
    return response.status(200).send({
      status: "Success",
      message: "User updated successfully!",
      data: data,
    });
  } catch (error) {
    return response.status(500).send(error);
  }
});

router.delete("/:id", async function (request, response) {
  try {
    if (!request.params.id) {
      return response
        .status(400)
        .send({ status: "Error", error: "user id is required" });
    }
    const data = await UserService.remove(request.params.id);
    return response.send({
      status: "Success",
      message: "User deleted successfully!",
      data: data._id,
    });
  } catch (error) {
    return response.status(500).send(error);
  }
});

module.exports = router;
