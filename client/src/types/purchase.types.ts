export interface IPurchase {
  _id: string
  user: string
  seller: string
  product: string
  sellerName: string
  productName: string
  quantity: number
  unitPrice: number
  expense: number
  paid: number
  createdAt: string
}
