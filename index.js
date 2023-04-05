const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJsDocs = YAML.load('./api.yaml');
const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});