const {
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

const PatientType = new GraphQLObjectType({
    name: 'Patient',
    fields: {
        nhi: { type: GraphQLString },
        name: { type: GraphQLString },
    },
});
module.exports = PatientType;