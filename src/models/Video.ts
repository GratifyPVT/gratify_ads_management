import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IVideo extends Document {
  userId: mongoose.Types.ObjectId;
  url: string;
  publicId: string;
  createdAt: Date;
}

const VideoSchema: Schema<IVideo> = new Schema<IVideo>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Video: Model<IVideo> =
  (mongoose.models.Video as Model<IVideo>) || mongoose.model<IVideo>('Video', VideoSchema);

export default Video;
