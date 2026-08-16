import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/l10n.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/core/supabase_client.dart';
import 'package:wonderhug/core/theme.dart';

class SignInScreen extends ConsumerStatefulWidget {
  const SignInScreen({super.key});

  @override
  ConsumerState<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends ConsumerState<SignInScreen> {
  final phone = TextEditingController(text: '+91');
  final otp = TextEditingController();
  String message = '';

  @override
  void dispose() {
    phone.dispose();
    otp.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final locale = ref.watch(localeProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(locale, 'profile.signIn'))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(tr(locale, 'auth.help'), style: const TextStyle(color: WonderHugColors.slate, height: 1.45)),
          const SizedBox(height: 16),
          TextField(
            controller: phone,
            keyboardType: TextInputType.phone,
            decoration: InputDecoration(labelText: tr(locale, 'auth.phone')),
          ),
          const SizedBox(height: 12),
          FilledButton(
            onPressed: () async {
              if (!WonderHugSupabase.initialized) {
                setState(() => message = 'Supabase is not configured.');
                return;
              }
              setState(() => message = 'OTP requested.');
            },
            child: Text(tr(locale, 'auth.send')),
          ),
          const SizedBox(height: 16),
          TextField(
            controller: otp,
            decoration: InputDecoration(labelText: tr(locale, 'auth.otp')),
          ),
          const SizedBox(height: 12),
          OutlinedButton(
            onPressed: () => setState(() => message = WonderHugSupabase.initialized ? 'Verify attempted.' : 'Supabase is not configured.'),
            child: Text(tr(locale, 'auth.verify')),
          ),
          if (message.isNotEmpty) Padding(padding: const EdgeInsets.only(top: 16), child: Text(message)),
        ],
      ),
    );
  }
}
