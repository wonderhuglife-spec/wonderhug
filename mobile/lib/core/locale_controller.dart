import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

class LocaleController extends StateNotifier<String> {
  LocaleController(this._prefs) : super(_prefs.getString(_key) ?? 'en');

  static const _key = 'wonderhug.locale';
  final SharedPreferences _prefs;

  Future<void> setLocale(String code) async {
    state = code.startsWith('te') ? 'te' : 'en';
    await _prefs.setString(_key, state);
  }
}

final localeProvider = StateNotifierProvider<LocaleController, String>((ref) {
  return LocaleController(ref.watch(sharedPreferencesProvider));
});
