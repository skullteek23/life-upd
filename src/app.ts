import express from 'express';
const App = express();

App.get('/', (req, res) => {

    // Insert HTML here
    res.send('Project is running');
})

export default App;