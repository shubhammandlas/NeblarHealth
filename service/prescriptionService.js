const db = require('../models');
const deepEqualWithExclusion = require('../common/utils');
const { model: { Prescription } } = db;
const externalApi = require('../externalApi/apiFunctions')

async function getPrescription(args) {
    const apiData = externalApi.getPrescription(args.id)
    await syncExternalDataWithDb(apiData, args.id);
    console.log('apiPres', apiData)
    return apiData;
}

async function createPrescription(args) {
    const prescription = new Prescription({
        patient: args.patient,
        date: args.date,
        medications: args.medications,
    });
    externalApi.addUpdatePrescription(args)
    return prescription.save();
}

async function updatePrescription(args) {
    console.log('hoooo', args)
    const { patient: { nhi } } = args;
    const prescription = await Prescription.findOne({ "patient.nhi": nhi });
    const pres = await Prescription.findOneAndUpdate(
        { "patient.nhi": nhi },
        { $set: { ...args, _id: prescription._id } },
        { new: true, upsert: true }
    );
    externalApi.addUpdatePrescription(args)
    return pres
}

async function syncExternalDataWithDb(apiData, nhi) {
    // const { patient, medications } = apiData;
    const dbData = await Prescription.findOne({ "patient.nhi": nhi });
    const isEqual = deepEqualWithExclusion(dbData, apiData, ["_id"])
    if (!isEqual) {
        await Prescription.findOneAndUpdate(
            { "patient.nhi": nhi },
            { $set: { ...apiData, _id: dbData._id } },
            { new: true, upsert: true }
        );
    }
}

module.exports = {
    getPrescription,
    createPrescription,
    updatePrescription,
}