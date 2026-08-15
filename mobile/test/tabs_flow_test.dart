import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wonderhug/app/wonderhug_app.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('five tabs render real screens', (tester) async {
    SharedPreferences.setMockInitialValues({'wonderhug.journeyStage': 'pregnant'});
    final prefs = await SharedPreferences.getInstance();
    await tester.pumpWidget(
      ProviderScope(
        overrides: [sharedPreferencesProvider.overrideWithValue(prefs)],
        child: const WonderHugApp(),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.textContaining('Journey: Pregnant'), findsOneWidget);

    await tester.tap(find.text('Journey'));
    await tester.pumpAndSettle();
    expect(find.text('Open trackers'), findsOneWidget);

    await tester.tap(find.text('Learn'));
    await tester.pumpAndSettle();
    expect(find.text('Garbh Sanskar library'), findsOneWidget);

    await tester.tap(find.text('Community'));
    await tester.pumpAndSettle();
    expect(find.textContaining('WhatsApp'), findsOneWidget);

    await tester.tap(find.text('Profile'));
    await tester.pumpAndSettle();
    expect(find.text('Daily practice reminder'), findsOneWidget);
    expect(find.text('Phone sign in'), findsOneWidget);
    await tester.tap(find.byType(Switch).first);
    await tester.pump();
    expect(prefs.getBool('wonderhug.notify.daily'), isFalse);
  });

  testWidgets('signup analog: onboarding then tracker then notification preference', (tester) async {
    SharedPreferences.setMockInitialValues({});
    final prefs = await SharedPreferences.getInstance();
    await tester.pumpWidget(
      ProviderScope(
        overrides: [sharedPreferencesProvider.overrideWithValue(prefs)],
        child: const WonderHugApp(),
      ),
    );
    await tester.pumpAndSettle();

    await tester.tap(find.text('Pregnant'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Continue'));
    await tester.pumpAndSettle();

    await tester.tap(find.text('Journey'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Count a movement'));
    await tester.pump();
    expect(prefs.getInt('wonderhug.kicks'), 1);
    expect(prefs.getString('wonderhug.journeyStage'), 'pregnant');
  });
}
