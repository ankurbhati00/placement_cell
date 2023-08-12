const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(
      process.env.MONGOOSE_URI
    );

    console.log("Connected to mongoDB successfully....");
  } catch (error) {
    console.log("Err in mongoDB", error);
  }
}
main();
