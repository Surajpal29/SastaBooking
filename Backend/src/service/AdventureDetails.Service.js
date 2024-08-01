const AdventureDetailsModel = require("./../Model/AdventureDetails.Model");

async function CreateAdventureDetailInDBService(
  adventureId,
  subtitle,
  description,
  slots
) {
  try {
    const result = await AdventureDetailsModel.create({
      adventureId,
      subtitle,
      description,
      slots,
    });
    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error(
        "CreateAdventureDetailInDBService failed to create new AdventureDetail in Db"
      );
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

module.exports = { CreateAdventureDetailInDBService };
