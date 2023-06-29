export interface MenuResponse {
  menu: MenuItem[]
}

export interface MenuItem {
  name: string
  price: number
  kind: string
  quantity?: number
}
