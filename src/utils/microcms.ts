// SDK利用準備
import type { MicroCMSQueries, MicroCMSListContent } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 型定義
export type Designer = {
  image: {
    url: string;
    height: number;
    width: number;
  };
  nameJa: string;
  nameEn: string;
  profile: string;
  link: {
    url: string;
    text: string;
  }[];
} & MicroCMSListContent;

export type Series = {
  title: string;
  text: string;
  designers: Designer[];
  coverImage: {
    url: string;
    height: number;
    width: number;
  };
  otherImage: {
    url: string;
    height: number;
    width: number;
  }[];
} & MicroCMSListContent;

export type Product = {
  name: string;
  size: string;
  designer: Designer[];
  series: Series[];
  concept: string;
  material: string;
  design: string;
  link: {
    url: string;
    text: string;
  }[];
} & MicroCMSListContent;


// APIの呼び出し
export const getProducts = async (queries?: MicroCMSQueries) => {
  return await client.getList<Product>({ endpoint: "products", queries });
};

export const getProductDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Product>({
    endpoint: "products",
    contentId,
    queries,
  });
};