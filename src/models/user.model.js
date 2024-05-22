const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { createTokenForUser } = require("../utils/authentication");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
    default: "/images/avatar.png",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const providedHashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== providedHashedPassword)
      throw new Error("Incorrect Password");

    const token = createTokenForUser(user);
    return token;
  }
);

const User = model("user", userSchema);
module.exports = User;
