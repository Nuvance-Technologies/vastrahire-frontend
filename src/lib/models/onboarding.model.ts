import mongoose, { Schema, Document } from "mongoose";

export interface OnboardingAnswers extends Document {
  userId: string;
  answers: Record<string, string[]>; // key: question id, value: array of selected option ids
}

const OnboardingSchema = new Schema<OnboardingAnswers>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  answers: {
    type: Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true });

const Onboarding = mongoose.models.Onboarding || mongoose.model<OnboardingAnswers>("Onboarding", OnboardingSchema);

export default Onboarding;
