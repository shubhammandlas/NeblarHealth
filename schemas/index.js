const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const PatientType = require('./typeDefs/patients');
const MedicationType = require('./typeDefs/medications');

const MedicationInputType = require('./inputType/medications');
const PatientInputType = require('./inputType/patients');

const db = require('../models');
const { findOne } = require('../models/user');
const { model: { Prescription } } = db;


const PrescriptionType = new GraphQLObjectType({
    name: 'Prescription',
    fields: {
        _id: { type: GraphQLString },
        patient: { type: PatientType },
        date: { type: GraphQLString },
        medications: { type: new GraphQLList(MedicationType) },
    },
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getPrescription: {
            type: PrescriptionType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return Prescription.findOne({ "patient.nhi": args.id });
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createPrescription: {
            type: PrescriptionType,
            args: {
                patient: { type: new GraphQLNonNull(PatientInputType) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                medications: { type: new GraphQLList(MedicationInputType) },
            },
            resolve(parent, args) {
                // const patient = new Patient({ nhi: args.patientNHI, name: args.patientName });
                console.log('hiiii', args.medications)
                const prescription = new Prescription({
                    patient: args.patient,
                    date: args.date,
                    medications: args.medications,
                });
                return prescription.save();
            },
        },
        updatePrescription: {
            type: PrescriptionType,
            args: {
                // id: { type: new GraphQLNonNull(GraphQLString) },
                patient: { type: PatientInputType },
                date: { type: GraphQLString },
                medications: { type: new GraphQLList(MedicationInputType) },
            },
            async resolve(parent, args) {
                // Update the prescription document with the provided ID
                console.log('hoooo', args)
                const {patient: {nhi}} = args;
                const prescription = await Prescription.findOne({"patient.nhi": nhi});
                Prescription.findOneAndUpdate({"patient.nhi": nhi}, )
                return Prescription.findOneAndUpdate(
                    {"patient.nhi": nhi},
                    { $set: {...args, _id: prescription._id} }, // Update with the provided arguments
                    { new: true } // Return the updated document
                );
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = schema;
