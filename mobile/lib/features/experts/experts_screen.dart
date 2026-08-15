import 'package:flutter/material.dart';
import 'package:wonderhug/core/theme.dart';

class ExpertsScreen extends StatelessWidget {
  const ExpertsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Experts')),
      body: const Padding(
        padding: EdgeInsets.all(20),
        child: Text(
          'Named experts are REQUIRES_VERIFIED_DATA. This screen will not invent hospitals or degrees.',
          style: TextStyle(color: WonderHugColors.slate, height: 1.45),
        ),
      ),
    );
  }
}
