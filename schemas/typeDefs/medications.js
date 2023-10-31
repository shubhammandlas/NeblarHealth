const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const MedicationType = new GraphQLObjectType({
    name: 'Medication',
    fields: {
        id: { type: GraphQLString },
        dosage: { type: GraphQLString },
    },
});

module.exports = MedicationType