import { ProductBacklogEntity } from 'src/core/productBacklog/domain/ProductBacklogEntiry';
import { v4 as uuidv4 } from 'uuid';

describe('# ProductBacklogEntiry.spec', () => {
  test('正常に作成できる', () => {
    const product = ProductBacklogEntity.create({
      id: uuidv4(),
      name: 'product name',
      description: 'description',
      productOwnerId: uuidv4(),
    }).unwrap();

    expect(product.id).toBeTruthy();
  });
});
