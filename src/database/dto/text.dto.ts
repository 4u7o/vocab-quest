import type { TextType } from "@prisma/client";

export interface TextDto {
  type: TextType;
  title: string;
  content: string;
  sound: string | null;
  image: string | null;
}
