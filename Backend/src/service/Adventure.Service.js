const AdventureModel = require("./../Model/Adventure.Model");

async function CreateNewAdventureInDBService(
  cityId,
  name,
  category,
  images,
  duration,
  pricePerHead
) {
  try {
    const result = await AdventureModel.create({
      cityId,
      name,
      category,
      images,
      duration,
      pricePerHead,
    });

    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error(
        "CreateNewAdventureInDBService failed to create a new Adventure"
      );
    }
  } catch (error) {
    console.log(error);
    return {
      succes: false,
    };
  }
}

async function GetAllAdventuresInACityFromDBService(cityId) {
  try {
    const result = await AdventureModel.find({ cityId });

    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error(
        `GetAllAdventuresInACityFromDBService failed to find any Adventure with id ${cityId}`
      );
    }
  } catch (error) {
    console.log(error);
    return {
      succes: false,
    };
  }
}

async function DeleteAAdventureInDBService(cityId) {
  try {
    const result = await AdventureModel.findByIdAndDelete(cityId);
    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error(
        `DeleteAAAdventureInDBService failed to delete ${cityId}`
      );
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

async function UpdateAAAdventureInDBService(adventureId, DATA) {
  try {
    const { category, images, duration, pricePerHead, Currency, name } = DATA;

    const AdvntureDocument = await AdventureModel.findById(adventureId);
    // console.log(AdvntureDocument);

    if (category) {
      AdvntureDocument.category = category;
    }
    if (images) {
      AdvntureDocument.images = images;
    }
    if (duration) {
      AdvntureDocument.duration = duration;
    }
    if (pricePerHead) {
      AdvntureDocument.pricePerHead = pricePerHead;
    }
    if (Currency) {
      AdvntureDocument.currency = Currency;
    }
    if (name) {
      AdvntureDocument.name = name;
    }

    // console.log(AdvntureDocument);
    const result = await AdvntureDocument.save();
    console.log(result);
    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      throw new Error(
        "UpdateAAdvertureInDbServie failed to upload the Adventure data"
      );
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

module.exports = {
  CreateNewAdventureInDBService,
  GetAllAdventuresInACityFromDBService,
  DeleteAAdventureInDBService,
  UpdateAAAdventureInDBService,
};
