import * as mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const packageSchema = new mongoose.Schema({
  authorId: mongoose.Schema.Types.ObjectId,
  name: mongoose.Schema.Types.String,
});

packageSchema.index({ name: 'text' });

export { packageSchema };
