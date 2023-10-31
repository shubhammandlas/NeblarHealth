const apiData = require('./externalApi/apiData.json');

console.log('asdda', apiData.length)
apiData.push(
    { "patient": { "nhi": "0", "name": "SSSSSSS " },
         "date": "11/20/2022",
         "medications": { "id": "0fadd516-4257-43be-82b8-e6d7c6b6a13a", "dosage": 4 } }
)

// setTimeout()
setTimeout(()=>{}, 5000);
console.log('apiiii', apiData.length)