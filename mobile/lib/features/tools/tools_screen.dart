import 'package:flutter/material.dart';
import 'package:wonderhug/core/theme.dart';

class ToolsScreen extends StatelessWidget {
  const ToolsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Tools')),
      body: const Padding(
        padding: EdgeInsets.all(20),
        child: Text(
          'Planning checklist, week guide, birth preferences and postpartum rhythm will sync when an account exists.',
          style: TextStyle(color: WonderHugColors.slate, height: 1.45),
        ),
      ),
    );
  }
}
