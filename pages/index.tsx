import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import Content from "../public/Content.png";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div className=" max-w-7xl mx-auto">
      <Head>
        <title>Content Writing Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 px-5 lg:py-0 ">
        <div className="space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Content
            </span>{" "}
            is a place to write, read, and connect
          </h1>
          <h2>
            Post anything you want to write on any topic and connect with
            everyone!
          </h2>
        </div>
        <div className="hidden md:inline-flex h-32 w-32 lg:h-60 lg:w-60">
          <Image src={Content} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
  },
    description,
    mainImage,
    image
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
