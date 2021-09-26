import * as mongoose from 'mongoose';

export const profileSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.String,
});
