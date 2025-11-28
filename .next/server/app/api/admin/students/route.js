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
exports.id = "app/api/admin/students/route";
exports.ids = ["app/api/admin/students/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/students/route.ts":
/*!*****************************************!*\
  !*** ./app/api/admin/students/route.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabaseClient */ \"(rsc)/./lib/supabaseClient.ts\");\n\n\nconst mockStudents = [\n    {\n        id: 1,\n        name: 'Ana Dela Cruz',\n        student_id: 'SNPA-2024-001',\n        grade_level: 'Grade 7',\n        section: 'St. Mary',\n        email: 'ana.delacruz@example.com',\n        status: 'Enrolled',\n        created_at: new Date().toISOString()\n    },\n    {\n        id: 2,\n        name: 'Miguel Santos',\n        student_id: 'SNPA-2024-002',\n        grade_level: 'Grade 8',\n        section: 'St. Joseph',\n        email: 'miguel.santos@example.com',\n        status: 'Pending',\n        created_at: new Date().toISOString()\n    }\n];\nasync function GET() {\n    try {\n        if (!_lib_supabaseClient__WEBPACK_IMPORTED_MODULE_1__.supabase) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: true,\n                students: mockStudents,\n                mock: true\n            });\n        }\n        const { data, error } = await _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_1__.supabase.from('students').select('*').order('created_at', {\n            ascending: false\n        }).limit(100);\n        if (error) {\n            console.error('Database error:', error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'Failed to fetch students',\n                students: []\n            });\n        }\n        // Transform data to match frontend expectations\n        const transformedStudents = (data || []).map((student)=>({\n                ...student,\n                // Map database fields to frontend expected fields\n                student_id: student.student_id || student.student_number,\n                name: student.name || `${student.first_name || ''} ${student.middle_name || ''} ${student.last_name || ''}`.trim() || 'N/A',\n                rfid_card: student.rfid_card || student.rfidCard || student.rfid_tag || null,\n                rfidCard: student.rfid_card || student.rfidCard || student.rfid_tag || null,\n                // Keep original fields for compatibility\n                first_name: student.first_name,\n                last_name: student.last_name,\n                middle_name: student.middle_name\n            }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            students: transformedStudents\n        });\n    } catch (error) {\n        console.error('Students API error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error?.message || 'Internal server error',\n            students: mockStudents,\n            mock: true\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL3N0dWRlbnRzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEwQztBQUNLO0FBRS9DLE1BQU1FLGVBQWU7SUFDbkI7UUFDRUMsSUFBSTtRQUNKQyxNQUFNO1FBQ05DLFlBQVk7UUFDWkMsYUFBYTtRQUNiQyxTQUFTO1FBQ1RDLE9BQU87UUFDUEMsUUFBUTtRQUNSQyxZQUFZLElBQUlDLE9BQU9DLFdBQVc7SUFDcEM7SUFDQTtRQUNFVCxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsWUFBWTtRQUNaQyxhQUFhO1FBQ2JDLFNBQVM7UUFDVEMsT0FBTztRQUNQQyxRQUFRO1FBQ1JDLFlBQVksSUFBSUMsT0FBT0MsV0FBVztJQUNwQztDQUNEO0FBRU0sZUFBZUM7SUFDcEIsSUFBSTtRQUNGLElBQUksQ0FBQ1oseURBQVFBLEVBQUU7WUFDYixPQUFPRCxxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDO2dCQUN2QkMsU0FBUztnQkFDVEMsVUFBVWQ7Z0JBQ1ZlLE1BQU07WUFDUjtRQUNGO1FBRUEsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1sQix5REFBUUEsQ0FDbkNtQixJQUFJLENBQUMsWUFDTEMsTUFBTSxDQUFDLEtBQ1BDLEtBQUssQ0FBQyxjQUFjO1lBQUVDLFdBQVc7UUFBTSxHQUN2Q0MsS0FBSyxDQUFDO1FBRVQsSUFBSUwsT0FBTztZQUNUTSxRQUFRTixLQUFLLENBQUMsbUJBQW1CQTtZQUNqQyxPQUFPbkIscURBQVlBLENBQUNjLElBQUksQ0FBQztnQkFDdkJDLFNBQVM7Z0JBQ1RJLE9BQU87Z0JBQ1BILFVBQVUsRUFBRTtZQUNkO1FBQ0Y7UUFFQSxnREFBZ0Q7UUFDaEQsTUFBTVUsc0JBQXNCLENBQUNSLFFBQVEsRUFBRSxFQUFFUyxHQUFHLENBQUMsQ0FBQ0MsVUFBa0I7Z0JBQzlELEdBQUdBLE9BQU87Z0JBQ1Ysa0RBQWtEO2dCQUNsRHZCLFlBQVl1QixRQUFRdkIsVUFBVSxJQUFJdUIsUUFBUUMsY0FBYztnQkFDeER6QixNQUFNd0IsUUFBUXhCLElBQUksSUFBSSxHQUFHd0IsUUFBUUUsVUFBVSxJQUFJLEdBQUcsQ0FBQyxFQUFFRixRQUFRRyxXQUFXLElBQUksR0FBRyxDQUFDLEVBQUVILFFBQVFJLFNBQVMsSUFBSSxJQUFJLENBQUNDLElBQUksTUFBTTtnQkFDdEhDLFdBQVdOLFFBQVFNLFNBQVMsSUFBSU4sUUFBUU8sUUFBUSxJQUFJUCxRQUFRUSxRQUFRLElBQUk7Z0JBQ3hFRCxVQUFVUCxRQUFRTSxTQUFTLElBQUlOLFFBQVFPLFFBQVEsSUFBSVAsUUFBUVEsUUFBUSxJQUFJO2dCQUN2RSx5Q0FBeUM7Z0JBQ3pDTixZQUFZRixRQUFRRSxVQUFVO2dCQUM5QkUsV0FBV0osUUFBUUksU0FBUztnQkFDNUJELGFBQWFILFFBQVFHLFdBQVc7WUFDbEM7UUFFQSxPQUFPL0IscURBQVlBLENBQUNjLElBQUksQ0FBQztZQUN2QkMsU0FBUztZQUNUQyxVQUFVVTtRQUNaO0lBQ0YsRUFBRSxPQUFPUCxPQUFZO1FBQ25CTSxRQUFRTixLQUFLLENBQUMsdUJBQXVCQTtRQUNyQyxPQUFPbkIscURBQVlBLENBQUNjLElBQUksQ0FDdEI7WUFDRUMsU0FBUztZQUNUSSxPQUFPQSxPQUFPa0IsV0FBVztZQUN6QnJCLFVBQVVkO1lBQ1ZlLE1BQU07UUFDUixHQUNBO1lBQUVSLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxceGFtcHBcXGh0ZG9jc1xcY2Fwc3RvbmVfTWFpblxcYXBwXFxhcGlcXGFkbWluXFxzdHVkZW50c1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gJ0AvbGliL3N1cGFiYXNlQ2xpZW50J1xuXG5jb25zdCBtb2NrU3R1ZGVudHMgPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiAnQW5hIERlbGEgQ3J1eicsXG4gICAgc3R1ZGVudF9pZDogJ1NOUEEtMjAyNC0wMDEnLFxuICAgIGdyYWRlX2xldmVsOiAnR3JhZGUgNycsXG4gICAgc2VjdGlvbjogJ1N0LiBNYXJ5JyxcbiAgICBlbWFpbDogJ2FuYS5kZWxhY3J1ekBleGFtcGxlLmNvbScsXG4gICAgc3RhdHVzOiAnRW5yb2xsZWQnLFxuICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIG5hbWU6ICdNaWd1ZWwgU2FudG9zJyxcbiAgICBzdHVkZW50X2lkOiAnU05QQS0yMDI0LTAwMicsXG4gICAgZ3JhZGVfbGV2ZWw6ICdHcmFkZSA4JyxcbiAgICBzZWN0aW9uOiAnU3QuIEpvc2VwaCcsXG4gICAgZW1haWw6ICdtaWd1ZWwuc2FudG9zQGV4YW1wbGUuY29tJyxcbiAgICBzdGF0dXM6ICdQZW5kaW5nJyxcbiAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gIH0sXG5dXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgaWYgKCFzdXBhYmFzZSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgc3R1ZGVudHM6IG1vY2tTdHVkZW50cyxcbiAgICAgICAgbW9jazogdHJ1ZSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgIC5mcm9tKCdzdHVkZW50cycpXG4gICAgICAuc2VsZWN0KCcqJylcbiAgICAgIC5vcmRlcignY3JlYXRlZF9hdCcsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KVxuICAgICAgLmxpbWl0KDEwMClcblxuICAgIGlmIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRGF0YWJhc2UgZXJyb3I6JywgZXJyb3IpXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggc3R1ZGVudHMnLFxuICAgICAgICBzdHVkZW50czogW10sXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIFRyYW5zZm9ybSBkYXRhIHRvIG1hdGNoIGZyb250ZW5kIGV4cGVjdGF0aW9uc1xuICAgIGNvbnN0IHRyYW5zZm9ybWVkU3R1ZGVudHMgPSAoZGF0YSB8fCBbXSkubWFwKChzdHVkZW50OiBhbnkpID0+ICh7XG4gICAgICAuLi5zdHVkZW50LFxuICAgICAgLy8gTWFwIGRhdGFiYXNlIGZpZWxkcyB0byBmcm9udGVuZCBleHBlY3RlZCBmaWVsZHNcbiAgICAgIHN0dWRlbnRfaWQ6IHN0dWRlbnQuc3R1ZGVudF9pZCB8fCBzdHVkZW50LnN0dWRlbnRfbnVtYmVyLFxuICAgICAgbmFtZTogc3R1ZGVudC5uYW1lIHx8IGAke3N0dWRlbnQuZmlyc3RfbmFtZSB8fCAnJ30gJHtzdHVkZW50Lm1pZGRsZV9uYW1lIHx8ICcnfSAke3N0dWRlbnQubGFzdF9uYW1lIHx8ICcnfWAudHJpbSgpIHx8ICdOL0EnLFxuICAgICAgcmZpZF9jYXJkOiBzdHVkZW50LnJmaWRfY2FyZCB8fCBzdHVkZW50LnJmaWRDYXJkIHx8IHN0dWRlbnQucmZpZF90YWcgfHwgbnVsbCxcbiAgICAgIHJmaWRDYXJkOiBzdHVkZW50LnJmaWRfY2FyZCB8fCBzdHVkZW50LnJmaWRDYXJkIHx8IHN0dWRlbnQucmZpZF90YWcgfHwgbnVsbCxcbiAgICAgIC8vIEtlZXAgb3JpZ2luYWwgZmllbGRzIGZvciBjb21wYXRpYmlsaXR5XG4gICAgICBmaXJzdF9uYW1lOiBzdHVkZW50LmZpcnN0X25hbWUsXG4gICAgICBsYXN0X25hbWU6IHN0dWRlbnQubGFzdF9uYW1lLFxuICAgICAgbWlkZGxlX25hbWU6IHN0dWRlbnQubWlkZGxlX25hbWUsXG4gICAgfSkpXG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIHN0dWRlbnRzOiB0cmFuc2Zvcm1lZFN0dWRlbnRzLFxuICAgIH0pXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdTdHVkZW50cyBBUEkgZXJyb3I6JywgZXJyb3IpXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAge1xuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgICAgZXJyb3I6IGVycm9yPy5tZXNzYWdlIHx8ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InLFxuICAgICAgICBzdHVkZW50czogbW9ja1N0dWRlbnRzLFxuICAgICAgICBtb2NrOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxuICAgIClcbiAgfVxufVxuXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwic3VwYWJhc2UiLCJtb2NrU3R1ZGVudHMiLCJpZCIsIm5hbWUiLCJzdHVkZW50X2lkIiwiZ3JhZGVfbGV2ZWwiLCJzZWN0aW9uIiwiZW1haWwiLCJzdGF0dXMiLCJjcmVhdGVkX2F0IiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwiR0VUIiwianNvbiIsInN1Y2Nlc3MiLCJzdHVkZW50cyIsIm1vY2siLCJkYXRhIiwiZXJyb3IiLCJmcm9tIiwic2VsZWN0Iiwib3JkZXIiLCJhc2NlbmRpbmciLCJsaW1pdCIsImNvbnNvbGUiLCJ0cmFuc2Zvcm1lZFN0dWRlbnRzIiwibWFwIiwic3R1ZGVudCIsInN0dWRlbnRfbnVtYmVyIiwiZmlyc3RfbmFtZSIsIm1pZGRsZV9uYW1lIiwibGFzdF9uYW1lIiwidHJpbSIsInJmaWRfY2FyZCIsInJmaWRDYXJkIiwicmZpZF90YWciLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/students/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseClient.ts":
/*!*******************************!*\
  !*** ./lib/supabaseClient.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase),\n/* harmony export */   supabaseAdmin: () => (/* binding */ supabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n// lib/supabaseClient.ts\n\n// Get environment variables\nconst supabaseUrl = \"https://ulntyefamkxkbynrugop.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjgwNDEsImV4cCI6MjA3NjIwNDA0MX0.TnL8jfBVJD8Z0N5rFl_KFhAku8zxiy2fFvztBDYHaWk\";\n// Validate that environment variables are set\nif (!supabaseUrl || !supabaseAnonKey) {\n    throw new Error('Missing Supabase environment variables');\n}\n// Create Supabase client\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n// Optional: Create a client with service role for admin operations\n// DO NOT expose this in client-side code\nconst supabaseAdmin = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || '', {\n    auth: {\n        autoRefreshToken: false,\n        persistSession: false\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VDbGllbnQudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0JBQXdCO0FBQzRCO0FBRXBELDRCQUE0QjtBQUM1QixNQUFNQyxjQUFjQywwQ0FBb0M7QUFDeEQsTUFBTUcsa0JBQWtCSCxrTkFBeUM7QUFFakUsOENBQThDO0FBQzlDLElBQUksQ0FBQ0QsZUFBZSxDQUFDSSxpQkFBaUI7SUFDcEMsTUFBTSxJQUFJRSxNQUFNO0FBQ2xCO0FBRUEseUJBQXlCO0FBQ2xCLE1BQU1DLFdBQVdSLG1FQUFZQSxDQUFDQyxhQUFhSSxpQkFBZ0I7QUFFbEUsbUVBQW1FO0FBQ25FLHlDQUF5QztBQUNsQyxNQUFNSSxnQkFBZ0JULG1FQUFZQSxDQUN2Q0MsYUFDQUMsUUFBUUMsR0FBRyxDQUFDTyx5QkFBeUIsSUFBSSxJQUN6QztJQUNFQyxNQUFNO1FBQ0pDLGtCQUFrQjtRQUNsQkMsZ0JBQWdCO0lBQ2xCO0FBQ0YsR0FDRCIsInNvdXJjZXMiOlsiQzpcXHhhbXBwXFxodGRvY3NcXGNhcHN0b25lX01haW5cXGxpYlxcc3VwYWJhc2VDbGllbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3N1cGFiYXNlQ2xpZW50LnRzXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcydcclxuXHJcbi8vIEdldCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcclxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhXHJcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIVxyXG5cclxuLy8gVmFsaWRhdGUgdGhhdCBlbnZpcm9ubWVudCB2YXJpYWJsZXMgYXJlIHNldFxyXG5pZiAoIXN1cGFiYXNlVXJsIHx8ICFzdXBhYmFzZUFub25LZXkpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzJylcclxufVxyXG5cclxuLy8gQ3JlYXRlIFN1cGFiYXNlIGNsaWVudFxyXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSlcclxuXHJcbi8vIE9wdGlvbmFsOiBDcmVhdGUgYSBjbGllbnQgd2l0aCBzZXJ2aWNlIHJvbGUgZm9yIGFkbWluIG9wZXJhdGlvbnNcclxuLy8gRE8gTk9UIGV4cG9zZSB0aGlzIGluIGNsaWVudC1zaWRlIGNvZGVcclxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVDbGllbnQoXHJcbiAgc3VwYWJhc2VVcmwsXHJcbiAgcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSB8fCAnJyxcclxuICB7XHJcbiAgICBhdXRoOiB7XHJcbiAgICAgIGF1dG9SZWZyZXNoVG9rZW46IGZhbHNlLFxyXG4gICAgICBwZXJzaXN0U2Vzc2lvbjogZmFsc2VcclxuICAgIH1cclxuICB9XHJcbikiXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJFcnJvciIsInN1cGFiYXNlIiwic3VwYWJhc2VBZG1pbiIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJhdXRoIiwiYXV0b1JlZnJlc2hUb2tlbiIsInBlcnNpc3RTZXNzaW9uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseClient.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstudents%2Froute&page=%2Fapi%2Fadmin%2Fstudents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstudents%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstudents%2Froute&page=%2Fapi%2Fadmin%2Fstudents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstudents%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_xampp_htdocs_capstone_Main_app_api_admin_students_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/students/route.ts */ \"(rsc)/./app/api/admin/students/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/students/route\",\n        pathname: \"/api/admin/students\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/students/route\"\n    },\n    resolvedPagePath: \"C:\\\\xampp\\\\htdocs\\\\capstone_Main\\\\app\\\\api\\\\admin\\\\students\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_xampp_htdocs_capstone_Main_app_api_admin_students_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnN0dWRlbnRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnN0dWRlbnRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZzdHVkZW50cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNxQjtBQUNsRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxceGFtcHBcXFxcaHRkb2NzXFxcXGNhcHN0b25lX01haW5cXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxzdHVkZW50c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vc3R1ZGVudHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9zdHVkZW50c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vc3R1ZGVudHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcY2Fwc3RvbmVfTWFpblxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXHN0dWRlbnRzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstudents%2Froute&page=%2Fapi%2Fadmin%2Fstudents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstudents%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstudents%2Froute&page=%2Fapi%2Fadmin%2Fstudents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstudents%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();