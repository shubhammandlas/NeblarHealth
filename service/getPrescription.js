const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const MedicationInputType = require('./inputType/medications');
const PatientInputType = require('./inputType/patients');

const db = require('../models');
const { model: { Prescription } } = db;

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getPrescription: {
            type: PrescriptionType,
            args: { id: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log('hurrrrrrr', args)
                const item = await Prescription.findOne({"patient.nhi": args.id});
                console.log('sdasda', item);
                return item;
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
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = schema;
