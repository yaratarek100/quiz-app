import type { Student } from '@/Interfaces/StudentsInteface';
import { baseURL } from '@/services/Axiosinstance';
import { STUDENTS_URLS } from '@/services/Urls';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apis= createApi({
 reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); 
      console.log(token)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers
    }
  }),
   endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => ({
        url: STUDENTS_URLS.allStudents,
      })
    })
  })

})
export const { useGetStudentsQuery } = apis