const mongoose = require("mongoose");
function connectDB() {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("🗃️ db connected. ");
    })
    .catch((err) => {
      console.log("❌ db connection failed");
    });
}
module.exports = connectDB;
