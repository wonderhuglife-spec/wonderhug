import 'package:flutter/material.dart';
import 'package:wonderhug/design_system/components.dart';

class LearnScreen extends StatelessWidget {
  const LearnScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Learn')),
      body: const EmptyMessage(
        title: 'Journal on your phone',
        body: 'Reviewed articles will load from the same Supabase blog_posts table as the website. Until CONFIG is set, this screen stays honestly empty of invented medical lessons.',
      ),
    );
  }
}
