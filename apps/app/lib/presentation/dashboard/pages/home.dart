import 'package:app/common/helper/navigator/app_navigator.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:convert';
import 'package:fl_chart/fl_chart.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Map<String, dynamic> studentStatistics = {};
  List<dynamic> appliedJobs = [];
  List<dynamic> companiesCameToCollege = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _getStudentStatistics();
  }

  Future<void> _getStudentStatistics() async {
    final apiUrl = dotenv.env['BACKEND_URL'];
    String token =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkOWJlZmQzZWZmY2JiYzgyYzgzYWQwYzk3MmM4ZWE5NzhmNmYxMzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTVJVTkFMIE1BSEFKQU4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS0NjT3YxNTRHelpFNG1uU0xINmw5UEF2d1U0MDlTdmUwR0RvS3RiQ0l4bnh3b29nPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3BsYWNlbmV4dC0xN2JiMCIsImF1ZCI6InBsYWNlbmV4dC0xN2JiMCIsImF1dGhfdGltZSI6MTcyOTAwODY1NSwidXNlcl9pZCI6InhUN054aFI1R2dQa0JjQXh4azZtY3VYTDdNZjEiLCJzdWIiOiJ4VDdOeGhSNUdnUGtCY0F4eGs2bWN1WEw3TWYxIiwiaWF0IjoxNzI5MDA4NjU2LCJleHAiOjE3MjkwMTIyNTYsImVtYWlsIjoiMjAyMi5tcnVuYWwubWFoYWphbkB2ZXMuYWMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNjQwODA0NzI1NzY2MzQ3MDUwNiJdLCJlbWFpbCI6WyIyMDIyLm1ydW5hbC5tYWhhamFuQHZlcy5hYy5pbiJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.PnKHd0tg6vI3R55RFbrp0GrLIkM_3aKVHXXurEVJp0Vxrp59eaPXM31KpOORorxUXbsBGcuA5H4_oARxfKGvBzm8go2ZThnf3_Mk2siSnDUsBCO1teXcPSkq7NKhfFIxJVaXLCHy9wMkKjMVaGGLygHfnSchJ1GSiubnnANZ5_hATD7TEXcN0s3ftiZC12mW46kV_bQ5Y_6Lvx5r7Y33onK0OQkLmNPllIYLL5SdoAEMI0RxkV9rLlyMoMIoOQBxTE2OVPYu5Ng1kAxN6IfXy8GmM8f0kwl0loHsbPyivoBmj7HCZOjykjJrt0PpI05E_u68Jew12PviitoxmyLOOQ'; // Replace with your token

    try {
      final response = await http.get(
        Uri.parse('$apiUrl/api/student/statistics'),
        headers: {
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          studentStatistics = data;
          companiesCameToCollege = data['companiesCameToCollege'] ?? [];
          appliedJobs = data['appliedJobs'] ?? [];
          isLoading = false;
        });
      } else {
        throw Exception('Failed to load student statistics');
      }
    } catch (e) {
      print('Error fetching student statistics: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Student Dashboard"),
        // actions: [Icon(Icons.circle)],
        leading: const Icon(Icons.arrow_back),
      ),
      // bottomNavigationBar: BottomNavigationBar(),

      body: Center(
        child: Column(
          children: [
            Text("hello"),

            // Display loading spinner while fetching data
            if (isLoading) CircularProgressIndicator(),

            // Display student statistics once loaded
            if (!isLoading)
              StudentStatisticsChart(
                companiesCameToCollege: companiesCameToCollege.length,
                appliedJobs: appliedJobs.length,
              ),
          ],
        ),
      ),
    );
  }
}

class StudentStatisticsChart extends StatelessWidget {
  final int companiesCameToCollege;
  final int appliedJobs;

  StudentStatisticsChart({
    required this.companiesCameToCollege,
    required this.appliedJobs,
  });

  @override
  Widget build(BuildContext context) {
    // Ensure values are non-negative
    final validAppliedJobs = appliedJobs >= 0 ? appliedJobs : 0;
    final validCompaniesCameToCollege =
        companiesCameToCollege >= 0 ? companiesCameToCollege : 0;

    // Calculate maxY dynamically
    final maxY = (validCompaniesCameToCollege > validAppliedJobs)
        ? validCompaniesCameToCollege.toDouble()
        : validAppliedJobs.toDouble();

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          "Student Statistics",
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 20),

        // Bar chart for applied jobs
        Text('Applied Jobs'),
        BarChart(
          BarChartData(
            alignment: BarChartAlignment.spaceAround,
            maxY: maxY > 0 ? maxY + 1 : 1, // Ensure maxY is at least 1
            barTouchData: BarTouchData(enabled: false),
            titlesData: FlTitlesData(

                // bottomTitles: AxisTitles(
                //   sideTitles: SideTitles(showTitles: false),
                // ),
                // leftTitles: AxisTitles(
                //   sideTitles: SideTitles(showTitles: true),
                // ),
                ),
            borderData: FlBorderData(show: false),
            barGroups: [
              BarChartGroupData(
                x: 0,
                barRods: [
                  BarChartRodData(
                    toY: 20.0,
                    color: Colors.redAccent,
                    width: 22,
                  ),
                ],
              ),
            ],
          ),
        ),
        SizedBox(height: 20),

        // Bar chart for companies that came to college
        Text('Companies Came to College'),
        BarChart(
          BarChartData(
            alignment: BarChartAlignment.spaceAround,
            maxY: maxY > 0 ? maxY + 1 : 1, // Same logic for maxY
            barTouchData: BarTouchData(enabled: false),
            titlesData: FlTitlesData(
              bottomTitles: AxisTitles(
                sideTitles: SideTitles(showTitles: false),
              ),
              leftTitles: AxisTitles(
                sideTitles: SideTitles(showTitles: true),
              ),
            ),
            borderData: FlBorderData(show: false),
            barGroups: [
              BarChartGroupData(
                x: 1,
                barRods: [
                  BarChartRodData(
                    toY: 20.0,
                    color: Colors.teal,
                    width: 22,
                  ),
                ],
              ),
            ],
          ),
        ),
        SizedBox(height: 20),

        // Display raw data below graphs for reference
        Text('Applied Jobs: $validAppliedJobs'),
        Text('Companies Came: $validCompaniesCameToCollege'),
      ],
    );
  }
}
