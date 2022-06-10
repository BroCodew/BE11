const { Service } = require("../model/service");

const ServiceController = {
  //ADD Service
  addService: async (req, res) => {
    try {
      const dataService = await Service.find({}).sort("code");
      const newCode =
        dataService.length === 0
          ? 1
          : Number(dataService[dataService.length - 1].code + 1);
      const newService = new Service({ ...req.body, code: newCode });
      const savedService = await newService.save();

      res.status(200).json({
        message: "Success",
        response: savedService,
      });
    } catch (error) {
      console.log(res.status(500).json);
    }
  },

  //GET ALL
  getService: async (req, res) => {
    try {
      const allServices = await Service.find()
        .sort("code")
        .populate("subService");
      res.status(200).json({
        message: "success",
        response: allServices,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //UPDATE SERVICE
  updateService: async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
      const newService = await service.updateOne({ $set: req.body });
      res.status(200).json({
        message: "success",
        response: newService,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //DELETE SERVICE
  deleteService: async (req, res) => {
    try {
      await Service.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = ServiceController;
