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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabaseAdmin */ \"(rsc)/./lib/supabaseAdmin.ts\");\n/* harmony import */ var _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/supabaseClient */ \"(rsc)/./lib/supabaseClient.ts\");\n\n\n // Keep for fallback\nconst mockStudents = [\n    {\n        id: 1,\n        name: 'Ana Dela Cruz',\n        student_id: 'SNPA-2024-001',\n        grade_level: 'Grade 7',\n        section: 'St. Mary',\n        email: 'ana.delacruz@example.com',\n        status: 'Enrolled',\n        created_at: new Date().toISOString()\n    },\n    {\n        id: 2,\n        name: 'Miguel Santos',\n        student_id: 'SNPA-2024-002',\n        grade_level: 'Grade 8',\n        section: 'St. Joseph',\n        email: 'miguel.santos@example.com',\n        status: 'Pending',\n        created_at: new Date().toISOString()\n    }\n];\nasync function GET() {\n    try {\n        // Use admin client for server-side operations (bypasses RLS)\n        let supabaseClient;\n        try {\n            supabaseClient = (0,_lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__.getSupabaseAdmin)();\n        } catch (adminError) {\n            console.error('Failed to get admin client, falling back to regular client:', adminError);\n            supabaseClient = _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_2__.supabase;\n        }\n        if (!supabaseClient) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: true,\n                students: mockStudents,\n                mock: true\n            });\n        }\n        const { data, error } = await supabaseClient.from('students').select('*').order('created_at', {\n            ascending: false\n        }).limit(100);\n        if (error) {\n            console.error('Database error:', error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'Failed to fetch students',\n                students: []\n            });\n        }\n        // Transform data to match frontend expectations\n        const transformedStudents = (data || []).map((student)=>({\n                ...student,\n                // Map database fields to frontend expected fields\n                student_id: student.student_id || student.student_number,\n                name: student.name || `${student.first_name || ''} ${student.middle_name || ''} ${student.last_name || ''}`.trim() || 'N/A',\n                rfid_card: student.rfid_card || student.rfidCard || student.rfid_tag || null,\n                rfidCard: student.rfid_card || student.rfidCard || student.rfid_tag || null,\n                // Keep original fields for compatibility\n                first_name: student.first_name,\n                last_name: student.last_name,\n                middle_name: student.middle_name\n            }));\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            students: transformedStudents\n        });\n    } catch (error) {\n        console.error('Students API error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error?.message || 'Internal server error',\n            students: mockStudents,\n            mock: true\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL3N0dWRlbnRzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMEM7QUFDWTtBQUNQLENBQUMsb0JBQW9CO0FBRXBFLE1BQU1HLGVBQWU7SUFDbkI7UUFDRUMsSUFBSTtRQUNKQyxNQUFNO1FBQ05DLFlBQVk7UUFDWkMsYUFBYTtRQUNiQyxTQUFTO1FBQ1RDLE9BQU87UUFDUEMsUUFBUTtRQUNSQyxZQUFZLElBQUlDLE9BQU9DLFdBQVc7SUFDcEM7SUFDQTtRQUNFVCxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsWUFBWTtRQUNaQyxhQUFhO1FBQ2JDLFNBQVM7UUFDVEMsT0FBTztRQUNQQyxRQUFRO1FBQ1JDLFlBQVksSUFBSUMsT0FBT0MsV0FBVztJQUNwQztDQUNEO0FBRU0sZUFBZUM7SUFDcEIsSUFBSTtRQUNGLDZEQUE2RDtRQUM3RCxJQUFJQztRQUNKLElBQUk7WUFDRkEsaUJBQWlCZCxvRUFBZ0JBO1FBQ25DLEVBQUUsT0FBT2UsWUFBaUI7WUFDeEJDLFFBQVFDLEtBQUssQ0FBQywrREFBK0RGO1lBQzdFRCxpQkFBaUJiLHlEQUFRQTtRQUMzQjtRQUVBLElBQUksQ0FBQ2EsZ0JBQWdCO1lBQ25CLE9BQU9mLHFEQUFZQSxDQUFDbUIsSUFBSSxDQUFDO2dCQUN2QkMsU0FBUztnQkFDVEMsVUFBVWxCO2dCQUNWbUIsTUFBTTtZQUNSO1FBQ0Y7UUFFQSxNQUFNLEVBQUVDLElBQUksRUFBRUwsS0FBSyxFQUFFLEdBQUcsTUFBTUgsZUFDM0JTLElBQUksQ0FBQyxZQUNMQyxNQUFNLENBQUMsS0FDUEMsS0FBSyxDQUFDLGNBQWM7WUFBRUMsV0FBVztRQUFNLEdBQ3ZDQyxLQUFLLENBQUM7UUFFVCxJQUFJVixPQUFPO1lBQ1RELFFBQVFDLEtBQUssQ0FBQyxtQkFBbUJBO1lBQ2pDLE9BQU9sQixxREFBWUEsQ0FBQ21CLElBQUksQ0FBQztnQkFDdkJDLFNBQVM7Z0JBQ1RGLE9BQU87Z0JBQ1BHLFVBQVUsRUFBRTtZQUNkO1FBQ0Y7UUFFQSxnREFBZ0Q7UUFDaEQsTUFBTVEsc0JBQXNCLENBQUNOLFFBQVEsRUFBRSxFQUFFTyxHQUFHLENBQUMsQ0FBQ0MsVUFBa0I7Z0JBQzlELEdBQUdBLE9BQU87Z0JBQ1Ysa0RBQWtEO2dCQUNsRHpCLFlBQVl5QixRQUFRekIsVUFBVSxJQUFJeUIsUUFBUUMsY0FBYztnQkFDeEQzQixNQUFNMEIsUUFBUTFCLElBQUksSUFBSSxHQUFHMEIsUUFBUUUsVUFBVSxJQUFJLEdBQUcsQ0FBQyxFQUFFRixRQUFRRyxXQUFXLElBQUksR0FBRyxDQUFDLEVBQUVILFFBQVFJLFNBQVMsSUFBSSxJQUFJLENBQUNDLElBQUksTUFBTTtnQkFDdEhDLFdBQVdOLFFBQVFNLFNBQVMsSUFBSU4sUUFBUU8sUUFBUSxJQUFJUCxRQUFRUSxRQUFRLElBQUk7Z0JBQ3hFRCxVQUFVUCxRQUFRTSxTQUFTLElBQUlOLFFBQVFPLFFBQVEsSUFBSVAsUUFBUVEsUUFBUSxJQUFJO2dCQUN2RSx5Q0FBeUM7Z0JBQ3pDTixZQUFZRixRQUFRRSxVQUFVO2dCQUM5QkUsV0FBV0osUUFBUUksU0FBUztnQkFDNUJELGFBQWFILFFBQVFHLFdBQVc7WUFDbEM7UUFFQSxPQUFPbEMscURBQVlBLENBQUNtQixJQUFJLENBQUM7WUFDdkJDLFNBQVM7WUFDVEMsVUFBVVE7UUFDWjtJQUNGLEVBQUUsT0FBT1gsT0FBWTtRQUNuQkQsUUFBUUMsS0FBSyxDQUFDLHVCQUF1QkE7UUFDckMsT0FBT2xCLHFEQUFZQSxDQUFDbUIsSUFBSSxDQUN0QjtZQUNFQyxTQUFTO1lBQ1RGLE9BQU9BLE9BQU9zQixXQUFXO1lBQ3pCbkIsVUFBVWxCO1lBQ1ZtQixNQUFNO1FBQ1IsR0FDQTtZQUFFWixRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXHhhbXBwXFxodGRvY3NcXGNhcHN0b25lX01haW5cXGFwcFxcYXBpXFxhZG1pblxcc3R1ZGVudHNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgZ2V0U3VwYWJhc2VBZG1pbiB9IGZyb20gJ0AvbGliL3N1cGFiYXNlQWRtaW4nXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gJ0AvbGliL3N1cGFiYXNlQ2xpZW50JyAvLyBLZWVwIGZvciBmYWxsYmFja1xuXG5jb25zdCBtb2NrU3R1ZGVudHMgPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiAnQW5hIERlbGEgQ3J1eicsXG4gICAgc3R1ZGVudF9pZDogJ1NOUEEtMjAyNC0wMDEnLFxuICAgIGdyYWRlX2xldmVsOiAnR3JhZGUgNycsXG4gICAgc2VjdGlvbjogJ1N0LiBNYXJ5JyxcbiAgICBlbWFpbDogJ2FuYS5kZWxhY3J1ekBleGFtcGxlLmNvbScsXG4gICAgc3RhdHVzOiAnRW5yb2xsZWQnLFxuICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIG5hbWU6ICdNaWd1ZWwgU2FudG9zJyxcbiAgICBzdHVkZW50X2lkOiAnU05QQS0yMDI0LTAwMicsXG4gICAgZ3JhZGVfbGV2ZWw6ICdHcmFkZSA4JyxcbiAgICBzZWN0aW9uOiAnU3QuIEpvc2VwaCcsXG4gICAgZW1haWw6ICdtaWd1ZWwuc2FudG9zQGV4YW1wbGUuY29tJyxcbiAgICBzdGF0dXM6ICdQZW5kaW5nJyxcbiAgICBjcmVhdGVkX2F0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gIH0sXG5dXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIHRyeSB7XG4gICAgLy8gVXNlIGFkbWluIGNsaWVudCBmb3Igc2VydmVyLXNpZGUgb3BlcmF0aW9ucyAoYnlwYXNzZXMgUkxTKVxuICAgIGxldCBzdXBhYmFzZUNsaWVudFxuICAgIHRyeSB7XG4gICAgICBzdXBhYmFzZUNsaWVudCA9IGdldFN1cGFiYXNlQWRtaW4oKVxuICAgIH0gY2F0Y2ggKGFkbWluRXJyb3I6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGdldCBhZG1pbiBjbGllbnQsIGZhbGxpbmcgYmFjayB0byByZWd1bGFyIGNsaWVudDonLCBhZG1pbkVycm9yKVxuICAgICAgc3VwYWJhc2VDbGllbnQgPSBzdXBhYmFzZVxuICAgIH1cblxuICAgIGlmICghc3VwYWJhc2VDbGllbnQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgIHN0dWRlbnRzOiBtb2NrU3R1ZGVudHMsXG4gICAgICAgIG1vY2s6IHRydWUsXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlQ2xpZW50XG4gICAgICAuZnJvbSgnc3R1ZGVudHMnKVxuICAgICAgLnNlbGVjdCgnKicpXG4gICAgICAub3JkZXIoJ2NyZWF0ZWRfYXQnLCB7IGFzY2VuZGluZzogZmFsc2UgfSlcbiAgICAgIC5saW1pdCgxMDApXG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOicsIGVycm9yKVxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHN0dWRlbnRzJyxcbiAgICAgICAgc3R1ZGVudHM6IFtdLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBUcmFuc2Zvcm0gZGF0YSB0byBtYXRjaCBmcm9udGVuZCBleHBlY3RhdGlvbnNcbiAgICBjb25zdCB0cmFuc2Zvcm1lZFN0dWRlbnRzID0gKGRhdGEgfHwgW10pLm1hcCgoc3R1ZGVudDogYW55KSA9PiAoe1xuICAgICAgLi4uc3R1ZGVudCxcbiAgICAgIC8vIE1hcCBkYXRhYmFzZSBmaWVsZHMgdG8gZnJvbnRlbmQgZXhwZWN0ZWQgZmllbGRzXG4gICAgICBzdHVkZW50X2lkOiBzdHVkZW50LnN0dWRlbnRfaWQgfHwgc3R1ZGVudC5zdHVkZW50X251bWJlcixcbiAgICAgIG5hbWU6IHN0dWRlbnQubmFtZSB8fCBgJHtzdHVkZW50LmZpcnN0X25hbWUgfHwgJyd9ICR7c3R1ZGVudC5taWRkbGVfbmFtZSB8fCAnJ30gJHtzdHVkZW50Lmxhc3RfbmFtZSB8fCAnJ31gLnRyaW0oKSB8fCAnTi9BJyxcbiAgICAgIHJmaWRfY2FyZDogc3R1ZGVudC5yZmlkX2NhcmQgfHwgc3R1ZGVudC5yZmlkQ2FyZCB8fCBzdHVkZW50LnJmaWRfdGFnIHx8IG51bGwsXG4gICAgICByZmlkQ2FyZDogc3R1ZGVudC5yZmlkX2NhcmQgfHwgc3R1ZGVudC5yZmlkQ2FyZCB8fCBzdHVkZW50LnJmaWRfdGFnIHx8IG51bGwsXG4gICAgICAvLyBLZWVwIG9yaWdpbmFsIGZpZWxkcyBmb3IgY29tcGF0aWJpbGl0eVxuICAgICAgZmlyc3RfbmFtZTogc3R1ZGVudC5maXJzdF9uYW1lLFxuICAgICAgbGFzdF9uYW1lOiBzdHVkZW50Lmxhc3RfbmFtZSxcbiAgICAgIG1pZGRsZV9uYW1lOiBzdHVkZW50Lm1pZGRsZV9uYW1lLFxuICAgIH0pKVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBzdHVkZW50czogdHJhbnNmb3JtZWRTdHVkZW50cyxcbiAgICB9KVxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignU3R1ZGVudHMgQVBJIGVycm9yOicsIGVycm9yKVxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHtcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgIGVycm9yOiBlcnJvcj8ubWVzc2FnZSB8fCAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyxcbiAgICAgICAgc3R1ZGVudHM6IG1vY2tTdHVkZW50cyxcbiAgICAgICAgbW9jazogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApXG4gIH1cbn1cblxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldFN1cGFiYXNlQWRtaW4iLCJzdXBhYmFzZSIsIm1vY2tTdHVkZW50cyIsImlkIiwibmFtZSIsInN0dWRlbnRfaWQiLCJncmFkZV9sZXZlbCIsInNlY3Rpb24iLCJlbWFpbCIsInN0YXR1cyIsImNyZWF0ZWRfYXQiLCJEYXRlIiwidG9JU09TdHJpbmciLCJHRVQiLCJzdXBhYmFzZUNsaWVudCIsImFkbWluRXJyb3IiLCJjb25zb2xlIiwiZXJyb3IiLCJqc29uIiwic3VjY2VzcyIsInN0dWRlbnRzIiwibW9jayIsImRhdGEiLCJmcm9tIiwic2VsZWN0Iiwib3JkZXIiLCJhc2NlbmRpbmciLCJsaW1pdCIsInRyYW5zZm9ybWVkU3R1ZGVudHMiLCJtYXAiLCJzdHVkZW50Iiwic3R1ZGVudF9udW1iZXIiLCJmaXJzdF9uYW1lIiwibWlkZGxlX25hbWUiLCJsYXN0X25hbWUiLCJ0cmltIiwicmZpZF9jYXJkIiwicmZpZENhcmQiLCJyZmlkX3RhZyIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/students/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseAdmin.ts":
/*!******************************!*\
  !*** ./lib/supabaseAdmin.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabaseAdmin: () => (/* binding */ getSupabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/.pnpm/@supabase+supabase-js@2.78.0/node_modules/@supabase/supabase-js/dist/module/index.js\");\n\nconst supabaseUrl = \"https://ulntyefamkxkbynrugop.supabase.co\";\nconst serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\nfunction getSupabaseAdmin() {\n    if (!supabaseUrl || !serviceRoleKey) {\n        throw new Error('Missing Supabase admin env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only).');\n    }\n    return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, serviceRoleKey, {\n        auth: {\n            autoRefreshToken: false,\n            persistSession: false\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VBZG1pbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUF5RTtBQUV6RSxNQUFNQyxjQUFjQywwQ0FBb0M7QUFDeEQsTUFBTUcsaUJBQWlCSCxRQUFRQyxHQUFHLENBQUNHLHlCQUF5QjtBQUVyRCxTQUFTQztJQUNkLElBQUksQ0FBQ04sZUFBZSxDQUFDSSxnQkFBZ0I7UUFDbkMsTUFBTSxJQUFJRyxNQUFNO0lBQ2xCO0lBRUEsT0FBT1IsbUVBQVlBLENBQUNDLGFBQXVCSSxnQkFBMEI7UUFDbkVJLE1BQU07WUFDSkMsa0JBQWtCO1lBQ2xCQyxnQkFBZ0I7UUFDbEI7SUFDRjtBQUNGIiwic291cmNlcyI6WyJDOlxceGFtcHBcXGh0ZG9jc1xcY2Fwc3RvbmVfTWFpblxcbGliXFxzdXBhYmFzZUFkbWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCwgdHlwZSBTdXBhYmFzZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcydcclxuXHJcbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMXHJcbmNvbnN0IHNlcnZpY2VSb2xlS2V5ID0gcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cGFiYXNlQWRtaW4oKTogU3VwYWJhc2VDbGllbnQge1xyXG4gIGlmICghc3VwYWJhc2VVcmwgfHwgIXNlcnZpY2VSb2xlS2V5KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgU3VwYWJhc2UgYWRtaW4gZW52LiBTZXQgTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIGFuZCBTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIChzZXJ2ZXItb25seSkuJylcclxuICB9XHJcbiAgXHJcbiAgcmV0dXJuIGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCBhcyBzdHJpbmcsIHNlcnZpY2VSb2xlS2V5IGFzIHN0cmluZywge1xyXG4gICAgYXV0aDoge1xyXG4gICAgICBhdXRvUmVmcmVzaFRva2VuOiBmYWxzZSxcclxuICAgICAgcGVyc2lzdFNlc3Npb246IGZhbHNlLFxyXG4gICAgfSxcclxuICB9KVxyXG59XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInNlcnZpY2VSb2xlS2V5IiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSIsImdldFN1cGFiYXNlQWRtaW4iLCJFcnJvciIsImF1dGgiLCJhdXRvUmVmcmVzaFRva2VuIiwicGVyc2lzdFNlc3Npb24iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseAdmin.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseClient.ts":
/*!*******************************!*\
  !*** ./lib/supabaseClient.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase),\n/* harmony export */   supabaseAdmin: () => (/* binding */ supabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/.pnpm/@supabase+supabase-js@2.78.0/node_modules/@supabase/supabase-js/dist/module/index.js\");\n// lib/supabaseClient.ts\n\n// Get environment variables\nconst supabaseUrl = \"https://ulntyefamkxkbynrugop.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjgwNDEsImV4cCI6MjA3NjIwNDA0MX0.TnL8jfBVJD8Z0N5rFl_KFhAku8zxiy2fFvztBDYHaWk\";\n// Validate that environment variables are set\nif (!supabaseUrl || !supabaseAnonKey) {\n    throw new Error('Missing Supabase environment variables');\n}\n// Create Supabase client\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n// Optional: Create a client with service role for admin operations\n// DO NOT expose this in client-side code\nconst supabaseAdmin = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || '', {\n    auth: {\n        autoRefreshToken: false,\n        persistSession: false\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VDbGllbnQudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0JBQXdCO0FBQzRCO0FBRXBELDRCQUE0QjtBQUM1QixNQUFNQyxjQUFjQywwQ0FBb0M7QUFDeEQsTUFBTUcsa0JBQWtCSCxrTkFBeUM7QUFFakUsOENBQThDO0FBQzlDLElBQUksQ0FBQ0QsZUFBZSxDQUFDSSxpQkFBaUI7SUFDcEMsTUFBTSxJQUFJRSxNQUFNO0FBQ2xCO0FBRUEseUJBQXlCO0FBQ2xCLE1BQU1DLFdBQVdSLG1FQUFZQSxDQUFDQyxhQUFhSSxpQkFBZ0I7QUFFbEUsbUVBQW1FO0FBQ25FLHlDQUF5QztBQUNsQyxNQUFNSSxnQkFBZ0JULG1FQUFZQSxDQUN2Q0MsYUFDQUMsUUFBUUMsR0FBRyxDQUFDTyx5QkFBeUIsSUFBSSxJQUN6QztJQUNFQyxNQUFNO1FBQ0pDLGtCQUFrQjtRQUNsQkMsZ0JBQWdCO0lBQ2xCO0FBQ0YsR0FDRCIsInNvdXJjZXMiOlsiQzpcXHhhbXBwXFxodGRvY3NcXGNhcHN0b25lX01haW5cXGxpYlxcc3VwYWJhc2VDbGllbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3N1cGFiYXNlQ2xpZW50LnRzXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcydcclxuXHJcbi8vIEdldCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcclxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhXHJcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIVxyXG5cclxuLy8gVmFsaWRhdGUgdGhhdCBlbnZpcm9ubWVudCB2YXJpYWJsZXMgYXJlIHNldFxyXG5pZiAoIXN1cGFiYXNlVXJsIHx8ICFzdXBhYmFzZUFub25LZXkpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzJylcclxufVxyXG5cclxuLy8gQ3JlYXRlIFN1cGFiYXNlIGNsaWVudFxyXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSlcclxuXHJcbi8vIE9wdGlvbmFsOiBDcmVhdGUgYSBjbGllbnQgd2l0aCBzZXJ2aWNlIHJvbGUgZm9yIGFkbWluIG9wZXJhdGlvbnNcclxuLy8gRE8gTk9UIGV4cG9zZSB0aGlzIGluIGNsaWVudC1zaWRlIGNvZGVcclxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVDbGllbnQoXHJcbiAgc3VwYWJhc2VVcmwsXHJcbiAgcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSB8fCAnJyxcclxuICB7XHJcbiAgICBhdXRoOiB7XHJcbiAgICAgIGF1dG9SZWZyZXNoVG9rZW46IGZhbHNlLFxyXG4gICAgICBwZXJzaXN0U2Vzc2lvbjogZmFsc2VcclxuICAgIH1cclxuICB9XHJcbikiXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJFcnJvciIsInN1cGFiYXNlIiwic3VwYWJhc2VBZG1pbiIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJhdXRoIiwiYXV0b1JlZnJlc2hUb2tlbiIsInBlcnNpc3RTZXNzaW9uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseClient.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstudents%2Froute&page=%2Fapi%2Fadmin%2Fstudents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstudents%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstudents%2Froute&page=%2Fapi%2Fadmin%2Fstudents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstudents%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_xampp_htdocs_capstone_Main_app_api_admin_students_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/students/route.ts */ \"(rsc)/./app/api/admin/students/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/students/route\",\n        pathname: \"/api/admin/students\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/students/route\"\n    },\n    resolvedPagePath: \"C:\\\\xampp\\\\htdocs\\\\capstone_Main\\\\app\\\\api\\\\admin\\\\students\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_xampp_htdocs_capstone_Main_app_api_admin_students_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE4LjMuMV9yZWFjdEAxOC4zLjFfX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnN0dWRlbnRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnN0dWRlbnRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZzdHVkZW50cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNxQjtBQUNsRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxceGFtcHBcXFxcaHRkb2NzXFxcXGNhcHN0b25lX01haW5cXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxzdHVkZW50c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vc3R1ZGVudHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9zdHVkZW50c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vc3R1ZGVudHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcY2Fwc3RvbmVfTWFpblxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXHN0dWRlbnRzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstudents%2Froute&page=%2Fapi%2Fadmin%2Fstudents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstudents%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/tslib@2.8.1","vendor-chunks/tr46@0.0.3","vendor-chunks/@supabase+auth-js@2.78.0","vendor-chunks/@supabase+storage-js@2.78.0","vendor-chunks/@supabase+realtime-js@2.78.0","vendor-chunks/@supabase+postgrest-js@2.78.0","vendor-chunks/@supabase+node-fetch@2.6.15","vendor-chunks/whatwg-url@5.0.0","vendor-chunks/@supabase+supabase-js@2.78.0","vendor-chunks/@supabase+functions-js@2.78.0","vendor-chunks/webidl-conversions@3.0.1"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstudents%2Froute&page=%2Fapi%2Fadmin%2Fstudents%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstudents%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();