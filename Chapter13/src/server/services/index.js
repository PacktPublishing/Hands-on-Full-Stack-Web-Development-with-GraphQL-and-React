import graphql from './graphql';
import subscriptions from './subscriptions';

export default utils => ({
  graphql: graphql(utils),
  subscriptions: subscriptions(utils),
});