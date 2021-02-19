const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Configure morgan middlewarare
const morgan = require('morgan');
const helmet = require('helmet');
const db = require('./Config/db');

const app = express();

// Configure body-parser before routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Security settings
app.use(helmet());

//Routes
const userRoutes = require('./Routes/users');
const materialRoutes = require('./Routes/materials');
const officeRoutes = require('./Routes/offices');
const reservationRoutes = require('./Routes/reservations');
const leaveRoutes = require('./Routes/leaves');

app.use(cookieParser('secret'));
app.use('/api', userRoutes);
app.use('/api', materialRoutes);
app.use('/api', officeRoutes);
app.use('/api', reservationRoutes);
app.use('/api', leaveRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));