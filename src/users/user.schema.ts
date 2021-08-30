import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,

  googleId: mongoose.Schema.Types.String,
});
