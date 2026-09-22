const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.post('/upgrade', async (req, res) => {
  try {
    const { userId, plan } = req.body;
    const user = await User.findByPk(userId);
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    if (plan === 'starter') {
      user.available_credits += 75;
    } else if (plan === 'normal') {
      user.available_credits += 1000;
    } else if (plan === 'premium') {
      user.is_premium = true;
    }
    
    await user.save();

    res.json({ message: 'Upgraded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
