import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Common "../types/common";
import ProgressTypes "../types/progress";

module {
  // Key is (UserId, CareerStream encoded as Text)
  public type State = Map.Map<Principal, Map.Map<Text, ProgressTypes.StreamProgress>>;

  public func streamToText(stream : Common.CareerStream) : Text {
    switch (stream) {
      case (#contentGaming) { "contentGaming" };
      case (#science) { "science" };
      case (#commerce) { "commerce" };
      case (#arts) { "arts" };
    };
  };

  public func toPublic(progress : ProgressTypes.StreamProgress) : ProgressTypes.StreamProgressPublic {
    {
      stream = progress.stream;
      completedQuizzes = progress.completedQuizzes;
      completedMicroProjects = progress.completedMicroProjects;
      lastUpdated = progress.lastUpdated;
    };
  };

  func ensureStreamProgress(state : State, userId : Common.UserId, stream : Common.CareerStream) : ProgressTypes.StreamProgress {
    let streamMap = switch (state.get(userId)) {
      case (?m) { m };
      case null {
        let m = Map.empty<Text, ProgressTypes.StreamProgress>();
        state.add(userId, m);
        m;
      };
    };
    let key = streamToText(stream);
    switch (streamMap.get(key)) {
      case (?p) { p };
      case null {
        let p : ProgressTypes.StreamProgress = {
          stream = stream;
          var completedQuizzes = [];
          var completedMicroProjects = [];
          var lastUpdated = Time.now();
        };
        streamMap.add(key, p);
        p;
      };
    };
  };

  public func getProgress(state : State, userId : Common.UserId, stream : Common.CareerStream) : ?ProgressTypes.StreamProgressPublic {
    switch (state.get(userId)) {
      case (?streamMap) {
        switch (streamMap.get(streamToText(stream))) {
          case (?p) { ?toPublic(p) };
          case null { null };
        };
      };
      case null { null };
    };
  };

  public func getAllProgress(state : State, userId : Common.UserId) : [ProgressTypes.StreamProgressPublic] {
    switch (state.get(userId)) {
      case (?streamMap) {
        streamMap.values().map<ProgressTypes.StreamProgress, ProgressTypes.StreamProgressPublic>(
          func(p) { toPublic(p) }
        ).toArray();
      };
      case null { [] };
    };
  };

  public func markQuizCompleted(state : State, userId : Common.UserId, stream : Common.CareerStream, quizId : Nat) : () {
    let progress = ensureStreamProgress(state, userId, stream);
    let alreadyDone = progress.completedQuizzes.find(func(id : Nat) : Bool { id == quizId });
    switch (alreadyDone) {
      case (?_) {};
      case null {
        progress.completedQuizzes := progress.completedQuizzes.concat([quizId]);
        progress.lastUpdated := Time.now();
      };
    };
  };

  public func markMicroProjectCompleted(state : State, userId : Common.UserId, stream : Common.CareerStream, projectId : Nat) : () {
    let progress = ensureStreamProgress(state, userId, stream);
    let alreadyDone = progress.completedMicroProjects.find(func(id : Nat) : Bool { id == projectId });
    switch (alreadyDone) {
      case (?_) {};
      case null {
        progress.completedMicroProjects := progress.completedMicroProjects.concat([projectId]);
        progress.lastUpdated := Time.now();
      };
    };
  };
};
