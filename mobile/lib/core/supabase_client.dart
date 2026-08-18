import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:wonderhug/core/env.dart';

class WonderHugSupabase {
  static bool initialized = false;

  static Future<void> initialize(WonderHugEnv env) async {
    if (!env.isConfigured) {
      initialized = false;
      return;
    }
    await Supabase.initialize(url: env.supabaseUrl, publishableKey: env.supabaseAnonKey);
    initialized = true;
  }
}
