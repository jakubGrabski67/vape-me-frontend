const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    lastName: String,
    city: String,
    email: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    paid: Boolean,
    archived: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
