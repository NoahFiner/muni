// Google Analytics tracking utilities
// The gtag function is injected by vite-plugin-radar

declare global {
  interface Window {
    gtag: (
      command: "config" | "event",
      targetId: string,
      config?: Record<string, any>,
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  parameters?: Record<string, any>,
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

export const trackQuizStart = () => {
  trackEvent("quiz_start", {
    event_category: "quiz_engagement",
    event_label: "quiz_started",
  });
};

export const trackQuestionComplete = (questionNumber: number, response: string) => {
  trackEvent("question_complete", {
    event_category: "quiz_engagement",
    event_label: `question_${questionNumber}`,
    question_number: questionNumber,
    response: response,
  });
};

export const trackQuizComplete = (personalityResult: string) => {
  trackEvent("quiz_complete", {
    event_category: "quiz_engagement",
    event_label: "quiz_completed",
    personality_result: personalityResult,
  });
};

export const trackQuizDropoff = (questionNumber: number) => {
  trackEvent("quiz_dropoff", {
    event_category: "quiz_engagement",
    event_label: `dropoff_question_${questionNumber}`,
    question_number: questionNumber,
  });
};
