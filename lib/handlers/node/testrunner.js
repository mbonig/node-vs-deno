const AWS = require('aws-sdk');
const util = require('util');
const sleep = util.promisify(setTimeout);

const lambda = new AWS.Lambda();

const nodeFunctionName = process.env.NODE_LAMBDA;
const denoFunctionName = process.env.DENO_LAMBDA;

async function callLambdas() {
    console.log('Invoking lambdas');
    await Promise.all([
        lambda.invoke({FunctionName: nodeFunctionName, InvocationType: 'Event'}).promise(),
        lambda.invoke({FunctionName: denoFunctionName, InvocationType: 'Event'}).promise()
    ]);
}

module.exports.handler = async function (event) {

    console.log({event});
    const timeToRun = +event.timeToRun;
    const batchCount = +event.batchCount || 5;
    const delay = +event.delay || 1000;

    if (timeToRun) {
        console.log('Going to run for a set amount of time');
        let running = true;
        setTimeout(() => {
            running = false;
        }, timeToRun)
        while (running) {
            await callLambdas();
            await sleep(delay);
        }
        console.log('all done running tests...');

    } else {
        for (let i = 0; i < batchCount; i++) {
            await callLambdas();
            await sleep(delay);
        }
    }

}
