import { create } from "zustand";
import type { CareerStream } from "../types";

interface QuizStoreState {
  currentIndex: number;
  answers: Record<number, number>;
  completed: boolean;
  recommendedStream: CareerStream | null;
  setAnswer: (questionId: number, optionId: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  completeQuiz: (stream: CareerStream) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizStoreState>((set) => ({
  currentIndex: 0,
  answers: {},
  completed: false,
  recommendedStream: null,

  setAnswer: (questionId, optionId) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId },
    })),

  nextQuestion: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),

  prevQuestion: () =>
    set((state) => ({
      currentIndex: Math.max(0, state.currentIndex - 1),
    })),

  completeQuiz: (stream) => set({ completed: true, recommendedStream: stream }),

  resetQuiz: () =>
    set({
      currentIndex: 0,
      answers: {},
      completed: false,
      recommendedStream: null,
    }),
}));
