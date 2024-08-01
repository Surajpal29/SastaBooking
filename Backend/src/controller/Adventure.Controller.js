const status = require("http-status");
const {
  CreateNewAdventureInDBService,
  GetAllAdventuresInACityFromDBService,
  DeleteAAdventureInDBService,
  UpdateAAAdventureInDBService,
} = require("./../service/Adventure.Service");

/*************************************************************
 * CreateNewAdventureController
 *
 * This function is a controller that handles the creation of a new adventure in a specific city.
 * It extracts the city ID from the request query parameters, retrieves adventure details from the
 * request body, calls a service to create the new adventure in the database, and sends an appropriate
 * response based on the success of the service call.
 *
 * @param {object} request - The HTTP request object.
 * @param {object} request.query - The query parameters of the request.
 * @param {string} request.query.cityid - The ID of the city where the adventure will be created.
 * @param {object} request.body - The body of the request containing adventure details.
 * @param {string} request.body.name - The name of the adventure.
 * @param {string} request.body.category - The category of the adventure.
 * @param {array} request.body.images - The images of the adventure.
 * @param {string} request.body.duration - The duration of the adventure.
 * @param {number} request.body.pricePerHead - The price per head for the adventure.
 * @param {object} response - The HTTP response object.
 * @param {function} response.status - Function to set the HTTP status code of the response.
 * @param {function} response.json - Function to send a JSON response.
 *
 * @return {void}
 *
 * @throws {Error} If the service call does not return a successful result.
 *************************************************************/
async function CreateNewAdvewntureController(request, response) {
  try {
    const { cityid: cityId } = request.query;
    const { name, category, images, duration, pricePerHead } = request.body;

    console.log(cityId);
    const result = await CreateNewAdventureInDBService(
      cityId,
      name,
      category,
      images,
      duration,
      pricePerHead
    );

    if (result.success) {
      response.status(200).json({
        success: true,
        data: result.data,
      });
    } else {
      throw new Error(
        "CreateNewAdventureController failed to create a new Adventure"
      );
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: true,
      message: "Error while creating new Adventure in collection",
    });
  }
}

/*************************************************************
 * GetAllAdventuresInACityController
 *
 * This function is a controller that handles the retrieval of all adventures in a specific city.
 * It extracts the city ID from the request query parameters, calls a service to get the adventures
 * data from the database, and sends an appropriate response based on the success of the service call.
 *
 * @param {object} request - The HTTP request object.
 * @param {object} request.query - The query parameters of the request.
 * @param {string} request.query.cityid - The ID of the city for which to get the adventures.
 * @param {object} response - The HTTP response object.
 * @param {function} response.status - Function to set the HTTP status code of the response.
 * @param {function} response.json - Function to send a JSON response.
 *
 * @return {void}
 *
 * @throws {Error} If the service call does not return a successful result.
 *************************************************************/
async function GetAllAdventuresInACityController(request, response) {
  try {
    const { cityid: cityId } = request.query;

    const result = await GetAllAdventuresInACityFromDBService(cityId);

    if (result.success) {
      const Data = result.data.map((city) => {
        const {
          _id,
          cityId,
          category,
          images,
          duraton,
          preicePerHead,
          Currency,
          name,
        } = city;
        return {
          id: _id,
          cityId,
          category,
          images,
          duraton,
          preicePerHead,
          Currency,
          name,
        };
      });
      response.status(status.OK).json({
        success: true,
        data: Data,
      });
    } else {
      throw new Error(
        "GetAllAdventuresInACityController did not get result from GetallAdventuresInACityService"
      );
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: true,
      message: "Error while geting Adventure in collection",
    });
  }
}

/*************************************************************
 * DeleteAAdeventureController
 *
 * This function is a controller that handles the deletion of a Adventure,
 * It extracts the city ID from the request query parameters, calls a service to delete the adventure in the database,
 * and sends an appropriate response based on the success of the service call.
 *
 * @param {object} request -The HTTP request object.
 * @param {object} request.query - The query parameters of the request.
 * @param {string} request.query.cityid - The ID of the city where the adventure will be created.
 * @param {object} response - The HTTP response object.
 * @param {function} response.status - Function to set the HTTP status code of the response.
 * @param {function} response.json - Function to send a JSON response.
 *
 * @return {void}
 *
 * @throws {Error} If the service call does not return a successful result.
 * ***********************************************************/
async function DeleteAAAdventureController(request, response) {
  try {
    const { cityid: cityId } = request.query;
    const result = await DeleteAAdventureInDBService(cityId);

    if (result.success) {
      response.status(status.OK).json({
        success: true,
        data: result.data,
      });
    } else {
      throw new Error(
        "DeleteAAAdventureController did not get recult from the DeleteAAdventureService"
      );
    }
  } catch (error) {
    console.log(error);
    response.status(status.error).json({
      success: false,
      message: "error while deleting the adventure in controller",
    });
  }
}

/***********************************************************
 * UpdateAAventureController
 *
 * This function is a controller that handles the updation of a  adventure in a specific city.
 * It extracts the city ID from the request query parameters, retrieves adventure details from the
 * request body, calls a service to update the adventure in the database, and sends an appropriate
 * response based on the success of the service call.
 *
 * @param {object} request - The HTTP request object.
 * @param {object} request.query - The query parameters of the request.
 * @param {string} request.query.cityid - The ID of the city where the adventure will be created.
 * @param {object} request.body - The body of the request containing adventure details.
 * @param {string} request.body.name - The name of the adventure.
 * @param {string} request.body.category - The category of the adventure.
 * @param {array} request.body.images - The images of the adventure.
 * @param {string} request.body.duration - The duration of the adventure.
 * @param {number} request.body.pricePerHead - The price per head for the adventure.
 * @param {string} request.body.Currency -the currency of the country
 * @param {object} response - The HTTP response object.
 * @param {function} response.status - Function to set the HTTP status code of the response.
 * @param {function} response.json - Function to send a JSON response.
 *
 * @return {void}
 *
 * @throws {Error} If the service call does not return a successful result.
 *************************************************************/
async function UpdateAAdventureController(request, response) {
  try {
    const { adventureid: adventureId } = request.query;
    const { category, images, duration, pricePerHead, Currency, name } =
      request.body;

    const DATA = {};

    if (category) DATA.category = category;
    if (images) DATA.images = images;
    if (duration) DATA.duration = duration;
    if (pricePerHead) DATA.pricePerHead = pricePerHead;
    if (Currency) DATA.Currency = Currency;
    if (name) DATA.name = name;

    const result = await UpdateAAAdventureInDBService(adventureId, DATA);

    if (result.success) {
      response.status(status.OK).json({
        success: true,
        message: "updated successfully",
        data: result.data,
      });
    } else {
      throw new Error(
        "UpdateAAdventureController did not get result from UpdateAAdventureInDBService"
      );
    }
  } catch (error) {
    console.log(error);
    response.status(status.error).json({
      success: false,
    });
  }
}

module.exports = {
  CreateNewAdvewntureController,
  GetAllAdventuresInACityController,
  DeleteAAAdventureController,
  UpdateAAdventureController,
};
