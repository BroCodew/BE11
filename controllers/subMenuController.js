const { SubMenu, Menu } = require("../model/model");

const subMenuController = {
  //ADD AUTHOR
  addSubMenu: async (req, res) => {
    try {
      const dataSubMenu = await SubMenu.find({}).sort("code");
      const newCode =
        dataSubMenu.length === 0
          ? 1
          : dataSubMenu[dataSubMenu.length - 1].code + 1;
      const newSubMenu = new SubMenu({ ...req.body, code: newCode });
      const savedSubMenu = await newSubMenu.save();
      if (req.body.menu) {
        const subMenu = Menu.findById(req.body.menu);
        await subMenu.updateOne({ $push: { subMenu: savedSubMenu._id } });
      }
      res.status(200).json({
        messenger: "success",
        response: savedSubMenu,
      });
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL AUTHORS
  getAllSubMenu: async (req, res) => {
    try {
      const subMenu = await SubMenu.find().sort("code").populate("menu");
      res.status(200).json({
        messenger: "success",
        response: subMenu,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE AUTHOR
  updateAuthor: async (req, res) => {
    try {
      const subMenu = await SubMenu.findById(req.params.id);
      const newSubMenu = await subMenu.updateOne({ $set: req.body });
      res.status(200).json({
        messenger: "success",
        response: newSubMenu,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE AUTHOR
  deleteAuthor: async (req, res) => {
    try {
      const deleteSubMenu = await SubMenu.findByIdAndDelete(req.params.id);
      if (deleteSubMenu) {
        await Menu.updateMany(
          { subMenu: req.params.id },
          { $pull: { subMenu: req.params.id } }
        );
        res.status(200).json({
          messenger: "success",
          response: deleteSubMenu,
        });
      } else {
        return res.status(403).json({
          messenger: "error",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = subMenuController;
