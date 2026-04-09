import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import RoadmapTypes "../types/roadmap";
import RoadmapLib "../lib/roadmap";

mixin (
  accessControlState : AccessControl.AccessControlState,
  roadmaps : RoadmapLib.State,
) {
  public query ({ caller }) func getMyRoadmap() : async ?RoadmapTypes.RoadmapPublic {
    RoadmapLib.getRoadmap(roadmaps, caller);
  };

  public shared ({ caller }) func saveRoadmap(stream : Common.CareerStream, milestones : [RoadmapTypes.Milestone]) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to save roadmap");
    };
    RoadmapLib.saveRoadmap(roadmaps, caller, stream, milestones);
  };

  public shared ({ caller }) func generateDefaultRoadmap(stream : Common.CareerStream) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to generate roadmap");
    };
    RoadmapLib.generateDefaultRoadmap(roadmaps, caller, stream);
  };

  public shared ({ caller }) func updateRoadmapMilestones(milestones : [RoadmapTypes.Milestone]) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update roadmap");
    };
    RoadmapLib.updateMilestones(roadmaps, caller, milestones);
  };
};
