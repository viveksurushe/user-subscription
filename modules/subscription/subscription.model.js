const { Schema, model } = require("mongoose");

const planIds = ['FREE', 'TRIAL', 'LITE_1M', 'PRO_1M', 'LITE_6M', 'PRO_6M']

const subscriptionSchema = new Schema(
  {
    planId: {
      type: String,
      enum: planIds,
      required: "Invalid planId.",
    },
    startDate: Date,
    validTill: Date,
    amount: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "subscriptions",
  }
);

module.exports = model("Subscription", subscriptionSchema);
