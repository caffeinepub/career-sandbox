import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Common "../types/common";
import SubscriptionTypes "../types/subscription";

module {
  public type State = Map.Map<Principal, SubscriptionTypes.SubscriptionStatus>;

  public func toPublic(status : SubscriptionTypes.SubscriptionStatus) : SubscriptionTypes.SubscriptionStatusPublic {
    {
      userId = status.userId;
      tier = status.tier;
      stripeCustomerId = status.stripeCustomerId;
      stripeSubscriptionId = status.stripeSubscriptionId;
      expiresAt = status.expiresAt;
      updatedAt = status.updatedAt;
    };
  };

  func ensureStatus(state : State, userId : Common.UserId) : SubscriptionTypes.SubscriptionStatus {
    switch (state.get(userId)) {
      case (?s) { s };
      case null {
        let s : SubscriptionTypes.SubscriptionStatus = {
          userId = userId;
          var tier = #free;
          var stripeCustomerId = null;
          var stripeSubscriptionId = null;
          var expiresAt = null;
          var updatedAt = Time.now();
        };
        state.add(userId, s);
        s;
      };
    };
  };

  public func getStatus(state : State, userId : Common.UserId) : SubscriptionTypes.SubscriptionStatusPublic {
    toPublic(ensureStatus(state, userId));
  };

  public func isPremium(state : State, userId : Common.UserId) : Bool {
    switch (state.get(userId)) {
      case (?status) {
        switch (status.tier) {
          case (#premium) {
            // Check expiry if set
            switch (status.expiresAt) {
              case (?exp) { exp > Time.now() };
              case null { true };
            };
          };
          case (#free) { false };
        };
      };
      case null { false };
    };
  };

  public func activatePremium(state : State, userId : Common.UserId, stripeCustomerId : Text, stripeSubscriptionId : Text, expiresAt : ?Common.Timestamp) : () {
    let status = ensureStatus(state, userId);
    status.tier := #premium;
    status.stripeCustomerId := ?stripeCustomerId;
    status.stripeSubscriptionId := ?stripeSubscriptionId;
    status.expiresAt := expiresAt;
    status.updatedAt := Time.now();
  };

  public func cancelSubscription(state : State, userId : Common.UserId) : () {
    let status = ensureStatus(state, userId);
    status.tier := #free;
    status.stripeSubscriptionId := null;
    status.expiresAt := null;
    status.updatedAt := Time.now();
  };
};
