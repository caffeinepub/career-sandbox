import Common "common";

module {
  public type StreamProgress = {
    stream : Common.CareerStream;
    var completedQuizzes : [Nat];
    var completedMicroProjects : [Nat];
    var lastUpdated : Common.Timestamp;
  };

  // Shared (immutable) version for API boundary
  public type StreamProgressPublic = {
    stream : Common.CareerStream;
    completedQuizzes : [Nat];
    completedMicroProjects : [Nat];
    lastUpdated : Common.Timestamp;
  };
};
