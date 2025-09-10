import mongoose from "mongoose";

const ROLE = {
  CUSTOMER: "customer",
  LENDER: {
    INDIVIDUAL: "individual",
    BUSINESS: "business",
  },
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
  companyName: {
    type: String,
    max: [50, "company name must be at most 50 characters long"],
  },
  address: {
    type: String,
    max: [100, "address must be at most 100 characters long"],
  },
  bankDetails: {
    accountNumber: {
      type: String,
      max: [20, "account number must be at most 20 characters long"],
    },
    ifscCode: {
      type: String,
      max: [11, "IFSC code must be at most 11 characters long"],
    },
  },
  brandBio: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
