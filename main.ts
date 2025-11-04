// Survey content structure.
// Survey -> questions -> options.
interface Option {
  id: string;
  text: string;
  isLift: boolean;
}

interface Question {
  id: string;
  title: string;
  options: Option[];
}

interface Survey {
  id: string;
  title: string;
  questions: Question[];
}

// Survey results structure.
// Survey results -> question results -> option results.
interface OptionResults {
  optionId: string;
  selectionCount: number;
}

interface QuestionResults {
  questionId: string;
  optionResults: OptionResults[];
}

interface SurveyResults {
  surveyId: string;
  responseCount: number;
  questionResults: QuestionResults[];
}

// Types of lift:
// Absolute lift is the test group response rate minus the control group response rate.
// Relative Lift is the test group response rate divided by the control group response rate - 100%.
// For example: option A has response rate of 10% in the test group and 5% in the control group.
// The relative lift is (10% / 5% - 1) = +100%. (i.e. the test group is 2x [or 100% more than] the response rate of the control group).
// The absolute lift is 10% - 5% = +5PTS. (i.e. the test group is 5 percentage points more than the response rate of the control group).
type LiftFormat = "RELATIVE" | "ABSOLUTE";

function getOptionResponseRate(
  questionId: string,
  optionId: string,
  surveyResults: SurveyResults
): number {
  // Given an option, return the option response rate as a percentage (the #selections / #surveyResponses).
  return 0;
}

function getOptionLift(
  questionId: string,
  optionId: string,
  controlResults: SurveyResults,
  testResults: SurveyResults,
  liftFormat: LiftFormat
): string {
  // Given an option, return the formatted lift as a string in the correct format.
  return "";
}

// -- END (tests below) --

// Mock data.
const testSurvey: Survey = {
  id: "1",
  title: "Test Survey",
  questions: [
    {
      id: "1",
      title: "Test Question",
      options: [
        { id: "1", text: "Test Option 1", isLift: true },
        { id: "2", text: "Test Option 2", isLift: false },
      ],
    },
    {
      id: "2",
      title: "Test Question 2",
      options: [
        { id: "3", text: "Test Option 3", isLift: true },
        { id: "4", text: "Test Option 4", isLift: false },
        { id: "5", text: "Test Option 5", isLift: true },
      ],
    },
  ],
};

const testSurveyResults: SurveyResults = {
  surveyId: "1",
  responseCount: 100,
  questionResults: [
    {
      questionId: "1",
      optionResults: [
        { optionId: "1", selectionCount: 30 },
        { optionId: "2", selectionCount: 70 },
      ],
    },
    {
      questionId: "2",
      optionResults: [
        { optionId: "3", selectionCount: 40 },
        { optionId: "4", selectionCount: 20 },
        { optionId: "5", selectionCount: 40 },
      ],
    },
  ],
};

const controlSurveyResults: SurveyResults = {
  surveyId: "1",
  responseCount: 200,
  questionResults: [
    {
      questionId: "1",
      optionResults: [
        { optionId: "1", selectionCount: 190 },
        { optionId: "2", selectionCount: 10 },
      ],
    },
    {
      questionId: "2",
      optionResults: [
        { optionId: "3", selectionCount: 50 },
        { optionId: "4", selectionCount: 80 },
        { optionId: "5", selectionCount: 70 },
      ],
    },
  ],
};

// Mock tests.
// Response rate.
if (getOptionResponseRate("1", "1", testSurveyResults) !== 0.3) {
  console.error(
    "Test failed: getOptionResponseRate('1', '1', testSurveyResults) !== 0.3"
  );
}

if (getOptionResponseRate("1", "2", testSurveyResults) !== 0.7) {
  console.error(
    "Test failed: getOptionResponseRate('1', '2', testSurveyResults) !== 0.7"
  );
}

if (getOptionResponseRate("1", "1", controlSurveyResults) !== 0.95) {
  console.error(
    "Test failed: getOptionResponseRate('1', '1', controlSurveyResults) !== 0.95"
  );
}

// Lift calculations.
if (
  getOptionLift(
    "1",
    "1",
    controlSurveyResults,
    testSurveyResults,
    "RELATIVE"
  ) !== "-68%"
) {
  console.error(
    "Test failed: getOptionLift('1', '1', controlSurveyResults, testSurveyResults, LiftFormat.RELATIVE) !== -68%"
  );
}

if (
  getOptionLift(
    "1",
    "1",
    controlSurveyResults,
    testSurveyResults,
    "ABSOLUTE"
  ) !== "-65PTS"
) {
  console.error(
    "Test failed: getOptionLift('1', '1', controlSurveyResults, testSurveyResults, LiftFormat.RELATIVE) !== -65PTS"
  );
}

if (
  getOptionLift(
    "2",
    "3",
    controlSurveyResults,
    testSurveyResults,
    "RELATIVE"
  ) !== "+60%"
) {
  console.error(
    "Test failed: getOptionLift('2', '3', controlSurveyResults, testSurveyResults, LiftFormat.RELATIVE) !== +60%"
  );
}

if (
  getOptionLift(
    "2",
    "3",
    controlSurveyResults,
    testSurveyResults,
    "ABSOLUTE"
  ) !== "+15PTS"
) {
  console.error(
    "Test failed: getOptionLift('2', '3', controlSurveyResults, testSurveyResults, LiftFormat.ABSOLUTE) !== +15PTS"
  );
}
