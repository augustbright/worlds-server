import * as mongoose from 'mongoose';

export const TypeSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  name: mongoose.Schema.Types.String,
  body: mongoose.Schema.Types.Mixed,
});
