import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/cart/cart_controller.dart';
import 'package:wonderhug/features/learn/lesson_player_screen.dart';
import 'package:wonderhug/shared/catalog.dart';

class ProgramsScreen extends ConsumerWidget {
  const ProgramsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(localeProvider);
    final enrolled = ref.watch(offlineStoreProvider).enrollments;
    return Scaffold(
      appBar: AppBar(title: const Text('Programmes')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text('Enrolled programmes open the lesson player. Demo enrol stores access on this device.'),
          const SizedBox(height: 12),
          for (final program in catalogPrograms)
            Card(
              child: ListTile(
                title: Text(locale == 'te' ? program.nameTe : program.name),
                subtitle: Text(enrolled.contains(program.slug) ? 'Enrolled' : program.summary),
                onTap: () => Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => ProgramDetailScreen(program: program)),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class ProgramDetailScreen extends ConsumerWidget {
  const ProgramDetailScreen({super.key, required this.program});
  final CatalogProgram program;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(localeProvider);
    final store = ref.watch(offlineStoreProvider);
    final enrolled = store.enrollments.contains(program.slug);
    return Scaffold(
      appBar: AppBar(title: Text(locale == 'te' ? program.nameTe : program.name)),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(program.summary, style: const TextStyle(color: WonderHugColors.slate, height: 1.45)),
          const SizedBox(height: 16),
          if (!enrolled)
            FilledButton(
              onPressed: () async {
                await store.enroll(program.slug);
                if (context.mounted) Navigator.of(context).pop();
              },
              child: const Text('Enrol (demo)'),
            )
          else
            for (final lesson in program.lessons)
              ListTile(
                title: Text(locale == 'te' ? lesson.titleTe : lesson.title),
                subtitle: Text(lesson.kind),
                onTap: () => Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => LessonPlayerScreen(program: program, lesson: lesson),
                  ),
                ),
              ),
        ],
      ),
    );
  }
}
