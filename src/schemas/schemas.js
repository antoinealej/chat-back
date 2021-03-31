import { gql } from 'apollo-server-express';
import helloSchema from './hello.schema';

const schemas = [helloSchema];

export default gql(schemas.join(''));
