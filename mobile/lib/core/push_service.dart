import 'package:wonderhug/core/offline_store.dart';

/// Push delivery is wired to notification preferences in [OfflineStore].
/// When `google-services.json` / `GoogleService-Info.plist` are supplied,
/// register FCM in the Android/iOS runners and call [PushService.register].
class PushService {
  PushService(this._store);

  final OfflineStore _store;

  bool get dailyPracticeEnabled => _store.dailyReminder;
  bool get orderUpdatesEnabled => _store.orderUpdates;
  bool get milestonesEnabled => _store.milestones;

  List<String> get topics => [
        if (dailyPracticeEnabled) 'daily_practice',
        if (orderUpdatesEnabled) 'order_updates',
        if (milestonesEnabled) 'program_milestones',
      ];

  /// No-op until Firebase configs exist. Widget tests call this safely.
  Future<void> register() async {
    // Topics above are the contract for FCM once credentials arrive.
  }
}
