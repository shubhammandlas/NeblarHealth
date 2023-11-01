// Import necessary dependencies and your GraphQL schema
const { graphql } = require('graphql');
const schema = require('../schemas/index'); // Import your GraphQL schema

describe('GraphQL API Tests', () => {
  it('should return a prescription by id', async () => {
    const query = `
      query {
        getPrescription(id: "test-nhi") {
          _id
          patient {
            nhi
          }
          date
        }
      }
    `;

    const result = await graphql(schema, query);
      console.log('testttt', result)
    // Check if the response contains the expected data
    expect(result.data.getPrescription.patient.nhi).toBe('test-nhi');
  });

//   it('should add a new prescription', async () => {
//     const mutation = `
//       mutation {
//         createPrescription(input: {
//           patient: {
//             nhi: "new-nhi",
//             name: "John Doe"
//           },
//           date: "2023-11-01",
//           medications: [
//             { id: "med-1", dosage: "10mg" }
//           ]
//         }) {
//           _id
//           patient {
//             nhi
//           }
//           date
//         }
//       }
//     `;

//     const result = await graphql(schema, mutation);

//     // Check if the response contains the expected data
//     expect(result.data.createPrescription.patient.nhi).toBe('new-nhi');
//   });

//   it('should update an existing prescription', async () => {
//     const mutation = `
//       mutation {
//         updatePrescription(id: "your-prescription-id", input: {
//           patient: {
//             nhi: "updated-nhi",
//             name: "Jane Doe"
//           },
//           date: "2023-11-02"
//         }) {
//           _id
//           patient {
//             nhi
//           }
//           date
//         }
//       }
//     `;

//     const result = await graphql(schema, mutation);

//     // Check if the response contains the expected data
//     expect(result.data.updatePrescription.patient.nhi).toBe('updated-nhi');
//   });
});
