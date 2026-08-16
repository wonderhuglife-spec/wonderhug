import 'package:flutter_test/flutter_test.dart';
import 'package:wonderhug/core/journey.dart';
import 'package:wonderhug/shared/home_feed.dart';

void main() {
  test('pregnant feed mentions Garbh Sanskar without a guarantee', () {
    final feed = homeFeedFor(JourneyStage.pregnant);
    expect(feed.today.toLowerCase(), contains('garbh sanskar'));
    expect(feed.today.toLowerCase(), isNot(contains('guarantee that')));
  });

  test('new parent feed points at postpartum', () {
    expect(homeFeedFor(JourneyStage.newParent).tools.toLowerCase(), contains('postpartum'));
  });
}
