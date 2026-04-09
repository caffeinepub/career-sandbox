import Common "common";

module {
  public type Milestone = {
    year : Nat;
    title : Text;
    description : Text;
    skills : [Text];
    actions : [Text];
  };

  public type Roadmap = {
    userId : Common.UserId;
    stream : Common.CareerStream;
    var milestones : [Milestone];
    var updatedAt : Common.Timestamp;
  };

  // Shared (immutable) version for API boundary
  public type RoadmapPublic = {
    userId : Common.UserId;
    stream : Common.CareerStream;
    milestones : [Milestone];
    updatedAt : Common.Timestamp;
  };
};
