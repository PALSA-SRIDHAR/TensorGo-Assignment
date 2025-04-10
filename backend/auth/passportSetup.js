const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const Invoice = require('../models/Invoice');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

passport.use(new GoogleStrategy({
  clientID: /*'183794321619-rpcp0mv3u3jk0h2krmidgil6nclh03g0.apps.googleusercontent.com'*/"",
  clientSecret: /*'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'*/"",
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    }).save();
    await new Invoice({
      userId: user._id,
      clientEmail: user.email,
      amount: 2500,
      dueDate: new Date("2025-04-19"),
      status: "due",
      remindersSent: []   
    }).save();
    await new Invoice({
      userId: user._id,
      clientEmail: user.email,
      amount: 900,
      dueDate: new Date("2025-04-23"),
      status: "due",
      remindersSent: []   
    }).save();

  }
  done(null, user);
}));
