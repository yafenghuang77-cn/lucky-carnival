export type PrizeKind = 'phone' | 'redpack' | 'coupon' | 'coffee' | 'points' | 'thanks' | 'shipping'

export type Prize = {
  id: string
  name: string
  shortName: string
  type: string
  iconText: string
  iconClass: string
  stock: number
  weight: number
}

export type WinRecord = {
  id: string
  prizeName: string
  prizeDesc?: string
  prizeKind?: PrizeKind
  prizeValue?: string
  isWin?: boolean
  status?: 'pending' | 'claimed' | 'expired'
  code?: string
  expiresAt?: string
  wonAt?: string
}
