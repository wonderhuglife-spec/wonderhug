import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wonderhug/app/wonderhug_app.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('onboarding asks one journey question and reaches home', (tester) async {
    SharedPreferences.setMockInitialValues({});
    final prefs = await SharedPreferences.getInstance();

    await tester.pumpWidget(
      ProviderScope(
        overrides: [sharedPreferencesProvider.overrideWithValue(prefs)],
        child: const WonderHugApp(),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('What describes your journey?'), findsOneWidget);

    await tester.tap(find.text('Pregnant'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Continue'));
    await tester.pumpAndSettle();

    expect(find.text('WonderHug'), findsOneWidget);
    expect(find.textContaining('Journey: Pregnant'), findsOneWidget);
    expect(prefs.getString('wonderhug.journeyStage'), 'pregnant');
  });

  testWidgets('bottom navigation includes five destinations after onboarding', (tester) async {
    SharedPreferences.setMockInitialValues({'wonderhug.journeyStage': 'planning'});
    final prefs = await SharedPreferences.getInstance();

    await tester.pumpWidget(
      ProviderScope(
        overrides: [sharedPreferencesProvider.overrideWithValue(prefs)],
        child: const WonderHugApp(),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Home'), findsWidgets);
    expect(find.text('Journey'), findsWidgets);
    expect(find.text('Learn'), findsOneWidget);
    expect(find.text('Community'), findsWidgets);
    expect(find.text('Profile'), findsOneWidget);

    await tester.tap(find.text('Journey'));
    await tester.pumpAndSettle();
    expect(find.text('Planning Pregnancy'), findsOneWidget);
  });
}
