const { Schema, model, models } = require("mongoose");

const CustomerSchema = new Schema(
  {
    name: String,
    lastName: String,
    city: String,
    email: String,
    postalCode: String,
    streetAddress: String,
    country: String,
  },
  {
    timestamps: true,
  }
);

export const Customer = models?.Customer || model("Customer", CustomerSchema);
