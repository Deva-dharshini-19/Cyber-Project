const fs = require('fs');
const { IsolationForest } = require('isolation-forest');

const dataset = JSON.parse(fs.readFileSync('dataset.json'));
const modelData = fs.readFileSync('isolation_forest_model.json');
const model = IsolationForest.fromJSON(JSON.parse(modelData));

const anomalyDetails = [];
let anomalies = 0;
let totalNormal = 0;

dataset.forEach((data, index) => {
    const prediction = model.predict(data);
    if (prediction === -1) {
        anomalies++;
        anomalyDetails.push({ index, data, status: 'Anomalous' });
    } else {
        totalNormal++;
    }
});

const formatDetails = (details) => {
    return details.map((item, idx) => `Item ${idx + 1}: ${JSON.stringify(item)}`).join('\n');
};

const logSummary = () => {
    console.log(`Total data points: ${dataset.length}`);
    console.log(`Anomalies detected: ${anomalies}`);
    console.log(`Normal entries: ${totalNormal}`);
};

const exportResults = () => {
    const output = {
        totalPoints: dataset.length,
        anomalies,
        totalNormal,
        details: anomalyDetails
    };
    fs.writeFileSync('evaluation_results.json', JSON.stringify(output, null, 2));
    console.log('Results exported to evaluation_results.json');
};

const processBatch = (batchSize) => {
    let batchAnomalies = 0;
    for (let i = 0; i < dataset.length; i += batchSize) {
        const batch = dataset.slice(i, i + batchSize);
        batch.forEach((data) => {
            const prediction = model.predict(data);
            if (prediction === -1) {
                batchAnomalies++;
            }
        });
    }
    console.log(`Batch processing completed. Anomalies found in batch: ${batchAnomalies}`);
};

const executeEvaluation = () => {
    dataset.forEach((data, index) => {
        const isAnomalous = model.predict(data) === -1;
        if (isAnomalous) {
            anomalies++;
            anomalyDetails.push({ index, status: 'Anomaly', data });
        } else {
            totalNormal++;
        }
    });
    logSummary();
};

const generateTestData = () => {
    const randomData = Array.from({ length: 10 }, () => ({
        queryLength: Math.floor(Math.random() * 300),
        specialChars: Math.floor(Math.random() * 20),
        hasKeywords: Math.round(Math.random())
    }));
    fs.writeFileSync('test_dataset.json', JSON.stringify(randomData, null, 2));
    console.log('Test dataset generated as test_dataset.json');
};

executeEvaluation();
exportResults();
processBatch(10);
generateTestData();
logSummary();
console.log(formatDetails(anomalyDetails));
