import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/l10n.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/cart/cart_controller.dart';

class CommunityScreen extends ConsumerStatefulWidget {
  const CommunityScreen({super.key});

  @override
  ConsumerState<CommunityScreen> createState() => _CommunityScreenState();
}

class _CommunityScreenState extends ConsumerState<CommunityScreen> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final locale = ref.watch(localeProvider);
    final drafts = ref.watch(offlineStoreProvider).communityDrafts;
    return Scaffold(
      appBar: AppBar(title: Text(tr(locale, 'nav.community'))),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(tr(locale, 'community.intro'), style: const TextStyle(height: 1.45)),
          const SizedBox(height: 12),
          Text(tr(locale, 'community.help'), style: const TextStyle(color: WonderHugColors.slate, height: 1.45)),
          const SizedBox(height: 16),
          const ListTile(title: Text('Planning pregnancy')),
          const ListTile(title: Text('Pregnancy')),
          const ListTile(title: Text('Garbh Sanskar')),
          const ListTile(title: Text('New parents')),
          TextField(
            controller: _controller,
            decoration: InputDecoration(labelText: tr(locale, 'community.post')),
          ),
          const SizedBox(height: 8),
          FilledButton(
            onPressed: () async {
              if (_controller.text.trim().isEmpty) return;
              await ref.read(offlineStoreProvider).addCommunityDraft({
                'body': _controller.text.trim(),
                'at': DateTime.now().toIso8601String(),
              });
              _controller.clear();
              setState(() {});
            },
            child: Text(tr(locale, 'community.post')),
          ),
          for (final draft in drafts)
            ListTile(title: Text('${draft['body']}'), subtitle: Text('${draft['at']}')),
        ],
      ),
    );
  }
}
