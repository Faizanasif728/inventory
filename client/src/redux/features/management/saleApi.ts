import { baseApi } from "../baseApi";

const saleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSale: builder.query({
      query: (query) => ({
        url: '/sales',
        method: 'GET',
        params: query
      }),
      providesTags: ['sale']
    }),
    createSale: builder.mutation({
      query: (payload) => ({
        url: '/sales',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['sale', 'product']
    }),
    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/sales/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['sale']
    }),
    updateSale: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/sales/${id}`,
        method: 'PATCH',
        body: payload
      }),
      invalidatesTags: ['sale']
    }),
    yearlySale: builder.query({
      query: () => ({
        url: `/sales/years`,
        method: 'GET'
      }),
      transformResponse: (response: any) => ({
        ...response,
        data: response?.data?.map((item: any) => ({
          ...item,
          totalProfit: item?.totalProfit ?? 0,
          totalBill: item?.totalBill ?? 0,
        }))
      }),
      providesTags: ['sale']
    }),
    monthlySale: builder.query({
      query: () => ({
        url: `/sales/months`,
        method: 'GET'
      }),
      transformResponse: (response: any) => ({
        ...response,
        data: response?.data?.map((item: any) => ({
          ...item,
          totalProfit: item?.totalProfit ?? 0,
          totalBill: item?.totalBill ?? 0,
        }))
      }),
      providesTags: ['sale']
    }),
    weeklySale: builder.query({
      query: () => ({
        url: `/sales/weeks`,
        method: 'GET'
      }),
      transformResponse: (response: any) => ({
        ...response,
        data: response?.data?.map((item: any) => ({
          ...item,
          totalProfit: item?.totalProfit ?? 0,
          totalBill: item?.totalBill ?? 0,
        }))
      }),
      providesTags: ['sale']
    }),
    dailySale: builder.query({
      query: () => ({
        url: `/sales/days`,
        method: 'GET'
      }),
      transformResponse: (response: any) => ({
        ...response,
        data: response?.data?.map((item: any) => ({
          ...item,
          totalProfit: item?.totalProfit ?? 0,
          totalBill: item?.totalBill ?? 0,
        }))
      }),
      providesTags: ['sale']
    }),
  })
})

export const {
  useGetAllSaleQuery,
  useCreateSaleMutation,
  useDeleteSaleMutation,
  useUpdateSaleMutation,
  useYearlySaleQuery,
  useMonthlySaleQuery,
  useWeeklySaleQuery,
  useDailySaleQuery } = saleApi