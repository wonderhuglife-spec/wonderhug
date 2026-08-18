enum JourneyStage { planning, ttc, pregnant, newParent, parenting }

extension JourneyStageLabel on JourneyStage {
  String get label {
    switch (this) {
      case JourneyStage.planning:
        return 'Planning Pregnancy';
      case JourneyStage.ttc:
        return 'Trying to Conceive';
      case JourneyStage.pregnant:
        return 'Pregnant';
      case JourneyStage.newParent:
        return 'New Parent';
      case JourneyStage.parenting:
        return 'Parenting';
    }
  }

  String get storageKey => name;
}

JourneyStage? journeyFromStorage(String? value) {
  if (value == null) return null;
  for (final stage in JourneyStage.values) {
    if (stage.name == value) return stage;
  }
  return null;
}
