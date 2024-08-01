const httpstatus = require("http-status");
const {
  CreateAdventureDetailInDBService,
} = require("./../service/AdventureDetails.Service");

async function createAdventureDetailController(request, response) {
  try {
    const { adventureid: adventureId } = request.query;
    const { subtitle, description, slots } = request.body;

    const modifiedDateSlots = slots.map((element) => {
      const [day, month, year] = element.date.split("-").map(Number);

      const date = new Date(Date.UTC(year, month - 1, day));

      return {
        date,
        numberOfPerson: element.numberOfPerson,
      };
    });

    const result = await CreateAdventureDetailInDBService(
      adventureId,
      subtitle,
      description,
      modifiedDateSlots
    );

    if (result.success) {
      response.status(httpstatus.CREATED).json({
        success: true,
        data: result.data,
      });
    } else {
      throw new Error(
        "CreateAdventureDetailCollection failed to createAdventureDetail"
      );
    }
  } catch (error) {
    console.log(error);
    response.status(httpstatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        "CreateAdventureDetailCollection did not get result from CreateAdventureDetailInDBService",
    });
  }
}

module.exports = { createAdventureDetailController };
