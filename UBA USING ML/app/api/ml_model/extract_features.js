const fs = require('fs');

const extractFeatures = (query) => {
    const specialCharRegex = /['";\-]/g;
    const keywordRegex = /(DROP|UNION|OR|--|SELECT|DELETE|INSERT)/i;

    return {
        queryLength: query.length,
        specialChars: (query.match(specialCharRegex) || []).length,
        hasKeywords: keywordRegex.test(query) ? 1 : 0
    };
};

const queries = [
    "SELECT * FROM users WHERE id = 1;",
    "SELECT * FROM users WHERE id = 1 OR '1'='1';",
    "DROP TABLE users; --;",
    "UPDATE accounts SET balance = 1000 WHERE user_id = 5;",
    "SELECT username FROM admin WHERE username = 'admin';",
    "INSERT INTO logs (action, user_id) VALUES ('login', 1);",
    "DELETE FROM sessions WHERE session_id = 'abc123';",
    "SELECT * FROM products WHERE price > 100;",
    "UNION SELECT password FROM admin; --",
    "DROP DATABASE example_db;"
];

const additionalQueries = [
    "SELECT * FROM orders WHERE order_id = 10;",
    "INSERT INTO cart (user_id, product_id) VALUES (2, 3);",
    "DELETE FROM cart WHERE user_id = 1;",
    "SELECT COUNT(*) FROM users;",
    "SELECT * FROM logs WHERE action = 'delete';",
    "UPDATE products SET stock = 50 WHERE product_id = 10;",
    "DROP TABLE customers; --;",
    "SELECT * FROM accounts WHERE balance < 0;",
    "INSERT INTO users (username, password) VALUES ('new_user', 'password123');",
    "DELETE FROM logs WHERE action = 'error';"
];

const allQueries = queries.concat(additionalQueries);

const features = allQueries.map(extractFeatures);

const generateDataset = (data) => {
    return data.map((query, index) => {
        const features = extractFeatures(query);
        return {
            id: index + 1,
            query,
            ...features
        };
    });
};

const dataset = generateDataset(allQueries);

fs.writeFileSync('dataset.json', JSON.stringify(dataset, null, 2));

const additionalAnalysis = dataset.filter((item) => item.specialChars > 5);
const highKeywordQueries = dataset.filter((item) => item.hasKeywords === 1);

const createSummary = () => {
    const totalQueries = dataset.length;
    const totalWithSpecialChars = additionalAnalysis.length;
    const totalWithKeywords = highKeywordQueries.length;

    return {
        totalQueries,
        totalWithSpecialChars,
        totalWithKeywords
    };
};

const summary = createSummary();

fs.writeFileSync('summary.json', JSON.stringify(summary, null, 2));

const logResults = () => {
    console.log('Dataset generated and saved as dataset.json');
    console.log('Summary of dataset:');
    console.log(`Total queries: ${summary.totalQueries}`);
    console.log(`Queries with special characters: ${summary.totalWithSpecialChars}`);
    console.log(`Queries with keywords: ${summary.totalWithKeywords}`);
};

logResults();

const exportAnalysis = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

exportAnalysis('special_char_analysis.json', additionalAnalysis);
exportAnalysis('keyword_analysis.json', highKeywordQueries);

console.log('Additional analyses exported.');
console.log('Feature extraction completed.');
