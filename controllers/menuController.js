const { SubMenu, Menu } = require("../model/model");

const MenuController = {
  //ADD A menu
  addMenu: async (req, res) => {
    try {
      const dataMenu = await Menu.find({}).sort("code");
      const newCode =
        dataMenu.length === 0
          ? 1
          : Number(dataMenu[dataMenu.length - 1].code) + 1;
      const newMenu = new Menu({ ...req.body, code: newCode });
      const savedMenu = await newMenu.save();

      res.status(200).json({
        messenger: "success",
        response: savedMenu,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET ALL BOOKS
  getAllMenu: async (req, res) => {
    try {
      const allMenus = await Menu.find().sort("code").populate("subMenu");
      res.status(200).json({
        messenger: "success",
        response: allMenus,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE
  updateMenu: async (req, res) => {
    try {
      const menu = await Menu.findById(req.params.id);
      const newMenu = await menu.updateOne({ $set: req.body });
      res.status(200).json({
        messenger: "success",
        response: newMenu,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE
  deleteMenu: async (req, res) => {
    try {
      const menu = await Menu.findById(req.params.id);
      console.log(menu);
      if (menu.subMenu.length === 0) {
        const deleteMenu = await Menu.findByIdAndDelete(req.params.id);
        res.status(200).json({
          messenger: "success",
          response: deleteMenu,
        });
      } else {
        res.status(403).json({
          messenger: "error",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = MenuController;
