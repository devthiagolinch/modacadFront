export interface IPlanData {
  id: number;
  title: string;
  price: number;
  description: string;
  advantages: { id: number; value: string }[];
}
