import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/journey.dart';
import 'package:wonderhug/core/l10n.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/cart/cart_controller.dart';
import 'package:wonderhug/features/journey/tracker_screen.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

class JourneyScreen extends ConsumerWidget {
  const JourneyScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final stage = ref.watch(journeyProvider);
    final locale = ref.watch(localeProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(locale, 'nav.journey'))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(stage?.label ?? 'Not chosen yet', style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 12),
          Text(tr(locale, 'journey.body'), style: const TextStyle(color: WonderHugColors.slate, height: 1.45)),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: () async {
              final store = ref.read(offlineStoreProvider);
              await store.setKicks(store.kicks + 1);
            },
            child: Text(tr(locale, 'trackers.count')),
          ),
          const SizedBox(height: 12),
          FilledButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const TrackerScreen())),
            child: Text(tr(locale, 'journey.openTrackers')),
          ),
        ],
      ),
    );
  }
}
