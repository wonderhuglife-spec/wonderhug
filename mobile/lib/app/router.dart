import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:wonderhug/design_system/components.dart';
import 'package:wonderhug/features/community/community_screen.dart';
import 'package:wonderhug/features/home/home_screen.dart';
import 'package:wonderhug/features/journey/journey_screen.dart';
import 'package:wonderhug/features/learn/learn_screen.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';
import 'package:wonderhug/features/onboarding/onboarding_screen.dart';
import 'package:wonderhug/features/profile/profile_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final refresh = ValueNotifier<int>(0);
  ref.listen(journeyProvider, (_, __) => refresh.value++);
  ref.onDispose(refresh.dispose);

  return GoRouter(
    initialLocation: '/home',
    refreshListenable: refresh,
    redirect: (context, state) {
      final onboarded = ref.read(journeyProvider) != null;
      final onboarding = state.matchedLocation == '/onboarding';
      if (!onboarded && !onboarding) return '/onboarding';
      if (onboarded && onboarding) return '/home';
      return null;
    },
    routes: [
      GoRoute(path: '/onboarding', builder: (context, state) => const OnboardingScreen()),
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) => ShellScaffold(navigationShell: navigationShell),
        branches: [
          StatefulShellBranch(routes: [GoRoute(path: '/home', builder: (context, state) => const HomeScreen())]),
          StatefulShellBranch(routes: [GoRoute(path: '/journey', builder: (context, state) => const JourneyScreen())]),
          StatefulShellBranch(routes: [GoRoute(path: '/learn', builder: (context, state) => const LearnScreen())]),
          StatefulShellBranch(routes: [GoRoute(path: '/community', builder: (context, state) => const CommunityScreen())]),
          StatefulShellBranch(routes: [GoRoute(path: '/profile', builder: (context, state) => const ProfileScreen())]),
        ],
      ),
    ],
  );
});
