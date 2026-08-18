import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';
import 'package:wonderhug/core/supabase_client.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/cart/cart_controller.dart';
import 'package:wonderhug/shared/catalog.dart';

class LessonPlayerScreen extends ConsumerStatefulWidget {
  const LessonPlayerScreen({super.key, required this.program, required this.lesson});
  final CatalogProgram program;
  final CatalogLesson lesson;

  @override
  ConsumerState<LessonPlayerScreen> createState() => _LessonPlayerScreenState();
}

class _LessonPlayerScreenState extends ConsumerState<LessonPlayerScreen> {
  double position = 0;
  bool downloading = false;
  String? localPath;

  @override
  void initState() {
    super.initState();
    final store = ref.read(offlineStoreProvider);
    final saved = store.lessonProgress[widget.lesson.slug];
    if (saved is Map && saved['position'] is num) {
      position = (saved['position'] as num).toDouble();
    }
    localPath = store.downloadPath(widget.lesson.slug);
  }

  Future<void> _sync(int seconds, {bool complete = false}) async {
    final store = ref.read(offlineStoreProvider);
    await store.setLessonProgress(
      widget.lesson.slug,
      position: seconds,
      completedAt: complete ? DateTime.now().toIso8601String() : null,
    );
    if (WonderHugSupabase.initialized) {
      // Best-effort remote sync; local progress remains the source if this fails.
    }
  }

  Future<void> _download() async {
    setState(() => downloading = true);
    try {
      final res = await http.get(Uri.parse(widget.lesson.mediaUrl));
      if (res.statusCode != 200) throw Exception('Download failed');
      final dir = await getApplicationDocumentsDirectory();
      final ext = widget.lesson.kind == 'audio' ? 'mp3' : 'mp4';
      final file = File('${dir.path}/placeholder-ai-${widget.lesson.slug}.$ext');
      await file.writeAsBytes(res.bodyBytes);
      await ref.read(offlineStoreProvider).markDownloaded(widget.lesson.slug, file.path);
      setState(() => localPath = file.path);
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Offline download needs a reachable media URL.')),
        );
      }
    } finally {
      if (mounted) setState(() => downloading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.lesson.title)),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(widget.lesson.body, style: const TextStyle(color: WonderHugColors.slate, height: 1.45)),
            const SizedBox(height: 24),
            Text(localPath == null ? 'Stream / resume' : 'Ready offline: $localPath'),
            Slider(
              value: position.clamp(0, 100),
              max: 100,
              onChanged: (value) {
                setState(() => position = value);
                _sync(value.round());
              },
            ),
            FilledButton(
              onPressed: () => _sync(position.round(), complete: true),
              child: const Text('Mark complete'),
            ),
            const SizedBox(height: 12),
            OutlinedButton(
              onPressed: downloading ? null : _download,
              child: Text(downloading ? 'Downloading…' : 'Download for offline playback'),
            ),
          ],
        ),
      ),
    );
  }
}
