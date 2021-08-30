export interface TypeDto {
  _id?: string;
  name: string;
  body: Record<string, unknown>;
}

export interface Type {
  authorId: string;
  name: string;
  body: Record<string, unknown>;
}
