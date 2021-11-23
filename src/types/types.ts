export interface TypeDto {
  _id?: string;
  name: string;
  body: Record<string, unknown>;

  order?: number;
  packageId?: string;
}

export interface Type {
  authorId: string;
  name: string;
  body: Record<string, unknown>;
  order?: number;
  deleted?: boolean;
  packageId: string;
}

export type GetAllQuery = Partial<{
  packageId: string;
}>;
