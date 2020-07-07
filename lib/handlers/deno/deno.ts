import {createClient} from "https://denopkg.com/chiefbiiko/dynamodb/mod.ts";
import Random from 'https://deno.land/x/random/Random.js'

const dynamo = createClient();
const tableName = Deno.env.get('TABLE');

const filler = {
    id: new Random().string(200)
};

export async function handler(): Promise<string> {
    const startTime = new Date().getTime();
    const results = await runTest(dynamo, tableName!, filler);
    const endTime = new Date().getTime();
    console.log({results, stopwatch: endTime - startTime});
    return `Welcome to deno ${Deno.version.deno}`;
}

export async function runTest(dynamo: any, tableName: string, filler: any): Promise<any> {
    let pk = Math.floor(Math.random() * 10000000).toString();
    const item = {
        pk: pk,
        timestamp: new Date().toISOString(),
        deno: true,
        ...filler
    };
    const writeStart = new Date().getTime();
    await dynamo.putItem({TableName: tableName, Key: {'pk': pk}, Item: item});
    let stopWriteTime = new Date().getTime();
    console.log("Write db record in " + (stopWriteTime - writeStart));

    const readStart = new Date().getTime();
    await dynamo.getItem({TableName: tableName, Key: {'pk': pk}});
    let readStopTime = new Date().getTime();
    console.log("Read db record in " + (readStopTime - readStart));
    return pk;
}
