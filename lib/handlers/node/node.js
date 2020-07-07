const crypto = require("crypto");
const id = crypto.randomBytes(100).toString('hex');

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE;
const filler = {
    id
};

module.exports.handler = async function () {
    const startTime = new Date();
    const results = await runTest(ddb, tableName, filler);
    const endTime = new Date();
    console.log({results, stopwatch: endTime - startTime});
    return ``;
};

async function runTest(dynamo, tableName, filler) {
    let pk = Math.floor(Math.random() * 10000000).toString();
    const item = {
        pk: pk,
        timestamp: new Date().toISOString(),
        node: true,
        ...filler
    };
    await dynamo.put({TableName: tableName, Key: {'pk': pk}, Item: item}).promise();
    await dynamo.get({TableName: tableName, Key: {'pk': pk}}).promise();
    return pk;
}
