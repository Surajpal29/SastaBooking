const {
  CreateNewCityInDBService,
  GetAllCityFromDBService,
  UpdateACityInDBService,
  DeleteACityInDBService,
  GetACityFromDBService,
} = require("./../service/City.Service");

async function CreateNewCityController(request, response) {
  try {
    console.log(request.body);
    const { name, image, description, cuisines } = request.body;
    const result = await CreateNewCityInDBService(
      name,
      image,
      description,
      cuisines
    );

    if (!result.success) {
      throw new Error("CreateNewCityINDBService failed to complete task");
    }
    response.status(201).json({
      succes: true,
      message: "New city created successfully",
      data: result.data,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      succes: false,
      message: "Something went wrong when adding city",
    });
  }
}

async function GetAllCityController(request, response) {
  try {
    const result = await GetAllCityFromDBService();
    if (result.success) {
      const Data = result.data.map((city) => {
        const { _id, name, description, cuisines, image } = city;
        return {
          id: _id,
          name,
          description,
          cuisines,
          image,
        };
      });
      response.status(200).json({
        succes: true,
        data: Data,
      });
    } else {
      throw new Error("GetAllCityFromDBService did not return any city data");
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      succes: false,
      message: "Something went wrong when getting all cities",
    });
  }
}

async function UpdateACityControler(request, response) {
  try {
    const { cityid: cityID } = request.query;
    const { name, image, description, cuisines } = request.body;

    const DATA = {};

    if (name) {
      DATA.name = name;
    }
    if (image) {
      DATA.image = image;
    }
    if (description) {
      DATA.description = description;
    }
    if (cuisines) {
      DATA.cuisines = cuisines;
    }

    const result = await UpdateACityInDBService(cityID, DATA);

    if (result.success) {
      response.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      throw new Error("UpdateACityByCity did not return result");
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      succes: false,
      message: "Something went wrong when updating the city",
    });
  }
}

async function DeleteACityController(request, response) {
  try {
    const { id: cityID } = request.query;
    const result = await DeleteACityInDBService(cityID);
    if (result.success) {
      response.status(200).json({
        succes: true,
        data: result.data,
      });
    } else {
      throw new Error(
        "DeleteACityController FALIED TO DELETE ,it will not get result from DeleteACityService"
      );
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      succes: false,
      message: "Something went wrong when deleting a city",
    });
  }
}

async function GetACityController(request, response) {
  try {
    const { cityid: cityId } = request.query;
    const result = await GetACityFromDBService(cityId);
    if (result.success) {
      const Data = {};
      Data.id = result.data.id;
      Data.name = result.data.name;
      Data.description = result.data.description;
      Data.cuisines = result.data.cuisines;
      Data.image = result.data.image;
      console.log(Data);
      response.status(200).json({
        success: true,
        data: Data,
      });
    } else {
      throw new Error(
        "GetACityController did not get result from GetACityDBService"
      );
    }
  } catch (error) {
    console.log(error);
    response.status(200).json({
      success: false,
      message:
        "Something went wrong when while fetcing data from GetACityFromDBService",
    });
  }
}
module.exports = {
  CreateNewCityController,
  GetAllCityController,
  UpdateACityControler,
  DeleteACityController,
  GetACityController,
};
