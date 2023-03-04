import React from 'react';
import FilterOptionMenu from '@/components/PostFilter/FilterOptionMenu';
import Landing from '@/components/Landing';
import { BlogPost, Posts } from '@/types/schema';
import NotionService from '@/services/notion-service';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import PostCardSection from '@/components/PostCard/PostCardSection';
import { useRouter } from 'next/router';

const Category: NextPage<Posts> = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>(posts);

  return (
    <div className="min-h-screen">
      <Landing />
      <div className="max-w-xl mx-auto mt-32">
        <FilterOptionMenu posts={posts} setBlogPosts={setBlogPosts} />
      </div>
      <div className="max-w-6xl mx-auto py-12">
        <PostCardSection posts={blogPosts} />
      </div>
    </div>
  );
};

export default Category;

export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();

  return {
    props: {
      posts,
    },
  };
};
