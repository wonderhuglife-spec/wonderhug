import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wonderhug/core/journey.dart';

class JourneyController extends StateNotifier<JourneyStage?> {
  JourneyController(this._prefs) : super(journeyFromStorage(_prefs.getString(_key)));

  static const _key = 'wonderhug.journeyStage';
  final SharedPreferences _prefs;

  bool get hasOnboarded => state != null;

  Future<void> select(JourneyStage stage) async {
    state = stage;
    await _prefs.setString(_key, stage.storageKey);
  }
}

final sharedPreferencesProvider = Provider<SharedPreferences>((ref) {
  throw UnimplementedError('Override sharedPreferencesProvider in main/tests');
});

final journeyProvider = StateNotifierProvider<JourneyController, JourneyStage?>((ref) {
  return JourneyController(ref.watch(sharedPreferencesProvider));
});
