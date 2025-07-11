import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TravelProduct } from './product.document';
import { Model } from 'mongoose';
import { AREA } from './enum/product-area.enum';
import { STATUS } from 'src/common/enum/data-stauts.enum';
import { CATEGORY } from './enum/product-category.enum';
import axios from 'axios';
import { MongoClient } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(TravelProduct.name)
    private productModel: Model<TravelProduct>,
    @Inject('MONGO_CLIENT')
    private mongoClient: MongoClient
  ) {}

  async getTravelProducts(
    category: CATEGORY,
    startDate: string,
    endDate: string,
    travelDays: number,
    area1: AREA,
    area2: string,
    status: STATUS,
  ) {
    const conditions: any = {};

    if (category) {
      conditions.category = category;
    }

    if (startDate) {
      conditions.endDate = { $gte: startDate };
    }

    if (endDate) {
      conditions.startDate = { $lte: endDate };
    }

    if (travelDays) {
      conditions.travelDays = travelDays;
    }

    if (area1) {
      conditions.area = { $in: AREA.detailMap[area1] };
    }

    if (area2) {
      conditions.area = area2;
    }

    if (status) {
      conditions.status = status;
    }

    return await this.productModel.find(conditions).exec();
  }

  async getTravelProductById(id: string) {
    return await this.productModel.findOne({_id: id}).exec();
  }

  async fetchImageAsBase64(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });

      const mimeType = response.headers['content-type'];
      const base64 = Buffer.from(response.data, 'binary').toString('base64');

      return `data:${mimeType};base64,${base64}`;
      } catch (error) {
      throw new BadRequestException('이미지를 가져오거나 인코딩하는 데 실패했습니다.');
    }
  }

  async searchProduct(search: string) {
    const productCollection = this.mongoClient.db('tribee').collection('travel_product');
    const tourTicketCollection = this.mongoClient.db('tribee').collection('tour_ticket_product');

    const allowedSingleChars = new Set([
      '괌'
    ]);

    if (search.length === 1 && !allowedSingleChars.has(search)) {
      throw new Error('Search Keyword Too Short');
    }

    const travelProduct = await productCollection.aggregate([
      {$search: {
        index: 'travel_search_index',
        compound: {
          should: [
            {
            text :{
              query: search,
              path: 'title',
              score: {constant: {value: 10}}
            }
          },
          {
            text :{
              query: search,
              path: 'area',
              synonyms : "synonyms_mapping",
              score: { boost: { value: 20 } }
            }
          },
          {
            text :{
              query: search,
              path: 'travelPoint',
              score: {boost: {value: 2}}
            }
          },
          {
            text :{
              query: search,
              path: 'travelDays',
              score: {boost: {value: 1}}
            }
          },
          {
            text :{
              query: search,
              path: 'airline',
              score: { boost: { value: 3 } }
            }
          },
        ],
        minimumShouldMatch: 1,
        }
      }},
      {
        $project: {
          score: { $meta: "searchScore" },
          fullDoc: "$$ROOT"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$fullDoc", { score: "$score" }]
          }
        }
      },
      {
        $sort: {
          score: -1
        }
      }
    ]).toArray();

    const tourTicketProduct = await tourTicketCollection.aggregate([
      {$search: {
        index: 'tour_ticket_search_index',
        compound: {
          should: [
            {
            text :{
              query: search,
              path: 'title',
              score: {constant: {value: 5}}
            }
          },
          {
            text :{
              query: search,
              path: 'detailContent',
              score: {boost: {value: 3}}
            }
          },
        ],
        minimumShouldMatch: 1,
        }
      }},
      {
        $project: {
          score: { $meta: "searchScore" },
          fullDoc: "$$ROOT"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$fullDoc", { score: "$score" }]
          }
        }
      },
      {
        $sort: {
          score: -1
        }
      }
    ]).toArray();

    return [...travelProduct, ...tourTicketProduct];
  }
}
