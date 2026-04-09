import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Common "../types/common";
import ProfileTypes "../types/profile";

module {
  public type State = Map.Map<Principal, ProfileTypes.UserProfile>;

  public func getProfile(state : State, userId : Common.UserId) : ?ProfileTypes.UserProfilePublic {
    switch (state.get(userId)) {
      case (?profile) { ?toPublic(profile) };
      case null { null };
    };
  };

  public func saveProfile(state : State, userId : Common.UserId, name : Text) : () {
    switch (state.get(userId)) {
      case (?existing) {
        // name is immutable — replace the full entry
        let updated : ProfileTypes.UserProfile = {
          userId = existing.userId;
          name = name;
          var quizResult = existing.quizResult;
          var activeStream = existing.activeStream;
          var createdAt = existing.createdAt;
        };
        state.add(userId, updated);
      };
      case null {
        let profile : ProfileTypes.UserProfile = {
          userId = userId;
          name = name;
          var quizResult = null;
          var activeStream = null;
          var createdAt = Time.now();
        };
        state.add(userId, profile);
      };
    };
  };

  public func saveQuizResult(state : State, userId : Common.UserId, result : ProfileTypes.QuizResult) : () {
    switch (state.get(userId)) {
      case (?profile) {
        profile.quizResult := ?result;
        profile.activeStream := ?result.recommendedStream;
      };
      case null {
        let profile : ProfileTypes.UserProfile = {
          userId = userId;
          name = "";
          var quizResult = ?result;
          var activeStream = ?result.recommendedStream;
          var createdAt = Time.now();
        };
        state.add(userId, profile);
      };
    };
  };

  public func setActiveStream(state : State, userId : Common.UserId, stream : Common.CareerStream) : () {
    switch (state.get(userId)) {
      case (?profile) {
        profile.activeStream := ?stream;
      };
      case null {
        let profile : ProfileTypes.UserProfile = {
          userId = userId;
          name = "";
          var quizResult = null;
          var activeStream = ?stream;
          var createdAt = Time.now();
        };
        state.add(userId, profile);
      };
    };
  };

  public func toPublic(profile : ProfileTypes.UserProfile) : ProfileTypes.UserProfilePublic {
    {
      userId = profile.userId;
      name = profile.name;
      quizResult = profile.quizResult;
      activeStream = profile.activeStream;
      createdAt = profile.createdAt;
    };
  };
};
