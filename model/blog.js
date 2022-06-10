const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    lang: {
      en: {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
      vi: {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    },
    linkUrl: {
      type: String,
      unique: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let Blog = mongoose.model("blog", blogSchema);

module.exports = { Blog };
