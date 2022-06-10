const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    active: { type: Boolean, default: false },
    code: { type: Number },
    icon: { type: String },
    linkUrl: { type: String, required: true, unique: true },
    subService: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubService",
      },
    ],
  },
  { timestamps: true }
);

const subServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  },
  { timestamps: true }
);

let Service = mongoose.model("Service", serviceSchema);
let SubService = mongoose.model("SubService", subServiceSchema);

module.exports = { Service, SubService };
