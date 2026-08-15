import 'package:wonderhug/core/journey.dart';

class HomeFeed {
  const HomeFeed({
    required this.today,
    required this.recommended,
    required this.expert,
    required this.community,
    required this.learning,
    required this.tools,
  });

  final String today;
  final String recommended;
  final String expert;
  final String community;
  final String learning;
  final String tools;
}

HomeFeed homeFeedFor(JourneyStage stage) {
  switch (stage) {
    case JourneyStage.planning:
      return const HomeFeed(
        today: 'A short couple check-in: what would “ready” mean this month, without a deadline from relatives.',
        recommended: 'Pregnancy planning checklist and nutrition education — not a protocol.',
        expert: 'Counsellor and nutrition profiles will appear after verification.',
        community: 'Planning Pregnancy room — quiet questions, no comparison.',
        learning: 'Preparing together before you try.',
        tools: 'Planning checklist and journey journal.',
      );
    case JourneyStage.ttc:
      return const HomeFeed(
        today: 'Keep the day ordinary. WonderHug will not score this week.',
        recommended: 'Fertility-support yoga and diet education, framed as wellbeing.',
        expert: 'Fertility specialists are listed only with verified credentials.',
        community: 'Trying to Conceive room.',
        learning: 'Emotional wellbeing pieces while you wait.',
        tools: 'Journey journal.',
      );
    case JourneyStage.pregnant:
      return const HomeFeed(
        today: 'Ten unhurried minutes: rest, a story, or music as Garbh Sanskar practice — not a developmental guarantee.',
        recommended: 'Week-by-week hub and pregnancy education.',
        expert: 'Ask an obstetrician when verified profiles are published.',
        community: 'Pregnancy room, moderated.',
        learning: 'Garbh Sanskar as practice, not promise.',
        tools: 'Week guide and birth preferences worksheet.',
      );
    case JourneyStage.newParent:
      return const HomeFeed(
        today: 'Protect one rest window. Feeding questions belong with a clinician or lactation professional when they escalate.',
        recommended: 'Postpartum rhythm and newborn hub.',
        expert: 'Lactation experts — pending verification.',
        community: 'New Parents and Breastfeeding rooms.',
        learning: 'The fourth trimester is still your journey.',
        tools: 'Postpartum rhythm.',
      );
    case JourneyStage.parenting:
      return const HomeFeed(
        today: 'One ordinary moment of attention is enough for today.',
        recommended: 'Baby development ranges — not races.',
        expert: 'Parenting specialists — pending verification.',
        community: 'Parenting room.',
        learning: 'Conscious parenting notes as they are reviewed.',
        tools: 'Journey journal.',
      );
  }
}
