export type creationDataType = {
  id: number;
  user_id: string;
  prompt: string;
  content: string;
  type: string;
  publish: boolean;
  likes: never[];
  created_at: string;
  updated_at: string;
};

export type publishCreationDataType =
  | {
      id: number;
      user_id: string;
      prompt: string;
      content: string;
      type: string;
      publish: boolean;
      likes: string[];
      created_at: string;
      updated_at: string;
      __v?: undefined;
    }
  | {
      id: number;
      user_id: string;
      prompt: string;
      content: string;
      type: string;
      publish: boolean;
      likes: string[];
      created_at: string;
      updated_at: string;
      __v: number;
    };
