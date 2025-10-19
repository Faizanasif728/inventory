import { baseApi } from "../baseApi";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPurchases: builder.query({
      query: (query) => ({
        url: '/purchases',
        method: 'GET',
        params: query
      }),
      providesTags: ['purchases']
    }),

    createPurchase: builder.mutation({
      query: (payload) => ({
        url: '/purchases',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['purchases']
    }),

    deletePurchase: builder.mutation({
      query: (id) => ({
        url: '/purchases/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['purchases']
    }),
    yearlyExpense: builder.query({
      query: () => ({
        url: '/purchases/years',
        method: 'GET'
      }),
      providesTags: ['purchases']
    }),
  })
})

export const { useGetAllPurchasesQuery, useCreatePurchaseMutation, useDeletePurchaseMutation, useYearlyExpenseQuery } = purchaseApi