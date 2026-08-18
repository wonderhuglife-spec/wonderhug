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
              onTap: () => Navigator.of(context).push(
                MaterialPageRoute(builder: (_) => ProductDetailScreen(product: product)),
              ),
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

class ProductDetailScreen extends ConsumerWidget {
  const ProductDetailScreen({super.key, required this.product});

  final CatalogProduct product;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = ref.watch(localeProvider);
    return Scaffold(
      appBar: AppBar(title: Text(locale == 'te' ? product.nameTe : product.name)),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(locale == 'te' ? product.descriptionTe : product.description, style: const TextStyle(height: 1.45)),
            const SizedBox(height: 16),
            Text('₹${product.pricePaise / 100}', style: Theme.of(context).textTheme.headlineSmall),
            const SizedBox(height: 16),
            FilledButton(
              onPressed: () => ref.read(cartProvider.notifier).add(product),
              child: Text(tr(locale, 'shop.add')),
            ),
          ],
        ),
      ),
    );
  }
}
