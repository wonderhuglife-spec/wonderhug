import 'package:flutter/material.dart';
import 'package:wonderhug/design_system/components.dart';

class CommunityScreen extends StatelessWidget {
  const CommunityScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Community')),
      body: const EmptyMessage(
        title: 'Calm rooms',
        body: 'Groups, posts, comments, reporting and expert answers are in the database design. This native screen will list rooms — not a noisy social feed.',
      ),
    );
  }
}
