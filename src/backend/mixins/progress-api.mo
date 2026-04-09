import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import ProgressTypes "../types/progress";
import ProgressLib "../lib/progress";

mixin (
  accessControlState : AccessControl.AccessControlState,
  progressState : ProgressLib.State,
) {
  public query ({ caller }) func getMyProgress(stream : Common.CareerStream) : async ?ProgressTypes.StreamProgressPublic {
    ProgressLib.getProgress(progressState, caller, stream);
  };

  public query ({ caller }) func getAllMyProgress() : async [ProgressTypes.StreamProgressPublic] {
    ProgressLib.getAllProgress(progressState, caller);
  };

  public shared ({ caller }) func markQuizCompleted(stream : Common.CareerStream, quizId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to track progress");
    };
    ProgressLib.markQuizCompleted(progressState, caller, stream, quizId);
  };

  public shared ({ caller }) func markMicroProjectCompleted(stream : Common.CareerStream, projectId : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to track progress");
    };
    ProgressLib.markMicroProjectCompleted(progressState, caller, stream, projectId);
  };
};
