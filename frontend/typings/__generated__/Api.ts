/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RestaurantVotesDTO {
  /** @format int32 */
  votes?: number;
  restaurantid?: string;
  name?: string;
  city?: string;
}

export interface VotingResultDTO {
  date?: string;
  results?: RestaurantVotesDTO[];
}

export interface DishDTO {
  name?: string;
  price?: string;

  /** Dish attributes (lactose free, gluten free etc) */
  attributes?: string[];
}

/**
 * List of restaurants
 */
export interface RestaurantDTO {
  /** Restaurant id to be used in voting requests. SHA256 of city and restaurant name */
  id?: string;
  name?: string;
  openingHours?: string;

  /**
   * Number of votes this restaurant has accumulated today
   * @format int32
   */
  votes?: number;
  dishes?: DishDTO[];
}

export interface RestaurantResponseDTO {
  /** If non-null, contains the voted restaurant id for today */
  alreadyVoted?: string;

  /** Current date */
  date?: string;

  /** List of restaurants */
  restaurants?: RestaurantDTO[];
}
