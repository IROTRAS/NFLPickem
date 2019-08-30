import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ScheduleSchema = new Schema({
  week: { type: String },
  games: {
    date: Date,
    start: String,
    away: String,
    home: String
  },
  results: { type: Array },
  byeteams: { type: Array },
  active: { type: Boolean }
}, { collection: 'schedule' });

export default mongoose.model('schedule', ScheduleSchema);