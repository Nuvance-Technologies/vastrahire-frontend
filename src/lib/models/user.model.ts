import mongoose from "mongoose";

const ROLE = {
  CUSTOMER: "customer",
  LENDER: {
    INDIVIDUAL: "individual",
    BUSINESS: "business",
  },
};

const BUSINESS_TYPE = {
  INDIVIDUAL_SELLER: "individual_seller",
  BOUTIQUE_STORE: "boutique_store",
  FASHION_DESIGNER: "fashion_designer",
  RENTAL_BUSINESS: "rental_business",
  OTHERS: "others",
};

const userSchema = new mongoose.Schema({
  name: {
    firstname: {
      type: String,
      required: [true, "firstname is required!"],
      min: [3, "firstname must be at least 3 characters long"],
      max: [30, "firstname must be at most 30 characters long"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required!"],
      min: [3, "lastname must be at least 3 characters long"],
      max: [30, "lastname must be at most 30 characters long"],
    },
  },
  email: {
    type: String,
    required: [true, "email is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required!"],
  },
  role: {
    type: String,
    enum: [ROLE.CUSTOMER, ROLE.LENDER.INDIVIDUAL, ROLE.LENDER.BUSINESS],
    default: ROLE.CUSTOMER,
  },
  phoneNumber: {
    type: String,
    max: [10, "phone number must be at most 10 characters long"],
  },
  businessType: {
    type: String,
    enum: [
      BUSINESS_TYPE.INDIVIDUAL_SELLER,
      BUSINESS_TYPE.BOUTIQUE_STORE,
      BUSINESS_TYPE.FASHION_DESIGNER,
      BUSINESS_TYPE.RENTAL_BUSINESS,
      BUSINESS_TYPE.OTHERS,
    ],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
