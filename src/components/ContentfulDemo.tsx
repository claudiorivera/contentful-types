"use client";
import * as contentful from "contentful";
import { useEffect, useState } from "react";

import { env } from "~/env.mjs";

const contentfulClient = contentful.createClient({
  space: env.NEXT_PUBLIC_CONTENTFUL_SPACE,
  accessToken: env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

// 1. Update this with a valid Entry ID
const CONTENTFUL_ENTRY_ID = "";
// 2. Enter that entry's content type here and you should see the entry rendered in the app, as expected
// 3. Change the type to something invalid and you will get get a `NotFound` error, as expected
const CONTENTFUL_ENTRY_TYPE = "";

export const ContentfulDemo = () => {
  const [data, setData] = useState<unknown>();

  useEffect(() => {
    const fetchContentfulData = async () => {
      try {
        const entry = await contentfulClient.getEntry(CONTENTFUL_ENTRY_ID, {
          // TypeScript is complaining about including `content_type` in the query here, even though the query is valid
          // TypeScript Error: Object literal may only specify known properties, and 'content_type' does not exist in type 'EntryQueries<undefined>'
          content_type: CONTENTFUL_ENTRY_TYPE,
        });

        setData(entry);
      } catch (error) {
        setData(error);
      }
    };

    fetchContentfulData();
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
