const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const MedicationInputType = new GraphQLInputObjectType({
    name: 'MedicationInput',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        dosage: { type: new GraphQLNonNull(GraphQLString) },
    },
});

module.exports = MedicationInputType;