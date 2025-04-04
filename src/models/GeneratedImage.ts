import mongoose from 'mongoose'

const GeneratedImageSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const GeneratedImage = mongoose.models.GeneratedImage || mongoose.model('GeneratedImage', GeneratedImageSchema) 