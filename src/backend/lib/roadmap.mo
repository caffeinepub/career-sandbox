import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Common "../types/common";
import RoadmapTypes "../types/roadmap";

module {
  public type State = Map.Map<Principal, RoadmapTypes.Roadmap>;

  public func toPublic(roadmap : RoadmapTypes.Roadmap) : RoadmapTypes.RoadmapPublic {
    {
      userId = roadmap.userId;
      stream = roadmap.stream;
      milestones = roadmap.milestones;
      updatedAt = roadmap.updatedAt;
    };
  };

  func defaultMilestones(stream : Common.CareerStream) : [RoadmapTypes.Milestone] {
    switch (stream) {
      case (#contentGaming) {
        [
          {
            year = 1;
            title = "Foundation in Digital Media";
            description = "Learn the basics of content creation, video editing, and game design principles.";
            skills = ["Video Editing", "Graphic Design", "Basic Game Development", "Social Media"];
            actions = ["Complete an online video editing course", "Start a YouTube or gaming channel", "Learn Canva or Adobe tools", "Play and review indie games"];
          },
          {
            year = 2;
            title = "Specialization & Portfolio Building";
            description = "Choose a niche: game development, streaming, content writing, or digital marketing.";
            skills = ["Unity or Unreal Engine basics", "Content Strategy", "SEO for creators", "Community Management"];
            actions = ["Build 2 small game projects", "Grow social media audience to 500 followers", "Publish 10 blog posts or videos", "Collaborate with other creators"];
          },
          {
            year = 3;
            title = "Professional Entry";
            description = "Launch yourself professionally through freelancing, internships, or indie publishing.";
            skills = ["Advanced Game Dev or Content Production", "Monetization Strategy", "Project Management", "Networking"];
            actions = ["Apply for gaming/media internships", "Publish a game on itch.io or Steam", "Monetize content channel", "Attend gaming or content creator conferences"];
          },
        ];
      };
      case (#science) {
        [
          {
            year = 1;
            title = "Academic Excellence in Core Sciences";
            description = "Build a strong foundation in Physics, Chemistry, Biology, and Mathematics.";
            skills = ["Problem Solving", "Lab Techniques", "Mathematics", "Scientific Writing"];
            actions = ["Participate in science olympiads", "Start a science journal", "Join school science club", "Watch documentaries on emerging sciences"];
          },
          {
            year = 2;
            title = "Research Exposure & Competitive Prep";
            description = "Explore research opportunities and prepare for competitive entrance exams.";
            skills = ["Research Methodology", "Data Analysis", "Critical Thinking", "Exam Strategy"];
            actions = ["Attend science workshops or camps", "Begin JEE/NEET or equivalent preparation", "Assist in a small research project", "Learn basic Python or data tools"];
          },
          {
            year = 3;
            title = "College & Career Pathway";
            description = "Secure admission to a reputable STEM program and define your specialization.";
            skills = ["Specialization Knowledge", "Internship Skills", "Academic Networking", "Technical Communication"];
            actions = ["Apply to top engineering or medical colleges", "Complete a summer internship or lab program", "Present at a student science conference", "Connect with professors in your field"];
          },
        ];
      };
      case (#commerce) {
        [
          {
            year = 1;
            title = "Business & Finance Fundamentals";
            description = "Understand economics, accounting, and business basics.";
            skills = ["Accounting Basics", "Economics", "Business Communication", "Spreadsheets"];
            actions = ["Take an online business or finance course", "Learn Excel or Google Sheets", "Start tracking a mock investment portfolio", "Read business news daily"];
          },
          {
            year = 2;
            title = "Entrepreneurship & Market Awareness";
            description = "Develop entrepreneurial thinking and understand markets and industries.";
            skills = ["Market Research", "Financial Modeling", "Startup Thinking", "Negotiation"];
            actions = ["Participate in a business plan competition", "Shadow a local entrepreneur", "Create a mock business plan", "Join commerce or economics clubs"];
          },
          {
            year = 3;
            title = "Professional Launch";
            description = "Prepare for CA, MBA entrance, or launch your own venture.";
            skills = ["CA Foundation prep or MBA entrance", "Leadership", "Presentation Skills", "Financial Analysis"];
            actions = ["Register for CA Foundation or MBA entrance exam", "Intern at a financial firm or startup", "Build a LinkedIn profile and network", "Take on a part-time consulting or freelance role"];
          },
        ];
      };
      case (#arts) {
        [
          {
            year = 1;
            title = "Creative Foundation";
            description = "Develop your artistic voice and technical craft in your chosen discipline.";
            skills = ["Core Art Technique", "Creative Thinking", "Art History", "Portfolio Development"];
            actions = ["Enroll in advanced art, music, drama, or design classes", "Start an art portfolio or sketchbook", "Visit galleries, museums, or performances", "Experiment with 2 different art forms"];
          },
          {
            year = 2;
            title = "Portfolio & Public Presence";
            description = "Build a public portfolio and gain real-world exposure through exhibitions and collaborations.";
            skills = ["Portfolio Curation", "Collaboration", "Critique & Feedback", "Digital Tools for Artists"];
            actions = ["Exhibit work at a local or school show", "Collaborate on a cross-disciplinary project", "Launch an Instagram or Behance portfolio", "Apply to art competitions or grants"];
          },
          {
            year = 3;
            title = "Professional Pathway";
            description = "Apply to art schools, design programs, or begin freelance and commission work.";
            skills = ["Freelance / Commission Work", "Networking in Creative Industries", "Artist Statement Writing", "Client Communication"];
            actions = ["Apply to art college or design school", "Take on 3 paid commissions or projects", "Attend artist talks and open studios", "Build a personal website showcasing your work"];
          },
        ];
      };
    };
  };

  public func getRoadmap(state : State, userId : Common.UserId) : ?RoadmapTypes.RoadmapPublic {
    switch (state.get(userId)) {
      case (?roadmap) { ?toPublic(roadmap) };
      case null { null };
    };
  };

  public func saveRoadmap(state : State, userId : Common.UserId, stream : Common.CareerStream, milestones : [RoadmapTypes.Milestone]) : () {
    let finalMilestones = if (milestones.size() == 0) {
      defaultMilestones(stream);
    } else {
      milestones;
    };
    // Always replace the whole entry — stream is immutable so we re-create on stream change
    switch (state.get(userId)) {
      case (?existing) {
        // If same stream, just update milestones in place
        if (existing.stream == stream) {
          existing.milestones := finalMilestones;
          existing.updatedAt := Time.now();
        } else {
          // Different stream — replace entry
          state.add(
            userId,
            {
              userId = userId;
              stream = stream;
              var milestones = finalMilestones;
              var updatedAt = Time.now();
            },
          );
        };
      };
      case null {
        state.add(
          userId,
          {
            userId = userId;
            stream = stream;
            var milestones = finalMilestones;
            var updatedAt = Time.now();
          },
        );
      };
    };
  };

  public func generateDefaultRoadmap(state : State, userId : Common.UserId, stream : Common.CareerStream) : () {
    saveRoadmap(state, userId, stream, []);
  };

  public func updateMilestones(state : State, userId : Common.UserId, milestones : [RoadmapTypes.Milestone]) : () {
    switch (state.get(userId)) {
      case (?roadmap) {
        roadmap.milestones := milestones;
        roadmap.updatedAt := Time.now();
      };
      case null {
        Runtime.trap("No roadmap found for user — save a roadmap first");
      };
    };
  };
};
