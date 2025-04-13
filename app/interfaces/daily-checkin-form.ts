export interface DailyCheckInFormField {
  label: string;
  name: string;
  is_default: string;
  type: 'habit_radio' | 'number' | 'rating' | 'time';
  option: string[];
  required: boolean;
  identified: 'Habit' | 'Progress';
}

export const dailyCheckInFormFields: DailyCheckInFormField[] = [
  {
    label: "Drink 2L water per day",
    name: "habit_radio_field_name_172482914366cecdd74b119",
    is_default: "1",
    type: "habit_radio",
    option: [""],
    required: true,
    identified: "Habit"
  },
  {
    label: "Walk 10,000 steps",
    name: "habit_radio_field_name_172482914366cecdd74b156",
    is_default: "1",
    type: "habit_radio",
    option: [""],
    required: true,
    identified: "Habit"
  },
  {
    label: "Meditate for 10 min",
    name: "habit_radio_field_name_172482914366cecdd74b17c",
    is_default: "1",
    type: "habit_radio",
    option: [""],
    required: true,
    identified: "Habit"
  },
  {
    label: "Get 10 min of sunshine",
    name: "habit_radio_field_name_172482914366cecdd74b1a1",
    is_default: "1",
    type: "habit_radio",
    option: [""],
    required: true,
    identified: "Habit"
  },
  {
    label: "Weight",
    name: "weight",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "HRV",
    name: "hrv",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Fatigue",
    name: "fatigue",
    is_default: "1",
    type: "rating",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Stress",
    name: "stress",
    is_default: "1",
    type: "rating",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Strength",
    name: "strength",
    is_default: "1",
    type: "rating",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Hunger",
    name: "hunger",
    is_default: "1",
    type: "rating",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Sleep",
    name: "sleep",
    is_default: "1",
    type: "time",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Recovery",
    name: "recovery",
    is_default: "1",
    type: "rating",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Energy",
    name: "energy",
    is_default: "1",
    type: "rating",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Digestion",
    name: "digestion",
    is_default: "1",
    type: "rating",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Steps",
    name: "steps",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Glucose level",
    name: "glucose_level",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Waist",
    name: "waist",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Calories",
    name: "calories",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Protein (g)",
    name: "protein",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Fat (g)",
    name: "fat",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Carbs (g)",
    name: "carbs",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Fiber (g)",
    name: "fiber",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Exercise Minutes",
    name: "exercise_minutes",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Active & Resting Energy",
    name: "energy_kcal",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Stand Minutes",
    name: "stand_minutes",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Resting Heart Rate",
    name: "resting_heart_rate",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Walking/Running Distance",
    name: "distance",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Flights climbed",
    name: "flights_climbed",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Respiratory Rate",
    name: "respiratory_rate",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Sleep time",
    name: "sleep_time",
    is_default: "1",
    type: "time",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "Walking Heart Rate Average",
    name: "walking_heart_rate",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  },
  {
    label: "VO2 max",
    name: "vo2_max",
    is_default: "1",
    type: "number",
    option: [],
    required: true,
    identified: "Progress"
  }
]; 