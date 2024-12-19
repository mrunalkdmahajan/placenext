import 'dart:convert';
import 'package:app/components/Dashboard/student_statistics_chart.dart';
import 'package:app/main.dart';
import 'package:app/pages/Auth/login_screen.dart';
import 'package:app/store/auth_provider.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _companiesCameToCollege = 0; // Correct initialization
  int _appliedJobs = 0;

  int? _touchedIndex;

  bool _isLoading = false;

  Future<void> getStatistics(String accessToken) async {
    setState(() {
      _isLoading = true;
    });

    try {
      final response = await http.get(
        Uri.parse('$BackendUrl/api/student/statistics'),
        headers: {'Authorization': 'Bearer $accessToken'},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);

        setState(() {
          _companiesCameToCollege = data['companiesCameToCollege'].length ?? 0;
          _appliedJobs = data['appliedJobs'].length ?? 0;
        });
      } else {
        throw Exception('Failed to load statistics');
      }
    } catch (e) {
      debugPrint('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: Failed to fetch statistics')),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final loginProvider = Provider.of<LoginProvider>(context, listen: false);
    final displayName = loginProvider.user?.displayName ?? 'No email available';
    final accessToken = loginProvider.accessToken;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Home Screen'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              // Sign out logic
              loginProvider.signOut();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) => const LoginScreen()),
              );
            },
            tooltip: 'Sign Out',
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Welcome, $displayName'),
              ElevatedButton(
                onPressed: () {
                  getStatistics(accessToken);
                },
                child: _isLoading
                    ? const CircularProgressIndicator()
                    : const Text('Load Dashboard'),
              ),
              const SizedBox(height: 20),
              if (_companiesCameToCollege != 0 || _appliedJobs != 0)
                SizedBox(
                  height: 450, // Add a fixed height for the chart
                  child: StudentStatisticsChart(
                    companiesCameToCollege: _companiesCameToCollege,
                    appliedJobs: _appliedJobs,
                  ),
                ),
              SizedBox(
                  height: 450,
                  child: PieChart(
                    PieChartData(
                        sections: _showingSections(_touchedIndex),
                        pieTouchData: PieTouchData(touchCallback:
                            (FlTouchEvent event, pieTouchResponse) {
                          if (!event.isInterestedForInteractions ||
                              pieTouchResponse == null ||
                              pieTouchResponse.touchedSection == null) {
                            setState(() {
                              _touchedIndex = null;
                            });
                            return;
                          }
                          setState(() {
                            _touchedIndex = pieTouchResponse
                                .touchedSection!.touchedSectionIndex;
                          });
                        })),
                  ))
            ],
          ),
        ),
      ),
    );
  }
}

List<PieChartSectionData> _showingSections(_touchedIndex) {
  final sections = <PieChartSectionData>[
    PieChartSectionData(
      color: Colors.lightBlueAccent,
      value: 60,
      title: _touchedIndex == 0 ? '60%' : 'Eligible',
      radius: _touchedIndex == 0 ? 100 : 80,
      titleStyle: TextStyle(
        fontSize: _touchedIndex == 0 ? 18 : 16,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
    ),
    PieChartSectionData(
      color: Colors.pinkAccent,
      value: 40,
      title: _touchedIndex == 1 ? '40%' : 'Not Eligible',
      radius: _touchedIndex == 1 ? 100 : 80,
      titleStyle: TextStyle(
        fontSize: _touchedIndex == 1 ? 18 : 16,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
    ),
  ];
  return sections;
}
