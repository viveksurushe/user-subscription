const SubscriptionSchema = require("./subscription.model");


async function find(date, condition) {
  return SubscriptionSchema.aggregate([
    { $match : condition },
    {
      $project: { 
        planId: 1,
        days_left: { 
          $divide: [{ $subtract: ['$validTill', date] }, 1000 * 60 * 60 * 24]
        }
      } 
    }
  ]);
}

async function findByUserId(id) {
  return SubscriptionSchema.aggregate([
    { $match : { user: id } },
    {
      $project: { 
        planId: 1, 
        start_ate: { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } },
        valid_till: { $dateToString: { format: "%Y-%m-%d", date: "$validTill" } },
      } 
    }
  ]);
}

async function create(subscription) {
  const subscriptionSchema = new SubscriptionSchema(subscription);
  return subscriptionSchema.save();
}

module.exports = {
  find:find,
  findByUserId:findByUserId,
  create: create
};
