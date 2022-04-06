import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { ProductsService } from '../../../services/products.service';

import { Product } from '../models/product';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('data') data: CreateProductInput
  ) {
    return this.productsService.createProduct(data);
  }
}