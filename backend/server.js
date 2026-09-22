const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database');
const authRoutes = require('./routes/auth');
const campaignRoutes = require('./routes/campaigns');
const paymentRoutes = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Ads Manager Express API running' });
});

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced successfully');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Database sync error:', err);
});
