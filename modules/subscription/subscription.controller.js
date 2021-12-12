const express = require("express");
const router = express.Router();
const SubscriptionService = require("./subscription.service");
const UserService = require("../user/user.service");
const { Plans } = require("./plans");

router.get("/:username/:date?", async function (request, response) {
  try {
    if (!request.params.username) {
      return response
        .status(400)
        .send({ status: "Error", error: "username is required" });
    }

    const user = await UserService.getByUsername(request.params.username);
    if (user && !user.length) {
      return response.status(400).send({
        status: "Error",
        message: "Invalid username, Please send valid username",
      });
    }

    if (request.params.date) {
      const date = new Date(request.params.date);
      const condition = {
        user: user[0]._id,
        startDate: { $lte: date },
        validTill: { $gte: date },
      };
      const data = await SubscriptionService.find(date, condition);
      return response.status(200).send({ status: "Success", data });
    } else {
      const data = await SubscriptionService.findByUserId(user[0]._id);
      return response.status(200).send({ status: "Success", data });
    }
  } catch (error) {
    return response.status(500).send(error);
  }
});

router.post("/", async function (request, response) {
  try {
    const { user_name, plan_id, start_date } = request.body;
    if (!user_name.trim()) {
      return response
        .status(400)
        .send({ status: "Error", error: "user_name is required" });
    }
    if (!plan_id.trim()) {
      return response
        .status(400)
        .send({ status: "Error", error: "plan_id is required" });
    }
    if (!start_date.trim()) {
      return response
        .status(400)
        .send({ status: "Error", error: "start_date is required" });
    }
    const user = await UserService.getByUsername(user_name);
    if (user && !user.length) {
      return response.status(400).send({
        status: "Error",
        message: "Invalid username, Please send valid username",
      });
    }

    const selectedPlan = Plans.find((plan) => plan.planId === plan_id);
    if (!selectedPlan) {
      return response.status(400).send({
        status: "Error",
        message: "Invalid planId, Please send valid planId",
      });
    }
    const startingDate = new Date(start_date);
    const date = new Date(start_date);
    const validTill = date.setDate(date.getDate() + selectedPlan.validity);

    const subscription = {
      planId: plan_id,
      startDate: startingDate,
      validTill: validTill,
      amount: selectedPlan.cost,
      user: user[0]._id,
    };

    const data = await SubscriptionService.create(subscription);
    return response.status(200).send({
      status: "Success",
      message: "Subscription created successfully!",
      data: data,
    });
  } catch (error) {
    return response.status(500).send(error);
  }
});

module.exports = router;
