import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:wonderhug/core/offline_store.dart';
import 'package:wonderhug/features/onboarding/journey_controller.dart';
import 'package:wonderhug/shared/catalog.dart';

class CartItem {
  const CartItem({required this.slug, required this.name, required this.pricePaise, required this.quantity});
  final String slug;
  final String name;
  final int pricePaise;
  final int quantity;

  Map<String, dynamic> toJson() => {
        'slug': slug,
        'name': name,
        'pricePaise': pricePaise,
        'quantity': quantity,
      };

  factory CartItem.fromJson(Map<String, dynamic> json) => CartItem(
        slug: json['slug'] as String,
        name: json['name'] as String,
        pricePaise: json['pricePaise'] as int,
        quantity: json['quantity'] as int,
      );
}

class CartController extends StateNotifier<List<CartItem>> {
  CartController(this._store)
      : super(_store.cart.map(CartItem.fromJson).toList());

  final OfflineStore _store;

  int get totalPaise => state.fold(0, (sum, item) => sum + item.pricePaise * item.quantity);

  Future<void> add(CatalogProduct product) async {
    final existing = state.indexWhere((item) => item.slug == product.slug);
    if (existing >= 0) {
      final current = state[existing];
      state = [
        for (var i = 0; i < state.length; i++)
          if (i == existing)
            CartItem(
              slug: current.slug,
              name: current.name,
              pricePaise: current.pricePaise,
              quantity: current.quantity + 1,
            )
          else
            state[i],
      ];
    } else {
      state = [
        ...state,
        CartItem(slug: product.slug, name: product.name, pricePaise: product.pricePaise, quantity: 1),
      ];
    }
    await _store.setCart(state.map((item) => item.toJson()).toList());
  }

  Future<void> clear() async {
    state = [];
    await _store.setCart([]);
  }

  Future<Map<String, dynamic>> checkoutDemo() async {
    final order = {
      'id': 'demo_${DateTime.now().millisecondsSinceEpoch}',
      'status': 'paid',
      'amountPaise': totalPaise,
      'items': state.map((item) => item.toJson()).toList(),
    };
    await _store.addOrder(order);
    await clear();
    return order;
  }
}

final offlineStoreProvider = Provider<OfflineStore>((ref) {
  return OfflineStore(ref.watch(sharedPreferencesProvider));
});

final cartProvider = StateNotifierProvider<CartController, List<CartItem>>((ref) {
  return CartController(ref.watch(offlineStoreProvider));
});
