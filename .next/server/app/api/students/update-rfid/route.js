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
exports.id = "app/api/students/update-rfid/route";
exports.ids = ["app/api/students/update-rfid/route"];
exports.modules = {

/***/ "(rsc)/./app/api/students/update-rfid/route.ts":
/*!***********************************************!*\
  !*** ./app/api/students/update-rfid/route.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/supabaseAdmin */ \"(rsc)/./lib/supabaseAdmin.ts\");\n\n\nasync function POST(request) {\n    try {\n        const updateData = await request.json();\n        // Validate required fields\n        if (!updateData.email && !updateData.studentId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'Email or Student ID is required'\n            }, {\n                status: 400\n            });\n        }\n        if (!updateData.rfidCard) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'RFID Card number is required'\n            }, {\n                status: 400\n            });\n        }\n        const admin = (0,_lib_supabaseAdmin__WEBPACK_IMPORTED_MODULE_1__.getSupabaseAdmin)();\n        if (!admin) {\n            console.error('Supabase admin client not initialized');\n            if (true) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    success: true,\n                    message: 'RFID updated (dev mode - not saved to database)'\n                });\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'Database service not configured. Please check your environment variables.'\n            }, {\n                status: 500\n            });\n        }\n        // Build query to find student\n        let query = admin.from('students').select('*');\n        if (updateData.email) {\n            query = query.eq('email', updateData.email.toLowerCase().trim());\n        } else if (updateData.studentId) {\n            // Try both student_id and student_number fields\n            query = query.or(`student_id.eq.${updateData.studentId},student_number.eq.${updateData.studentId}`);\n        }\n        const { data: students, error: findError } = await query;\n        if (findError) {\n            console.error('Database error finding student:', findError);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: findError.message\n            }, {\n                status: 500\n            });\n        }\n        if (!students || students.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: 'Student not found'\n            }, {\n                status: 404\n            });\n        }\n        const student = students[0];\n        // Update student with RFID card number\n        // Try to update both rfid_card and rfid_tag fields (depending on database schema)\n        const updateFields = {\n            rfid_tag: updateData.rfidCard\n        };\n        // Also try to update rfid_card if the column exists\n        updateFields.rfid_card = updateData.rfidCard;\n        updateFields.rfidCard = updateData.rfidCard;\n        const { data: updatedStudent, error: updateError } = await admin.from('students').update(updateFields).eq('id', student.id).select().single();\n        if (updateError) {\n            console.error('Database error updating RFID:', updateError);\n            // In development, return success even if table doesn't exist\n            if (true) {\n                console.log('RFID update (dev mode):', {\n                    email: updateData.email,\n                    rfidCard: updateData.rfidCard\n                });\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    success: true,\n                    message: 'RFID updated (dev mode - not saved to database)'\n                });\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                error: updateError.message\n            }, {\n                status: 500\n            });\n        }\n        // Remove password from response\n        const studentWithoutPassword = {\n            ...updatedStudent\n        };\n        if (studentWithoutPassword.Password !== undefined) {\n            delete studentWithoutPassword.Password;\n        }\n        if (studentWithoutPassword.password !== undefined) {\n            delete studentWithoutPassword.password;\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            student: studentWithoutPassword,\n            message: 'RFID card number updated successfully'\n        });\n    } catch (error) {\n        console.error('Update RFID API error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            error: error?.message || 'Internal server error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3N0dWRlbnRzL3VwZGF0ZS1yZmlkL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEwQztBQUNZO0FBRS9DLGVBQWVFLEtBQUtDLE9BQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNQyxhQUFhLE1BQU1ELFFBQVFFLElBQUk7UUFFckMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQ0QsV0FBV0UsS0FBSyxJQUFJLENBQUNGLFdBQVdHLFNBQVMsRUFBRTtZQUM5QyxPQUFPUCxxREFBWUEsQ0FBQ0ssSUFBSSxDQUN0QjtnQkFBRUcsU0FBUztnQkFBT0MsT0FBTztZQUFrQyxHQUMzRDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsSUFBSSxDQUFDTixXQUFXTyxRQUFRLEVBQUU7WUFDeEIsT0FBT1gscURBQVlBLENBQUNLLElBQUksQ0FDdEI7Z0JBQUVHLFNBQVM7Z0JBQU9DLE9BQU87WUFBK0IsR0FDeEQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1FLFFBQVFYLG9FQUFnQkE7UUFFOUIsSUFBSSxDQUFDVyxPQUFPO1lBQ1ZDLFFBQVFKLEtBQUssQ0FBQztZQUNkLElBQUlLLElBQXNDLEVBQUU7Z0JBQzFDLE9BQU9kLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7b0JBQ3ZCRyxTQUFTO29CQUNUTyxTQUFTO2dCQUNYO1lBQ0Y7WUFDQSxPQUFPZixxREFBWUEsQ0FBQ0ssSUFBSSxDQUN0QjtnQkFDRUcsU0FBUztnQkFDVEMsT0FBTztZQUNULEdBQ0E7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLDhCQUE4QjtRQUM5QixJQUFJTSxRQUFRSixNQUFNSyxJQUFJLENBQUMsWUFBWUMsTUFBTSxDQUFDO1FBRTFDLElBQUlkLFdBQVdFLEtBQUssRUFBRTtZQUNwQlUsUUFBUUEsTUFBTUcsRUFBRSxDQUFDLFNBQVNmLFdBQVdFLEtBQUssQ0FBQ2MsV0FBVyxHQUFHQyxJQUFJO1FBQy9ELE9BQU8sSUFBSWpCLFdBQVdHLFNBQVMsRUFBRTtZQUMvQixnREFBZ0Q7WUFDaERTLFFBQVFBLE1BQU1NLEVBQUUsQ0FBQyxDQUFDLGNBQWMsRUFBRWxCLFdBQVdHLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRUgsV0FBV0csU0FBUyxFQUFFO1FBQ3BHO1FBRUEsTUFBTSxFQUFFZ0IsTUFBTUMsUUFBUSxFQUFFZixPQUFPZ0IsU0FBUyxFQUFFLEdBQUcsTUFBTVQ7UUFFbkQsSUFBSVMsV0FBVztZQUNiWixRQUFRSixLQUFLLENBQUMsbUNBQW1DZ0I7WUFDakQsT0FBT3pCLHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO2dCQUFFRyxTQUFTO2dCQUFPQyxPQUFPZ0IsVUFBVVYsT0FBTztZQUFDLEdBQzNDO2dCQUFFTCxRQUFRO1lBQUk7UUFFbEI7UUFFQSxJQUFJLENBQUNjLFlBQVlBLFNBQVNFLE1BQU0sS0FBSyxHQUFHO1lBQ3RDLE9BQU8xQixxREFBWUEsQ0FBQ0ssSUFBSSxDQUN0QjtnQkFBRUcsU0FBUztnQkFBT0MsT0FBTztZQUFvQixHQUM3QztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTWlCLFVBQVVILFFBQVEsQ0FBQyxFQUFFO1FBRTNCLHVDQUF1QztRQUN2QyxrRkFBa0Y7UUFDbEYsTUFBTUksZUFBb0I7WUFDeEJDLFVBQVV6QixXQUFXTyxRQUFRO1FBQy9CO1FBRUEsb0RBQW9EO1FBQ3BEaUIsYUFBYUUsU0FBUyxHQUFHMUIsV0FBV08sUUFBUTtRQUM1Q2lCLGFBQWFqQixRQUFRLEdBQUdQLFdBQVdPLFFBQVE7UUFFM0MsTUFBTSxFQUFFWSxNQUFNUSxjQUFjLEVBQUV0QixPQUFPdUIsV0FBVyxFQUFFLEdBQUcsTUFBTXBCLE1BQ3hESyxJQUFJLENBQUMsWUFDTGdCLE1BQU0sQ0FBQ0wsY0FDUFQsRUFBRSxDQUFDLE1BQU1RLFFBQVFPLEVBQUUsRUFDbkJoQixNQUFNLEdBQ05pQixNQUFNO1FBRVQsSUFBSUgsYUFBYTtZQUNmbkIsUUFBUUosS0FBSyxDQUFDLGlDQUFpQ3VCO1lBRS9DLDZEQUE2RDtZQUM3RCxJQUFJbEIsSUFBc0MsRUFBRTtnQkFDMUNELFFBQVF1QixHQUFHLENBQUMsMkJBQTJCO29CQUFFOUIsT0FBT0YsV0FBV0UsS0FBSztvQkFBRUssVUFBVVAsV0FBV08sUUFBUTtnQkFBQztnQkFDaEcsT0FBT1gscURBQVlBLENBQUNLLElBQUksQ0FBQztvQkFDdkJHLFNBQVM7b0JBQ1RPLFNBQVM7Z0JBQ1g7WUFDRjtZQUVBLE9BQU9mLHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO2dCQUFFRyxTQUFTO2dCQUFPQyxPQUFPdUIsWUFBWWpCLE9BQU87WUFBQyxHQUM3QztnQkFBRUwsUUFBUTtZQUFJO1FBRWxCO1FBRUEsZ0NBQWdDO1FBQ2hDLE1BQU0yQix5QkFBeUI7WUFBRSxHQUFHTixjQUFjO1FBQUM7UUFDbkQsSUFBSU0sdUJBQXVCQyxRQUFRLEtBQUtDLFdBQVc7WUFDakQsT0FBT0YsdUJBQXVCQyxRQUFRO1FBQ3hDO1FBQ0EsSUFBSUQsdUJBQXVCRyxRQUFRLEtBQUtELFdBQVc7WUFDakQsT0FBT0YsdUJBQXVCRyxRQUFRO1FBQ3hDO1FBRUEsT0FBT3hDLHFEQUFZQSxDQUFDSyxJQUFJLENBQUM7WUFDdkJHLFNBQVM7WUFDVG1CLFNBQVNVO1lBQ1R0QixTQUFTO1FBQ1g7SUFDRixFQUFFLE9BQU9OLE9BQVk7UUFDbkJJLFFBQVFKLEtBQUssQ0FBQywwQkFBMEJBO1FBQ3hDLE9BQU9ULHFEQUFZQSxDQUFDSyxJQUFJLENBQ3RCO1lBQ0VHLFNBQVM7WUFDVEMsT0FBT0EsT0FBT00sV0FBVztRQUMzQixHQUNBO1lBQUVMLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJDOlxceGFtcHBcXGh0ZG9jc1xcY2Fwc3RvbmVfTWFpblxcYXBwXFxhcGlcXHN0dWRlbnRzXFx1cGRhdGUtcmZpZFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInXHJcbmltcG9ydCB7IGdldFN1cGFiYXNlQWRtaW4gfSBmcm9tICdAL2xpYi9zdXBhYmFzZUFkbWluJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB1cGRhdGVEYXRhID0gYXdhaXQgcmVxdWVzdC5qc29uKClcclxuXHJcbiAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBmaWVsZHNcclxuICAgIGlmICghdXBkYXRlRGF0YS5lbWFpbCAmJiAhdXBkYXRlRGF0YS5zdHVkZW50SWQpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRW1haWwgb3IgU3R1ZGVudCBJRCBpcyByZXF1aXJlZCcgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdXBkYXRlRGF0YS5yZmlkQ2FyZCkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdSRklEIENhcmQgbnVtYmVyIGlzIHJlcXVpcmVkJyB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRtaW4gPSBnZXRTdXBhYmFzZUFkbWluKClcclxuXHJcbiAgICBpZiAoIWFkbWluKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1N1cGFiYXNlIGFkbWluIGNsaWVudCBub3QgaW5pdGlhbGl6ZWQnKVxyXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgIG1lc3NhZ2U6ICdSRklEIHVwZGF0ZWQgKGRldiBtb2RlIC0gbm90IHNhdmVkIHRvIGRhdGFiYXNlKScsXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLCBcclxuICAgICAgICAgIGVycm9yOiAnRGF0YWJhc2Ugc2VydmljZSBub3QgY29uZmlndXJlZC4gUGxlYXNlIGNoZWNrIHlvdXIgZW52aXJvbm1lbnQgdmFyaWFibGVzLicgXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEJ1aWxkIHF1ZXJ5IHRvIGZpbmQgc3R1ZGVudFxyXG4gICAgbGV0IHF1ZXJ5ID0gYWRtaW4uZnJvbSgnc3R1ZGVudHMnKS5zZWxlY3QoJyonKVxyXG4gICAgXHJcbiAgICBpZiAodXBkYXRlRGF0YS5lbWFpbCkge1xyXG4gICAgICBxdWVyeSA9IHF1ZXJ5LmVxKCdlbWFpbCcsIHVwZGF0ZURhdGEuZW1haWwudG9Mb3dlckNhc2UoKS50cmltKCkpXHJcbiAgICB9IGVsc2UgaWYgKHVwZGF0ZURhdGEuc3R1ZGVudElkKSB7XHJcbiAgICAgIC8vIFRyeSBib3RoIHN0dWRlbnRfaWQgYW5kIHN0dWRlbnRfbnVtYmVyIGZpZWxkc1xyXG4gICAgICBxdWVyeSA9IHF1ZXJ5Lm9yKGBzdHVkZW50X2lkLmVxLiR7dXBkYXRlRGF0YS5zdHVkZW50SWR9LHN0dWRlbnRfbnVtYmVyLmVxLiR7dXBkYXRlRGF0YS5zdHVkZW50SWR9YClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB7IGRhdGE6IHN0dWRlbnRzLCBlcnJvcjogZmluZEVycm9yIH0gPSBhd2FpdCBxdWVyeVxyXG5cclxuICAgIGlmIChmaW5kRXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRGF0YWJhc2UgZXJyb3IgZmluZGluZyBzdHVkZW50OicsIGZpbmRFcnJvcilcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiBmaW5kRXJyb3IubWVzc2FnZSB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzdHVkZW50cyB8fCBzdHVkZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnU3R1ZGVudCBub3QgZm91bmQnIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwNCB9XHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzdHVkZW50ID0gc3R1ZGVudHNbMF1cclxuXHJcbiAgICAvLyBVcGRhdGUgc3R1ZGVudCB3aXRoIFJGSUQgY2FyZCBudW1iZXJcclxuICAgIC8vIFRyeSB0byB1cGRhdGUgYm90aCByZmlkX2NhcmQgYW5kIHJmaWRfdGFnIGZpZWxkcyAoZGVwZW5kaW5nIG9uIGRhdGFiYXNlIHNjaGVtYSlcclxuICAgIGNvbnN0IHVwZGF0ZUZpZWxkczogYW55ID0ge1xyXG4gICAgICByZmlkX3RhZzogdXBkYXRlRGF0YS5yZmlkQ2FyZCwgLy8gUHJpbWFyeSBmaWVsZCBpbiBkYXRhYmFzZVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBBbHNvIHRyeSB0byB1cGRhdGUgcmZpZF9jYXJkIGlmIHRoZSBjb2x1bW4gZXhpc3RzXHJcbiAgICB1cGRhdGVGaWVsZHMucmZpZF9jYXJkID0gdXBkYXRlRGF0YS5yZmlkQ2FyZFxyXG4gICAgdXBkYXRlRmllbGRzLnJmaWRDYXJkID0gdXBkYXRlRGF0YS5yZmlkQ2FyZFxyXG5cclxuICAgIGNvbnN0IHsgZGF0YTogdXBkYXRlZFN0dWRlbnQsIGVycm9yOiB1cGRhdGVFcnJvciB9ID0gYXdhaXQgYWRtaW5cclxuICAgICAgLmZyb20oJ3N0dWRlbnRzJylcclxuICAgICAgLnVwZGF0ZSh1cGRhdGVGaWVsZHMpXHJcbiAgICAgIC5lcSgnaWQnLCBzdHVkZW50LmlkKVxyXG4gICAgICAuc2VsZWN0KClcclxuICAgICAgLnNpbmdsZSgpXHJcblxyXG4gICAgaWYgKHVwZGF0ZUVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0RhdGFiYXNlIGVycm9yIHVwZGF0aW5nIFJGSUQ6JywgdXBkYXRlRXJyb3IpXHJcbiAgICAgIFxyXG4gICAgICAvLyBJbiBkZXZlbG9wbWVudCwgcmV0dXJuIHN1Y2Nlc3MgZXZlbiBpZiB0YWJsZSBkb2Vzbid0IGV4aXN0XHJcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSRklEIHVwZGF0ZSAoZGV2IG1vZGUpOicsIHsgZW1haWw6IHVwZGF0ZURhdGEuZW1haWwsIHJmaWRDYXJkOiB1cGRhdGVEYXRhLnJmaWRDYXJkIH0pXHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgICBtZXNzYWdlOiAnUkZJRCB1cGRhdGVkIChkZXYgbW9kZSAtIG5vdCBzYXZlZCB0byBkYXRhYmFzZSknLFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogdXBkYXRlRXJyb3IubWVzc2FnZSB9LFxyXG4gICAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHBhc3N3b3JkIGZyb20gcmVzcG9uc2VcclxuICAgIGNvbnN0IHN0dWRlbnRXaXRob3V0UGFzc3dvcmQgPSB7IC4uLnVwZGF0ZWRTdHVkZW50IH1cclxuICAgIGlmIChzdHVkZW50V2l0aG91dFBhc3N3b3JkLlBhc3N3b3JkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZGVsZXRlIHN0dWRlbnRXaXRob3V0UGFzc3dvcmQuUGFzc3dvcmRcclxuICAgIH1cclxuICAgIGlmIChzdHVkZW50V2l0aG91dFBhc3N3b3JkLnBhc3N3b3JkICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgZGVsZXRlIHN0dWRlbnRXaXRob3V0UGFzc3dvcmQucGFzc3dvcmRcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICBzdHVkZW50OiBzdHVkZW50V2l0aG91dFBhc3N3b3JkLFxyXG4gICAgICBtZXNzYWdlOiAnUkZJRCBjYXJkIG51bWJlciB1cGRhdGVkIHN1Y2Nlc3NmdWxseScsXHJcbiAgICB9KVxyXG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1VwZGF0ZSBSRklEIEFQSSBlcnJvcjonLCBlcnJvcilcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAge1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIGVycm9yOiBlcnJvcj8ubWVzc2FnZSB8fCAnSW50ZXJuYWwgc2VydmVyIGVycm9yJyxcclxuICAgICAgfSxcclxuICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0U3VwYWJhc2VBZG1pbiIsIlBPU1QiLCJyZXF1ZXN0IiwidXBkYXRlRGF0YSIsImpzb24iLCJlbWFpbCIsInN0dWRlbnRJZCIsInN1Y2Nlc3MiLCJlcnJvciIsInN0YXR1cyIsInJmaWRDYXJkIiwiYWRtaW4iLCJjb25zb2xlIiwicHJvY2VzcyIsIm1lc3NhZ2UiLCJxdWVyeSIsImZyb20iLCJzZWxlY3QiLCJlcSIsInRvTG93ZXJDYXNlIiwidHJpbSIsIm9yIiwiZGF0YSIsInN0dWRlbnRzIiwiZmluZEVycm9yIiwibGVuZ3RoIiwic3R1ZGVudCIsInVwZGF0ZUZpZWxkcyIsInJmaWRfdGFnIiwicmZpZF9jYXJkIiwidXBkYXRlZFN0dWRlbnQiLCJ1cGRhdGVFcnJvciIsInVwZGF0ZSIsImlkIiwic2luZ2xlIiwibG9nIiwic3R1ZGVudFdpdGhvdXRQYXNzd29yZCIsIlBhc3N3b3JkIiwidW5kZWZpbmVkIiwicGFzc3dvcmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/students/update-rfid/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/supabaseAdmin.ts":
/*!******************************!*\
  !*** ./lib/supabaseAdmin.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getSupabaseAdmin: () => (/* binding */ getSupabaseAdmin)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"(rsc)/./node_modules/@supabase/supabase-js/dist/module/index.js\");\n\nconst supabaseUrl = \"https://ulntyefamkxkbynrugop.supabase.co\";\nconst serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;\nfunction getSupabaseAdmin() {\n    if (!supabaseUrl || !serviceRoleKey) {\n        throw new Error('Missing Supabase admin env. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (server-only).');\n    }\n    return (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, serviceRoleKey, {\n        auth: {\n            autoRefreshToken: false,\n            persistSession: false\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc3VwYWJhc2VBZG1pbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUF5RTtBQUV6RSxNQUFNQyxjQUFjQywwQ0FBb0M7QUFDeEQsTUFBTUcsaUJBQWlCSCxRQUFRQyxHQUFHLENBQUNHLHlCQUF5QjtBQUVyRCxTQUFTQztJQUNkLElBQUksQ0FBQ04sZUFBZSxDQUFDSSxnQkFBZ0I7UUFDbkMsTUFBTSxJQUFJRyxNQUFNO0lBQ2xCO0lBRUEsT0FBT1IsbUVBQVlBLENBQUNDLGFBQXVCSSxnQkFBMEI7UUFDbkVJLE1BQU07WUFDSkMsa0JBQWtCO1lBQ2xCQyxnQkFBZ0I7UUFDbEI7SUFDRjtBQUNGIiwic291cmNlcyI6WyJDOlxceGFtcHBcXGh0ZG9jc1xcY2Fwc3RvbmVfTWFpblxcbGliXFxzdXBhYmFzZUFkbWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNsaWVudCwgdHlwZSBTdXBhYmFzZUNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcydcclxuXHJcbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMXHJcbmNvbnN0IHNlcnZpY2VSb2xlS2V5ID0gcHJvY2Vzcy5lbnYuU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN1cGFiYXNlQWRtaW4oKTogU3VwYWJhc2VDbGllbnQge1xyXG4gIGlmICghc3VwYWJhc2VVcmwgfHwgIXNlcnZpY2VSb2xlS2V5KSB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgU3VwYWJhc2UgYWRtaW4gZW52LiBTZXQgTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIGFuZCBTVVBBQkFTRV9TRVJWSUNFX1JPTEVfS0VZIChzZXJ2ZXItb25seSkuJylcclxuICB9XHJcbiAgXHJcbiAgcmV0dXJuIGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCBhcyBzdHJpbmcsIHNlcnZpY2VSb2xlS2V5IGFzIHN0cmluZywge1xyXG4gICAgYXV0aDoge1xyXG4gICAgICBhdXRvUmVmcmVzaFRva2VuOiBmYWxzZSxcclxuICAgICAgcGVyc2lzdFNlc3Npb246IGZhbHNlLFxyXG4gICAgfSxcclxuICB9KVxyXG59XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsInNlcnZpY2VSb2xlS2V5IiwiU1VQQUJBU0VfU0VSVklDRV9ST0xFX0tFWSIsImdldFN1cGFiYXNlQWRtaW4iLCJFcnJvciIsImF1dGgiLCJhdXRvUmVmcmVzaFRva2VuIiwicGVyc2lzdFNlc3Npb24iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/supabaseAdmin.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstudents%2Fupdate-rfid%2Froute&page=%2Fapi%2Fstudents%2Fupdate-rfid%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstudents%2Fupdate-rfid%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstudents%2Fupdate-rfid%2Froute&page=%2Fapi%2Fstudents%2Fupdate-rfid%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstudents%2Fupdate-rfid%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_xampp_htdocs_capstone_Main_app_api_students_update_rfid_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/students/update-rfid/route.ts */ \"(rsc)/./app/api/students/update-rfid/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/students/update-rfid/route\",\n        pathname: \"/api/students/update-rfid\",\n        filename: \"route\",\n        bundlePath: \"app/api/students/update-rfid/route\"\n    },\n    resolvedPagePath: \"C:\\\\xampp\\\\htdocs\\\\capstone_Main\\\\app\\\\api\\\\students\\\\update-rfid\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_xampp_htdocs_capstone_Main_app_api_students_update_rfid_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzdHVkZW50cyUyRnVwZGF0ZS1yZmlkJTJGcm91dGUmcGFnZT0lMkZhcGklMkZzdHVkZW50cyUyRnVwZGF0ZS1yZmlkJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGc3R1ZGVudHMlMkZ1cGRhdGUtcmZpZCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDeGFtcHAlNUNodGRvY3MlNUNjYXBzdG9uZV9NYWluJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUMyQjtBQUN4RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxceGFtcHBcXFxcaHRkb2NzXFxcXGNhcHN0b25lX01haW5cXFxcYXBwXFxcXGFwaVxcXFxzdHVkZW50c1xcXFx1cGRhdGUtcmZpZFxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc3R1ZGVudHMvdXBkYXRlLXJmaWQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zdHVkZW50cy91cGRhdGUtcmZpZFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc3R1ZGVudHMvdXBkYXRlLXJmaWQvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcY2Fwc3RvbmVfTWFpblxcXFxhcHBcXFxcYXBpXFxcXHN0dWRlbnRzXFxcXHVwZGF0ZS1yZmlkXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstudents%2Fupdate-rfid%2Froute&page=%2Fapi%2Fstudents%2Fupdate-rfid%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstudents%2Fupdate-rfid%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tr46","vendor-chunks/whatwg-url","vendor-chunks/webidl-conversions"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fstudents%2Fupdate-rfid%2Froute&page=%2Fapi%2Fstudents%2Fupdate-rfid%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fstudents%2Fupdate-rfid%2Froute.ts&appDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cxampp%5Chtdocs%5Ccapstone_Main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();