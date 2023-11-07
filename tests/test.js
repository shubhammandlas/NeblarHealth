jest.mock('../externalApi/apiFunctions', () => ({
  getPrescription: jest.fn(),
  addUpdatePrescription: jest.fn(),
}));

jest.mock('../models', () => ({
  model: {
      Prescription: {
          findOne: jest.fn(),
          findOneAndUpdate: jest.fn(),
          save: jest.fn(),
      },
  },
}));

const externalApi = require('../externalApi/apiFunctions');
//const db = require('../models');
const {
  getPrescription,
  //createPrescription,
  //updatePrescription,
  //syncExternalDataWithDb,
} = require('./../service/prescriptionService'); // Replace with your actual module path

describe('Prescription Functions', () => {
  afterEach(() => {
      jest.clearAllMocks();
  });

  it('should get a prescription', async () => {
      const apiData = {
          "patient": {
              "nhi": "test-nhi",
              "name": "Vonni Craigie"
          },
          "date": "04/15/2004",
          "medications": [
              {
                  "id": "67f10f9c-195e-498b-b61b-d86130085c89",
                  "dosage": "2"
              }
          ]
      };
      externalApi.getPrescription.mockResolvedValue(apiData);
      const args = { id: 123 };
      const result = await getPrescription(args);
      expect(result).toEqual(apiData);
      expect(externalApi.getPrescription).toHaveBeenCalledWith(args.id);
  });

  // it('should create a prescription', async () => {
  //   const args = { patient: 'John', date: '2023-11-02', medications: ['Med1', 'Med2'] };
  //   const prescriptionInstance = args
    
  //   // Mock the Prescription object with a save function
  //   db.model.Prescription = {
  //       save: jest.fn().mockResolvedValue(prescriptionInstance),
  //   };
    
  //   const result = await createPrescription(args);
  //   expect(result).toBe(prescriptionInstance);
  //   expect(db.model.Prescription.save).toHaveBeenCalled();
  //   expect(externalApi.addUpdatePrescription).toHaveBeenCalledWith(args);
  // });


  // it('should update a prescription', async () => {
  //     const args = { patient: { nhi: 'NHI123' } };
  //     const prescriptionData = { /* mock prescription data */ };
  //     db.model.Prescription.findOne.mockResolvedValue(prescriptionData);
  //     db.model.Prescription.findOneAndUpdate.mockResolvedValue(prescriptionData);

  //     const result = await updatePrescription(args);
  //     expect(db.model.Prescription.findOne).toHaveBeenCalledWith({ "patient.nhi": args.patient.nhi });
  //     expect(db.model.Prescription.findOneAndUpdate).toHaveBeenCalledWith(
  //         { "patient.nhi": args.patient.nhi },
  //         { $set: { ...args, _id: prescriptionData._id } },
  //         { new: true, upsert: true }
  //     );
  //     expect(externalApi.addUpdatePrescription).toHaveBeenCalledWith(args);
  //     expect(result).toEqual(prescriptionData);
  // });

  // it('should sync external data with the database', async () => {
  //     const apiData = { /* mock API data */ };
  //     const nhi = 'NHI123';
  //     const dbData = { /* mock database data */ };
  //     db.model.Prescription.findOne.mockResolvedValue(dbData);

  //     await syncExternalDataWithDb(apiData, nhi);
  //     expect(db.model.Prescription.findOne).toHaveBeenCalledWith({ "patient.nhi": nhi });
  //     expect(db.model.Prescription.findOneAndUpdate).toHaveBeenCalledWith(
  //         { "patient.nhi": nhi },
  //         { $set: { ...apiData, _id: dbData._id } },
  //         { new: true, upsert: true }
  //     );
  // });
});