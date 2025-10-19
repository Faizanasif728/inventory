import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: (query) => ({
        url: '/categories',
        method: 'GET',
        params: query
      }),
      providesTags: ['category']
    }),
    createCategory: builder.mutation({
      query: (payload) => ({
        url: '/categories',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['category']
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: '/categories/' + id,
        method: 'DELETE'
      }),
      invalidatesTags: ['category']
    }),
  })
})

export const { useGetAllCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation } = categoryApi