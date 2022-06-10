const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    lang: {
      vi: {
        type: String,
        required: true,
        unique: true,
      },
      en: {
        type: String,
        required: true,
        unique: true,
      },
    },
    linkUrl: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: Number,
    },
    subMenu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubMenu",
      },
    ],
  },
  { timestamps: true }
);

const subMenuSchema = new mongoose.Schema(
  {
    lang: {
      vi: {
        type: String,
        required: true,
        unique: true,
      },
      en: {
        type: String,
        required: true,
        unique: true,
      },
    },
    linkUrl: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: Number,
    },
    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
  },
  { timestamps: true }
);

let SubMenu = mongoose.model("SubMenu", subMenuSchema);
let Menu = mongoose.model("Menu", menuSchema);

module.exports = { SubMenu, Menu };
