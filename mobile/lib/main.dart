import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:wonderhug/app/wonderhug_app.dart';
import 'package:wonderhug/core/env.dart';
import 'package:wonderhug/core/supabase_client.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await WonderHugSupabase.initialize(WonderHugEnv.fromEnvironment());
  final prefs = await SharedPreferences.getInstance();
  runApp(
    ProviderScope(
      overrides: [sharedPreferencesProvider.overrideWithValue(prefs)],
      child: const WonderHugApp(),
    ),
  );
}
