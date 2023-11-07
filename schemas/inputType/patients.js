const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require('graphql');

const PatientInputType = new GraphQLInputObjectType({
    name: 'PatientInput',
    fields: {
        nhi: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
    },
});

module.exports = PatientInputType;