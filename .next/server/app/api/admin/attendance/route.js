/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/attendance/route";
exports.ids = ["app/api/admin/attendance/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/attendance/route.ts":
/*!*******************************************!*\
  !*** ./app/api/admin/attendance/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabaseAdmin */ \"(rsc)/./lib/supabaseAdmin.ts\");\n\n\nasync function GET() {\n    try {\n        const admin = (0,_lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__.getSupabaseAdmin)();\n        // Try to fetch attendance data from database\n        // For now, return mock data structure that matches what the frontend expects\n        // In production, you would query the actual attendance_records table\n        const mockAttendanceData = {\n            summary: {\n                presentStudents: 245,\n                totalStudents: 280,\n                presentTeachers: 18,\n                totalTeachers: 20,\n                lastSync: new Date().toLocaleTimeString('en-US', {\n                    hour: '2-digit',\n                    minute: '2-digit',\n                    hour12: true\n                })\n            },\n            rfid: {\n                status: 'online',\n                activeCards: 265,\n                pendingActivations: 3,\n                offlineReaders: 0\n            },\n            recentScans: [\n                {\n                    id: '1',\n                    studentName: 'Juan Dela Cruz',\n                    gradeLevel: 'Grade 10',\n                    section: 'A',\n                    scanTime: new Date().toISOString(),\n                    status: 'Present'\n                },\n                {\n                    id: '2',\n                    studentName: 'Maria Santos',\n                    gradeLevel: 'Grade 11',\n                    section: 'B',\n                    scanTime: new Date(Date.now() - 5 * 60000).toISOString(),\n                    status: 'Present'\n                },\n                {\n                    id: '3',\n                    studentName: 'Jose Garcia',\n                    gradeLevel: 'Grade 9',\n                    section: 'C',\n                    scanTime: new Date(Date.now() - 10 * 60000).toISOString(),\n                    status: 'Present'\n                }\n            ],\n            recentAlerts: [\n                {\n                    id: '1',\n                    type: 'info',\n                    message: 'RFID system operating normally',\n                    timestamp: new Date().toLocaleTimeString('en-US', {\n                        hour: '2-digit',\n                        minute: '2-digit',\n                        hour12: true\n                    })\n                }\n            ]\n        };\n        // Try to fetch real data if database is available\n        try {\n            // Check if attendance_records table exists and fetch recent records\n            const { data: records, error } = await admin.from('attendance_records').select('*, students(*)').order('scan_time', {\n                ascending: false\n            }).limit(10);\n            if (!error && records && records.length > 0) {\n                // Process real data\n                const today = new Date().toISOString().split('T')[0];\n                const todayRecords = records.filter((r)=>r.scan_time?.startsWith(today) || r.created_at?.startsWith(today));\n                // Count unique students present today\n                const uniqueStudents = new Set(todayRecords.map((r)=>r.student_id || r.students?.student_id));\n                // Get total students count\n                const { count: totalStudents } = await admin.from('students').select('*', {\n                    count: 'exact',\n                    head: true\n                }).eq('status', 'enrolled');\n                mockAttendanceData.summary.presentStudents = uniqueStudents.size;\n                mockAttendanceData.summary.totalStudents = totalStudents || 280;\n                // Format recent scans\n                mockAttendanceData.recentScans = records.slice(0, 5).map((record)=>({\n                        id: record.id?.toString() || '',\n                        studentName: record.students ? `${record.students.first_name || ''} ${record.students.last_name || ''}`.trim() || record.students.name : 'Unknown Student',\n                        gradeLevel: record.students?.grade_level || 'N/A',\n                        section: record.students?.section || 'N/A',\n                        scanTime: record.scan_time || record.created_at,\n                        status: record.status || 'Present'\n                    }));\n            }\n        } catch (dbError) {\n            // If database query fails, use mock data\n            console.warn('Using mock attendance data:', dbError);\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            data: mockAttendanceData\n        });\n    } catch (error) {\n        console.error('Attendance API error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error?.message || 'Internal server error',\n            data: null\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLENBQUMsQ0FBQ1EsU0FBaUI7d0JBQ3pFdEMsSUFBSXNDLE9BQU90QyxFQUFFLEVBQUV1QyxjQUFjO3dCQUM3QnRDLGFBQWFxQyxPQUFPTixRQUFRLEdBQ3hCLEdBQUdNLE9BQU9OLFFBQVEsQ0FBQ1EsVUFBVSxJQUFJLEdBQUcsQ0FBQyxFQUFFRixPQUFPTixRQUFRLENBQUNTLFNBQVMsSUFBSSxJQUFJLENBQUNDLElBQUksTUFBTUosT0FBT04sUUFBUSxDQUFDVyxJQUFJLEdBQ3ZHO3dCQUNKekMsWUFBWW9DLE9BQU9OLFFBQVEsRUFBRVksZUFBZTt3QkFDNUN6QyxTQUFTbUMsT0FBT04sUUFBUSxFQUFFN0IsV0FBVzt3QkFDckNDLFVBQVVrQyxPQUFPYixTQUFTLElBQUlhLE9BQU9YLFVBQVU7d0JBQy9DaEMsUUFBUTJDLE9BQU8zQyxNQUFNLElBQUk7b0JBQzNCO1lBQ0Y7UUFDRixFQUFFLE9BQU9rRCxTQUFTO1lBQ2hCLHlDQUF5QztZQUN6Q0MsUUFBUUMsSUFBSSxDQUFDLCtCQUErQkY7UUFDOUM7UUFFQSxPQUFPbkUscURBQVlBLENBQUNzRSxJQUFJLENBQUM7WUFDdkJDLFNBQVM7WUFDVHRDLE1BQU03QjtRQUNSO0lBQ0YsRUFBRSxPQUFPK0IsT0FBWTtRQUNuQmlDLFFBQVFqQyxLQUFLLENBQUMseUJBQXlCQTtRQUN2QyxPQUFPbkMscURBQVlBLENBQUNzRSxJQUFJLENBQ3RCO1lBQ0VDLFNBQVM7WUFDVHBDLE9BQU9BLE9BQU9KLFdBQVc7WUFDekJFLE1BQU07UUFDUixHQUNBO1lBQUVoQixRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXHhhbXBwXFxodGRvY3NcXGNhcHN0b25lX01haW5cXGFwcFxcYXBpXFxhZG1pblxcYXR0ZW5kYW5jZVxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcbmltcG9ydCB7IGdldFN1cGFiYXNlQWRtaW4gfSBmcm9tICdAL2xpYi9zdXBhYmFzZUFkbWluJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgYWRtaW4gPSBnZXRTdXBhYmFzZUFkbWluKClcclxuXHJcbiAgICAvLyBUcnkgdG8gZmV0Y2ggYXR0ZW5kYW5jZSBkYXRhIGZyb20gZGF0YWJhc2VcclxuICAgIC8vIEZvciBub3csIHJldHVybiBtb2NrIGRhdGEgc3RydWN0dXJlIHRoYXQgbWF0Y2hlcyB3aGF0IHRoZSBmcm9udGVuZCBleHBlY3RzXHJcbiAgICAvLyBJbiBwcm9kdWN0aW9uLCB5b3Ugd291bGQgcXVlcnkgdGhlIGFjdHVhbCBhdHRlbmRhbmNlX3JlY29yZHMgdGFibGVcclxuXHJcbiAgICBjb25zdCBtb2NrQXR0ZW5kYW5jZURhdGEgPSB7XHJcbiAgICAgIHN1bW1hcnk6IHtcclxuICAgICAgICBwcmVzZW50U3R1ZGVudHM6IDI0NSxcclxuICAgICAgICB0b3RhbFN0dWRlbnRzOiAyODAsXHJcbiAgICAgICAgcHJlc2VudFRlYWNoZXJzOiAxOCxcclxuICAgICAgICB0b3RhbFRlYWNoZXJzOiAyMCxcclxuICAgICAgICBsYXN0U3luYzogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoJ2VuLVVTJywgeyBcclxuICAgICAgICAgIGhvdXI6ICcyLWRpZ2l0JywgXHJcbiAgICAgICAgICBtaW51dGU6ICcyLWRpZ2l0JyxcclxuICAgICAgICAgIGhvdXIxMjogdHJ1ZSBcclxuICAgICAgICB9KSxcclxuICAgICAgfSxcclxuICAgICAgcmZpZDoge1xyXG4gICAgICAgIHN0YXR1czogJ29ubGluZScsXHJcbiAgICAgICAgYWN0aXZlQ2FyZHM6IDI2NSxcclxuICAgICAgICBwZW5kaW5nQWN0aXZhdGlvbnM6IDMsXHJcbiAgICAgICAgb2ZmbGluZVJlYWRlcnM6IDAsXHJcbiAgICAgIH0sXHJcbiAgICAgIHJlY2VudFNjYW5zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWQ6ICcxJyxcclxuICAgICAgICAgIHN0dWRlbnROYW1lOiAnSnVhbiBEZWxhIENydXonLFxyXG4gICAgICAgICAgZ3JhZGVMZXZlbDogJ0dyYWRlIDEwJyxcclxuICAgICAgICAgIHNlY3Rpb246ICdBJyxcclxuICAgICAgICAgIHNjYW5UaW1lOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICBzdGF0dXM6ICdQcmVzZW50JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAnMicsXHJcbiAgICAgICAgICBzdHVkZW50TmFtZTogJ01hcmlhIFNhbnRvcycsXHJcbiAgICAgICAgICBncmFkZUxldmVsOiAnR3JhZGUgMTEnLFxyXG4gICAgICAgICAgc2VjdGlvbjogJ0InLFxyXG4gICAgICAgICAgc2NhblRpbWU6IG5ldyBEYXRlKERhdGUubm93KCkgLSA1ICogNjAwMDApLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgICBzdGF0dXM6ICdQcmVzZW50JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAnMycsXHJcbiAgICAgICAgICBzdHVkZW50TmFtZTogJ0pvc2UgR2FyY2lhJyxcclxuICAgICAgICAgIGdyYWRlTGV2ZWw6ICdHcmFkZSA5JyxcclxuICAgICAgICAgIHNlY3Rpb246ICdDJyxcclxuICAgICAgICAgIHNjYW5UaW1lOiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMTAgKiA2MDAwMCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICAgIHN0YXR1czogJ1ByZXNlbnQnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIHJlY2VudEFsZXJ0czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlkOiAnMScsXHJcbiAgICAgICAgICB0eXBlOiAnaW5mbycsXHJcbiAgICAgICAgICBtZXNzYWdlOiAnUkZJRCBzeXN0ZW0gb3BlcmF0aW5nIG5vcm1hbGx5JyxcclxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoJ2VuLVVTJywgeyBcclxuICAgICAgICAgICAgaG91cjogJzItZGlnaXQnLCBcclxuICAgICAgICAgICAgbWludXRlOiAnMi1kaWdpdCcsXHJcbiAgICAgICAgICAgIGhvdXIxMjogdHJ1ZSBcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9XHJcblxyXG4gICAgLy8gVHJ5IHRvIGZldGNoIHJlYWwgZGF0YSBpZiBkYXRhYmFzZSBpcyBhdmFpbGFibGVcclxuICAgIHRyeSB7XHJcbiAgICAgIC8vIENoZWNrIGlmIGF0dGVuZGFuY2VfcmVjb3JkcyB0YWJsZSBleGlzdHMgYW5kIGZldGNoIHJlY2VudCByZWNvcmRzXHJcbiAgICAgIGNvbnN0IHsgZGF0YTogcmVjb3JkcywgZXJyb3IgfSA9IGF3YWl0IGFkbWluXHJcbiAgICAgICAgLmZyb20oJ2F0dGVuZGFuY2VfcmVjb3JkcycpXHJcbiAgICAgICAgLnNlbGVjdCgnKiwgc3R1ZGVudHMoKiknKVxyXG4gICAgICAgIC5vcmRlcignc2Nhbl90aW1lJywgeyBhc2NlbmRpbmc6IGZhbHNlIH0pXHJcbiAgICAgICAgLmxpbWl0KDEwKVxyXG5cclxuICAgICAgaWYgKCFlcnJvciAmJiByZWNvcmRzICYmIHJlY29yZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIFByb2Nlc3MgcmVhbCBkYXRhXHJcbiAgICAgICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXVxyXG4gICAgICAgIGNvbnN0IHRvZGF5UmVjb3JkcyA9IHJlY29yZHMuZmlsdGVyKChyOiBhbnkpID0+IFxyXG4gICAgICAgICAgci5zY2FuX3RpbWU/LnN0YXJ0c1dpdGgodG9kYXkpIHx8IHIuY3JlYXRlZF9hdD8uc3RhcnRzV2l0aCh0b2RheSlcclxuICAgICAgICApXHJcblxyXG4gICAgICAgIC8vIENvdW50IHVuaXF1ZSBzdHVkZW50cyBwcmVzZW50IHRvZGF5XHJcbiAgICAgICAgY29uc3QgdW5pcXVlU3R1ZGVudHMgPSBuZXcgU2V0KHRvZGF5UmVjb3Jkcy5tYXAoKHI6IGFueSkgPT4gci5zdHVkZW50X2lkIHx8IHIuc3R1ZGVudHM/LnN0dWRlbnRfaWQpKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEdldCB0b3RhbCBzdHVkZW50cyBjb3VudFxyXG4gICAgICAgIGNvbnN0IHsgY291bnQ6IHRvdGFsU3R1ZGVudHMgfSA9IGF3YWl0IGFkbWluXHJcbiAgICAgICAgICAuZnJvbSgnc3R1ZGVudHMnKVxyXG4gICAgICAgICAgLnNlbGVjdCgnKicsIHsgY291bnQ6ICdleGFjdCcsIGhlYWQ6IHRydWUgfSlcclxuICAgICAgICAgIC5lcSgnc3RhdHVzJywgJ2Vucm9sbGVkJylcclxuXHJcbiAgICAgICAgbW9ja0F0dGVuZGFuY2VEYXRhLnN1bW1hcnkucHJlc2VudFN0dWRlbnRzID0gdW5pcXVlU3R1ZGVudHMuc2l6ZVxyXG4gICAgICAgIG1vY2tBdHRlbmRhbmNlRGF0YS5zdW1tYXJ5LnRvdGFsU3R1ZGVudHMgPSB0b3RhbFN0dWRlbnRzIHx8IDI4MFxyXG5cclxuICAgICAgICAvLyBGb3JtYXQgcmVjZW50IHNjYW5zXHJcbiAgICAgICAgbW9ja0F0dGVuZGFuY2VEYXRhLnJlY2VudFNjYW5zID0gcmVjb3Jkcy5zbGljZSgwLCA1KS5tYXAoKHJlY29yZDogYW55KSA9PiAoe1xyXG4gICAgICAgICAgaWQ6IHJlY29yZC5pZD8udG9TdHJpbmcoKSB8fCAnJyxcclxuICAgICAgICAgIHN0dWRlbnROYW1lOiByZWNvcmQuc3R1ZGVudHMgXHJcbiAgICAgICAgICAgID8gYCR7cmVjb3JkLnN0dWRlbnRzLmZpcnN0X25hbWUgfHwgJyd9ICR7cmVjb3JkLnN0dWRlbnRzLmxhc3RfbmFtZSB8fCAnJ31gLnRyaW0oKSB8fCByZWNvcmQuc3R1ZGVudHMubmFtZVxyXG4gICAgICAgICAgICA6ICdVbmtub3duIFN0dWRlbnQnLFxyXG4gICAgICAgICAgZ3JhZGVMZXZlbDogcmVjb3JkLnN0dWRlbnRzPy5ncmFkZV9sZXZlbCB8fCAnTi9BJyxcclxuICAgICAgICAgIHNlY3Rpb246IHJlY29yZC5zdHVkZW50cz8uc2VjdGlvbiB8fCAnTi9BJyxcclxuICAgICAgICAgIHNjYW5UaW1lOiByZWNvcmQuc2Nhbl90aW1lIHx8IHJlY29yZC5jcmVhdGVkX2F0LFxyXG4gICAgICAgICAgc3RhdHVzOiByZWNvcmQuc3RhdHVzIHx8ICdQcmVzZW50JyxcclxuICAgICAgICB9KSlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZGJFcnJvcikge1xyXG4gICAgICAvLyBJZiBkYXRhYmFzZSBxdWVyeSBmYWlscywgdXNlIG1vY2sgZGF0YVxyXG4gICAgICBjb25zb2xlLndhcm4oJ1VzaW5nIG1vY2sgYXR0ZW5kYW5jZSBkYXRhOicsIGRiRXJyb3IpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgZGF0YTogbW9ja0F0dGVuZGFuY2VEYXRhLFxyXG4gICAgfSlcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdBdHRlbmRhbmNlIEFQSSBlcnJvcjonLCBlcnJvcilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAge1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIGVycm9yOiBlcnJvcj8ubWVzc2FnZSB8fCAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyxcclxuICAgICAgICBkYXRhOiBudWxsLFxyXG4gICAgICB9LFxyXG4gICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTdXBhYmFzZUFkbWluIiwiR0VUIiwiYWRtaW4iLCJtb2NrQXR0ZW5kYW5jZURhdGEiLCJzdW1tYXJ5IiwicHJlc2VudFN0dWRlbnRzIiwidG90YWxTdHVkZW50cyIsInByZXNlbnRUZWFjaGVycyIsInRvdGFsVGVhY2hlcnMiLCJsYXN0U3luYyIsIkRhdGUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJob3VyIiwibWludXRlIiwiaG91cjEyIiwicmZpZCIsInN0YXR1cyIsImFjdGl2ZUNhcmRzIiwicGVuZGluZ0FjdGl2YXRpb25zIiwib2ZmbGluZVJlYWRlcnMiLCJyZWNlbnRTY2FucyIsImlkIiwic3R1ZGVudE5hbWUiLCJncmFkZUxldmVsIiwic2VjdGlvbiIsInNjYW5UaW1lIiwidG9JU09TdHJpbmciLCJub3ciLCJyZWNlbnRBbGVydHMiLCJ0eXBlIiwibWVzc2FnZSIsInRpbWVzdGFtcCIsImRhdGEiLCJyZWNvcmRzIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0Iiwib3JkZXIiLCJhc2NlbmRpbmciLCJsaW1pdCIsImxlbmd0aCIsInRvZGF5Iiwic3BsaXQiLCJ0b2RheVJlY29yZHMiLCJmaWx0ZXIiLCJyIiwic2Nhbl90aW1lIiwic3RhcnRzV2l0aCIsImNyZWF0ZWRfYXQiLCJ1bmlxdWVTdHVkZW50cyIsIlNldCIsIm1hcCIsInN0dWRlbnRfaWQiLCJzdHVkZW50cyIsImNvdW50IiwiaGVhZCIsImVxIiwic2l6ZSIsInNsaWNlIiwicmVjb3JkIiwidG9TdHJpbmciLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwidHJpbSIsIm5hbWUiLCJncmFkZV9sZXZlbCIsImRiRXJyb3IiLCJjb25zb2xlIiwid2FybiIsImpzb24iLCJzdWNjZXNzIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/attendance/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseAdmin.ts":
/*!******************************!*\
  !*** ./lib/supabaseAdmin.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabaseAdmin: () => (/* binding */ getSupabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\nconst supabaseUrl = \"https://ulntyefamkxkbynrugop.supabase.co\";\nconst serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\nfunction getSupabaseAdmin() {\n    if (!supabaseUrl || !serviceRoleKey) {\n        throw new Error('Missing Supabase admin env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only).');\n    }\n    return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, serviceRoleKey, {\n        auth: {\n            autoRefreshToken: false,\n            persistSession: false\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VBZG1pbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUF5RTtBQUV6RSxNQUFNQyxjQUFjQywwQ0FBb0M7QUFDeEQsTUFBTUcsaUJBQWlCSCxRQUFRQyxHQUFHLENBQUNHLHlCQUF5QjtBQUVyRCxTQUFTQztJQUNkLElBQUksQ0FBQ04sZUFBZSxDQUFDSSxnQkFBZ0I7UUFDbkMsTUFBTSxJQUFJRyxNQUFNO0lBQ2xCO0lBRUEsT0FBT1IsbUVBQVlBLENBQUNDLGFBQXVCSSxnQkFBMEI7UUFDbkVJLE1BQU07WUFDSkMsa0JBQWtCO1lBQ2xCQyxnQkFBZ0I7UUFDbEI7SUFDRjtBQUNGIiwic291cmNlcyI6WyJDOlxceGFtcHBcXGh0ZG9jc1xcY2Fwc3RvbmVfTWFpblxcbGliXFxzdXBhYmFzZUFkbWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCwgdHlwZSBTdXBhYmFzZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcydcclxuXHJcbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMXHJcbmNvbnN0IHNlcnZpY2VSb2xlS2V5ID0gcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cGFiYXNlQWRtaW4oKTogU3VwYWJhc2VDbGllbnQge1xyXG4gIGlmICghc3VwYWJhc2VVcmwgfHwgIXNlcnZpY2VSb2xlS2V5KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgU3VwYWJhc2UgYWRtaW4gZW52LiBTZXQgTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIGFuZCBTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIChzZXJ2ZXItb25seSkuJylcclxuICB9XHJcbiAgXHJcbiAgcmV0dXJuIGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCBhcyBzdHJpbmcsIHNlcnZpY2VSb2xlS2V5IGFzIHN0cmluZywge1xyXG4gICAgYXV0aDoge1xyXG4gICAgICBhdXRvUmVmcmVzaFRva2VuOiBmYWxzZSxcclxuICAgICAgcGVyc2lzdFNlc3Npb246IGZhbHNlLFxyXG4gICAgfSxcclxuICB9KVxyXG59XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInNlcnZpY2VSb2xlS2V5IiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSIsImdldFN1cGFiYXNlQWRtaW4iLCJFcnJvciIsImF1dGgiLCJhdXRvUmVmcmVzaFRva2VuIiwicGVyc2lzdFNlc3Npb24iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseAdmin.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fattendance%2Froute&page=%2Fapi%2Fadmin%2Fattendance%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fattendance%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fattendance%2Froute&page=%2Fapi%2Fadmin%2Fattendance%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fattendance%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_xampp_htdocs_capstone_Main_app_api_admin_attendance_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/attendance/route.ts */ \"(rsc)/./app/api/admin/attendance/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/attendance/route\",\n        pathname: \"/api/admin/attendance\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/attendance/route\"\n    },\n    resolvedPagePath: \"C:\\\\xampp\\\\htdocs\\\\capstone_Main\\\\app\\\\api\\\\admin\\\\attendance\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_xampp_htdocs_capstone_Main_app_api_admin_attendance_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmF0dGVuZGFuY2UlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGYXR0ZW5kYW5jZSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGYXR0ZW5kYW5jZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN1QjtBQUNwRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxceGFtcHBcXFxcaHRkb2NzXFxcXGNhcHN0b25lX01haW5cXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxhdHRlbmRhbmNlXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9hdHRlbmRhbmNlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vYXR0ZW5kYW5jZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vYXR0ZW5kYW5jZS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxjYXBzdG9uZV9NYWluXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcYXR0ZW5kYW5jZVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fattendance%2Froute&page=%2Fapi%2Fadmin%2Fattendance%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fattendance%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fattendance%2Froute&page=%2Fapi%2Fadmin%2Fattendance%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fattendance%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();