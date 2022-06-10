const { SubService, Service } = require("../model/service");

const subServiceController = {
  //ADD SUB-SERVICE
  addSubService: async (req, res) => {
    try {
      const dataSubServices = await SubService.find({}).sort("code");
      const newCode =
        dataSubServices.length === 0
          ? 1
          : Number(dataSubServices[dataSubServices.length - 1].code + 1);
      const newSubService = new SubService({ ...req.body, code: newCode });
      const savedSubService = await newSubService.save();
      if (req.body.service) {
        const subService = await Service.findById(req.body.service);
        await subService.updateOne({
          $push: { subService: savedSubService._id },
        });
      }
      res.status(200).json({
        message: "success",
        response: savedSubService,
      });
    } catch (error) {
      res.status(500).json({ message: "failed" });
    }
  },

  //GET ALL
  getSubService: async (req, res) => {
    try {
      const subServices = await SubService.find()
        .sort("code")
        .populate("service");
      res.status(200).json({
        response: subServices,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //UPDATE SUB-SERVICE
  updateSubService: async (req, res) => {
    try {
      const subService = await SubService.findById(req.params.id);
      console.log(subService);
      const newSubService = await subService.updateOne({ $set: req.body });
      console.log(newSubService);
      res.status(200).json({
        message: "success",
        response: newSubService,
      });
    } catch (error) {
      console.log(error);
    }
  },

  //DELETE SUB-SERVICE
  deleteSubService: async (req, res) => {
    try {
      await SubService.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).error(error);
    }
  },
};

module.exports = subServiceController;
