const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI || "mongodb://127.0.0.1/csv_project_db");

    console.log("Connected to mongoDB successfully....");
  } catch (error) {
    console.log("Err in mongoDB", error);
  }
}
main();
