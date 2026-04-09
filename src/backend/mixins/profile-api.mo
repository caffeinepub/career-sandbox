import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import ProfileTypes "../types/profile";
import ProfileLib "../lib/profile";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : ProfileLib.State,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?ProfileTypes.UserProfilePublic {
    ProfileLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(name : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to save profile");
    };
    ProfileLib.saveProfile(profiles, caller, name);
  };

  public shared ({ caller }) func saveQuizResult(result : ProfileTypes.QuizResult) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to save quiz result");
    };
    ProfileLib.saveQuizResult(profiles, caller, result);
  };

  public shared ({ caller }) func setActiveStream(stream : Common.CareerStream) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to set active stream");
    };
    ProfileLib.setActiveStream(profiles, caller, stream);
  };
};
