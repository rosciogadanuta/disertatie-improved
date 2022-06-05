export class BorrowBook {
  id?: number;
  userId: number;
  bookId: string;
  mentions: string;
  numberOfDays: number;
  generatedCode?: string;
}
