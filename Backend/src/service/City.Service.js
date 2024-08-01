const CityModel = require("./../Model/City.Model");

async function CreateNewCityInDBService(name, image, description, cuisines) {
  try {
    const result = await CityModel.create({
      name,
      image,
      description,
      cuisines,
    });
    // console.log(result);

    if (result)
      return {
        success: true,
        data: result,
      };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

async function GetAllCityFromDBService() {
  try {
    const result = await CityModel.find();
    // console.log(result);
    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error("GetAllCityFromDBService unable to get the cities");
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

async function UpdateACityInDBService(cityId, data) {
  try {
    const { name, description, cuisines, image } = data;
    const cityDocument = await CityModel.findById(cityId);

    if (name) {
      cityDocument.name = name;
    }
    if (description) {
      cityDocument.description = description;
    }
    if (image) {
      cityDocument.image = image;
    }
    if (cuisines) {
      cityDocument.cuisines = cuisines;
    }

    const result = await cityDocument.save();
    console.log(result);

    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error(
        `UpdateAcityInDBService unble to update the city with id:
        ${CityID}`
      );
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

async function DeleteACityInDBService(cityID) {
  try {
    const result = await CityModel.findByIdAndDelete(cityID);
    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error("DeleteACityInDBService failed to delete city");
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

async function GetACityFromDBService(cityId) {
  try {
    const result = await CityModel.findById(cityId);
    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error("GetACityFromDBServ unavle to fatch data from database");
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}
module.exports = {
  CreateNewCityInDBService,
  GetAllCityFromDBService,
  UpdateACityInDBService,
  DeleteACityInDBService,
  GetACityFromDBService,
};
