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
          'Faculty seats book via WhatsApp. Named clinician bios, hospitals and degrees wait on WonderHug-verified copy — this app will not invent them.',
          style: TextStyle(color: WonderHugColors.slate, height: 1.45),
        ),
      ),
    );
  }
}
