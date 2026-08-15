import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/l10n.dart';
import 'package:wonderhug/core/locale_controller.dart';
import 'package:wonderhug/core/theme.dart';
import 'package:wonderhug/features/cart/cart_controller.dart';
import 'package:wonderhug/shared/catalog.dart';

class ShopScreen extends ConsumerWidget {
  const ShopScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(localeProvider);
    final cart = ref.watch(cartProvider);
    return Scaffold(
      appBar: AppBar(title: Text(tr(locale, 'shop.title'))),
      body: ListView(
        children: [
          for (final product in catalogProducts)
            ListTile(
              title: Text(locale == 'te' ? product.nameTe : product.name),
              subtitle: Text('₹${product.pricePaise / 100}'),
              trailing: IconButton(
                icon: const Icon(Icons.add_shopping_cart),
                tooltip: tr(locale, 'shop.add'),
                onPressed: () => ref.read(cartProvider.notifier).add(product),
              ),
            ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Text(tr(locale, 'shop.demo'), style: const TextStyle(color: WonderHugColors.slate)),
          ),
          if (cart.isNotEmpty)
            Padding(
              padding: const EdgeInsets.all(20),
              child: FilledButton(
                onPressed: () async {
                  final order = await ref.read(cartProvider.notifier).checkoutDemo();
                  if (context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Order ${order['id']}')),
                    );
                  }
                },
                child: Text(tr(locale, 'shop.checkout')),
              ),
            ),
        ],
      ),
    );
  }
}
