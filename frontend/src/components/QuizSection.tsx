import React, { useState } from 'react';
import { Quiz } from '../types';
import { QUIZZES } from '../data/nexusData';
import { HelpCircle, CheckCircle2, XCircle, Award, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizSectionProps {
  onCompleteQuiz: (quizId: string, score: number, badgeName: string) => void;
  completedQuizzes: Record<string, number>;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onCompleteQuiz,
  completedQuizzes,
}) => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const submitAnswer = () => {
    if (selectedOption === null || !activeQuiz) return;

    setIsSubmitted(true);
    const currentQ = activeQuiz.questions[currentQuestionIdx];
    if (selectedOption === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestionIdx + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      const finalScorePct = Math.round((score / activeQuiz.questions.length) * 100);
      onCompleteQuiz(activeQuiz.id, finalScorePct, activeQuiz.badgeEarned);
    }
  };

  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] text-xs font-bold uppercase">
          <HelpCircle className="w-4 h-4" />
          <span>Certification Quizzes</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
          Interactive AI & Sustainability Quizzes
        </h1>
        <p className="text-gray-300 text-sm">
          Test your knowledge, earn official track certification badges, and boost your platform rank.
        </p>
      </div>

      {!activeQuiz ? (
        /* Quiz Selection Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUIZZES.map((quiz) => {
            const previousScore = completedQuizzes[quiz.id];
            const isCompleted = previousScore !== undefined;

            return (
              <div
                key={quiz.id}
                className="bg-[#0d1424] border border-gray-800 rounded-3xl p-6 space-y-4 hover:border-[#06b6d4]/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#06b6d4]/20 text-[#06b6d4] text-[10px] font-bold uppercase">
                      {quiz.category}
                    </span>
                    {isCompleted && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {previousScore}%
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-bold text-white">{quiz.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{quiz.description}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-2.5 bg-[#0a0e1a] rounded-xl border border-gray-800 text-[11px] text-gray-400 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Badge: <strong>{quiz.badgeEarned}</strong></span>
                  </div>

                  <button
                    onClick={() => startQuiz(quiz)}
                    className="w-full py-2.5 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white font-bold text-xs rounded-xl hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isCompleted ? 'Retake Quiz' : 'Start Quiz'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : quizFinished ? (
        /* Quiz Summary Screen */
        <div className="bg-[#0d1424] border border-[#06b6d4]/40 rounded-3xl p-8 text-center space-y-6 max-w-lg mx-auto shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#06b6d4]/20 border border-[#06b6d4]/40 flex items-center justify-center text-[#06b6d4]">
            <Sparkles className="w-8 h-8 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display text-2xl font-extrabold text-white">
              Quiz Completed!
            </h2>
            <p className="text-gray-300 text-sm">
              You scored <strong>{score}</strong> out of <strong>{activeQuiz.questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-[#0a0e1a] rounded-2xl border border-gray-800 space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Badge Unlocked</span>
            <div className="text-base font-extrabold text-[#06b6d4]">{activeQuiz.badgeEarned}</div>
            <span className="text-xs text-emerald-400 font-semibold">+100 Points Earned</span>
          </div>

          <button
            onClick={() => setActiveQuiz(null)}
            className="w-full py-3 bg-[#06b6d4] hover:bg-[#22d3ee] text-[#0a0e1a] font-bold text-sm rounded-xl cursor-pointer transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      ) : (
        /* Question Active View */
        <div className="bg-[#0d1424] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn max-w-2xl mx-auto shadow-2xl">
          {/* Progress header */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 border-b border-gray-800 pb-3">
            <span>Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}</span>
            <span className="text-[#06b6d4]">{activeQuiz.title}</span>
          </div>

          {/* Question Text */}
          <h2 className="font-display text-lg sm:text-xl font-extrabold text-white">
            {activeQuiz.questions[currentQuestionIdx].question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {activeQuiz.questions[currentQuestionIdx].options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === activeQuiz.questions[currentQuestionIdx].correctAnswer;

              let optionStyle = 'bg-[#0a0e1a] border-gray-800 text-gray-200 hover:border-gray-700';
              if (isSelected) {
                optionStyle = 'bg-[#06b6d4]/20 border-[#06b6d4] text-white';
              }
              if (isSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200';
                } else if (isSelected) {
                  optionStyle = 'bg-red-500/20 border-red-500 text-red-200';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when submitted */}
          {isSubmitted && (
            <div className="p-4 bg-[#0a0e1a] border border-[#06b6d4]/30 rounded-2xl text-xs text-gray-300 space-y-1 animate-fadeIn">
              <span className="font-bold text-[#06b6d4] block uppercase">Explanation</span>
              <p>{activeQuiz.questions[currentQuestionIdx].explanation}</p>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            {!isSubmitted ? (
              <button
                onClick={submitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-2.5 bg-[#06b6d4] hover:bg-[#22d3ee] text-[#0a0e1a] font-bold text-xs sm:text-sm rounded-xl cursor-pointer flex items-center gap-2"
              >
                <span>{currentQuestionIdx + 1 < activeQuiz.questions.length ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
