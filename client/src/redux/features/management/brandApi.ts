import { baseApi } from "../baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: (query) => ({
        url: '/brands',
        method: 'GET',
        params: query
      }),
      providesTags: ['brand']
    }),
    createBrand: builder.mutation({
      query: (payload) => ({
        url: '/brands',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['brand']
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: '/brands/' + id,
        method: 'DELETE'
      }),
      invalidatesTags: ['brand']
    }),
  })
})

export const { useGetAllBrandsQuery, useCreateBrandMutation, useDeleteBrandMutation } = brandApi