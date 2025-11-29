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
exports.id = "app/api/admin/stats/route";
exports.ids = ["app/api/admin/stats/route"];
exports.modules = {

/***/ "(rsc)/./app/api/admin/stats/route.ts":
/*!**************************************!*\
  !*** ./app/api/admin/stats/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabaseClient */ \"(rsc)/./lib/supabaseClient.ts\");\n\n\nasync function GET() {\n    try {\n        // Fetch students count\n        const { count: studentsCount, error: studentsError } = await _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_1__.supabase.from('students').select('*', {\n            count: 'exact',\n            head: true\n        });\n        // Fetch teachers count\n        const { count: teachersCount, error: teachersError } = await _lib_supabaseClient__WEBPACK_IMPORTED_MODULE_1__.supabase.from('teachers').select('*', {\n            count: 'exact',\n            head: true\n        });\n        if (studentsError || teachersError) {\n            console.error('Database error:', {\n                studentsError,\n                teachersError\n            });\n            // Return mock data if database is not available\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: true,\n                data: {\n                    totalStudents: 0,\n                    totalTeachers: 0,\n                    attendanceRate: 0\n                },\n                mock: true\n            });\n        }\n        // Calculate attendance (this would need actual attendance data)\n        // For now, we'll return 0 and calculate it later when we have attendance table\n        const attendanceRate = 0;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            data: {\n                totalStudents: studentsCount || 0,\n                totalTeachers: teachersCount || 0,\n                attendanceRate\n            }\n        });\n    } catch (error) {\n        console.error('Admin stats API error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error?.message || 'Internal server error',\n            data: {\n                totalStudents: 0,\n                totalTeachers: 0,\n                attendanceRate: 0\n            },\n            mock: true\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FkbWluL3N0YXRzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEwQztBQUNLO0FBRXhDLGVBQWVFO0lBQ3BCLElBQUk7UUFDRix1QkFBdUI7UUFDdkIsTUFBTSxFQUFFQyxPQUFPQyxhQUFhLEVBQUVDLE9BQU9DLGFBQWEsRUFBRSxHQUFHLE1BQU1MLHlEQUFRQSxDQUNsRU0sSUFBSSxDQUFDLFlBQ0xDLE1BQU0sQ0FBQyxLQUFLO1lBQUVMLE9BQU87WUFBU00sTUFBTTtRQUFLO1FBRTVDLHVCQUF1QjtRQUN2QixNQUFNLEVBQUVOLE9BQU9PLGFBQWEsRUFBRUwsT0FBT00sYUFBYSxFQUFFLEdBQUcsTUFBTVYseURBQVFBLENBQ2xFTSxJQUFJLENBQUMsWUFDTEMsTUFBTSxDQUFDLEtBQUs7WUFBRUwsT0FBTztZQUFTTSxNQUFNO1FBQUs7UUFFNUMsSUFBSUgsaUJBQWlCSyxlQUFlO1lBQ2xDQyxRQUFRUCxLQUFLLENBQUMsbUJBQW1CO2dCQUFFQztnQkFBZUs7WUFBYztZQUNoRSxnREFBZ0Q7WUFDaEQsT0FBT1gscURBQVlBLENBQUNhLElBQUksQ0FBQztnQkFDdkJDLFNBQVM7Z0JBQ1RDLE1BQU07b0JBQ0pDLGVBQWU7b0JBQ2ZDLGVBQWU7b0JBQ2ZDLGdCQUFnQjtnQkFDbEI7Z0JBQ0FDLE1BQU07WUFDUjtRQUNGO1FBRUEsZ0VBQWdFO1FBQ2hFLCtFQUErRTtRQUMvRSxNQUFNRCxpQkFBaUI7UUFFdkIsT0FBT2xCLHFEQUFZQSxDQUFDYSxJQUFJLENBQUM7WUFDdkJDLFNBQVM7WUFDVEMsTUFBTTtnQkFDSkMsZUFBZVosaUJBQWlCO2dCQUNoQ2EsZUFBZVAsaUJBQWlCO2dCQUNoQ1E7WUFDRjtRQUNGO0lBQ0YsRUFBRSxPQUFPYixPQUFZO1FBQ25CTyxRQUFRUCxLQUFLLENBQUMsMEJBQTBCQTtRQUN4QyxPQUFPTCxxREFBWUEsQ0FBQ2EsSUFBSSxDQUN0QjtZQUNFQyxTQUFTO1lBQ1RULE9BQU9BLE9BQU9lLFdBQVc7WUFDekJMLE1BQU07Z0JBQ0pDLGVBQWU7Z0JBQ2ZDLGVBQWU7Z0JBQ2ZDLGdCQUFnQjtZQUNsQjtZQUNBQyxNQUFNO1FBQ1IsR0FDQTtZQUFFRSxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXHhhbXBwXFxodGRvY3NcXGNhcHN0b25lX01haW5cXGFwcFxcYXBpXFxhZG1pblxcc3RhdHNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xyXG5pbXBvcnQgeyBzdXBhYmFzZSB9IGZyb20gJ0AvbGliL3N1cGFiYXNlQ2xpZW50J1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgLy8gRmV0Y2ggc3R1ZGVudHMgY291bnRcclxuICAgIGNvbnN0IHsgY291bnQ6IHN0dWRlbnRzQ291bnQsIGVycm9yOiBzdHVkZW50c0Vycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxyXG4gICAgICAuZnJvbSgnc3R1ZGVudHMnKVxyXG4gICAgICAuc2VsZWN0KCcqJywgeyBjb3VudDogJ2V4YWN0JywgaGVhZDogdHJ1ZSB9KVxyXG5cclxuICAgIC8vIEZldGNoIHRlYWNoZXJzIGNvdW50XHJcbiAgICBjb25zdCB7IGNvdW50OiB0ZWFjaGVyc0NvdW50LCBlcnJvcjogdGVhY2hlcnNFcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcclxuICAgICAgLmZyb20oJ3RlYWNoZXJzJylcclxuICAgICAgLnNlbGVjdCgnKicsIHsgY291bnQ6ICdleGFjdCcsIGhlYWQ6IHRydWUgfSlcclxuXHJcbiAgICBpZiAoc3R1ZGVudHNFcnJvciB8fCB0ZWFjaGVyc0Vycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIGVycm9yOicsIHsgc3R1ZGVudHNFcnJvciwgdGVhY2hlcnNFcnJvciB9KVxyXG4gICAgICAvLyBSZXR1cm4gbW9jayBkYXRhIGlmIGRhdGFiYXNlIGlzIG5vdCBhdmFpbGFibGVcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHRvdGFsU3R1ZGVudHM6IDAsXHJcbiAgICAgICAgICB0b3RhbFRlYWNoZXJzOiAwLFxyXG4gICAgICAgICAgYXR0ZW5kYW5jZVJhdGU6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2NrOiB0cnVlLFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBhdHRlbmRhbmNlICh0aGlzIHdvdWxkIG5lZWQgYWN0dWFsIGF0dGVuZGFuY2UgZGF0YSlcclxuICAgIC8vIEZvciBub3csIHdlJ2xsIHJldHVybiAwIGFuZCBjYWxjdWxhdGUgaXQgbGF0ZXIgd2hlbiB3ZSBoYXZlIGF0dGVuZGFuY2UgdGFibGVcclxuICAgIGNvbnN0IGF0dGVuZGFuY2VSYXRlID0gMFxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0b3RhbFN0dWRlbnRzOiBzdHVkZW50c0NvdW50IHx8IDAsXHJcbiAgICAgICAgdG90YWxUZWFjaGVyczogdGVhY2hlcnNDb3VudCB8fCAwLFxyXG4gICAgICAgIGF0dGVuZGFuY2VSYXRlLFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdBZG1pbiBzdGF0cyBBUEkgZXJyb3I6JywgZXJyb3IpXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgIHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBlcnJvcjogZXJyb3I/Lm1lc3NhZ2UgfHwgJ0ludGVybmFsIHNlcnZlciBlcnJvcicsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgdG90YWxTdHVkZW50czogMCxcclxuICAgICAgICAgIHRvdGFsVGVhY2hlcnM6IDAsXHJcbiAgICAgICAgICBhdHRlbmRhbmNlUmF0ZTogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vY2s6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInN1cGFiYXNlIiwiR0VUIiwiY291bnQiLCJzdHVkZW50c0NvdW50IiwiZXJyb3IiLCJzdHVkZW50c0Vycm9yIiwiZnJvbSIsInNlbGVjdCIsImhlYWQiLCJ0ZWFjaGVyc0NvdW50IiwidGVhY2hlcnNFcnJvciIsImNvbnNvbGUiLCJqc29uIiwic3VjY2VzcyIsImRhdGEiLCJ0b3RhbFN0dWRlbnRzIiwidG90YWxUZWFjaGVycyIsImF0dGVuZGFuY2VSYXRlIiwibW9jayIsIm1lc3NhZ2UiLCJzdGF0dXMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/admin/stats/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseClient.ts":
/*!*******************************!*\
  !*** ./lib/supabaseClient.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   supabase: () => (/* binding */ supabase),\n/* harmony export */   supabaseAdmin: () => (/* binding */ supabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/.pnpm/@supabase+supabase-js@2.78.0/node_modules/@supabase/supabase-js/dist/module/index.js\");\n// lib/supabaseClient.ts\n\n// Get environment variables\nconst supabaseUrl = \"https://ulntyefamkxkbynrugop.supabase.co\";\nconst supabaseAnonKey = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjgwNDEsImV4cCI6MjA3NjIwNDA0MX0.TnL8jfBVJD8Z0N5rFl_KFhAku8zxiy2fFvztBDYHaWk\";\n// Validate that environment variables are set\nif (!supabaseUrl || !supabaseAnonKey) {\n    throw new Error('Missing Supabase environment variables');\n}\n// Create Supabase client\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n// Optional: Create a client with service role for admin operations\n// DO NOT expose this in client-side code\nconst supabaseAdmin = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY || '', {\n    auth: {\n        autoRefreshToken: false,\n        persistSession: false\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VDbGllbnQudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0JBQXdCO0FBQzRCO0FBRXBELDRCQUE0QjtBQUM1QixNQUFNQyxjQUFjQywwQ0FBb0M7QUFDeEQsTUFBTUcsa0JBQWtCSCxrTkFBeUM7QUFFakUsOENBQThDO0FBQzlDLElBQUksQ0FBQ0QsZUFBZSxDQUFDSSxpQkFBaUI7SUFDcEMsTUFBTSxJQUFJRSxNQUFNO0FBQ2xCO0FBRUEseUJBQXlCO0FBQ2xCLE1BQU1DLFdBQVdSLG1FQUFZQSxDQUFDQyxhQUFhSSxpQkFBZ0I7QUFFbEUsbUVBQW1FO0FBQ25FLHlDQUF5QztBQUNsQyxNQUFNSSxnQkFBZ0JULG1FQUFZQSxDQUN2Q0MsYUFDQUMsUUFBUUMsR0FBRyxDQUFDTyx5QkFBeUIsSUFBSSxJQUN6QztJQUNFQyxNQUFNO1FBQ0pDLGtCQUFrQjtRQUNsQkMsZ0JBQWdCO0lBQ2xCO0FBQ0YsR0FDRCIsInNvdXJjZXMiOlsiQzpcXHhhbXBwXFxodGRvY3NcXGNhcHN0b25lX01haW5cXGxpYlxcc3VwYWJhc2VDbGllbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbGliL3N1cGFiYXNlQ2xpZW50LnRzXHJcbmltcG9ydCB7IGNyZWF0ZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcydcclxuXHJcbi8vIEdldCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcclxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwhXHJcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIVxyXG5cclxuLy8gVmFsaWRhdGUgdGhhdCBlbnZpcm9ubWVudCB2YXJpYWJsZXMgYXJlIHNldFxyXG5pZiAoIXN1cGFiYXNlVXJsIHx8ICFzdXBhYmFzZUFub25LZXkpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgU3VwYWJhc2UgZW52aXJvbm1lbnQgdmFyaWFibGVzJylcclxufVxyXG5cclxuLy8gQ3JlYXRlIFN1cGFiYXNlIGNsaWVudFxyXG5leHBvcnQgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQoc3VwYWJhc2VVcmwsIHN1cGFiYXNlQW5vbktleSlcclxuXHJcbi8vIE9wdGlvbmFsOiBDcmVhdGUgYSBjbGllbnQgd2l0aCBzZXJ2aWNlIHJvbGUgZm9yIGFkbWluIG9wZXJhdGlvbnNcclxuLy8gRE8gTk9UIGV4cG9zZSB0aGlzIGluIGNsaWVudC1zaWRlIGNvZGVcclxuZXhwb3J0IGNvbnN0IHN1cGFiYXNlQWRtaW4gPSBjcmVhdGVDbGllbnQoXHJcbiAgc3VwYWJhc2VVcmwsXHJcbiAgcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSB8fCAnJyxcclxuICB7XHJcbiAgICBhdXRoOiB7XHJcbiAgICAgIGF1dG9SZWZyZXNoVG9rZW46IGZhbHNlLFxyXG4gICAgICBwZXJzaXN0U2Vzc2lvbjogZmFsc2VcclxuICAgIH1cclxuICB9XHJcbikiXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJFcnJvciIsInN1cGFiYXNlIiwic3VwYWJhc2VBZG1pbiIsIlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkiLCJhdXRoIiwiYXV0b1JlZnJlc2hUb2tlbiIsInBlcnNpc3RTZXNzaW9uIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseClient.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstats%2Froute&page=%2Fapi%2Fadmin%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstats%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstats%2Froute&page=%2Fapi%2Fadmin%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstats%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_xampp_htdocs_capstone_Main_app_api_admin_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/admin/stats/route.ts */ \"(rsc)/./app/api/admin/stats/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/stats/route\",\n        pathname: \"/api/admin/stats\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/stats/route\"\n    },\n    resolvedPagePath: \"C:\\\\xampp\\\\htdocs\\\\capstone_Main\\\\app\\\\api\\\\admin\\\\stats\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_xampp_htdocs_capstone_Main_app_api_admin_stats_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4yLjRfcmVhY3QtZG9tQDE4LjMuMV9yZWFjdEAxOC4zLjFfX3JlYWN0QDE4LjMuMS9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnN0YXRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnN0YXRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZzdGF0cyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNrQjtBQUMvRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxceGFtcHBcXFxcaHRkb2NzXFxcXGNhcHN0b25lX01haW5cXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxzdGF0c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vc3RhdHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9zdGF0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vc3RhdHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcY2Fwc3RvbmVfTWFpblxcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXHN0YXRzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstats%2Froute&page=%2Fapi%2Fadmin%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstats%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/tslib@2.8.1","vendor-chunks/tr46@0.0.3","vendor-chunks/@supabase+auth-js@2.78.0","vendor-chunks/@supabase+storage-js@2.78.0","vendor-chunks/@supabase+realtime-js@2.78.0","vendor-chunks/@supabase+postgrest-js@2.78.0","vendor-chunks/@supabase+node-fetch@2.6.15","vendor-chunks/whatwg-url@5.0.0","vendor-chunks/@supabase+supabase-js@2.78.0","vendor-chunks/@supabase+functions-js@2.78.0","vendor-chunks/webidl-conversions@3.0.1"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.2.4_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Fstats%2Froute&page=%2Fapi%2Fadmin%2Fstats%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fstats%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();