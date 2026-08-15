import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/l10n.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/cart/cart_controller.dart';

class TrackerScreen extends ConsumerStatefulWidget {
  const TrackerScreen({super.key});

  @override
  ConsumerState<TrackerScreen> createState() => _TrackerScreenState();
}

class _TrackerScreenState extends ConsumerState<TrackerScreen> {
  late int kicks;

  @override
  void initState() {
    super.initState();
    kicks = ref.read(offlineStoreProvider).kicks;
  }

  @override
  Widget build(BuildContext context) {
    final locale = ref.watch(localeProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(locale, 'trackers.title'))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(tr(locale, 'trackers.kicks'), style: const TextStyle(color: WonderHugColors.slate)),
          const SizedBox(height: 12),
          Text('$kicks', style: Theme.of(context).textTheme.displaySmall),
          FilledButton(
            onPressed: () async {
              setState(() => kicks++);
              await ref.read(offlineStoreProvider).setKicks(kicks);
            },
            child: Text(tr(locale, 'trackers.count')),
          ),
          const SizedBox(height: 24),
          Text(tr(locale, 'trackers.weight'), style: const TextStyle(color: WonderHugColors.slate)),
        ],
      ),
    );
  }
}
