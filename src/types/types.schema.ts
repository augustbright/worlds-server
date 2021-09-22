import * as mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const typeSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  name: mongoose.Schema.Types.String,
  body: mongoose.Schema.Types.Mixed,
});

typeSchema.index({ name: 'text' });

export { typeSchema };
