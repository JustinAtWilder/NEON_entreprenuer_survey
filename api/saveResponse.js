const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://neon:KwObVHsQ0e0g8i5O@cluster0.ww6f4ap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

let isConnected = false;

const saveResponse = async (req, res) => {
    try {
        if (!isConnected) {
            await client.connect();
            isConnected = true;
        }
        console.log('Received body:', req.body); // Add this line
        const db = client.db('neon');
        const collection = db.collection('survey');
        await collection.insertOne(req.body);
        const docs = await collection.find({}).toArray();
        console.log('Current docs:', docs);
        res.status(200).send('Response saved');
    } catch (err) {
        console.error('Error saving response:', err);
        res.status(500).send('Error saving response');
    }
};

module.exports = saveResponse;