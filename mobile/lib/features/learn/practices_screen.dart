import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/l10n.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/core/theme.dart';

class PracticesScreen extends ConsumerWidget {
  const PracticesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(localeProvider);
    final items = locale == 'te'
        ? const [
            ('ఉదయం నిశ్శబ్దం', '10 నిమిషాలు'),
            ('సాయంత్రం నాదం', '15 నిమిషాలు'),
            ('గర్భానికి కథ', '12 నిమిషాలు'),
          ]
        : const [
            ('Morning quiet', '10 minutes'),
            ('Evening nāda', '15 minutes'),
            ('Story to the womb', '12 minutes'),
          ];
    return Scaffold(
      appBar: AppBar(title: Text(tr(locale, 'learn.library'))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          for (final item in items) ListTile(title: Text(item.$1), subtitle: Text(item.$2)),
          const Padding(
            padding: EdgeInsets.only(top: 12),
            child: Text(
              'Audio packs download after purchase and remain available offline.',
              style: TextStyle(color: WonderHugColors.slate),
            ),
          ),
        ],
      ),
    );
  }
}
