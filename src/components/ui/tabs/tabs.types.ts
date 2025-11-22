export interface TabItem {
  id: number
  title: string
  icon: string
  route: string
}

export interface TabsProps {
  items: TabItem[]
}
