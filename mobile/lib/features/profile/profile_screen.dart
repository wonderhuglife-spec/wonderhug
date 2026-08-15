import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final stage = ref.watch(journeyProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(stage?.label ?? 'Journey not set', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 8),
          const Text(
            'Accounts use Supabase Auth when keys are provided via --dart-define. Service-role keys must never ship in the app.',
            style: TextStyle(color: WonderHugColors.slate, height: 1.45),
          ),
          const SizedBox(height: 24),
          TextButton(
            onPressed: () => context.go('/onboarding'),
            child: const Text('Change journey'),
          ),
        ],
      ),
    );
  }
}
