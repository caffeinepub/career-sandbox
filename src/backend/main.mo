import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import ProfileMixin "mixins/profile-api";
import ProgressMixin "mixins/progress-api";
import RoadmapMixin "mixins/roadmap-api";
import SubscriptionMixin "mixins/subscription-api";
import ProfileLib "lib/profile";
import ProgressLib "lib/progress";
import RoadmapLib "lib/roadmap";
import SubscriptionLib "lib/subscription";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Profile state
  let profiles : ProfileLib.State = Map.empty();

  // Progress state: Principal -> (stream text -> StreamProgress)
  let progressState : ProgressLib.State = Map.empty();

  // Roadmap state
  let roadmaps : RoadmapLib.State = Map.empty();

  // Subscription state
  let subscriptions : SubscriptionLib.State = Map.empty();

  // Stripe configuration
  var configuration : ?Stripe.StripeConfiguration = null;

  // Include domain mixins
  include ProfileMixin(accessControlState, profiles);
  include ProgressMixin(accessControlState, progressState);
  include RoadmapMixin(accessControlState, roadmaps);
  include SubscriptionMixin(accessControlState, subscriptions);

  // Stripe required functions — must be declared directly in actor
  public query func isStripeConfigured() : async Bool {
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    configuration := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
