import express from 'express';
const App = express();

App.get('/', (req, res) => {
    res.send('Project is running');
})

export default App;