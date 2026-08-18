import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wonderhug/app/wonderhug_app.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('WonderHugApp boots', (tester) async {
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
  });
}
