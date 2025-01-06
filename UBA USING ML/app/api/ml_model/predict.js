const fs = require('fs');
const { IsolationForest } = require('isolation-forest');

const modelData = fs.readFileSync('isolation_forest_model.json');
const model = IsolationForest.fromJSON(JSON.parse(modelData));

const predict = (inputData) => {
    const prediction = model.predict(inputData);
    return prediction === -1
        ? 'Anomaly Detected (Potential SQL Injection)'
        : 'Normal';
};

const logPrediction = (data, result) => {
    console.log('Input Data:', JSON.stringify(data));
    console.log('Prediction:', result);
};

const analyzeInput = (inputData) => {
    const result = predict(inputData);
    logPrediction(inputData, result);
};

const batchPredict = (dataBatch) => {
    const results = dataBatch.map((data) => ({
        input: data,
        result: predict(data)
    }));
    results.forEach((entry, index) => {
        console.log(`Entry ${index + 1}:`, entry.result);
    });
    return results;
};

const exportResults = (filename, results) => {
    fs.writeFileSync(filename, JSON.stringify(results, null, 2));
    console.log(`Results exported to ${filename}`);
};

const generateTestData = () => {
    return Array.from({ length: 10 }, () => ({
        queryLength: Math.floor(Math.random() * 300),
        specialChars: Math.floor(Math.random() * 25),
        hasKeywords: Math.round(Math.random())
    }));
};

const inputData1 = { queryLength: 250, specialChars: 20, hasKeywords: 1 };
const inputData2 = { queryLength: 100, specialChars: 5, hasKeywords: 0 };
const inputData3 = { queryLength: 300, specialChars: 15, hasKeywords: 1 };

analyzeInput(inputData1);
analyzeInput(inputData2);
analyzeInput(inputData3);

const testDataBatch = generateTestData();
const batchResults = batchPredict(testDataBatch);

exportResults('batch_predictions.json', batchResults);

const countResults = (results) => {
    const anomalyCount = results.filter((res) => res.result === 'Anomaly Detected (Potential SQL Injection)').length;
    const normalCount = results.length - anomalyCount;

    console.log('Summary:');
    console.log(`Anomalies detected: ${anomalyCount}`);
    console.log(`Normal entries: ${normalCount}`);
};

countResults(batchResults);
