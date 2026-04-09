import Common "common";

module {
  public type SubscriptionStatus = {
    userId : Common.UserId;
    var tier : Common.SubscriptionTier;
    var stripeCustomerId : ?Text;
    var stripeSubscriptionId : ?Text;
    var expiresAt : ?Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  // Shared (immutable) version for API boundary
  public type SubscriptionStatusPublic = {
    userId : Common.UserId;
    tier : Common.SubscriptionTier;
    stripeCustomerId : ?Text;
    stripeSubscriptionId : ?Text;
    expiresAt : ?Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
