import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/l10n.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/features/learn/practices_screen.dart';
import 'package:wonderhug/features/shop/shop_screen.dart';

class LearnScreen extends ConsumerWidget {
  const LearnScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(localeProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(locale, 'nav.learn'))),
      body: ListView(
        children: [
          ListTile(
            title: Text(tr(locale, 'learn.library')),
            onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const PracticesScreen())),
          ),
          const ListTile(title: Text('Preparing together before you try')),
          const ListTile(title: Text('Garbh Sanskar as practice, not promise')),
          const ListTile(title: Text('The fourth trimester is still your journey')),
          ListTile(
            title: Text(tr(locale, 'learn.shop')),
            onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => const ShopScreen())),
          ),
        ],
      ),
    );
  }
}
