import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/journey.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';
import 'package:wonderhug/shared/home_feed.dart';

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final stage = ref.watch(journeyProvider) ?? JourneyStage.planning;
    final feed = homeFeedFor(stage);

    return Scaffold(
      appBar: AppBar(title: const Text('WonderHug')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 32),
        children: [
          Text(_greeting(), style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 8),
          Text('Journey: ${stage.label}', style: const TextStyle(color: WonderHugColors.slate)),
          const SizedBox(height: 20),
          _Block(title: "Today's guidance", body: feed.today),
          _Block(title: 'Recommended', body: feed.recommended),
          _Block(title: 'Ask an expert', body: feed.expert),
          _Block(title: 'Community', body: feed.community),
          _Block(title: 'Featured learning', body: feed.learning),
          _Block(title: 'Tools', body: feed.tools),
        ],
      ),
    );
  }

  String _greeting() {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }
}

class _Block extends StatelessWidget {
  const _Block({required this.title, required this.body});

  final String title;
  final String body;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 6),
          Text(body, style: const TextStyle(color: WonderHugColors.slate, height: 1.45)),
        ],
      ),
    );
  }
}
