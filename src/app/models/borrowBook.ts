export class BorrowBook {
  id?: number;
  userId: number;
  bookId: string;
  numberOfDays: number;
  generatedCode?: string;
}
