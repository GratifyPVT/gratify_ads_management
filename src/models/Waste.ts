import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IWaste extends Document {
  type: string;
  imageUrl: string;
  publicId: string;
  binlocation: string;
  disposedAt: Date;
  editedtype?: string;
}

const WasteSchema:Schema<IWaste> = new Schema({
    type: {
    type: String,
    required: true,
  },
    imageUrl: {
    type: String,
    required: true,
  },
    publicId: {
    type: String,
    required: true,
    },
    binlocation: {
    type: String,
    required: true,
    },
    disposedAt: {
    type: Date, 
    default: Date.now,
    },
    editedtype: {
    type: String,
    },

})

const Waste:Model<IWaste>=mongoose.model<IWaste>('Waste', WasteSchema);

export default Waste;