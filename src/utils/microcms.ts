import type { MicroCMSQueries, MicroCMSListContent } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 型定義
export type Designers = {
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
  designers: Designers[];
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

export type Products = {
  name: string;
  size: string;
  designers: Designers[];
  series: Series[];
  categories: Categories[];
  text: {
    title: string;
    description: string;
  }[];
  link: {
    url: string;
    text: string;
  }[];
} & MicroCMSListContent;

export type Categories = {
  name: string;
} & MicroCMSListContent;


// APIの呼び出し
export const getProducts = async (queries?: MicroCMSQueries) => {
  return await client.getList<Products>({ endpoint: "products", queries });
};
export const getProductDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Products>({
    endpoint: "products",
    contentId,
    queries,
  });
};

export const getCategories = async (queries?: MicroCMSQueries) => {
  return await client.getList<Categories>({ endpoint: "categories", queries });
};
export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Categories>({
    endpoint: "categories",
    contentId,
    queries,
  });
};

export const getSeries = async (queries?: MicroCMSQueries) => {
  return await client.getList<Series>({ endpoint: "series", queries });
};
export const getSeriesDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Series>({
    endpoint: "series",
    contentId,
    queries,
  });
};

export const getDesigners = async (queries?: MicroCMSQueries) => {
  return await client.getList<Designers>({ endpoint: "designers", queries });
};
export const getDesignerDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Designers>({
    endpoint: "designers",
    contentId,
    queries,
  });
};