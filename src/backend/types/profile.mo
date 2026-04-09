import Common "common";

module {
  public type QuizAnswer = {
    questionId : Nat;
    selectedOption : Nat;
  };

  public type QuizResult = {
    answers : [QuizAnswer];
    recommendedStream : Common.CareerStream;
    completedAt : Common.Timestamp;
  };

  public type UserProfile = {
    userId : Common.UserId;
    name : Text;
    var quizResult : ?QuizResult;
    var activeStream : ?Common.CareerStream;
    var createdAt : Common.Timestamp;
  };

  // Shared (immutable) version for API boundary
  public type UserProfilePublic = {
    userId : Common.UserId;
    name : Text;
    quizResult : ?QuizResult;
    activeStream : ?Common.CareerStream;
    createdAt : Common.Timestamp;
  };
};
