export interface CheckInFormField {
  name: string;
  type: 'textarea' | 'rating' | 'dropdown' | 'checkbox' | 'video' | 'file';
  label: string;
  option?: string | string[];
  rating?: string;
  required: boolean;
  className?: string;
  max_rating?: string;
}

export const checkInFormFields: CheckInFormField[] = [
  {
    name: "textarea_field_name_6357ebcc26e64",
    type: "textarea",
    label: "What was your BIGGEST win for the week",
    option: "",
    rating: "-1",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "textarea_field_name_655f53589abe8",
    type: "textarea",
    label: "Have you noticed any positive changes this week (physical, mental etc.)",
    option: "",
    required: true,
    className: ""
  },
  {
    name: "rating_field_name_6357ebcc26e6b",
    type: "rating",
    label: "How well did you stick to your nutrition last week",
    option: "",
    rating: "6",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "rating_field_name_6357ebcc26e6e",
    type: "rating",
    label: "How was your training performance in the gym this week",
    option: "",
    rating: "6",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "rating_field_name_6357ebcc26e72",
    type: "rating",
    label: "How well did you manage your stress levels this week",
    option: "",
    rating: "6",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "rating_field_name_6357ebcc26e74",
    type: "rating",
    label: "How would you rate your digestion over the past week",
    option: "",
    rating: "4",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "rating_field_name_6357ebcc26e76",
    type: "rating",
    label: "How would rate your energy levels this week?",
    option: "",
    rating: "6",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "rating_field_name_6357ebcc26e77",
    type: "rating",
    label: "How would rate your sleep quality this week?",
    option: "",
    rating: "6",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "textarea_field_name_6357ebcc26e79",
    type: "textarea",
    label: "Any areas you STRUGGLED with and WHY?",
    option: "",
    rating: "-1",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "textarea_field_name_6513bc4664fd1",
    type: "textarea",
    label: "Did you watch a video from the education program inside The Vault this week? If so, which one did you watch and what was the main thing that you learnt from it",
    option: "",
    rating: "-1",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "textarea_field_name_6357ebcc26e7b",
    type: "textarea",
    label: "Have you any questions for me",
    option: "",
    rating: "-1",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "textarea_field_name_6357ebcc26e7c",
    type: "textarea",
    label: "Anything else you think I should know about (upcoming events, travel etc.)",
    option: "",
    rating: "-1",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "dropdown_field_name_6357ebcc26e7e",
    type: "dropdown",
    label: "Are you happy with your rate of progress this week",
    option: ["Yes I am happy this week", "No I am not happy this week"],
    rating: "-1",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "textarea_field_name_6357ebcc26e83",
    type: "textarea",
    label: "What changes are you going to make this week to improve on last week",
    option: ["Yes I am happy this week", "No I am not happy this week"],
    rating: "-1",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "textarea_field_name_655f5358b6112",
    type: "textarea",
    label: "Is there anything more I could be doing for you as a coach? (please be honest here)",
    option: "",
    required: true,
    className: ""
  },
  {
    name: "dropdown_field_name_6431a4fc697a4",
    type: "checkbox",
    label: "Finally, what type of feedback do you want from me this week",
    option: ["Loom video", "Voice note", "Quick Text Message"],
    rating: "-1",
    required: true,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "video_6357ebcc26e71",
    type: "video",
    label: "Please upload your training clips for this week if you have them (Video 1)",
    option: ["Loom video", "Voice note", "Quick Text Message"],
    rating: "-1",
    required: false,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "video_video_64d122554e9b7",
    type: "video",
    label: "Please upload your training clips for this week if you have them (Video 2)",
    option: ["Loom video", "Voice note", "Quick Text Message"],
    rating: "-1",
    required: false,
    className: "form-control",
    max_rating: "-1"
  },
  {
    name: "_field_name_6399da270bf73",
    type: "file",
    label: "Please attach your progress pictures if they are due (every 4 weeks)",
    option: ["Loom video", "Voice note", "Quick Text Message"],
    rating: "-1",
    required: false,
    className: "form-control",
    max_rating: "-1"
  }
]; 