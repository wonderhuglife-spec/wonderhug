import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wonderhug/features/journey/tracker_screen.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';
import 'package:wonderhug/features/shop/shop_screen.dart';

Future<Widget> wrap(Widget child) async {
  SharedPreferences.setMockInitialValues({});
  final prefs = await SharedPreferences.getInstance();
  return ProviderScope(
    overrides: [sharedPreferencesProvider.overrideWithValue(prefs)],
    child: MaterialApp(home: child),
  );
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('shop PDP shows description and add', (tester) async {
    await tester.pumpWidget(await wrap(const ShopScreen()));
    await tester.tap(find.text('Garbh Sanskar daily pack'));
    await tester.pumpAndSettle();
    expect(find.textContaining('28-day'), findsOneWidget);
  });

  testWidgets('kick counter increments', (tester) async {
    await tester.pumpWidget(await wrap(const TrackerScreen()));
    await tester.tap(find.text('Count a movement'));
    await tester.pump();
    expect(find.text('1'), findsOneWidget);
  });
}
