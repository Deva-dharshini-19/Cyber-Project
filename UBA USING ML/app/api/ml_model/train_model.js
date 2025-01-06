const fs = require('fs');
const { IsolationForest } = require('isolation-forest');

const loadDataset = (filePath) => {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));
        console.log('Dataset loaded successfully.');
        return data;
    } catch (error) {
        console.error('Failed to load dataset:', error.message);
        process.exit(1);
    }
};

const trainModel = (dataset) => {
    const model = new IsolationForest();
    console.log('Training model...');
    model.fit(dataset);
    console.log('Model training completed.');
    return model;
};

const saveModel = (model, filePath) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(model.toJSON()));
        console.log(`Model saved as ${filePath}`);
    } catch (error) {
        console.error('Failed to save model:', error.message);
    }
};

const evaluateDataset = (dataset, model) => {
    let anomalyCount = 0;
    dataset.forEach((data) => {
        if (model.predict(data) === -1) {
            anomalyCount++;
        }
    });
    console.log('Dataset Evaluation:');
    console.log(`Total data points: ${dataset.length}`);
    console.log(`Anomalies detected: ${anomalyCount}`);
};

const filePath = 'dataset.json';
const modelOutputPath = 'isolation_forest_model.json';

const dataset = loadDataset(filePath);
const model = trainModel(dataset);
saveModel(model, modelOutputPath);
evaluateDataset(dataset, model);

const generateTestData = (size) => {
    return Array.from({ length: size }, () => ({
        queryLength: Math.floor(Math.random() * 300),
        specialChars: Math.floor(Math.random() * 25),
        hasKeywords: Math.round(Math.random())
    }));
};

const testDataset = generateTestData(10);
const evaluateTestData = (testDataset, model) => {
    console.log('\nEvaluating Test Data:');
    testDataset.forEach((data, index) => {
        const prediction = model.predict(data);
        const result = prediction === -1 ? 'Anomaly' : 'Normal';
        console.log(`Test Data ${index + 1}: ${result}`);
    });
};

evaluateTestData(testDataset, model);
console.log('Process completed successfully.');
