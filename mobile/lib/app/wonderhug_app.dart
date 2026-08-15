import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/app/router.dart';
import 'package:wonderhug/core/theme.dart';

class WonderHugApp extends ConsumerWidget {
  const WonderHugApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    return MaterialApp.router(
      title: 'WonderHug.Life',
      theme: wonderHugTheme(),
      routerConfig: router,
    );
  }
}
