import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:wonderhug/core/journey.dart';
import 'package:wonderhug/core/l10n.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/auth/sign_in_screen.dart';
import 'package:wonderhug/features/cart/cart_controller.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final stage = ref.watch(journeyProvider);
    final locale = ref.watch(localeProvider);
    final store = ref.watch(offlineStoreProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(locale, 'nav.profile'))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(stage?.label ?? 'Journey not set', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 8),
          const Text(
            'Accounts use Supabase Auth when keys are provided via --dart-define. Service-role keys must never ship in the app.',
            style: TextStyle(color: WonderHugColors.slate, height: 1.45),
          ),
          const SizedBox(height: 16),
          Text(tr(locale, 'profile.language'), style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          SegmentedButton<String>(
            segments: [
              ButtonSegment(value: 'en', label: Text(tr(locale, 'profile.english'))),
              ButtonSegment(value: 'te', label: Text(tr(locale, 'profile.telugu'))),
            ],
            selected: {locale},
            onSelectionChanged: (next) => ref.read(localeProvider.notifier).setLocale(next.first),
          ),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const SignInScreen())),
            child: Text(tr(locale, 'profile.signIn')),
          ),
          const SizedBox(height: 24),
          Text(tr(locale, 'profile.notifications'), style: Theme.of(context).textTheme.titleMedium),
          SwitchListTile(
            title: Text(tr(locale, 'profile.daily')),
            value: store.dailyReminder,
            onChanged: (value) async {
              await store.setDailyReminder(value);
              (context as Element).markNeedsBuild();
            },
          ),
          SwitchListTile(
            title: Text(tr(locale, 'profile.orders')),
            value: store.orderUpdates,
            onChanged: (value) async {
              await store.setOrderUpdates(value);
              (context as Element).markNeedsBuild();
            },
          ),
          SwitchListTile(
            title: Text(tr(locale, 'profile.milestones')),
            value: store.milestones,
            onChanged: (value) async {
              await store.setMilestones(value);
              (context as Element).markNeedsBuild();
            },
          ),
          const Text(
            'Push delivery uses Firebase Cloud Messaging once google-services files are supplied. Preferences are stored offline now.',
            style: TextStyle(color: WonderHugColors.slate, height: 1.45),
          ),
          TextButton(
            onPressed: () => context.go('/onboarding'),
            child: Text(tr(locale, 'profile.change')),
          ),
        ],
      ),
    );
  }
}
