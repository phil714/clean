import mongoose, { Schema } from 'mongoose';

export const ThrashSchema = new mongoose.Schema(
  {
    geolocation: String,
    name: String,
    isFull: Boolean
  },
  { versionKey: false }
);

ThrashSchema.set('toJSON', {
  transform: function(doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const Thrash = mongoose.model('Thrash', ThrashSchema);
