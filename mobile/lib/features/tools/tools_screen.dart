import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/cart/cart_controller.dart';

class ToolsScreen extends ConsumerStatefulWidget {
  const ToolsScreen({super.key});

  @override
  ConsumerState<ToolsScreen> createState() => _ToolsScreenState();
}

class _ToolsScreenState extends ConsumerState<ToolsScreen> {
  int kicks = 0;

  @override
  Widget build(BuildContext context) {
    final store = ref.watch(offlineStoreProvider);
    final sessions = store.kickSessions;
    return Scaffold(
      appBar: AppBar(title: const Text('Tools')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text(
            'Due date, kicks, contractions and weight save on this device. Sign in on the website to sync when Supabase keys are present.',
            style: TextStyle(color: WonderHugColors.slate, height: 1.45),
          ),
          const SizedBox(height: 20),
          Text('Kick session: $kicks', style: Theme.of(context).textTheme.headlineSmall),
          FilledButton(
            onPressed: () => setState(() => kicks++),
            child: const Text('Count a movement'),
          ),
          OutlinedButton(
            onPressed: () async {
              await store.addKickSession(kicks);
              setState(() => kicks = 0);
            },
            child: const Text('Save session'),
          ),
          const SizedBox(height: 12),
          const Text('Recent sessions (kicks)'),
          SizedBox(
            height: 80,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                for (final session in sessions.take(8))
                  Expanded(
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 2),
                      height: ((session['count'] as num?)?.toDouble() ?? 0) * 4 + 8,
                      color: WonderHugColors.teal.withValues(alpha: 0.7),
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'If a session looks quieter than your usual pattern, talk with your doctor. This is not a diagnosis.',
            style: TextStyle(color: WonderHugColors.slate),
          ),
        ],
      ),
    );
  }
}
