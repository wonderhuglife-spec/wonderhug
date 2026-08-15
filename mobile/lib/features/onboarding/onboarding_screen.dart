import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:wonderhug/core/journey.dart';
import 'package:wonderhug/design_system/components.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

class OnboardingScreen extends ConsumerWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selected = ref.watch(journeyProvider);
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(24, 32, 24, 32),
          children: [
            Text(
              'What describes your journey?',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 12),
            const Text(
              'One question. You can change this later. WonderHug will not ask for medical history before showing something useful.',
            ),
            const SizedBox(height: 24),
            ...JourneyStage.values.map((stage) {
              final isSelected = selected == stage;
              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Semantics(
                  button: true,
                  selected: isSelected,
                  label: stage.label,
                  child: OutlinedButton(
                    style: OutlinedButton.styleFrom(
                      minimumSize: const Size.fromHeight(56),
                      alignment: Alignment.centerLeft,
                      backgroundColor: isSelected ? const Color(0xFFF0FDFA) : null,
                    ),
                    onPressed: () => ref.read(journeyProvider.notifier).select(stage),
                    child: Text(stage.label),
                  ),
                ),
              );
            }),
            const SizedBox(height: 12),
            WhPrimaryButton(
              label: 'Continue',
              onPressed: selected == null ? null : () => context.go('/home'),
            ),
          ],
        ),
      ),
    );
  }
}
