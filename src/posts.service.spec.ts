import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();

      expect(result.length).toBe(posts.length);
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({skip: 1, limit: 2});

      expect(result.length).toBe(2);
      expect(result[0].text).toBe(posts[1].text);
      expect(result[1].text).toBe(posts[2].text);
    });

    it('should return empty array if skip is equal or less than posts.length', () => {
      const result = postsService.findMany( { skip: posts.length });

      expect(result.length).toBe(0);
    });

    it('should return empty array if limit is equal to 0', () => {
      const result = postsService.findMany({ limit: 0 });

      expect(result.length).toBe(0);
    });
  });
});
