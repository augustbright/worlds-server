import * as mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const typeSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  name: mongoose.Schema.Types.String,
  body: mongoose.Schema.Types.Mixed,
  order: mongoose.Schema.Types.Number,
  deleted: mongoose.Schema.Types.Boolean,
  packageId: mongoose.Schema.Types.ObjectId,
});

typeSchema.index({ name: 'text' });

export { typeSchema };
