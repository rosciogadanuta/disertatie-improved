export class Book {
  id: string;
  name: string;
  authors: string[];
  image: string | File;
  description: string;
  count: number;
  type? :string;
  edition?: string;
  code?: string;
}
