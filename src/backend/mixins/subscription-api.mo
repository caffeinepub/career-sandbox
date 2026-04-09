import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import SubscriptionTypes "../types/subscription";
import SubscriptionLib "../lib/subscription";

mixin (
  accessControlState : AccessControl.AccessControlState,
  subscriptions : SubscriptionLib.State,
) {
  public query ({ caller }) func getMySubscriptionStatus() : async SubscriptionTypes.SubscriptionStatusPublic {
    SubscriptionLib.getStatus(subscriptions, caller);
  };

  public query ({ caller }) func checkIsPremium() : async Bool {
    SubscriptionLib.isPremium(subscriptions, caller);
  };

  public shared ({ caller }) func activatePremiumSubscription(stripeCustomerId : Text, stripeSubscriptionId : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to activate subscription");
    };
    SubscriptionLib.activatePremium(subscriptions, caller, stripeCustomerId, stripeSubscriptionId, null);
  };

  public shared ({ caller }) func cancelMySubscription() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to cancel subscription");
    };
    SubscriptionLib.cancelSubscription(subscriptions, caller);
  };

  public shared ({ caller }) func createSubscriptionCheckout(successUrl : Text, cancelUrl : Text) : async Text {
    Runtime.trap("Stripe checkout must be called directly from main.mo using the Stripe extension");
  };
};
