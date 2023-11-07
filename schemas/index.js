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
const { getPrescription, createPrescription, updatePrescription } = require('../service/prescriptionService');


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
                return getPrescription(args);
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
                return createPrescription(args);
            },
        },
        updatePrescription: {
            type: PrescriptionType,
            args: {
                patient: { type: PatientInputType },
                date: { type: GraphQLString },
                medications: { type: new GraphQLList(MedicationInputType) },
            },
            resolve(parent, args) {
                return updatePrescription(args);
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

module.exports = schema;
