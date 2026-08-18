import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class OfflineStore {
  OfflineStore(this._prefs);

  final SharedPreferences _prefs;

  int get kicks => _prefs.getInt('wonderhug.kicks') ?? 0;

  Future<void> setKicks(int value) => _prefs.setInt('wonderhug.kicks', value);

  List<String> get savedArticles => _prefs.getStringList('wonderhug.saved') ?? [];

  Future<void> toggleSaved(String id) async {
    final next = [...savedArticles];
    if (next.contains(id)) {
      next.remove(id);
    } else {
      next.add(id);
    }
    await _prefs.setStringList('wonderhug.saved', next);
  }

  bool get dailyReminder => _prefs.getBool('wonderhug.notify.daily') ?? true;
  bool get orderUpdates => _prefs.getBool('wonderhug.notify.orders') ?? true;
  bool get milestones => _prefs.getBool('wonderhug.notify.milestones') ?? true;

  Future<void> setDailyReminder(bool value) => _prefs.setBool('wonderhug.notify.daily', value);
  Future<void> setOrderUpdates(bool value) => _prefs.setBool('wonderhug.notify.orders', value);
  Future<void> setMilestones(bool value) => _prefs.setBool('wonderhug.notify.milestones', value);

  List<String> get cachedPractices => _prefs.getStringList('wonderhug.practices') ?? const ['morning-quiet', 'evening-nada', 'story-to-the-womb'];

  Future<void> cachePractices(List<String> slugs) => _prefs.setStringList('wonderhug.practices', slugs);

  List<Map<String, dynamic>> get cart {
    final raw = _prefs.getString('wonderhug.cart');
    if (raw == null) return [];
    return (jsonDecode(raw) as List).cast<Map<String, dynamic>>();
  }

  Future<void> setCart(List<Map<String, dynamic>> items) => _prefs.setString('wonderhug.cart', jsonEncode(items));

  List<Map<String, dynamic>> get communityDrafts {
    final raw = _prefs.getString('wonderhug.communityDrafts');
    if (raw == null) return [];
    return (jsonDecode(raw) as List).cast<Map<String, dynamic>>();
  }

  Future<void> addCommunityDraft(Map<String, dynamic> post) async {
    await _prefs.setString('wonderhug.communityDrafts', jsonEncode([post, ...communityDrafts]));
  }

  List<Map<String, dynamic>> get orders {
    final raw = _prefs.getString('wonderhug.orders');
    if (raw == null) return [];
    return (jsonDecode(raw) as List).cast<Map<String, dynamic>>();
  }

  Future<void> addOrder(Map<String, dynamic> order) async {
    await _prefs.setString('wonderhug.orders', jsonEncode([order, ...orders]));
  }

  List<String> get enrollments => _prefs.getStringList('wonderhug.enrollments') ?? [];

  Future<void> enroll(String slug) async {
    final next = {...enrollments, slug}.toList();
    await _prefs.setStringList('wonderhug.enrollments', next);
  }

  Map<String, dynamic> get lessonProgress {
    final raw = _prefs.getString('wonderhug.lessonProgress');
    if (raw == null) return {};
    return (jsonDecode(raw) as Map).cast<String, dynamic>();
  }

  Future<void> setLessonProgress(String lessonId, {int? position, String? completedAt}) async {
    final next = {...lessonProgress};
    final prev = (next[lessonId] as Map?)?.cast<String, dynamic>() ?? {};
    next[lessonId] = {
      ...prev,
      if (position != null) 'position': position,
      if (completedAt != null) 'completedAt': completedAt,
    };
    await _prefs.setString('wonderhug.lessonProgress', jsonEncode(next));
  }

  List<String> get downloadedLessons => _prefs.getStringList('wonderhug.downloadedLessons') ?? [];

  Future<void> markDownloaded(String lessonId, String path) async {
    await _prefs.setString('wonderhug.download.$lessonId', path);
    final next = {...downloadedLessons, lessonId}.toList();
    await _prefs.setStringList('wonderhug.downloadedLessons', next);
  }

  String? downloadPath(String lessonId) => _prefs.getString('wonderhug.download.$lessonId');

  List<Map<String, dynamic>> get kickSessions {
    final raw = _prefs.getString('wonderhug.kickSessions');
    if (raw == null) return [];
    return (jsonDecode(raw) as List).cast<Map<String, dynamic>>();
  }

  Future<void> addKickSession(int count) async {
    await _prefs.setString(
      'wonderhug.kickSessions',
      jsonEncode([
        {'at': DateTime.now().toIso8601String(), 'count': count},
        ...kickSessions,
      ]),
    );
  }
}
