import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    userweeks: [
      {
        week: { type: String },
        picks: { type: Array },
        score: { type: Number }
      }
    ],
    weekscore: { type: Number },
    totalscore: { type: Number }
  },
  { collection: 'user' }
);

const user = mongoose.model('user', UserSchema);

export default user;
