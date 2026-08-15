import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/journey.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

class JourneyScreen extends ConsumerWidget {
  const JourneyScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final stage = ref.watch(journeyProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Journey')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(stage?.label ?? 'Not chosen yet', style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 12),
          const Text(
            'Pregnancy week, baby age, language and completed activities will live here when a profile is connected. Matching stays in services — not in this widget.',
            style: TextStyle(color: WonderHugColors.slate, height: 1.45),
          ),
        ],
      ),
    );
  }
}
