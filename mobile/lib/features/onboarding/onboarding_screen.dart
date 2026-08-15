import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:wonderhug/core/journey.dart';
import 'package:wonderhug/core/l10n.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/design_system/components.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';

class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({super.key});

  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> {
  JourneyStage? _draft;

  @override
  Widget build(BuildContext context) {
    final locale = ref.watch(localeProvider);
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(24, 32, 24, 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                tr(locale, 'onboarding.q'),
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.w600),
              ),
              const SizedBox(height: 12),
              Text(tr(locale, 'onboarding.help')),
              const SizedBox(height: 24),
              Expanded(
                child: ListView(
                  children: [
                    ...JourneyStage.values.map((stage) {
                      final isSelected = _draft == stage;
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
                            onPressed: () => setState(() => _draft = stage),
                            child: Text(stage.label),
                          ),
                        ),
                      );
                    }),
                  ],
                ),
              ),
              WhPrimaryButton(
                label: tr(locale, 'onboarding.continue'),
                onPressed: _draft == null
                    ? null
                    : () async {
                        await ref.read(journeyProvider.notifier).select(_draft!);
                        if (context.mounted) context.go('/home');
                      },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
